import React from 'react';

const TableHeadings = ({ headings, colsLength, colSpan }) => {
    return (
        <div className={`grid lg:grid-cols-${colsLength} p-2 text-black bg-[#D2ECFA] font-semibold text-lg `}>
            {headings.map((item) => (
                <div key={item} className={`col-span-${colSpan} text-center`}>
                    {item}
                </div>
            ))}
        </div>
    );
};

export default TableHeadings;
