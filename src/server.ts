import Koa from 'koa'
import Router from 'koa-router';
import Credential from './credential';
import Fitbit from './fitbit';
import authorize from './routes/authorize';
import callback from './routes/callback';
import fs from 'fs'
import https from 'https'
import env from './env';

var key = fs.readFileSync(__dirname + '/certs/server.key');
var cert = fs.readFileSync(__dirname + '/certs/server.crt');
var options = {
    key: key,
    cert: cert
};

export default (credential: Credential, fitbit: Fitbit) => {
    const router = new Router().all('/authorize', authorize(credential, fitbit)).all('/callback', callback(credential, fitbit))
    const koa = new Koa()
            .use(router.allowedMethods())
            .use(router.routes())

    https.createServer(options, koa.callback()).listen(env.PORT, () => {
        console.log("Fitbit authorization server started on : " + env.PORT);
    })
}