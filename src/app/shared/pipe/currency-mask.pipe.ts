import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from 'rxjs/internal-compatibility';

@Pipe({
    name: 'currencyMask'
})
export class CurrencyMaskPipe implements PipeTransform {

    transform(value: any, decimalSeparator = ',', fractionSize = 2, prependSymbol = true): any {

        let [integer, fraction = ''] = (value || (isNumeric(value) ? '0' : '')).toString()
            .split(decimalSeparator);

        fraction = fractionSize > 0 && fraction.length > 0
            ? ',' + (fraction + '00').substring(0, fractionSize)
            : '';

        // const regexp = new RegExp('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\\.[0-9]{2})?$');
        const regexp = /^(\d+([,](\d+)?)?)$/;

        if (regexp.test(integer)) {
            integer = ('' + (+integer)).replace(new RegExp(/\B(?=(\d{3})+(?!\d))/, 'g'), '.');

            return (prependSymbol ? '€ ' : '') + integer + fraction;
        } else {
            return String(value || '');
        }

        // if (!!value) {
        //     let amount = '' + value;
        //     const splittedInput = amount.split(value.indexOf('.') > 0 && value.indexOf('€') === 0 ? ',' : '.');
        //     const decimal = splittedInput[1];
        //     amount = splittedInput[0] || amount;
        //
        //     if (amount.indexOf('€ ') > -1) {
        //         amount = amount.split('€ ')[1];
        //     }
        //     if (amount.indexOf('.') > -1) {
        //         amount = amount.split('.').join('');
        //     }
        //     if (amount.length > 3) {
        //         amount = amount.replace(/(?!^)(?=(\d{3})+($))/gm, '.');
        //     }
        //     if (amount.length > 0) {
        //         amount = '€ ' + amount;
        //         if (!!decimal) {
        //             amount = amount + ',' + decimal;
        //         }
        //     }
        //     return amount;
        // } else {
        //     return value;
        // }

    }
}
