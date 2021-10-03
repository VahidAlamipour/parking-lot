//#region imports
import React, { useEffect, useState } from "react";
import List from './list';
import Board from './board'
import FormBase from "./formBase";
import parkingLot from '../repository/parking';
import { MESSAGE_TYPE, VIEW_MODE, FORM_MODE } from '../repository/constants';
//#endregion


function App() {
    //#region States
    const [records, setRecords] = useState([]);
    const [emptySpaces, setEmptySpaces] = useState(0);
    const [message, setNewMessage] = useState({ message: '', type: 'success' });
    const [view, setView] = useState({ mode: VIEW_MODE.list, formMode: undefined });
    //#endregion
    //#region functions
    const refreshRecords = () => {
        setRecords(parkingLot.filledSpotes());
        setEmptySpaces(parkingLot.getFreeSpaces());
        setView({ mode: VIEW_MODE.list, formMode: undefined });
    }
    useEffect(() => {
        refreshRecords();
    }, []);
    const newTickt = () => {
        try {
            const barcode = parkingLot.getTicket();
            setNewMessage({ message: barcode, type: MESSAGE_TYPE.success });
            refreshRecords();
        } catch (error) {
            setNewMessage({ message: error.message, type: MESSAGE_TYPE.error });
        }
    }
    const viewMaker = () => {
        switch (view.mode) {
            case VIEW_MODE.form:
                return <FormBase setView={setView} formMode={view.formMode}
                    setNewMessage={setNewMessage} refreshRecords={refreshRecords} />
            default:
                return <List records={records} />
        }
        return
    }
    //#endregion
    //#region UI Block
    return (
        <div className='container text-center'>
            <header></header>
            <div className='row'>
                <div className='col'>
                    {viewMaker()}
                </div>
                <div className='col'>
                    <Board emptySpaces={emptySpaces}
                        message={message}
                        newTickt={newTickt}
                        setView={setView} />
                </div>
            </div>
        </div>
    )
    //#endregion
}

export default App