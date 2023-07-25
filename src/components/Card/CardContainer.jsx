import React from 'react'

const CardContainer = ({children}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-5">
    {/* className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" */}
    {children}
    </div>

  )
}

export default CardContainer