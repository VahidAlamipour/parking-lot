//#region imports
import React, { useState, useEffect } from 'react';
import {
    VIEW_MODE, FORM_MODE, FORM_MODE_TITLE, MESSAGE_TYPE,
    PAYMENT_METHOD_ENUM
} from '../repository/constants';
import parkingLot from '../repository/parking';
//#endregion




function FormBase({ setView, formMode, setNewMessage, refreshRecords }) {
    //#region States
    const [barcode, setBarcode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(0);
    //#endregion

    //#region functions
    const primaryFunction = () => {
        try {
            switch (formMode) {
                case FORM_MODE.calculatePrice:
                    const price = parkingLot.calculatePrice(barcode);
                    setNewMessage({ message: price, type: MESSAGE_TYPE.success });
                    return;
                case FORM_MODE.payTicket:
                    const payTicketResult = parkingLot.payTicket(barcode, paymentMethod);
                    setNewMessage({ message: payTicketResult, type: MESSAGE_TYPE.success });
                    return;
                case FORM_MODE.exitParking:
                    const exitResult = parkingLot.getTicketState(barcode);
                    if (exitResult)
                        setNewMessage({ message: 'Gate is open, By 👋🏻', type: MESSAGE_TYPE.success });
                    refreshRecords();

                    return;
            }
        } catch (error) {
            setNewMessage({ message: error.message, type: MESSAGE_TYPE.error });
        }

    }
    const title = () => {
        switch (formMode) {
            case FORM_MODE.calculatePrice:
                return FORM_MODE_TITLE.calculatePrice;
            case FORM_MODE.payTicket:
                return FORM_MODE_TITLE.payTicket;
            case FORM_MODE.exitParking:
                return FORM_MODE_TITLE.exitParking;
        }
    }
    //#endregion 

    //#region UI block
    return (
        <div className='form_base'>
            <header className='my-5'>
                <h2 className="display-6">{title()}</h2>
            </header>
            <section>
                <div className='row'>
                    <div className='col'>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Barcode"
                                onChange={(event) => setBarcode(event.target.value)} />
                        </div>
                    </div>
                    {formMode === FORM_MODE.payTicket &&
                        <div className='col'>
                            <div className="input-group mb-3">
                                <select className="custom-select form-control"
                                    onChange={(event) => setPaymentMethod(event.target.value)}>
                                    {PAYMENT_METHOD_ENUM && PAYMENT_METHOD_ENUM
                                        .map((element, index) => <option key={index} value={index}>{element}</option>)}
                                </select>
                            </div>
                        </div>}
                </div>
            </section>
            <footer className='mt-5'>
                <button type="button" className="btn btn-primary mx-5"
                    onClick={primaryFunction}>{title()}</button>
                <button type="button" className="btn btn-light"
                    onClick={() => setView({
                        mode: VIEW_MODE.list,
                        formMode: undefined
                    })}>👈🏼 back</button>
            </footer>

        </div>
    )
    //#endregion
}
export default FormBase;