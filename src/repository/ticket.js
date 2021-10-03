//#region imports
import moment from 'moment';
import {
    DATE_TIME_FORMAT, NUM_BARCODE_DIGITS,
    NUM_SECOND_PART_OF_BARCODE, ERROR_PAYMENT_METHOD_NOT_VALID,
    PAYMENT_METHOD_ENUM, ERROR_PAYMENT_NOT_Done
} from './constants';
//#endregion

class Ticket {
    constructor(index = 0, entranceTime = undefined, prebarcode = undefined,
        paymentMethod = undefined, paymentTime = undefined) {
        this._index = index;
        this._entranceTime = entranceTime ? new moment(entranceTime, DATE_TIME_FORMAT) : new moment();
        this._prebarcode = prebarcode || _createPreBarcode();
        this._paymentMethod = paymentMethod;
        this._paymentTime = paymentTime ? new moment(paymentTime, DATE_TIME_FORMAT) : undefined;
    }
    set paymentMethod(value) {
        if (value && value > 0 && value < PAYMENT_METHOD_ENUM.length) {
            this._paymentMethod = value;
        } else {
            throw new Error(ERROR_PAYMENT_METHOD_NOT_VALID);
        }
    }
    get paymentMethod() {
        const _payMeth = PAYMENT_METHOD_ENUM[this._paymentMethod]
        if (_payMeth)
            return PAYMENT_METHOD_ENUM[this._paymentMethod];
        else
            throw new Error(ERROR_PAYMENT_NOT_Done);
    }
    get paid() {
        return this._paymentMethod !== undefined && this.paymentTimeStillValid();
    }
    get barcode() {
        return this._prebarcode + _indexToString(this._index)
    }
    get entranceTime() {
        return this._entranceTime.format(DATE_TIME_FORMAT);
    }
    set paymentTime(value) {
        this._paymentTime = value;
    }
    get paymentTime() {
        return this._paymentTime ? this._paymentTime.format(DATE_TIME_FORMAT) : undefined;
    }
    paymentTimeStillValid() {
        const minOfEnterance = this._entranceTime.minute();
        const minOfPayment = this._paymentTime.minute();
        let addedMins = minOfEnterance < minOfPayment ?
            (60 - (minOfPayment - minOfEnterance)) :
            minOfEnterance - minOfPayment;
        addedMins += 15;
        const paymentDeadline = this._paymentTime.clone();
        paymentDeadline.add(addedMins, 'minutes');
        if (moment().isBefore(paymentDeadline))
            return true
        return false;
    }
}

export default Ticket;

//#region Utilities
const _indexToString = (index) => {
    const addedZeroSting = '0';
    return index.toString().length >= NUM_SECOND_PART_OF_BARCODE ? index.toString() : addedZeroSting + index.toString();
}
const _createPreBarcode = () => {
    let preBarcode = "";
    const zeroSting = '0';
    const finalDigitsForFirstPart = 99999999999999;
    const numberOfFirstPartOfBarcode = NUM_BARCODE_DIGITS - NUM_SECOND_PART_OF_BARCODE;
    let number = Math.floor(Math.random() * finalDigitsForFirstPart);
    let less = numberOfFirstPartOfBarcode - number.toString().length;
    for (let index = 0; index < less; index++) {
        preBarcode += zeroSting;
    }
    return preBarcode + number;
}
//#endregion