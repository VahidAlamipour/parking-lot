
//#region imports
import Ticket from './ticket';
import {
    PARKING_CAPACITY, LOCAL_STORAGE_KEY,
    ERROR_PARKING_FULL, NUM_SECOND_PART_OF_BARCODE,
    ERROR_BARCODE_NOT_VALID, RECEIPT_ISSUER, ERROR_PAYMENT_NOT_Done,
    ERROR_PAYMENT_IS_EXPIRED
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
                    const ticket = new Ticket(element.index, element.entranceTime,
                        element.preBarcode, element.paymentMethod, element.paymentTime);
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
        try {
            const ticket = _getTicketFromList(barcode);
            if (ticket.paid) {
                return RECEIPT_ISSUER(ticket);
            }
            const EntryTime = ticket._paymentTime || ticket._entranceTime;
            const different = moment().diff(EntryTime);
            const diffMin = Math.ceil(different / 1000 / 60 / 60);
            const cost = diffMin * 2;
            return `€ ${cost}`;
        } catch (error) {
            throw error;
        }

    }
    payTicket(barcode, paymentMethod) {
        try {
            const ticket = _getTicketFromList(barcode);
            ticket.paymentMethod = paymentMethod;
            ticket.paymentTime = moment();
            _saveRecordsToLocalStorage();
            return `Ticket ${ticket.barcode} marked is paid`
        } catch (error) {
            throw error;
        }
    }
    getTicketState(barcode) {
        try {
            let ticket = _getTicketFromList(barcode);
            if (!ticket.paid)
                throw new Error(ERROR_PAYMENT_NOT_Done);
            if (!ticket.paymentTimeStillValid())
                throw new Error(ERROR_PAYMENT_IS_EXPIRED);
            this.records[ticket._index] = undefined;
            return true;
        } catch (error) {
            throw error;
        }
    }
    getFreeSpaces() {
        let counter = 0;
        this.records.forEach(item => {
            if (item === undefined) {
                counter++;
            }
        });
        return counter;
    }
}

//#region exports
const parkingLot = new Parking();
export default parkingLot;
//#endregion


//#region Utilities

const _getFirstEmptyCell = () => {
    const emptyCell = parkingLot.records.findIndex(cell => cell === undefined);
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
            preBarcode: record._prebarcode,
            paymentMethod: record._paymentMethod,
            paymentTime: record.paymentTime
        }
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jsonRecords));
}
const _getTicketFromList = (barcode) => {
    try {
        const subStr = barcode.slice(-NUM_SECOND_PART_OF_BARCODE);
        const index = parseInt(subStr);
        const ticket = parkingLot.records[index];
        if (ticket.barcode === barcode)
            return parkingLot.records[index];
        else
            throw new Error();
    } catch (error) {
        throw new Error(ERROR_BARCODE_NOT_VALID);
    }
}
//#endregion