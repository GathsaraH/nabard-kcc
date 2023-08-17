import React from 'react';

const TableRow = ({ headings, colsLength, colSpan, Link = false, onClick }) => {
    return (
        <div className={`grid lg:grid-cols-${colsLength} p-2 text-black bg-[#F6F4F4] text-lg text-left`}>
            {headings.map((item, index) => (
                <div key={item} className={`col-span-${colSpan} text-center`}>
                    {
                        Link ? index === 0 ? <button onClick={onClick && onClick} className='text-primary text-bold' >{item}</button> : item : item
                    }
                </div>
            ))}
        </div>
    );
};

export default TableRow;
