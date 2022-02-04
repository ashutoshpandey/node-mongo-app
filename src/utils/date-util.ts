import * as moment from 'moment-timezone';

export class DateUtil {
    constructor() {
    }

    pad(x: number) {
        if (x > 9)
            return x;
        else
            return '0' + x;
    }
}