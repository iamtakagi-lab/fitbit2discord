import FitbitApiClient from "fitbit-node";
import Credential from './credential';
import env from './env';

import { getTimeRange, jsonMemSize } from './utils'

export default class Fitbit {

    private client: any

    constructor() {
        this.client = new FitbitApiClient({
            clientId: env.FITBIT_CLIENT_ID,
            clientSecret: env.FITBIT_CLIENT_SECRET,
            apiVersion: '1.2' // 1.2 (デフォルト)
        });
    }

    getAuthorizeUrl() {
        return this.client.getAuthorizeUrl('activity profile heartrate sleep', env.FITBIT_REDIRECT_URL)
    }

    getAccessToken(code: string) {
        return this.client.getAccessToken(code, env.FITBIT_REDIRECT_URL)
    }

    refreshAccessToken(accessToken: string, refreshToken: string, tokenExpireTime: number) {
        return this.client.refreshAccessToken(accessToken, refreshToken, tokenExpireTime)
    }

    async getLastHeartRate(credential: Credential) {
        let timeRanges = getTimeRange();
        return new Promise<number>((resolve) => {
            this.client.get("/activities/heart/date/today/1d/1sec/time/" + timeRanges.minTime + "/" + timeRanges.maxTime + ".json", credential.accessToken).then((results: any) => {
                console.log("Payload Size: " + jsonMemSize(results));
                let resultDataset = results[0]["activities-heart-intraday"]["dataset"];
                let result = resultDataset[resultDataset.length - 1];
                console.log(result)
                resolve(parseInt(result["value"]))
            }).catch((err: any) => {
                console.log("Failed to fetch dataset: " + err);
                resolve(0)
            });
        })

    }

    async getTotalMiles(credential: Credential) {
        return new Promise<number>((resolve) => {
            this.client.get("/activities/distance/date/today/1d.json", credential.accessToken).then((results: any) => {
                console.log("Payload Size: " + jsonMemSize(results));
                let result = results[0]['activities-distance'][0];
                console.log(result);
                let kilometers = parseFloat(result["value"]);
                let miles = kilometers * 0.62137;
                resolve(Number(miles.toFixed(2)))
            }).catch((err: any) => {
                console.log("Failed to fetch dataset: " + err);
                resolve(0)
            });
        })
    }

    getCaloriesBurned(credential: Credential) {
        return new Promise<number>((resolve) => {
            this.client.get("/activities/calories/date/today/1d.json", credential.accessToken).then((results: any) => {
                console.log("Payload Size: " + jsonMemSize(results));
                let result = results[0]['activities-calories'][0];
                console.log(result);
                resolve(parseInt(result["value"]))
            }).catch((err: any) => {
                console.log("Failed to fetch dataset: " + err);
                resolve(0)
            });
        })
    }

    getTotalFloors(credential: Credential) {
        return new Promise<number>((resolve) => {
            this.client.get("/activities/floors/date/today/1d.json", credential.accessToken).then((results: any) => {
                console.log("Payload Size: " + jsonMemSize(results));
                let result = results[0]['activities-floors'][0];
                console.log(result);
                resolve(parseInt(result["value"]))
            }).catch((err: any) => {
                console.log("Failed to fetch dataset: " + err);
                resolve(0)
            });
        })
    }

    getSleepTime(credential: Credential) {
        return new Promise<string>((resolve) => {

            let todayDateObj = new Date();

            let todaysDate = todayDateObj.getFullYear() + "-" + (todayDateObj.getMonth() + 1 < 10 ? "0" + (todayDateObj.getMonth() + 1) : todayDateObj.getMonth() + 1) + "-" + (todayDateObj.getDate() < 10 ? "0" + todayDateObj.getDate() : todayDateObj.getDate());

            let yestDateObj = new Date();
            yestDateObj.setDate(yestDateObj.getDate() - 1);

            let yestsDate = yestDateObj.getFullYear() + "-" + (yestDateObj.getMonth() + 1 < 10 ? "0" + (yestDateObj.getMonth() + 1) : yestDateObj.getMonth() + 1) + "-" + (yestDateObj.getDate() < 10 ? "0" + yestDateObj.getDate() : yestDateObj.getDate());
            this.client.get("/sleep/date/" + yestsDate + "/" + todaysDate + ".json", credential.accessToken).then((results: any) => {
                console.log("Payload Size: " + jsonMemSize(results));

                let result = results[0]["sleep"];
                if (result == null || result == "undefined") {
                    return resolve("0分")
                }

                let sleepData: any = {};
                for (let i = 0; i < result.length; i++) {
                    sleepData[result[i].dateOfSleep] = sleepData[result[i].dateOfSleep] || 0;
                    sleepData[result[i].dateOfSleep] += parseInt(result[i]["minutesAsleep"]);
                }

                let yestMinAsleep = 0;

                let todayMinAsleep = 0;
                for (let sleepDate in sleepData) {
                    if (sleepDate == todaysDate)
                        todayMinAsleep = sleepData[sleepDate];
                    else
                        yestMinAsleep = sleepData[sleepDate];
                }

                let yestMinAsleepDiff = todayMinAsleep - yestMinAsleep;

                let timeStr = "";

                let hoursSlept = Math.floor(todayMinAsleep / 60);

                let remainingMinutes = todayMinAsleep % 60;
                if (todayMinAsleep > 60)
                    timeStr += hoursSlept + "時間 " + remainingMinutes + "分";
                else
                    timeStr += todayMinAsleep + "分";

                let hoursSleptYest = Math.floor(yestMinAsleepDiff / 60);

                let remainingMinutesYest = yestMinAsleepDiff % 60;

                let sign = (yestMinAsleepDiff > 0 ? "\u2795" : "\u2796");
                if (yestMinAsleep > 60)
                    timeStr += " (" + sign + hoursSleptYest.toString().replace("-", "") + "時間 " + remainingMinutesYest.toString().replace("-", "") + "分" + ")";
                else
                    timeStr += " (" + sign + yestMinAsleep + "分" + ")";

                resolve(timeStr)
            }).catch((err: any) => {
                console.log("Failed to fetch dataset: " + err.stack);
                resolve("Null")
            });
        })
    }
}
