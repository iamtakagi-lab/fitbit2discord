import Cache from "./cache";
import Credential from "./credential";
import Fitbit from "./fitbit";
import server from "./server";
import tasks from "./tasks";

const boot = (credential: Credential, cache: Cache, fitbit: Fitbit) => {
    tasks(credential, cache, fitbit).then(() => {
        server(credential, fitbit)
    })
}

export default boot