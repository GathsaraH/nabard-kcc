import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineUser } from "react-icons/ai"
import { AiFillEdit, AiOutlineMail, AiOutlinePlus } from "react-icons/ai"
import { SlCalender } from "react-icons/sl"
import { ImLocation } from "react-icons/im"
import { MdOutlineCall } from "react-icons/md"
import RolesAccordion from 'src/components/Accordian/RolesAccordion';
import DefaultButtonComponent from 'src/components/Button/DefaultButtonComponent'
import Image from 'next/image'


const items = [
    {
        id: 1,
        title: 'Bank Module',
        content: [{ id: 1, value: "Create" }, { id: 2, value: "Update" }, { id: 3, value: "Delete" }, { id: 4, value: "Update" }],
    },
    {
        id: 2,
        title: 'User Module',
        content: [{ id: 1, value: "Create" }, { id: 2, value: "Update" }, { id: 3, value: "Delete" }, { id: 4, value: "Update" }],
    }
];

const Index = () => {
    const [checkBoxesData, setcheckBoxesData] = useState(items)




    return (
        <div>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-4">
                    {profileCard()}
                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5 flex items-center flex-start">
                            <h5 className="text-lg font-semibold dark:text-white-light">Roles & Permissions</h5>
                            <DefaultButtonComponent className="ml-5" icon={<AiOutlinePlus />} />
                        </div>
                        <div className="mb-5">
                            <RolesAccordion items={checkBoxesData} />
                        </div>
                        <DefaultButtonComponent title="Update" />
                    </div>

                </div>
            </div>
        </div>
    )

    function profileCard() {
        return <div className="panel">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Profile</h5>
                <Link href="/users/user-account-settings" className="btn btn-primary rounded-full p-2 ltr:ml-auto rtl:mr-auto">
                    <AiFillEdit />
                </Link>
            </div>
            <div className="mb-5">
                <div className="flex flex-col items-center justify-center">
                    <Image
                        width={96}
                        height={96}
                        src="/assets/images/images.png" alt="img" className="mb-5 h-24 w-24 rounded-full  object-cover" />
                    <p className="text-xl font-semibold text-primary">Jimmy Turner</p>
                </div>
                <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                    <li className="flex items-center gap-2">
                        <AiOutlineUser />
                        Branch Manager
                    </li>
                    <li className="flex items-center gap-2">
                        <SlCalender />
                        Jan 20, 1989
                    </li>
                    <li className="flex items-center gap-2">
                        <ImLocation />
                        New York, USA
                    </li>
                    <li>
                        <button className="flex items-center gap-2">
                            <AiOutlineMail />
                            <span className="truncate text-primary">jimmy@gmail.com</span>
                        </button>
                    </li>
                    <li className="flex items-center gap-2">
                        <MdOutlineCall />
                        <span className="whitespace-nowrap" dir="ltr">
                            +1 (530) 555-12121
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    }
}

export default Index