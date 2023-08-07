import Link from 'next/link'
import React from 'react'

const BreadCrumb = ({textOne,textTwo,href}) => {
  return (
    <ul className="flex space-x-2 rtl:space-x-reverse">
    <li>
      <Link href={href} className="text-primary hover:underline">
        {textOne}
      </Link>
    </li>
    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
      <span>{textTwo}</span>
    </li>
  </ul>
  )
}

export default BreadCrumb