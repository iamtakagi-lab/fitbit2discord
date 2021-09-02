import Koa from 'koa'
import Router from 'koa-router';
import Credential from './credential';
import Fitbit from './fitbit';
import authorize from './routes/authorize';
import callback from './routes/callback';

export default (credential: Credential, fitbit: Fitbit) => {
    const router = new Router().all('/authorize', authorize(credential, fitbit)).all('/callback', callback(credential, fitbit))
    new Koa()
        .use(router.allowedMethods())
        .use(router.routes())
        .listen(Number(process.env.PORT), () => {
        console.log("Fitbit authorization server started on : " + process.env.PORT);
    });
}