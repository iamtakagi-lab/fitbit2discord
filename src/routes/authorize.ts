import { Context } from 'koa'
import Credential from "../credential";
import Fitbit from "../fitbit";

export default (credential: Credential, fitbit: Fitbit) => (ctx: Context) => {
    if(credential.accessToken != null && credential.accessToken.length > 0 && credential.refreshToken != null && credential.refreshToken.length > 0) {
        return ctx.body = "認証済みです"
    }

    ctx.redirect(fitbit.getAuthorizeUrl());
}