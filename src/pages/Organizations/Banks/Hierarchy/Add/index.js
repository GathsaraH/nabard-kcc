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
import { ResponsiveClassName } from "../../../../../constants/ResponsiveClassName";
import { ColorConstants } from 'src/constants/ColorConstants';
import Tippy from '@tippyjs/react';
import { MdArrowBackIos, MdKeyboardArrowDown } from 'react-icons/md';
import DefaultForm from 'src/components/Forms/DefaultForm';
const Index = () => {
  const IntialInputFields = {
    id: "",
    bankName: "",
    bankType: "",
    shortNameOfBank: "",
    address: "",
    state: "",
    district: "",
    subDistrict: "",
    Village: "",
    pincode: "",
    ename: "",
    userId: "",
    designation: "",
    email: "",
    cnumber: "",
    level2: "",
    level3: "",
    level4: "",
    pacs: "",
  };
  const InputFields = [
    {
      name: 'BankType',
      label: 'Type of Bank',
      type: 'select',
      required: true,
      heading: 'Bank Details', // Heading for the first new field
      options: [
        { label: 'Public Sector', value: 'Public Sector' },
        { label: 'Local Area Banks', value: 'Local Area Banks' },
      ],
    },
    {
      name: 'BankName',
      label: 'Bank Name',
      type: 'select',
      required: true,
      heading: 'Bank Details', // Heading for the second new field
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
    },
    {
      name: 'ShortName',
      label: 'Short Name',
      type: 'text',
      required: true,
      heading: 'Bank Details', // Heading for the third new field
    },
    {
      name: 'fileField',
      label: 'Upload File',
      type: 'file',
      required: true,
      heading: 'Bank Logo'
    },
    {
      name: 'Address',
      label: 'Address',
      type: 'textarea',
      required: true,
      heading: 'Address Details',
    },
    {
      name: 'State',
      label: 'State',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: 'Address Details',
      options: [
        { label: 'S1', value: 's1' },
        { label: 's2', value: 's2' },
      ],
    },
    {
      name: 'District',
      label: 'District',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: 'Address Details',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
    },
    {
      name: 'SubDistrict',
      label: 'Sub District',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: 'Address Details',
      options: [
        { label: 'Sub1', value: 'Sub1' },
        { label: 'Sub2', value: 'Sub2' },
      ],
    },
    {
      name: 'Village',
      label: 'Village',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: 'Address Details',
      options: [
        { label: 'V1', value: 'V1' },
        { label: 'V2', value: 'V2' },
      ],
    },
    {
      name: 'Pincode',
      label: 'Pincode',
      type: 'text',
      required: true,
      heading: 'Address Details',

    },
    {
      name: 'EmployeeName',
      label: 'Employee Name',
      type: 'text',
      required: true,
      heading: 'Super Admin Details',
    },
    {
      name: 'UserID',
      label: 'User ID',
      type: 'text',
      required: true,
      heading: 'Super Admin Details',
    },
    {
      name: 'Designation',
      label: 'Designation',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: 'Super Admin Details',
      options: [
        { label: 'D1', value: 'D1' },
        { label: 'D2', value: 'D2' },
      ],
    },
    {
      name: 'EmailID',
      label: 'Email ID',
      type: 'email',
      required: true,
      heading: 'Super Admin Details',
    },
    {
      name: 'ContactNumber',
      label: 'Contact Number',
      type: 'text',
      required: true,
      heading: 'Super Admin Details',
    },

  ]
  const formHeadings = [
    'Bank Details',
    'Bank Logo',
    'Address Details',
    'Super Admin Details',
    'Bank Hierarchy'
    // Add more headings as needed
  ];

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputFields, setInputFields] = useState([{ ...IntialInputFields }]);
  const [inputErrors, setInputErrors] = useState({});
  const [allBankTypeList, setAllBankTypeList] = useState([]);
  const [allBankNameList, setAllBankNameList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [subDistrictList, setSubDistrictList] = useState([]);
  const [VillageList, setVillageList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [bankType, setBankType] = useState(0);

  // adding hierarchy levels 
  const [inputFieldHierarchy, setInputFieldHierarchy] = useState([
    {
      level: 'Head Office',
      data: { level2: '', level3: '', level4: '' },
      inputErrors: { level2: '', level3: '', level4: '' },
    },
  ]);



  // Define a state to control whether to show the inputFieldHierarchy
  // const [showHierarchy, setShowHierarchy] = useState(false);
  // const showInputFieldHierarchy = () => {
  //   setShowHierarchy(true);
  // };

  // const hideInputFieldHierarchy = () => {
  //   setShowHierarchy(false);
  // };

  const InputObject = {
    label: "",
    name: "",
  };

  const [isPACS, setIsPACS] = useState("");
  // const onChangeInputSelect = (index, name, value) => {
  //   if (name === "cnumber" || name === "pincode") {
  //     value = value.replace(/\D/g, "");
  //   }
  //   if (
  //     value?.label === "State Co-Operative Banks" ||
  //     value?.label === "District Central Co-Operative Banks"
  //   ) {
  //     setIsPACS("PACS");
  //     setBankType(1);
  //   }

  //   if (inputErrors?.[name]) {
  //     let newtemp = { ...inputErrors };
  //     newtemp[name] = "";
  //     setInputErrors({ ...newtemp });
  //   }

  //   if (name === "bankType" || name === "bankName") {
  //     let isState = name === "bankType";
  //     let all = inputFields.map((item) => ({
  //       ...item,
  //       [name]: value,
  //       ...(isState && { bankName: { ...InputObject } }),
  //     }));
  //     setInputFields(all);

  //     return;
  //   }
  //   let temp = [...inputFields];

  //   temp[index][name] = value;
  //   setInputFields(temp);
  // };
  // const checkMobileNoIsExist = async (name, value) => {
  //   if (value.length == 10) {
  //     const mobileIsExist = await isExistMobileNoAPI(value);
  //     if (mobileIsExist.registerId) {
  //       let newtemp = { ...inputErrors };
  //       newtemp[name] = "Mobile no is already exist";
  //       setInputErrors({ ...newtemp });
  //     }
  //   }
  // };

  // let currentDate = new Date();
  // function generatePayloadHierarchy() {
  //   return inputFields.map((item) => ({
  //     bankNameId: item.bankName.value,
  //     levelTwo: item.level2,
  //     levelThree: item.level3,
  //     levelFour: item.level4,
  //     levelFifth: item.level5,
  //     levelSixth: item.pacs
  //   }));
  // }
  const mapInputFieldToErrorPayload = (item) => ({
    bankName: item.bankName?.value || "",
    bankType: item.bankType?.value || "",
    shortNameOfBank: item.shortNameOfBank || "",
    address: (item.address) || "",
    state: item.state?.value || "",
    district: item.district?.value || "",
    subDistrict: item.subDistrict?.value || "",
    pincode: item.pincode || "",
    ename: (item.ename) || "",
    userId: item.userId || "",
    designation: item.designation?.value || "",
    email: (item.email) || "",
    cnumber: item.cnumber || "",
    level2: (item.level2) || "",
    level3: (item.level3) || "",
    level4: (item.level4) || "",
    level5: (item.level5) || "",
    pacs: (item.pacs) || "",
  });
  const createErrorPayload = () => inputFields.map(mapInputFieldToErrorPayload);
  const IntialIField = {
    AssestId: "",
  };

  // const [inputFieldHierarchy, setInputFieldHierarchy] = useState([
  //   { ...IntialIField },
  // ]);
  // const addInputFieldHierarchy = () => {
  //   if (inputFieldHierarchy.length <= 5) {
  //     setInputFieldHierarchy([
  //       ...inputFieldHierarchy,
  //       {
  //         ...IntialIField,
  //       },
  //     ]);
  //   }
  // };

  // const removeInputFieldsHierarchy = () => {
  //   const rows = [...inputFieldHierarchy];
  //   rows.pop();
  //   if (inputFieldHierarchy.length == 5) {
  //     setInputFields([{ ...inputFields[0], level5: "" }]);
  //     setInputErrors([{ ...inputErrors, level5: "" }]);
  //   } else if (inputFieldHierarchy.length == 4) {
  //     setInputFields([{ ...inputFields[0], level4: "" }]);
  //     setInputErrors([{ ...inputErrors, level4: "" }]);
  //   } else if (inputFieldHierarchy.length == 3) {
  //     setInputFields([{ ...inputFields[0], level3: "" }]);
  //     setInputErrors([{ ...inputErrors, level3: "" }]);
  //   } else if (inputFieldHierarchy.length == 2) {
  //     setInputFields([{ ...inputFields[0], level2: "" }]);
  //     setInputErrors([{ ...inputErrors, level2: "" }]);
  //   }
  //   setInputFieldHierarchy(rows);
  // };
  // const checkValidation = async (data) => {
  //   let validateResult = await inputSchema
  //     .validate(data, {
  //       abortEarly: false,
  //     })
  //     .catch((err) => {
  //       return err;
  //     });

  //   let errors = {};
  //   let errorLength = 0;
  //   validateResult?.inner?.forEach((item) => {
  //     errors[item.path] = item.message;
  //     errorLength++;
  //   });
  //   if (isPACS != "") {
  //     delete errors.level2;
  //     delete errors.level3;
  //     delete errors.level4;
  //   } else {
  //     if (inputFieldHierarchy.length == 1) {
  //       delete errors.level2;
  //       delete errors.level3;
  //       delete errors.level4;
  //     } else if (inputFieldHierarchy.length == 2) {
  //       delete errors.level3;
  //       delete errors.level4;
  //     } else if (inputFieldHierarchy.length == 3) {
  //       delete errors.level4;
  //     }
  //     delete errors.pacs;
  //   }
  //   setInputErrors(errors);
  //   return Object.keys(errors).length > 0 ? false : true;
  // };
  // const inputSchema = yup.object().shape({
  //   bankName: yup.string().required("Bank name is required"),
  //   bankType: yup.string().required("Bank type is required"),
  //   designation: yup.string().required("Designation is required"),
  // });
  const onBackButton = () => {
    router.push("/Organizations/Banks");
  };

  function productSelection() {
    router.push("/Organizations/Banks");
  }
  const handleSubmit = (formData) => {
    // Process the form data when the form is submitted
    console.log(formData);
  };
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div>
      <main className="flex flex-col w-full bg-gray-100 overflow-x-hidden overflow-y-auto mb-14">
        <div className="flex w-full mx-auto px-6 py-8">
          <div className="flex flex-col w-full h-full text-gray-900 text-xl ">
            <div className="px-2 md:px-5">
              <div>
                <div className="flex w-full">
                  <div className="w-full block rounded-lg shadow-lg bg-white">
                    <div className='p-2'>
                      <div className="grid lg:grid-cols-10 flex items-center">
                        <button
                          onClick={() => router.back()}
                          type="button"
                          className="flex items-center  p-3 rounded text-sm w-24"
                        >
                          <span className="common-Font-Family ml-4">
                            <Tippy content="back">
                              <MdArrowBackIos size={20} />
                            </Tippy>
                          </span>
                        </button>
                        <div className="col-start-5 col-end-8">
                          <span className="heading-Font-Family" style={{ fontWeight: '700' }}>
                            {t("Add Bank Hierarchy")}
                          </span>
                        </div>

                      </div>
                    </div>

                    <div className="w-auto m-3">
                      <hr style={{ color: "#000000" }}></hr>
                    </div>
                    <DefaultForm fields={InputFields}
                      onSubmit={handleSubmit}
                      title="Create"
                      // onChange={handleChange}
                      onClick={() => handleAddInputFieldHierarchy()}
                      headings={formHeadings}
                      inputFieldHierarchy={inputFieldHierarchy}
                    />
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