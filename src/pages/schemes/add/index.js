    import React, { useState, useEffect } from 'react';
    import Autocomplete from "@mui/material/Autocomplete";
    import Box from "@mui/material/Box";
    import TextField from "@mui/material/TextField";
    import { IconButton } from "@mui/material";
    import DeleteIcon from "@mui/icons-material/Delete";
    import AddIcon from "@mui/icons-material/Add";
    import TextareaAutosize from "@mui/material/TextareaAutosize";
    import * as yup from "yup";
    import { useTranslation } from "react-i18next";
    import { useDispatch, useSelector } from "react-redux";
    import { useRouter } from "next/router";
    import Tippy from '@tippyjs/react';
    import { MdArrowBackIos, MdKeyboardArrowDown } from 'react-icons/md';
    import { ResponsiveClassName } from 'src/constants/ResponsiveClassName';
    import { ColorConstants } from 'src/constants/ColorConstants';
    import DefaultForm from 'src/components/Forms/DefaultForm';

    const Index = () => {
        const IntialInputFields = {
            id: "",
            schemeType: "",
            schemeCode: "",
        };
        const { t } = useTranslation();
        const router = useRouter();
        const [schemeFormData, setSchemeFormData] = useState({})

        const handleChange = (data) => {
            setSchemeFormData(data)
        }


        const fields = [
            {name: "schemeType", label: "Scheme Type", type: "text", required: true, heading: 'Scheme Type', placeholder: 'Enter Type' },
            {name: "name", label: "name", type: "text", required: true, heading: 'Project Details' },
        ]
        const headings = [
            "Scheme Type",
            "Project Details",
        ]

        const handleSubmit = () => {
            console.log("success")
    // alert("called")
        }

        return (
            <div>
        {console.log(JSON.stringify(schemeFormData))}

                <main className="flex flex-col w-full bg-gray-100 overflow-x-hidden overflow-y-auto mb-14">
                    <div className="flex w-full mx-auto px-6 py-8">
                        <div className="flex flex-col w-full h-full text-gray-900 text-xl ">
                            <div className="px-2 md:px-5">
                                <div>
                                    <div className="flex w-full">
                                        <div className="w-full block rounded-lg shadow-lg bg-white">
                                        <DefaultForm onChange={handleChange} onSubmit={handleSubmit} fields={fields} headings={headings} title="Create" >
                                        </DefaultForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        )
    }

    export default Index