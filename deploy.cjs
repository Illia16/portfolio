require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');

const getS3Name = () => {
  try {
    const s3BucketName = execSync(
        `aws cloudformation describe-stack-resources --stack-name ${process.env.STACK_NAME} --query \"StackResources[?ResourceType=='AWS::S3::Bucket'].PhysicalResourceId\" --output text --profile ${process.env.PROFILE} --region ${process.env.REGION}`,
        { encoding: 'utf-8' }
    ).trim();

    return s3BucketName;
  } catch (error) {
      console.error('Error executing AWS CLI commands:', error.message);
  }
}

const getCloudFrontID = () => {
    try {
      const cloudfrontDistId = execSync(
        `aws cloudformation describe-stack-resources --stack-name ${process.env.STACK_NAME} --query \"StackResources[?ResourceType=='AWS::CloudFront::Distribution'].PhysicalResourceId\" --output text --profile ${process.env.PROFILE} --region ${process.env.REGION}`,
        { encoding: 'utf-8' }
      ).trim();
      
      return cloudfrontDistId;
    } catch (error) {
        console.error('Error executing AWS CLI commands:', error.message);
    }
}

const uploadToS3 = () => {
  const S3_BUCKET = getS3Name();  
  const command = `aws s3 sync ${DIST_DIR} s3://${S3_BUCKET}/site --profile ${process.env.PROFILE} --region ${process.env.REGION} --delete`;
  execSync(command, { stdio: 'inherit' });

  console.log('Files uploaded to S3 successfully.');
}

const invalidateCloudFront = () => {
  const CLOUDFRONT_DISTRIBUTION_ID = getCloudFrontID();
  const command = `aws cloudfront create-invalidation --profile ${process.env.PROFILE} --region ${process.env.REGION} --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"`;
  execSync(command, { stdio: 'inherit' });

  console.log('CloudFront invalidation completed.');
}


try {
    uploadToS3();
    invalidateCloudFront();

    console.log('Frontend deployment completed successfully!');
} catch (error) {
    console.error('Error during deployment:', error);
    process.exit(1);
}