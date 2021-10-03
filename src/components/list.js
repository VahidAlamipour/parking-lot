//#region imports
import React from 'react';
import Row from './row';
//#endregion

function List({ records }) {
    return (
        <section className='space_list'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Barcode</th>
                        <th scope="col">Entrance time</th>
                        <th scope="col">Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {records && records.map((item,index) => (
                        <Row key={index} index={index} record={item}/>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
export default List;