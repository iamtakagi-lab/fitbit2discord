import Credential from "../credential"
import Cache from "../cache"
import env from "../env"
import notify from "../notifier"
import fetch from "../fetcher"
import Fitbit from "../fitbit"

export default (credential: Credential, cache: Cache, fitbit: Fitbit) => {
    return setInterval(() => {
        fetch(credential, cache, fitbit)
    }, env.FETCH_DELAY_SECONDS * 1000)
}