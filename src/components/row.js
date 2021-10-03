import React from 'react';


function Row({ record,index }) {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{record.barcode}</td>
            <td>{record.entranceTime}</td>
            <td>{record.paid ? '✅' : '✖️'}</td>
        </tr>
    )
}
export default Row;