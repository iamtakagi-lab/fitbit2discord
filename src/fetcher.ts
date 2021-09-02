import Fitbit from "./fitbit";
import Cache from "./cache";
import Credential from "./credential";

const fetch = (credential: Credential, cache: Cache, fitbit: Fitbit) => {
    return Promise.all([
        fitbit.getLastHeartRate(credential).then((value) => {
            let lastHeartRate = cache.heartrate;
            let hrDiff = value - lastHeartRate;
            let sign = (hrDiff > 0 ? "\u2795" : "\u2796");
            if (cache.heartrate != value)
                cache.heartrate = value;
        }),
        fitbit.getTotalMiles(credential).then((value) => {
            let lastMiles = cache.miles;
            let milesDiff = value - lastMiles;
            let sign = (milesDiff > 0 ? "\u2795" : "\u2796");
            if (cache.miles != value)
                cache.miles = value;
        }),
        fitbit.getCaloriesBurned(credential).then((value) => {
            let lastCalories = cache.calories;
            let caloriesDiff = value - lastCalories;
            let sign = (caloriesDiff > 0 ? "\u2795" : "\u2796");
            if (cache.calories != value)
                cache.calories = value;
        }),
        fitbit.getTotalFloors(credential).then((value) => {
            let lastFloors = cache.floors;
            let floorsDiff = value - lastFloors;
            let sign = (floorsDiff > 0 ? "\u2795" : "\u2796");
            if (cache.floors != value)
                cache.floors = value;
        }),
        fitbit.getSleepTime(credential).then((value) => {
            cache.sleep = value;
        }),    
    ])
}

export default fetch