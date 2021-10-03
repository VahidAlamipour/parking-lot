//#region imports
import React from 'react';
import { VIEW_MODE, FORM_MODE } from '../repository/constants';
//#endregion


function Board({ emptySpaces, message, newTickt, setView }) {
    return (
        <div className='parking_borad'>
            <h2 className='display-3 tex'>Parking lot</h2>
            <div>
                <span className='display-6'>Free spaces: </span><span className='display-6'>{emptySpaces}</span>
            </div>
            <div className='my-5'>
                <button type="button" className="btn btn-success btn-lg" onClick={newTickt}>New Ticket</button>
            </div>
            <div className='row justify-content-center'>
                <div className='col'>
                    <button type="button" className="btn btn-outline-primary"
                        onClick={() => setView({
                            mode: VIEW_MODE.form,
                            formMode: FORM_MODE.calculatePrice
                        })}>Calculate Price</button>
                </div>
                <div className='col'><button type="button" className="btn btn-outline-primary"
                    onClick={() => setView({
                        mode: VIEW_MODE.form,
                        formMode: FORM_MODE.payTicket
                    })}>
                    Pay Ticket</button>
                </div>
                <div className='col'><button type="button" className="btn btn-outline-primary"
                    onClick={() => setView({
                        mode: VIEW_MODE.form,
                        formMode: FORM_MODE.exitParking
                    })}>
                    Exit Parking</button></div>
            </div>
            <div className='parking_borad__summery mt-5'>
                {message.message && <div className={`alert alert-${message.type}`} role="alert">
                    {message.message}
                </div>}
            </div>
        </div>
    )
}
export default Board;