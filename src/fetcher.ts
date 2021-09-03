import Fitbit from "./fitbit";
import Cache from "./cache";
import Credential from "./credential";

const fetch = (credential: Credential, cache: Cache, fitbit: Fitbit) => {
    return Promise.all([
        fitbit.getLastHeartRate(credential).then((value) => { cache.heartrate = `${value} bpm`}),
        fitbit.getTotalMiles(credential).then((value) => {  cache.miles = `${value} mi` }),
        fitbit.getCaloriesBurned(credential).then((value) => { cache.calories = `${value} kcal` }),
        fitbit.getTotalFloors(credential).then((value) => { cache.floors = `${value} 階` }),
        fitbit.getSleepTime(credential).then((value) => { cache.sleep = value })
    ])
}

export default fetch