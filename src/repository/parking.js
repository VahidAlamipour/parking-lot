
//#region imports
import Ticket from './ticket';
import { PARKING_CAPACITY, LOCAL_STORAGE_KEY, ERROR_PARKING_FULL } from './constants';
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
            console.log(error.message);
        }
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