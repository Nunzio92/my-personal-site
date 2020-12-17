import moment from 'moment-mini';

export class Utility {


    /**
     * Detect if the browser is IE and return the version number
     * @returns version of IE or 0, if browser is not Internet Explorer
     */
    public static checkVersionIE(): number {
        const ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
        // Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        const msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        const trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            const rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        const edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return 0;
    }

    public static isObject(item: any): boolean {
        return (item && typeof item === 'object' && item !== {} && !Array.isArray(item));
    }

    /**
     * Check if val is a String
     * @param val input value
     * @returns true if val is a String
     */
    public static isString(val: any): boolean {
        return (!!val && (typeof val === 'string' || val instanceof String));
    }

    public static formatDate(input: any, format?: string, addAmount?: any, unit?: 'y' | 'M' | 'w' | 'd'): string| undefined {
        if (!input || (typeof input === 'string' && input.length === 0)) {
            return input;
        } else {
            const momentDate = typeof input === 'number' ?
                moment(input) : moment(input, ['YYYYMMDD', 'DD/MM/YYYY', 'YYYY-MM-DDTHH:mm:ss.SSS', 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'YYYY-MM-DD HH:mm:ss.SSSSSS']);
            const offsetUtc = moment.parseZone(momentDate.format()).utcOffset();
            momentDate.utc().add(offsetUtc, 'm');

            if (momentDate.isValid()) {
                if (!!addAmount && !!unit) {
                    momentDate.add(+addAmount, unit);
                }
                return format ? momentDate.format(format) : momentDate.toISOString();
            } else {
                return undefined;
            }
        }
    }

    /**
     * Check the validity of expired from JWT
     * @param exp expired date number from JWT
     * @returns true if JWT expired is after now, false otherwise
     */
    public static checkValidSess(exp: number): boolean {
        return !!exp ? Date.now() < exp * 1000 : false;
    }

    /**
     * Parse the location.search query params and trasform into JSON object
     * @param search location.serarch or string that contains query params (eg: &key1=value1)
     * @returns resulting parsed JSON object from search input param
     */
    public static parseSearchParams(search: string): any {
        const jsonQuery = Object.create(null);
        search
            .slice(1)
            .split('&')
            .forEach(e => {
                const obj = e.split('=');
                jsonQuery[obj[0]] = obj[1];
            });
        return jsonQuery;
    }


    // public static setMyDatePicker(dateIn: IMyDate | string | number): IMyDateModel {
    //     let date = new Date(Utility.formatDate(dateIn));
    //     const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    //     date = new Date(date.getTime() + userTimezoneOffset);
    //
    //     return {
    //         date: {
    //             year: date.getFullYear(),
    //             month: date.getMonth() + 1,
    //             day: date.getDate()
    //         },
    //         jsdate: date
    //     } as IMyDateModel;
    // }
    //
    //
    // public static todayDateMyDatePicker(inclusive?: boolean): IMyDate {
    //     const mDate = moment();
    //     let todayAsMyDate = Utility.setMyDatePicker(mDate.format());
    //     if (inclusive) {
    //         mDate.subtract(1, 'd');
    //         todayAsMyDate = Utility.setMyDatePicker(mDate.format());
    //     }
    //
    //     return todayAsMyDate.date as IMyDate;
    // }

    /**
     * Utility method that permit to scroll wherever you want into vertical flow of current page
     * @param yCord desired vertical position to scroll
     * @param animationType animation to execute (DEFAULT=smooth) [not supported into IE]
     */
    public static scrollTo(yCord: number, animationType: ScrollBehavior = 'smooth'): void {
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: yCord,
                behavior: animationType
            });
        } else {
            window.scrollTo(0, yCord);
        }
    }


    public static safeUrlTrim(possibleUrl: string): string {
        return Utility.isString(possibleUrl) && possibleUrl.length > 0 ? possibleUrl.substring(possibleUrl.indexOf('http')) : possibleUrl;
    }
}
