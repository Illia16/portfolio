<template>
  <div id="app" class="relative">
    <Border />
    <Header @clickNav="toggleNav" :navOpen="navOpen" />
    <About />
    <!-- <Skills :skills="skills"/> -->
    <Skills :skills="sortedSkills"/>
    <Projects @setActiveProjects="toggleProjects" :activeProjects="activeProjects" :actionsMade="actionsMade" :projects="projects"/>
    <Contact />
  </div>
</template>

<script>
import Border from './components/Border.vue'
import Header from './components/Header.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'

import IconFirebase from './assets/icons/logo_lockup_firebase_vertical.svg';
import IconTailwindcss from './assets/icons/tailwindcss.svg';
import IconDocker from './assets/icons/docker.svg';
import IconOpenAI from './assets/icons/openai.svg';
import IconJenkins from './assets/icons/jenkins.svg';
import IconJava from './assets/icons/java.svg';
import IconGitHubCoPilot from './assets/icons/githubcopilot.svg';
import IconGitHubActions from './assets/icons/githubactions.svg';
import IconGoogleGeminiAI from './assets/icons/googlegemini.svg';
import IconCloudFlare from './assets/icons/cloudflare.svg';


import IconAWS from './assets/icons/aws.svg';
import IconAWSSecretsManager from './assets/icons/aws-secrets-manager.svg';
import IconAWSLambda from './assets/icons/aws-lambda.svg';
import IconAWSAmplify from './assets/icons/aws-amplify.svg';
import IconAWSSQS from './assets/icons/aws-sqs.svg';
import IconAWSs3 from './assets/icons/aws-s3.svg';
import IconAWSEC2 from './assets/icons/aws-ec2.svg';
import IconAWSDynamoDB from './assets/icons/aws-dynamodb.svg';

import IconAWSACM from './assets/icons/aws-acm.svg';
import IconAWSAPIGateway from './assets/icons/aws-api-gateway.svg';
import IconAWSCloudFormation from './assets/icons/aws-cloudformation.svg';
import IconAWSCloudFront from './assets/icons/aws-cloudfront.svg';
import IconAWSCloudWatch from './assets/icons/aws-cloudwatch.svg';
import IconAWSEventBridge from './assets/icons/aws-event-bridge.svg';
import IconAWSIAM from './assets/icons/aws-iam.svg';
import IconAWSRDS from './assets/icons/aws-rds.svg';
import IconAWSES from './assets/icons/aws-ses.svg';

import IconGit from './assets/icons/git.svg';
import IconAzure from './assets/icons/azure.svg';

import IconCSS3 from './assets/icons/css3.svg';
import IconSass from './assets/icons/sass.svg';
import IconLess from './assets/icons/less.svg';

