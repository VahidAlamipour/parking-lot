
//#region imports
import Ticket from './ticket';
import {
    PARKING_CAPACITY, LOCAL_STORAGE_KEY,
    ERROR_PARKING_FULL, NUM_SECOND_PART_OF_BARCODE,
    ERROR_BARCODE_NOT_VALID
} from './constants';
import moment from 'moment';

//#endregion


class Parking {
    constructor() {
        this.records = new Array(PARKING_CAPACITY);
        let jsonRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (jsonRecords) jsonRecords = JSON.parse(jsonRecords);
        if (jsonRecords && jsonRecords.length) {
            jsonRecords.forEach(element => {
                if (element) {
                    const ticket = new Ticket(element.index, element.entranceTime, element.preBarcode);
                    this.records[element.index] = ticket;
                }
            });
        }

    }
    getTicket() {
        try {
            const firtEmptyCell = _getFirstEmptyCell();
            const ticket = new Ticket(firtEmptyCell);
            this.records[firtEmptyCell] = ticket;
            _saveRecordsToLocalStorage();
            return ticket.barcode;
        } catch (error) {
            throw error;
        }
    }

    calculatePrice(barcode) {
        const subStr = barcode.slice(-NUM_SECOND_PART_OF_BARCODE);
        const index = parseInt(subStr);
        const ticket = this.records[index];
        if(ticket && ticket.barcode === barcode){
            const different = moment().diff(ticket._entranceTime);
            const diffMin = Math.ceil(different / 1000 / 60 / 60);
            const cost = diffMin * 2;
            return `€ ${cost}`
        }
        throw new Error(ERROR_BARCODE_NOT_VALID);
    }


}

//#region exports
const parkingLot = new Parking();
export default parkingLot;
//#endregion


//#region Utilities

const _getFirstEmptyCell = () => {
    const emptyCell = parkingLot.records.findIndex(cell => cell == undefined);
    if (emptyCell >= 0)
        return emptyCell;
    else
        throw new Error(ERROR_PARKING_FULL);
}
const _saveRecordsToLocalStorage = () => {
    const jsonRecords = parkingLot.records.map((record) => {
        return {
            index: record._index,
            entranceTime: record.entranceTime,
            preBarcode: record._prebarcode
        }
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jsonRecords));
}

//#endregion