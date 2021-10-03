import parkingLot from "./parking";

window.getTicket = () => parkingLot.getTicket();

window.calculatePrice = (barcode)=> parkingLot.calculatePrice(barcode);

window.payTicket = (barcode,paymentTicket)=> parkingLot.payTicket(barcode,paymentTicket);

window.getTicketState = (barcode)=>parkingLot.getTicketState(barcode);

