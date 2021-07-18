import * as moment from 'moment';

export class DateCalculation {

    static getAgeOfVehicle(manufacturedDate: string): string {

        let makeDate: Date = new Date(manufacturedDate);
        let currentDate: Date = new Date();

        let makeMoment: moment.Moment = moment.utc(makeDate.toUTCString());
        let currentMoment: moment.Moment = moment.utc(currentDate.toUTCString());


        let years: number = currentMoment.diff(makeMoment, 'years');
        makeMoment.add(years, 'years');

        let months: number = currentMoment.diff(makeMoment, 'months');
        makeMoment.add(months, 'months');

        let days: number = currentMoment.diff(makeMoment, 'days');

        return `${years} Years ${months} Months and ${days} Days`;

    }

}