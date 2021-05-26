import * as moment from 'moment';

export class DateCalculation {

    static getAgeOfVehicle(manufacturedDate: string): string {

        let makeDate: Date = new Date(manufacturedDate);
        let currentDate: Date = new Date();

        let makeMomemt: moment.Moment = moment([makeDate.getUTCFullYear(), makeDate.getUTCMonth(), makeDate.getUTCDate()]);
        let currentMoment: moment.Moment = moment([currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()]);

        let durationDiff: moment.Duration = moment.duration(currentMoment.diff(makeMomemt));

        let years: number = durationDiff.years();
        let months: number = durationDiff.months();
        let days: number = durationDiff.days();

        return `${years} Years ${months} Months and ${days} Days`;

    }

}