import parkingLot from "./parking";

window.getTicket = () => parkingLot.getTicket();

window.calculatePrice = (barcode)=> parkingLot.calculatePrice(barcode);