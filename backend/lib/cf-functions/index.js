function handler(event) {
    let request = event.request;
    const headers = request.headers;

    // Redirect if the request is from the CloudFront domain
    if (['dr7wqovee5zly.cloudfront.net'].includes(headers.host.value)) {
        const customDomain = "portfolio.illusha.net";

        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: `https://${customDomain}${request.uri}` }
            }
        };
    };

    request.uri = request.uri.replace(/^(.*?)(\/?[^.\/]*\.[^.\/]*)?\/?$/, function($0, $1, $2) {
        return $1 + ($2 ? $2 : "/index.html");
    });

    return request;
}
