import Fitbit from "./fitbit";
import Cache from "./cache";
import Credential from "./credential";

let i = 0

const fetch = (credential: Credential, cache: Cache, fitbit: Fitbit) => {
    switch (i) {
        case 0:
            fitbit.getLastHeartRate(credential).then((value) => { if (cache.heartrate != value) cache.heartrate = value })
            i++
            break
        case 1:
            fitbit.getTotalMiles(credential).then((value) => {  if (cache.miles != value) cache.miles = value; })
            i++
            break
        case 2:
            fitbit.getCaloriesBurned(credential).then((value) => {
                if(cache.calories != value) cache.calories = value })
            i++
            break
        case 3:
            fitbit.getTotalFloors(credential).then((value) => {
                if (cache.floors != value)
                    cache.floors = value;
            })
            i++
            break
        case 4:
            fitbit.getSleepTime(credential).then((value) => {
                if(cache.sleep != value)
                    cache.sleep = value;
            })
            i = 0
            break
        default:
            fitbit.getLastHeartRate(credential).then((value) => {
                if (cache.heartrate != value)
                    cache.heartrate = value;
            })
            i = 1
    }
}

export default fetch