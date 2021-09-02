import { Context } from 'koa'
import env from '../env';
import Credential from '../credential';
import Fitbit from '../fitbit';

export default (credential: Credential, fitbit: Fitbit) => (ctx: Context) => {
    const { code } = ctx.query

    if(!code || typeof code !== 'string') return

    fitbit.getAccessToken(code).then((result: { access_token: string, refresh_token: string }) => {
        Promise.all([
            credential.setAccessToken(result.access_token),
            credential.setRefreshToken(result.refresh_token),
            credential.save(),
        ]).then(() => {
            ctx.status = 301
            ctx.redirect(`${env.BASE_URL}/authorize`)
        })
    }).catch((err: any) => {
        ctx.status = err.status
    });
}