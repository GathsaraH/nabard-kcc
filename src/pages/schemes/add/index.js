import React, { useState } from 'react';
import DefaultForm from 'src/components/Forms/DefaultForm';
// import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Grid } from '@mui/material';
import { HrTag } from 'src/constants/ResponsiveClassName';
import MuiTableComponet from 'src/components/Table/Mui/MuiTableComponet';
import IconButton from 'src/components/Button/IconButtonComponent';
import ModalContainer from 'src/components/Modal/ModalContainer';
import SelectInput from 'src/components/Input/Select/SelectInput';

const columns = [
    { id: "benefit", label: "Benefit" },
    { id: "benefitPercentage", label: "Benefit  %" },
    {
        id: "StartDate",
        label: "Start date",
        align: "right",
        format: "population"
    },
    {
        id: "endDate",
        label: "End Date",
        align: "right",
        format: "population"
    },
    {
        id: "action",
        label: "Action",
        align: "right",
        format: "population"
    }
];

const rows = [
    {
        id: 1,
        benefit: "India",
        benefitPercentage: "IN",
        StartDate: 1324171354,
        endDate: 3287263,
        action: "asd",
    },
    {
        id: 2,
        benefit: "China",
        benefitPercentage: "CN",
        StartDate: 1403500365,
        endDate: 9596961,
        action: ""

    },
    {
        id: 3,
        benefit: "Italy",
        benefitPercentage: "IT",
        StartDate: 60483973,
        endDate: 301340,
        action: ""

    }
    // ... Add other rows ...
];

const Index = () => {
    const [showAddModal, setshowAddModal] = useState(false)

    const handleAddModalChange = () => {
        setshowAddModal(!showAddModal)
    }

    // eslint-disable-next-line no-unused-vars
    const [schemeFormData, setSchemeFormData] = useState({})

    const handleChange = (data) => {
        setSchemeFormData(data)
    }


    const fields = [
        { name: "schemeType", label: "Scheme Type", type: "select", options: [{ label: "1", value: "1" }], required: true, heading: 'Scheme Type', placeholder: 'Enter Type' },
        { name: "schemeCode", label: "Scheme Code", type: "text", required: true, heading: 'Scheme Type', placeholder: 'Enter Type' },
        { name: "nameOfScheme", label: "Name of the Scheme", type: "text", required: true, heading: 'Scheme Type', placeholder: 'Enter Type' },
        { name: "shortDescription", label: "Short Description", type: "text", required: true, heading: 'Scheme Type', placeholder: 'Enter Type' },
        { name: "schemeEffectiveStartDate", label: "Scheme Effective Start Date", type: "text", required: true, heading: 'Scheme Type', placeholder: 'Enter Type' },
        { name: "schemeEffectiveEndDate", label: "Scheme Effective End Date", type: "text", required: true, heading: 'Scheme Type', placeholder: 'Enter Type' },
        { name: "maxLoanAmountProject", label: "Maximum Loan Amount/Project", type: "text", required: true, heading: 'Project Details' },
        { name: "maximumNoOfProject", label: "Maximum no. of Project", type: "text", required: true, heading: 'Project Details' },
        { name: "maximumNoOfLgdLocation", label: "Maximum no. of LGD location", type: "text", required: true, heading: 'Project Details' },
        { name: "collateralRequired", label: "Collateral Required", type: "select", options: [{ label: "1", value: "1" }], required: true, heading: 'Project Details' },
        { name: "cgtmsecover", label: "CGTMSE Cover", type: "select", options: [{ label: "1", value: "1" }], required: true, heading: 'Project Details' },
        { name: "coverageUptoAmount", label: "Coverage upto amount", type: "select", options: [{ label: "1", value: "1" }], required: true, heading: 'Project Details' },
        { name: "typeOfBenefits", label: "Type of Benefits", type: "select", options: [{ label: "1", value: "1" }], required: true, heading: 'Benefits under the Scheme' },
        { name: "maximumROI", label: "Maximum ROI%", type: "text", required: true, heading: 'Benefits under the Scheme' },
        { name: "maximumCapAmountOfBenefits", label: "Maximum CapAmount of Benefits; if any", type: "text", required: true, heading: 'Benefits under the Scheme' },
        { name: "maximumLoanTenureIncludingMorotorium", label: "Maximum Loan Tenure; including Morotorium ( in months)", type: "text", required: true, heading: 'Benefits under the Scheme' },
        { name: "benefitsEffectiveStartDate", label: "Benefits Effective Start Date", type: "text", required: true, heading: 'Benefits under the Scheme' },
        { name: "benefitsEffectiveEndDate", label: "Benefits Effective End Date", type: "text", required: true, heading: 'Benefits under the Scheme' },
        { name: "Comment", label: "Comment", type: "textarea", required: true, heading: '' },
        { name: "uploadNotification", label: "Upload Notification", type: "file", required: true, heading: '' },
    ]
    const headings = [
        "Scheme Type",
        "Project Details",
        "Benefits under the Scheme",
        "",
    ]

    const handleSubmit = () => {
        console.log("success")
    }



    function SubHeading(item) {
        return <div className="mr-5 m-2 m-sm-10 text-primary font-bold">
            {item}
        </div>
    }

    function addBenefitsModal(){
        return <>
            <ModalContainer title="Benefits" showModal={showAddModal} handleModal={handleAddModalChange} >
                <Grid container >
                <Grid xs={12} sm={12} item>Types of benefits</Grid>
                <Grid xs={12} sm={12} item>
                   <SelectInput label="Type of Benefits" options={[{label:"1",value:"1"}]} />
                </Grid>
                </Grid>
            </ModalContainer>
        </>
    }

    return (
        <div>
            <main className="flex flex-col w-full bg-gray-100 overflow-x-hidden overflow-y-auto mb-14">
                <div className="flex w-full mx-auto px-6 py-8">
                    <div className="flex flex-col w-full h-full text-gray-900 text-xl ">
                        <div className="px-2 md:px-5">
                            <div>
                                <div className="flex w-full">
                                    <div className="w-full block rounded-lg shadow-lg bg-white">
                                        <DefaultForm onChange={handleChange} onSubmit={handleSubmit} fields={fields} headings={headings} title="Create" >
                                            <Grid item xs={12} sm={5} >
                                            <div className="ml-2 flex justify-between items-center mr-10">
                                                    {SubHeading("Benefits")}
                                                    <br />
                                                    <IconButton
                                                        label={'Add'}
                                                        className="btn-outline-primary w-[100px]"
                                                        // icon={icon}
                                                        onClick={handleAddModalChange}
                                                    />
                                                </div>
                                                <HrTag />
                                                <div style={{ height: '15rem', width: '100%' }} className="ag-theme-alpine ml-5">
                                                    <MuiTableComponet rows={rows} columns={columns} />
                                                </div>
                                            </Grid>
                                        </DefaultForm>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
           { addBenefitsModal()}
        </div>

    )
}

export default Index