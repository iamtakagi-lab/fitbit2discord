import Fitbit from "./fitbit";
import Cache from "./cache";
import Credential from "./credential";

const fetch = (credential: Credential, cache: Cache, fitbit: Fitbit) => {
    return Promise.all([
        fitbit.getLastHeartRate(credential).then((value) => {
            if(cache.heartrate != value)
                cache.heartrate = value;
        }),
        fitbit.getTotalMiles(credential).then((value) => {
            if(cache.miles != value)
                cache.miles = value;
        }),
        fitbit.getCaloriesBurned(credential).then((value) => {
            if(cache.calories != value)
                cache.calories = value;
        }),
        fitbit.getTotalFloors(credential).then((value) => {
            if (cache.floors != value)
                cache.floors = value;
        }),
        fitbit.getSleepTime(credential).then((value) => {
            if(cache.sleep != value)
                cache.sleep = value;
        }),    
    ])
}

export default fetch