export default {
  name: 'App',
  components: {
    Border,
    Header,
    About,
    Skills,
    Projects,
    Contact,
  },
  data() {
    return {
      navOpen: false,
      skills: {
        current: [
          {
            skillName: 'Azure',
            src: IconAzure,
          },
          { 
            skillName: 'JavaScript',
            skillClass: 'fab fa-js text-skills-js',
          },
          { 
            skillName: 'JQuery',
            skillClass: 'devicon-jquery-plain text-skills-jquery',
          },
          {
            skillName: 'React',
            skillClass: 'fab fa-react text-skills-react',
          },
          {
            skillName: 'Git/Github',
            src: IconGit,
            subSkills: [
              {
                skillName: 'GitHub CoPilot',
                alt: 'GitHub CoPilot icon',
                src: IconGitHubCoPilot,
              },
              {
                skillName: 'GitHub actions',
                alt: 'GitHub actions icon',
                src: IconGitHubActions,
              },
            ]
          },
          {
            skillName: 'HTML5',
            skillClass: 'fab fa-html5 text-skills-html',
          },
          {
            skillName: 'CSS3',
            src: IconCSS3,
            subSkills: [
              {
                skillName: 'SASS',
                src: IconSass,
              },
              {
                skillName: 'less',
                src: IconLess,
              },
              {
                skillName: 'Tailwindcss',
                alt: 'tailwind css icon',
                src: IconTailwindcss,
              },
            ]
          },
          {
            skillName: 'Firebase',
            alt: 'google firebase icon',
            src: IconFirebase,
          },
          {
            skillName: 'Docker',
            alt: 'docker icon',
            src: IconDocker,
          },

          {
            skillName: 'OpenAI',
            alt: 'OpenAI icon',
            src: IconOpenAI,
          },
          {
            skillName: 'Jenkins',
            alt: 'Jenkins icon',
            src: IconJenkins,
          },
          {
            skillName: 'Java',
            alt: 'Java icon',
            src: IconJava,
          },
          {
            skillName: 'Google GeminiAI',
            alt: 'Google GeminiAI icon',
            src: IconGoogleGeminiAI,
          },
          {
            skillName: 'CloudFlare',
            alt: 'CloudFlare icon',
            src: IconCloudFlare,
          },
          {
            skillName: 'AWS',
            alt: 'AWS icon',
            src: IconAWS,
            subSkills: [
                {
                skillName: 'AWS Secrets Manager',
                alt: 'AWS Secrets Manager icon',
                src: IconAWSSecretsManager,
              },
              {
                skillName: 'AWS Lambda',
                alt: 'AWS Lambda icon',
                src: IconAWSLambda,
              },
              {
                skillName: 'AWS Amplify',
                alt: 'AWS Amplify icon',
                src: IconAWSAmplify,
              },
              {
                skillName: 'AWS SQS',
                alt: 'AWS SQS icon',
                src: IconAWSSQS,
              },
              {
                skillName: 'AWS S3',
                alt: 'AWS S3 icon',
                src: IconAWSs3,
              },
              {
                skillName: 'AWS EC2',
                alt: 'AWS EC2 icon',
                src: IconAWSEC2,
              },
              {
                skillName: 'AWS DynamoDB',
                alt: 'AWS DynamoDB icon',
                src: IconAWSDynamoDB,
              },
              {
                skillName: 'AWS ACM',
                alt: 'AWS ACM icon',
                src: IconAWSACM,
              },
              {
                skillName: 'AWS API Gateway',
                alt: 'AWS API Gateway icon',
                src: IconAWSAPIGateway,
              },
              {
                skillName: 'AWS CloudFormation',
                alt: 'AWS CloudFormation icon',
                src: IconAWSCloudFormation,
              },
              {
                skillName: 'AWS CloudFront',
                alt: 'AWS CloudFront icon',
                src: IconAWSCloudFront,
              },
              {
                skillName: 'AWS CloudWatch',
                alt: 'AWS CloudWatch icon',
                src: IconAWSCloudWatch,
              },
              {
                skillName: 'AWS EventBridge',
                alt: 'AWS EventBridge icon',
                src: IconAWSEventBridge,
              },
              {
                skillName: 'AWS IAM',
                alt: 'AWS IAM icon',
                src: IconAWSIAM,
              },
              {
                skillName: 'AWS RDS',
                alt: 'AWS RDS icon',
                src: IconAWSRDS,
              },
              {
                skillName: 'AWS SES',
                alt: 'AWS SES icon',
                src: IconAWSES,
              },
            ]
          },
          {
            skillName: 'Responsive design',
            skillClass: 'fas fa-mobile-alt text-skills-respDesign',
          },
          {
            skillName: 'Accessibility',
            skillClass: 'fas fa-universal-access text-skills-a11y',
          },
          {
            skillName: 'Working in a team',
            skillClass: 'far fa-handshake text-skills-pairedProgramming',
          },
          {
            skillName: 'Vue.js',
            skillClass: 'fab fa-vuejs text-skills-vuejs',
          },
          {
            skillName: 'Node.js',
            skillClass: 'fab fa-node-js text-skills-nodejs',
          },
          {
            skillName: 'TypeScript',
            skillClass: 'devicon-typescript-plain colored',
          },
          {
            skillName: 'Redux',
            skillClass: 'devicon-redux-original colored',
          },
        ],
        mastering: [
          {
            skillName: 'AWS',
            alt: 'AWS icon',
            src: IconAWS,
          },
        ],
      },
      projects: {
        exploreSpace: {
          key: 'exploreSpace',
          name: 'Explore Space',
          info: 'The team project built on jQuery is now rebuilt on React. With NASA API, this app lets user find media of the selected date, Mars photos taken by a rover and other space data.',
          bgImage: 'exploreSpace.png',
          category: ['legacy'],
          liveLink: 'https://illia16.github.io/spaceApp/',
          codeLink: 'https://github.com/Illia16/spaceApp',
        },
        toDoApp: {
          key: 'toDoApp',
          name: 'To Do App',
          info: 'A multilanguage app that allows user to log in via Google-Authentication or continue as anonymous. The user can add/remove items in the list stored in the database.',
          bgImage: 'toDoApp.png',
          category: ['legacy'],
          liveLink: 'https://illia16.github.io/toDoApp/',
          codeLink: 'https://github.com/Illia16/toDoApp',
        },
        starWarsExplorer: {
          key: 'starWarsExplorer',
          name: 'Star Wars Explorer',
          info: 'See the information about Star Wars characters, planets, movies. Built with React, Redux, Material UI as a styling framework.',
          bgImage: 'starWarsExplorer.jpg',
          category: ['legacy'],
          liveLink: 'https://illia16.github.io/star-wars-explorer/',
          codeLink: 'https://github.com/Illia16/star-wars-explorer',
        },
        findMovie: {
          key: 'findMovie',
          name: 'Find a movie',
          info: 'Find a movie based on genre(s) and/or release year from The Movie Database API. With Firebase database, save the movies that you have watched.',
          bgImage: 'findMovie.png',
          category: ['legacy'],
          liveLink: 'https://illia16.github.io/find-a-movie/',
          codeLink: 'https://github.com/Illia16/find-a-movie',
        },
        mealGenerator: {
          key: 'mealGenerator',
          name: 'Meal Generator',
          info: 'Virtually cook meals, add your own ingridients and meals with any ingridients specified.',
          bgImage: 'mealGenerator.png',
          category: ['legacy'],
          liveLink: 'https://illia16.github.io/MealGenerator/',
          codeLink: 'https://github.com/Illia16/MealGenerator',
        },
        boatPSD: {
          key: 'boatPSD',
          name: 'Boat Ride Adventures',
          info: 'A multipage website PDS conversion.',
          bgImage: 'boatPSD.png',
          category: ['legacy'],
          liveLink: 'https://illia16.github.io/BoatRideAdventuresPSD/',
          codeLink: 'https://illia16.github.io/BoatRideAdventuresPSD/',
        },
        bagsPSD: {
          key: 'bagsPSD',
          name: 'Galass Handbags',
          info: 'A single page PDS conversion using only floats.',
          bgImage: 'bagsPSD.png',
          category: ['legacy'],
          liveLink: 'https://illia16.github.io/galass-handbags-PSD/',
          codeLink: 'https://github.com/Illia16/galass-handbags-PSD',
        },
        languageApp: {
          key: 'languageApp',
          name: 'Language app',
          info: 'Nuxt/Vue/Typescript for FrontEnd. AWS CDK/AWS/OpenAI for Backend. <br/> (message me for testing-user credentials)',
          bgImage: 'languageApp.png',
          category: ['featured', 'all'],
          liveLink: 'https://languageapp.illusha.net',
          codeLink: 'https://github.com/Illia16/language-app',
        },
        puzzle15Game: {
          key: 'puzzle15Game',
          name: '15 puzzle game',
          info: 'React/Next JS. AWS for backend (API Gateway, Lambda function, DynamoDB)',
          bgImage: 'puzzle15Game.png',
          category: ['featured', 'all'],
          liveLink: 'https://15puzzle-one.vercel.app',
          codeLink: 'https://github.com/Illia16/15puzzle',
        },
        puzzle15GameJava: {
          key: 'puzzle15GameJava',
          name: '15 puzzle game (Java)',
          info: 'Java. AWS for backend (API Gateway, Lambda function, DynamoDB)',
          bgImage: 'puzzle15Game-java.png',
          category: ['java', 'all'],
          liveLink: null,
          codeLink: 'https://github.com/Illia16/15puzzle/tree/java',
        },
        imagesAI: {
          key: 'imagesAI',
          name: 'Images AI',
          info: 'Generate, edit images with OpenAI and GeminiAI apis.',
          bgImage: 'imagesAI.png',
          category: ['AI', 'featured', 'all'],
          liveLink: null,
          codeLink: 'https://github.com/Illia16/ai-research',
        },
        mazeGame: {
          key: 'mazeGame',
          name: 'Maze game',
          info: 'Nuxt/Vue/Typescript maze game build with recursive backtracking algorithm.',
          bgImage: 'mazeGame.png',
          category: ['all'],
          liveLink: 'https://d100hj1nnes4j9.cloudfront.net',
          codeLink: 'https://github.com/Illia16/maze',
        },
        templatesBackend: {
          key: 'templatesBackend',
          name: 'Backend templates using various technologies and languages.',
          info: 'AWS CDK JavaScript/Python',
          bgImage: 'templatesBackend.png',
          category: ['featured', 'all'],
          liveLink: null,
          codeLink: 'https://github.com/Illia16/templates-backend',
        },
      },
      activeProjects: 'featured',
      actionsMade: 0,
    }
  },
  methods: {
    toggleNav: function() {
      this.actionsMade += 1;
      this.navOpen = !this.navOpen;
    },
    toggleProjects: function(val) {
      this.actionsMade += 1;
      this.activeProjects = val;      
    },
  },
  computed: {
    disableScroll() {
      return this.navOpen;
    },
    // sort without sorting subSkills
    // sortedSkills() {
    //   return {
    //     current: this.skills.current.sort((a, b) => a.skillName.localeCompare(b.skillName)),
    //     mastering: this.skills.mastering.sort((a, b) => a.skillName.localeCompare(b.skillName)),
    //   }
    // },
    sortedSkills() {
      const sortSkills = (skills) => {
        return skills
          .map(skill => ({
            ...skill,
            subSkills: skill.subSkills ? sortSkills(skill.subSkills) : undefined, // Recursively sort subSkills
          }))
          .sort((a, b) => a.skillName.localeCompare(b.skillName))
      }

      return {
        current: sortSkills(this.skills.current),
        mastering: sortSkills(this.skills.mastering),
      }
    }
  },
  watch: {
    disableScroll(navOpen) {
      const focusDisableOnOtherElement = document.querySelectorAll('#about a, #projects a, #projects button, #contact a, #contact input, #contact button, textarea');
      let documentScroll = document.documentElement.style;

      if (navOpen) {
        documentScroll.overflow = "hidden";
        for (const element of focusDisableOnOtherElement) {
          element.tabIndex = '-1';
        }
      } else {
        documentScroll.overflow = "auto";
        for (const element of focusDisableOnOtherElement) {
          element.tabIndex = '0';
        }
      }
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
