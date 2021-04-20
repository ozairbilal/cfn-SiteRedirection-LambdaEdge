'use strict';
var banks_links = [
    '/referral',
    '/insurance-request'
    ]
  
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    function is_asset(uri){
        if (uri.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|otf|ttf|svg|eot|woff|woff2|css|js)$/)) 
        {console.log("in asset", uri);
            return true;}
        else return false;
    }
    if (banks_links.includes(request.uri) || request.uri.includes('/referral/') 
        || (headers.referer != undefined && headers.referer.includes('/referral/') && is_asset (request.uri))){
    
        console.log('Setting Origin to Referral Origin');
        request.origin = {
        custom: {
            domainName: 'referral.site2.org',
            port: 443,
            protocol: 'https',
            readTimeout: 20,
            keepaliveTimeout: 5,
            customHeaders: {},
            sslProtocols: ['TLSv1', 'TLSv1.1'],
            path: ''
            }
        };
        headers['host'] = [{key: 'host', value: 'referral.site2.org' }];
    }
    callback(null, request);
};
