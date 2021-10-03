export const PARKING_CAPACITY = 54;
export const LOCAL_STORAGE_KEY = 'RECORDS';
export const DATE_TIME_FORMAT = 'YYYY M D H:m';
export const NUM_BARCODE_DIGITS = 16;
export const NUM_SECOND_PART_OF_BARCODE = 2;
export const NUM_PAYMENT_METHOD = 3;
export const PAYMENT_METHOD_ENUM = Object.freeze(["credit card", "debit card", "cash"]);
export const RECEIPT_ISSUER = (ticket)=>`Price 0
ticket barcode ${ticket.barcode} is paid.
date and time of payment : ${ticket.paymentTime}
payment method: ${ticket.paymentMethod} 
`;
export const ERROR_PARKING_FULL = 'Parking lot is full. Sorry!';
export const ERROR_BARCODE_NOT_VALID = 'Barcode is not valid!';
export const ERROR_PAYMENT_METHOD_NOT_VALID = 'Payment method is not valid!';
export const ERROR_PAYMENT_NOT_Done = 'Payment is not done yet!';
export const ERROR_PAYMENT_IS_EXPIRED = 'Your check-out time has expired. Please pay again.';
export const MESSAGE_TYPE = Object.freeze({success:'success',error:'danger'});
export const VIEW_MODE = Object.freeze({list:1,form:2});
export const FORM_MODE = Object.freeze({calculatePrice:1,payTicket:2,exitParking:3});
export const FORM_MODE_TITLE = Object.freeze({calculatePrice:"Calculate Price",payTicket:"Pay Ticket",exitParking:"Exit Parking"});





