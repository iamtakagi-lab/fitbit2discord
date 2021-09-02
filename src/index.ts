import boot from "./boot";
import Cache from "./cache";
import Credential from "./credential";
import Fitbit from "./fitbit";

export const credential = new Credential()
export const cache = new Cache()
export const fitbit = new Fitbit()

boot(credential, cache, fitbit)