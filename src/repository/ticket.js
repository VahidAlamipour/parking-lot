//#region imports
import moment from 'moment';
import { DATE_TIME_FORMAT, NUM_BARCODE_DIGITS, NUM_SECOND_PART_OF_BARCODE } from './constants';
//#endregion

class Ticket {
    constructor(index = 0, time = undefined, prebarcode = undefined) {
        this._index = index;
        this._entranceTime = time ? new moment(time, DATE_TIME_FORMAT) : new moment();
        this._prebarcode = prebarcode || _createPreBarcode();
    }
    get barcode() {
        return this._prebarcode + _indexToString(this._index)
    }
    get entranceTime() {
        return this._entranceTime.format(DATE_TIME_FORMAT);
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