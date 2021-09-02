import Credential from "../credential"
import Cache from "../cache"
import env from "../env"
import notify from "../notifier"
import fetch from "../fetcher"
import Fitbit from "../fitbit"

export default (credential: Credential, cache: Cache, fitbit: Fitbit) => {
    return setInterval(() => {
        if (
            credential.accessToken == null ||
            credential.refreshToken == null ||
            credential.accessToken.length <= 0 ||
            credential.refreshToken.length <= 0
        ) return

        fetch(credential, cache, fitbit).then(() => {
            env.DISCORD_WEBOOK_URLS.split(',').map(async (url) => {
                const splitUrl = url.split('/')
                const id = splitUrl[5]
                const token = splitUrl[6]
                await notify({ id, token }, cache)
            })
        })
    }, env.NOTIFY_DELAY_SECONDS * 1000)

}