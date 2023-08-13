import React, { useState } from "react";
import DefaultForm from "src/components/Forms/DefaultForm";
// import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { HrTag } from "src/constants/ResponsiveClassName";
import MuiTableComponet from "src/components/Table/Mui/MuiTableComponet";
import IconButton from "src/components/Button/IconButtonComponent";
import ModalContainer from "src/components/Modal/ModalContainer";
import SelectInput from "src/components/Input/Select/SelectInput";
import CardContainer from "src/components/Card/CardContainer";
import RadioButton from "src/components/Input/Radio/RadioButton";
import DefaultInput from "src/components/Input/TextField/DefaultInput";

const columns = [
    { id: "benefit", label: "Benefit" },
    { id: "benefitPercentage", label: "Benefit  %" },
    {
        id: "StartDate",
        label: "Start date",
        align: "right",
        format: "population",
    },
    {
        id: "endDate",
        label: "End Date",
        align: "right",
        format: "population",
    },
    {
        id: "action",
        label: "Action",
        align: "right",
        format: "population",
    },
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
        action: "",
    },
    {
        id: 3,
        benefit: "Italy",
        benefitPercentage: "IT",
        StartDate: 60483973,
        endDate: 301340,
        action: "",
    },
    // ... Add other rows ...
];

const fields = [
    {
        name: "schemeType",
        label: "Scheme Type",
        type: "select",
        options: [{ label: "1", value: "1" }],
        required: true,
        heading: "Scheme Type",
        placeholder: "Enter Type",
    },
    {
        name: "schemeCode",
        label: "Scheme Code",
        type: "text",
        required: true,
        heading: "Scheme Type",
        placeholder: "Enter Type",
    },
    {
        name: "nameOfScheme",
        label: "Name of the Scheme",
        type: "text",
        required: true,
        heading: "Scheme Type",
        placeholder: "Enter Type",
    },
    {
        name: "shortDescription",
        label: "Short Description",
        type: "text",
        required: true,
        heading: "Scheme Type",
        placeholder: "Enter Type",
    },
    {
        name: "schemeEffectiveStartDate",
        label: "Scheme Effective Start Date",
        type: "text",
        required: true,
        heading: "Scheme Type",
        placeholder: "Enter Type",
    },
    {
        name: "schemeEffectiveEndDate",
        label: "Scheme Effective End Date",
        type: "text",
        required: true,
        heading: "Scheme Type",
        placeholder: "Enter Type",
    },
    {
        name: "maxLoanAmountProject",
        label: "Maximum Loan Amount/Project",
        type: "text",
        required: true,
        heading: "Project Details",
    },
    {
        name: "maximumNoOfProject",
        label: "Maximum no. of Project",
        type: "text",
        required: true,
        heading: "Project Details",
    },
    {
        name: "maximumNoOfLgdLocation",
        label: "Maximum no. of LGD location",
        type: "text",
        required: true,
        heading: "Project Details",
    },
    {
        name: "collateralRequired",
        label: "Collateral Required",
        type: "select",
        options: [{ label: "1", value: "1" }],
        required: true,
        heading: "Project Details",
    },
    {
        name: "cgtmsecover",
        label: "CGTMSE Cover",
        type: "select",
        options: [{ label: "1", value: "1" }],
        required: true,
        heading: "Project Details",
    },
    {
        name: "coverageUptoAmount",
        label: "Coverage upto amount",
        type: "select",
        options: [{ label: "1", value: "1" }],
        required: true,
        heading: "Project Details",
    },
    {
        name: "typeOfBenefits",
        label: "Type of Benefits",
        type: "select",
        options: [{ label: "1", value: "1" }],
        required: true,
        heading: "Benefits under the Scheme",
    },
    {
        name: "maximumROI",
        label: "Maximum ROI%",
        type: "text",
        required: true,
        heading: "Benefits under the Scheme",
    },
    {
        name: "maximumCapAmountOfBenefits",
        label: "Maximum CapAmount; if any",
        type: "text",
        required: true,
        heading: "Benefits under the Scheme",
    },
    {
        name: "maximumLoanTenureIncludingMorotorium",
        label: "Maximum Loan Tenure(in months)",
        type: "text",
        required: true,
        heading: "Benefits under the Scheme",
    },
    {
        name: "benefitsEffectiveStartDate",
        label: "Benefits Effective Start Date",
        type: "text",
        required: true,
        heading: "Benefits under the Scheme",
    },
    {
        name: "benefitsEffectiveEndDate",
        label: "Benefits Effective End Date",
        type: "text",
        required: true,
        heading: "Benefits under the Scheme",
    },
    {
        name: "Comment",
        label: "Comment",
        type: "textarea",
        required: true,
        heading: "",
    },
    {
        name: "uploadNotification",
        label: "Upload Notification",
        type: "file",
        required: true,
        heading: "",
    },
];
const headings = [
    "Scheme Type",
    "Project Details",
    "Benefits under the Scheme",
    "",
];
const Index = () => {
    const [showAddModal, setshowAddModal] = useState(false);
    const [benefitsFormData, setbenefitsFormData] = useState({
        typesOfBenefits: "",
        benefitPercentage: "",
        startDate: "",
        endDate: "",
        convergenceWithOtherScheme: false,
        schemeCode: ""
    });
    const [showViewModal, setshowViewModal] = useState(false);

    const handleBenefitsFormData = (e) => {
        const { name, value } = e.target;
        setbenefitsFormData({ ...benefitsFormData, [name]: value });
    };

    const updateConvergence = (value) => {
        setbenefitsFormData({
            ...benefitsFormData,
            ["convergenceWithOtherScheme"]: value,
        });
    };

    const handleAddModalChange = () => {
        setshowAddModal(!showAddModal);
    };
    const handleViewModalChange = () => {
        setshowViewModal(!showViewModal);
    };

    // eslint-disable-next-line no-unused-vars
    const [schemeFormData, setSchemeFormData] = useState({});

    const handleChange = (data) => {
        setSchemeFormData(data);
    };

    const handleSubmit = () => {
        console.log("success");
    };

    function SubHeading(item) {
        return (
            <div className="mr-5 m-2 m-sm-10 text-primary font-bold">{item}</div>
        );
    }

    function componentWrapAdd(title, input) {
        return (
            <div className="w-full p-2 py-5 px-10">
                <Grid spacing={1} container>
                    <Grid item xs={12} sm={12}>
                        {/* Types of benefits */}
                        <div>{title}</div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {/* Use SelectInput here */}
                        {input}
                    </Grid>
                </Grid>
            </div>
        );
    }
    function componentWrapView(title, content) {
        return (
            <div className="w-full px-10 py-5">
                <Grid spacing={10} container>
                    <Grid item xs={12} sm={4}>
                        <span className="font-bold">{title}</span>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        :
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {content}
                    </Grid>
                </Grid>
            </div>
        );
    }

    function addBenefitsModal() {
        return (
            <>
                <ModalContainer
                    responsiveWidth
                    className="mt-5 "
                    title="Benefits"
                    showModal={showAddModal}
                    handleModal={handleAddModalChange}
                >
                    {componentWrapAdd(
                        "Type of Benefits",
                        <SelectInput
                            name="typesOfBenefits"
                            label="Type of Benefits"
                            options={[{ label: "1", value: "1" }]}
                            onChange={handleBenefitsFormData}
                        />,
                    )}
                    {componentWrapAdd(
                        "Benefit %",
                        <SelectInput
                            name="benefitPercentage"
                            label="Benefits %"
                            options={[{ label: "1", value: "1" }]}
                            onChange={handleBenefitsFormData}
                        />,
                    )}
                    {componentWrapAdd(
                        "Start Date",
                        <SelectInput
                            name="startDate"
                            label="Start date"
                            options={[{ label: "1", value: "1" }]}
                            onChange={handleBenefitsFormData}
                        />,
                    )}
                    {componentWrapAdd(
                        "End Date",
                        <SelectInput
                            name="endDate"
                            label="End date"
                            options={[{ label: "1", value: "1" }]}
                            onChange={handleBenefitsFormData}
                        />,
                    )}
                    <div className="flex justify-end">
                        <IconButton
                            label={"Add"}
                            className="btn-outline-primary w-[100px] mt-5"
                            onChange={handleBenefitsFormData}
                        />
                    </div>
                </ModalContainer>
            </>
        );
    }
    function viewBenefitsModal() {
        return (
            <>
                <ModalContainer
                    responsiveWidth
                    className="mt-5 "
                    title="Benefits"
                    showModal={showViewModal}
                    handleModal={handleViewModalChange}
                >
                    {componentWrapView("Type of Benefits", "Benefits")}
                    {componentWrapView("Benefit %", "4%")}
                    {componentWrapView("Start Date", "10-11-2023")}
                    {componentWrapView("End Date", "10-11-2023")}
                </ModalContainer>
            </>
        );
    }

    return (
        <div>
            {console.log(schemeFormData)}
            <main className="flex flex-col w-full bg-gray-100 overflow-x-hidden overflow-y-auto mb-14">
                <div className="flex w-full mx-auto px-6 py-8">
                    <div className="flex flex-col w-full h-full text-gray-900 text-xl ">
                        <div className="px-2 md:px-5">
                            <div>
                                <div className="flex w-full">
                                    <div className="w-full block rounded-lg shadow-lg bg-white">
                                        <DefaultForm
                                            onChange={handleChange}
                                            onSubmit={handleSubmit}
                                            fields={fields}
                                            headings={headings}
                                            title="Create"
                                        >
                                            <Grid item xs={12} sm={5}>
                                                <div className="ml-2 flex justify-between items-center mr-10">
                                                    {SubHeading("Benefits")}
                                                    <br />
                                                    <IconButton
                                                        label={"Add"}
                                                        className="btn-outline-primary w-[100px]"
                                                        // icon={icon}
                                                        onClick={handleAddModalChange}
                                                    />
                                                </div>
                                                <HrTag />
                                                <div
                                                    style={{ height: "15rem", width: "100%" }}
                                                    className="ag-theme-alpine ml-5"
                                                >
                                                    <MuiTableComponet
                                                        onView={handleViewModalChange}
                                                        rows={rows}
                                                        columns={columns}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={5}>
                                                <Grid container>
                                                    <Grid item sm={4}>
                                                        <span className="ml-5">
                                                            Convergence with other scheme
                                                        </span>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <RadioButton
                                                            row
                                                            name="convergenceOption"
                                                            onChange={updateConvergence}
                                                            value={benefitsFormData.convergenceWithOtherScheme.toString()}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {
                                                benefitsFormData.convergenceWithOtherScheme && <div className="ml-5 w-1/4" >
                                                    <DefaultInput name="schemeCode" label="Scheme Code" placeholder="Enter Code" value={benefitsFormData.schemeCode} onChange={handleBenefitsFormData} />
                                                </div>
                                            }
                                        </DefaultForm>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {addBenefitsModal()}
            {viewBenefitsModal()}
        </div>
    );
};

export default Index;
