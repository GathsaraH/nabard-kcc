import React, { useMemo, useState } from 'react';
import DefaultForm from 'src/components/Forms/DefaultForm';
// import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Grid } from '@mui/material';
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import { HrTag } from 'src/constants/ResponsiveClassName';

const Index = () => {
    const [rowData] = useState([
        { name: 'Toyota', type: 'Celica', value: 35000 },
        { name: 'Ford', type: 'Mondeo', value: 32000 },
    ]);

    const [columnDefs] = useState([
        { field: 'name' },
        { field: 'type' },
        { field: 'value' },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
                <MenuItemComponent rowData={params.data} />
            ),
        },
    ]);

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

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
        };
    }, []);


    function SubHeading(item) {
        return <div className="mr-5 m-2 m-sm-10 text-primary font-bold">
            {item}
        </div>
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
                                            {/* <Grid item xs={12} sm={5} >
                                                <div className='ml-5' >
                                                    {SubHeading("Attributes")}
                                                    <HrTag />
                                                    <br />
                                                </div>
                                                <div style={{ height: '15rem', width: '80%' }} className="ag-theme-alpine ml-5">
                                                    <AgGridReact
                                                        rowSelection="multiple"
                                                        suppressRowClickSelection
                                                        columnDefs={columnDefs}
                                                        rowData={rowData}
                                                        defaultColDef={defaultColDef}
                                                    />
                                                </div>
                                            </Grid> */}
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