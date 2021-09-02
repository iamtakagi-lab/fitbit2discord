import Fitbit from "../fitbit"
import Credential from "../credential"
import Cache from "../cache"
import token from "./token"
import notify from "./notify"
import fetch from "./fetch"

export default (credential: Credential, cache: Cache, fitbit: Fitbit) => {
    return Promise.all([
        token(credential, fitbit),
        fetch(credential, cache, fitbit),
        notify(credential, cache, fitbit)
    ])
}