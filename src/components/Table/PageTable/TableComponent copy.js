import React from 'react'

const TableComponent = ({ headings,subheading, contents, colsLength,subheadingength, colSpan,rowSpan, Link = false, onClick }) => {
  return (
    <div>
        <>
           <div className={`grid lg:grid-cols-${colsLength} p-2 text-black bg-[#D2ECFA] font-semibold text-lg `}>
            {headings.map((item,idx) => (
                idx == 0?(
                    <>
                    <div key={item} className={`row-span-${rowSpan} text-center`}>
                    {item}
                </div>
                    </>
                ):(
                    <>
                    <div key={item} className={`col-span-${colSpan} text-center`}>
                    {item}
                </div>
                    </>
                )

                
                
            ))}
            </div>
            <div className={`grid lg:grid-cols-${subheadingength} p-2 text-black bg-[#D2ECFA] font-semibold text-lg `}>
            {subheading.map((item,idx) => (
                
                    <div key={item}>
                    {item}
                </div>
                
                
            ))}
            </div>
        <div className={`grid lg:grid-cols-${colsLength} p-2 text-black bg-[#F6F4F4] text-lg text-left`}>
            {contents.map((item, index) => (
                <div key={item} className={`col-span-${colSpan} text-center`}>
                    {
                        Link ? index === 0 ? <button onClick={onClick && onClick} className='text-primary text-bold' >{item}</button> : item : item
                    }
                </div>
            ))}
        </div>
        </>
    </div>
  )
}

export default TableComponent