import React , {useState} from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch} from "react-redux";
import { useRouter } from "next/router";
import { ResponsiveClassName } from "../../../../../constants/ResponsiveClassName";
import { ColorConstants } from 'src/constants/ColorConstants';
import Tippy from '@tippyjs/react';
import { MdArrowBackIos, MdKeyboardArrowDown } from 'react-icons/md';
import CardContainer from 'src/components/Card/CardContainer';
const Index = () => {
  const IntialInputFields = {
    id: "",
    Type: "",
    Name: "",
    Department: "",
    address: "",
    OperationState : '',
    state: "",
    district: "",
    subDistrict: "",
    Village:"",
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputFields, setInputFields] = useState([{ ...IntialInputFields }]);
  const [inputErrors, setInputErrors] = useState({});
  const[type , setType] = useState();
  const[Name , setName] = useState("");
  const [allTypeList, setAllTypeList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [subDistrictList, setSubDistrictList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [Department, setDepartment] = useState("");
  const [ename, setEname] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [cnumber, setCNumber] = useState("");
  const [VillageList, setVillageList] = useState([]);
  const [pincode, setPincode] = useState("");
  const[OperationState , setOperationState] = useState([]);


  const InputObject = {
    label: "",
    name: "",
  };

  const [isPACS, setIsPACS] = useState("");
  const onChangeInputSelect = (index, name, value) => {
    if (name === "cnumber" || name === "pincode") {
      value = value.replace(/\D/g, "");
    }
    if (
      value?.label === "Central level" ||
      value?.label === "State level"
    ) {
      setIsPACS("PACS");
    }

    if (inputErrors?.[name]) {
      let newtemp = { ...inputErrors };
      newtemp[name] = "";
      setInputErrors({ ...newtemp });
    }

    if (name === "Type" || name === "Name") {
      let isState = name === "Type";
      let all = inputFields.map((item) => ({
        ...item,
        [name]: value,
        ...(isState && { Name: { ...InputObject } }),
      }));
      setInputFields(all);

      return;
    }
    let temp = [...inputFields];

    temp[index][name] = value;
    setInputFields(temp);
  };
  const checkMobileNoIsExist = async (name, value) => {
    if (value.length == 10) {
      const mobileIsExist = await isExistMobileNoAPI(value);
      if (mobileIsExist.registerId) {
        let newtemp = { ...inputErrors };
        newtemp[name] = "Mobile no is already exist";
        setInputErrors({ ...newtemp });
      }
    }
  };

  let currentDate = new Date();
  function generatePayloadHierarchy() {
    return inputFields.map((item) => ({
      stackId: item.Name.value,
      levelTwo: item.level2,
      levelThree: item.level3,
      levelFour: item.level4,
      levelFifth: item.pacs,
    }));
  }
  const mapInputFieldToErrorPayload = (item) => ({
    Name: item.Name?.value || "",
    Type: item.Type?.value || "",
    Department:item.Department?.value || "",
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
    pacs: (item.pacs) || "",
  });
  const createErrorPayload = () => inputFields.map(mapInputFieldToErrorPayload);
  const IntialIField = {
    AssestId: "",
  };

  const [inputFieldHierarchy, setInputFieldHierarchy] = useState([
    { ...IntialIField },
  ]);
  const addInputFieldHierarchy = () => {
    if (inputFieldHierarchy.length <= 5) {
      setInputFieldHierarchy([
        ...inputFieldHierarchy,
        {
          ...IntialIField,
        },
      ]);
    }
  };

  const removeInputFieldsHierarchy = () => {
    const rows = [...inputFieldHierarchy];
    rows.pop();
   
    if (inputFieldHierarchy.length == 4) {
      setInputFields([{ ...inputFields[0], level4: "" }]);
      setInputErrors([{ ...inputErrors, level4: "" }]);
    } else if (inputFieldHierarchy.length == 3) {
      setInputFields([{ ...inputFields[0], level3: "" }]);
      setInputErrors([{ ...inputErrors, level3: "" }]);
    }else if (inputFieldHierarchy.length == 2) {
      setInputFields([{ ...inputFields[0], level2: "" }]);
      setInputErrors([{ ...inputErrors, level2: "" }]);
    }
    setInputFieldHierarchy(rows);
  };
  const checkValidation = async (data) => {
    let validateResult = await inputSchema
      .validate(data, {
        abortEarly: false,
      })
      .catch((err) => {
        return err;
      });

    let errors = {};
    let errorLength = 0;
    validateResult?.inner?.forEach((item) => {
      errors[item.path] = item.message;
      errorLength++;
    });
    if (isPACS != "") {
      delete errors.level2;
      delete errors.level3;
      delete errors.level4;
    } else {
      if (inputFieldHierarchy.length == 1) {
        delete errors.level2;
        delete errors.level3;
        delete errors.level4;
      } else if (inputFieldHierarchy.length == 2) {
        delete errors.level3;
        delete errors.level4;
      } else if (inputFieldHierarchy.length == 3) {
        delete errors.level4;
      }
      delete errors.pacs;
    }
    setInputErrors(errors);
    return Object.keys(errors).length > 0 ? false : true;
  };
  const inputSchema = yup.object().shape({
    Name: yup.string().required("name is required"),
    Type: yup.string().required("type is required"),
    designation: yup.string().required("Designation is required"),
  });
  return (
    <div>
              <main className="flex flex-col w-full bg-gray-100 overflow-x-hidden overflow-y-auto mb-14">
          <div className="flex w-full mx-auto px-6 py-8">
            <div className="flex flex-col w-full h-full text-gray-900 text-xl ">
              <div className="px-2 md:px-5">
                <div>
                  <div className="flex w-full">
                    <div className="w-full block rounded-lg shadow-lg bg-white">
                    {inputFields.map((data, index) => {
                        return (
                          <>
                             <div className="text-left p-4" key={data.id}>
                              {/* heading section  */}
                             <div className="grid lg:grid-cols-10 flex items-center">
                             <button
                                  onClick={() => router.back()}
                                  type="button"
                                  className="flex items-center  p-3 rounded text-sm w-1"
                                 >
                                  <span className="common-Font-Family ml-4">
                                    <Tippy content ="back">
                                    <MdArrowBackIos size ={20}/>
                                    </Tippy>
                                  </span>
                                </button>
                              <div className="col-start-5 col-end-8">
                                <span className="heading-Font-Family text-lg md:text-xl font-bold whitespace-prewrap flex text-center" style={{fontWeight:'700'}}>
                                  {t("Stakeholder Hierarchy")}
                                </span>
                              </div>
                              </div>
                              {/* heading section  */}
                              <div className="w-auto m-3">
                              <hr style={{ color: "#000000" }}></hr>
                            </div>
                            <div className="grid lg:grid-cols-2 m-3">
                              <span
                                className="subheading-Font-Family"
                                style={{ color: ColorConstants.primaryColor , fontWeight: '700' }}
                              >
                                {t("Stake Holder's Details")}
                              </span>
                            </div>
                            {/* stack holders details  */}
                            <div
                              className={
                                ResponsiveClassName.responsiveFour3ColParent
                              }
                            >
                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold">
                                  <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    sx={{ className: "common-Font-Family" }}
                                    className="common-Font-Family"
                                    options={allTypeList}
                                    name="Type"
                                    value={data.Type}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "Type",
                                        option
                                      );
                                    }}
                                    autoHighlight
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("Type")}
                                        required
                                        className="common-Font-Family"
                                        inputProps={{
                                          ...params.inputProps,
                                          autoComplete: "new-password",
                                          style: {
                                            fontSize: "0.875rem",
                                            fontFamily: "Montserrat",
                                            fontWeight: "500",
                                          },
                                        }}
                                      
                                      />
                                    )}
                                    renderOption={(props, option) => (
                                      <Box component="li" {...props}>
                                        <span className="common-Font-Family">
                                          {option.label}
                                        </span>
                                      </Box>
                                    )}
                                  />
                                </div>
                             
                              </div>

                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                <TextField
                                    id="outlined-basic"
                                    label={t("Name")}
                                    name="Name"
                                    inputProps={{ maxLength: 4 }}
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "Name",
                                        evnt.target.value.trim()
                                      )
                                    }
                                    value={data.Name}
                                    required
                                   
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                              
                              </div>

                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                <TextField
                                    id="outlined-basic"
                                    label={t("Department")}
                                    name="Department"
                                    inputProps={{ maxLength: 4 }}
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "Department",
                                        evnt.target.value.trim()
                                      )
                                    }
                                    value={data.Department}
                                    required
                                   
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                              </div>
                            </div>
                              {/* stakeholder's details  */}
                            {/* address details  */}
                            <div className="grid lg:grid-cols-2 m-3">
                              <span
                                className="subheading-Font-Family"
                                style={{ color: ColorConstants.primaryColor , fontWeight: '700' }}
                              >
                                {t("Address Details")}
                              </span>
                            </div>
                            <div className="w-auto m-3">
                              <hr style={{ color: "#000000" }}></hr>
                            </div>
                            <div
                              className={
                                ResponsiveClassName.responsiveFour3ColParent
                              }
                            >
                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    name="address"
                                    error={inputErrors.address}
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "address",
                                        evnt.target.value
                                      )
                                    }
                                    value={data.address}
                                    minRows={3}
                                    placeholder={t("Address")}
                                    className="form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem",
                                        fontFamily: "Montserrat",
                                        fontWeight: "500",
                                      },
                                    }}
                                    InputLabelProps={{
                                      className: "common-Font-Family",
                                    }}
                                    required
                                    variant="outlined"
                                  />
                                </div>
                             
                              </div>

                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    options={stateList}
                                    name="state"
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "state",
                                        option
                                      );
                                    }}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    // value={data.bankName}
                                    autoHighlight
                                    //getOptionLabel={(option) => option.label}
                                    renderOption={(props, option) => (
                                      <Box component="li" {...props}>
                                        <span className="common-Font-Family">
                                          {option.label}
                                        </span>
                                      </Box>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("State")}
                                        required
                                      />
                                    )}
                                  />
                                </div>
                              
                                <div className="font-semibold font-montserrat mt-3">
                                  <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    options={subDistrictList}
                                    name="Sub District"
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "Sub District",
                                        option
                                      );
                                    }}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    autoHighlight
                                    renderOption={(props, option) => (
                                      <Box component="li" {...props}>
                                        <span className="common-Font-Family">
                                          {option.label}
                                        </span>
                                      </Box>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("Sub District")}
                                        required
                                      />
                                    )}
                                  />
                                </div>
                              <div className="font-semibold font-montserrat mt-3">
                                <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    options={VillageList}
                                    name="Villages"
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "Village",
                                        option
                                      );
                                    }}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    autoHighlight
                                    renderOption={(props, option) => (
                                      <Box component="li" {...props}>
                                        <span className="common-Font-Family">
                                          {option.label}
                                        </span>
                                      </Box>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("Village")}
                                        required
                                      />
                                    )}
                                  />
                                </div>
                              </div>

                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                  <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    options={districtList}
                                    name="District"
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "district",
                                        option
                                      );
                                    }}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    autoHighlight
                                    renderOption={(props, option) => (
                                      <Box component="li" {...props}>
                                        <span className="common-Font-Family">
                                          {option.label}
                                        </span>
                                      </Box>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("District")}
                                        required
                                      />
                                    )}
                                  />
                                </div>
                                <div className="font-semibold font-montserrat mt-3">
                              <TextField
                                    id="outlined-basic"
                                    label={t("Pincode")}
                                    name="Pincode"
                                    inputProps={{ maxLength: 4 }}
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "Pincode",
                                        evnt.target.value.trim()
                                      )
                                    }
                                    value={data.pincode}
                                    required
                                   
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                              </div>
                                
                              </div>
                           
                            </div>
                            {/* address details  */}
                          

                            {/* super admin details  */}
                            <div className="grid lg:grid-cols-2 m-3">
                              <span
                                className="subheading-Font-Family"
                                style={{ color: ColorConstants.primaryColor , fontWeight : '700' }}
                              >
                                {t("Admin Details")}
                              </span>
                            </div>
                            <div className="w-auto m-3">
                              <hr style={{ color: "#000000" }}></hr>
                            </div>
                            
                            <div
                              className={
                                ResponsiveClassName.responsiveFour3ColParent
                              }
                            >
                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                  <TextField
                                    id="outlined-basic"
                                    label={t("Employee Name")}
                                    name="ename"
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "ename",
                                        evnt.target.value
                                      )
                                    }
                                    value={data.ename}
                                    required
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem",
                                        fontFamily: "Montserrat",
                                        fontWeight: "500",
                                      },
                                    }}
                                    InputLabelProps={{
                                      className: "common-Font-Family",
                                    }}
                                    error={inputErrors.ename}
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                                {inputErrors.ename && (
                                  <span className="errorMessageStyle">
                                    {inputErrors.ename}
                                  </span>
                                )}
                              </div>

                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                  <TextField
                                    id="outlined-basic"
                                    label={t("User Id")}
                                    name="userId"
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "userId",
                                        evnt.target.value
                                      )
                                    }
                                    value={data.userId}
                                    required
                                    inputProps={{
                                      style: {
                                        fontSize: 15,
                                        fontFamily: "Montserrat",
                                      },
                                      maxLength: 15,
                                    }}
                                    InputLabelProps={{
                                      className: "common-Font-Family",
                                    }}
                                    error={inputErrors.userId}
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                                {inputErrors.userId && (
                                  <span className="errorMessageStyle">
                                    {inputErrors.userId}
                                  </span>
                                )}
                              </div>
                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                  <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    name="designation"
                                    options={designationList}
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "designation",
                                        option
                                      );
                                    }}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    autoHighlight
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("Designation")}
                                        onChange={(e, option) => {
                                          onChangeInputSelect(
                                            index,
                                            "designation",
                                            option
                                          );
                                        }}
                                        required
                                        inputProps={{
                                          ...params.inputProps,
                                          autoComplete: "new-password",
                                          style: {
                                            fontSize: "0.875rem",
                                            fontFamily: "Montserrat",
                                            fontWeight: "500",
                                          },
                                        }}
                                        error={inputErrors.designation}
                                        InputLabelProps={{
                                          className: "common-Font-Family",
                                        }}
                                      />
                                    )}
                                    renderOption={(props, option) => (
                                      <Box component="li" {...props}>
                                        <span className="common-Font-Family">
                                          {option.label}
                                        </span>
                                      </Box>
                                    )}
                                  />
                                </div>
                                {inputErrors.designation && (
                                  <span className="errorMessageStyle">
                                    {inputErrors.designation}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div
                              className={
                                ResponsiveClassName.responsiveFour3ColParent
                              }
                            >
                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                  <TextField
                                    id="outlined-basic"
                                    label={t("Email ID")}
                                    name="email"
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "email",
                                        evnt.target.value
                                      )
                                    }
                                    value={data.email}
                                    required
                                    inputProps={{
                                      style: {
                                        fontSize: 15,
                                        fontFamily: "Montserrat",
                                      },
                                      maxLength: 255,
                                    }}
                                    InputLabelProps={{
                                      className: "common-Font-Family",
                                    }}
                                    error={inputErrors.email}
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                                {inputErrors.email && (
                                  <span className="errorMessageStyle">
                                    {inputErrors.email}
                                  </span>
                                )}
                              </div>

                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                  <TextField
                                    id="outlined-basic"
                                    label={t("Mobile Number")}
                                    inputProps={{ maxLength: 10 }}
                                    name="cnumber"
                                    onChange={(evnt) => {
                                      onChangeInputSelect(
                                        index,
                                        "cnumber",
                                        evnt.target.value
                                      );
                                      checkMobileNoIsExist(
                                        "cnumber",
                                        evnt.target.value
                                      );
                                    }}
                                    value={data.cnumber}
                                    required
                                    InputProps={{
                                      style: {
                                        fontSize: 15,
                                        fontFamily: "Montserrat",
                                      },
                                      maxLength: 10,
                                    }}
                                    InputLabelProps={{
                                      className: "common-Font-Family",
                                    }}
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                              </div>
                            </div>
                            </div>
                            {/* super admin details  */}
                              
                              {/* Area of operation  */}
                              <div className="grid lg:grid-cols-2 m-4 mt-6">
                              <span
                                className="subheading-Font-Family"
                                style={{ color: ColorConstants.primaryColor , fontWeight : '700' }}
                              >
                                {t("Area of Operation")}
                              </span>
                            </div>
                            <div className="w-auto m-3">
                              <hr style={{ color: "#000000" }}></hr>
                            </div>
                            <div className="flex-1 p-5">
                <div className='grid grid-cols-3 gap-4' >
                    <CardContainer shadow={"shadow-lg"}>
                        <div className="mb-2">
                            <label className="inline-flex cursor-pointer">
                            <input type="checkbox" id="myCheckbox" name="AllIndia" value="All India" className="form-checkbox h-5 w-5 text-primary border-gray-300 rounded"/>
                                <span>All India</span>
                            </label>
                        </div>
                    </CardContainer>
                    <CardContainer shadow={"shadow-lg"}>
                        <div className="mb-2">
                            <label className="inline-flex cursor-pointer">
                            <input type="checkbox" id="myCheckbox" name="state" value="State" className="form-checkbox h-5 w-5 text-primary border-gray-300 rounded"/>
                                <span>State</span>
                            </label>
                        </div>
                    </CardContainer>
                    <div className="font-semibold font-montserrat mt-5">
                                <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    options={OperationState}
                                    name="State"
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "State",
                                        option
                                      );
                                    }}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    autoHighlight
                                    renderOption={(props, option) => (
                                      <Box component="li" {...props}>
                                        <span className="common-Font-Family">
                                          {option.label}
                                        </span>
                                      </Box>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("State")}
                                        required
                                      />
                                    )}
                                  />
                                </div>



                </div>
                
            </div>
                              {/* Area of operation  */}

                            {/* stake holder hierarchy  */}
                            <div className="grid lg:grid-cols-2 m-4 mt-6">
                              <span
                                className="subheading-Font-Family"
                                style={{ color: ColorConstants.primaryColor , fontWeight : '700' }}
                              >
                                {t("Stakeholder Hierarchy")}
                              </span>
                            </div>

                            <div className="w-auto m-3">
                              <hr style={{ color: "#000000" }}></hr>
                            </div>
                           
                                <div className="grid lg:grid-cols-12 m-5 mt-6 gap-5">
                                  <div className="col-start-1 col-end-6 xl:w-auto">
                                    <input
                                      type="text"
                                      className="form-control block w-full px-4 py-2 text-base font-montserrat font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                                      id="exampleFormControlInput3"
                                      placeholder="Level 1"
                                      value="Ministry"
                                      disabled
                                    />
                                  </div>

                                  <div className="col-start-6 col-end-7 text-right">
                                    <IconButton
                                      onClick={addInputFieldHierarchy}
                                      aria-label="delete"
                                      className="text-white"
                                      style={{ backgroundColor: "green" }}
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  </div>
                                  <div className="col-start-7 col-end-8">
                                    <IconButton
                                      onClick={removeInputFieldsHierarchy}
                                      aria-label="delete"
                                      className="text-white"
                                      style={{ backgroundColor: "red" }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </div>
                                  <div className="col-start-8 col-end-9"></div>
                                </div>

                                {inputFieldHierarchy.length > 1 && (
                                  <div className="grid lg:grid-cols-12 m-5 mt-6 gap-5">
                                    <div className="col-start-2 col-end-7 xl:w-auto">
                                      <TextField
                                        id="outlined-basic"
                                        label="Level 2"
                                        name="level2"
                                        onChange={(evnt) =>
                                          onChangeInputSelect(
                                            index,
                                            "level2",
                                            evnt.target.value
                                          )
                                        }
                                        value={data.level2}
                                        required
                                        InputProps={{
                                          style: {
                                            fontSize: "0.875rem",
                                            fontFamily: "Montserrat",
                                            fontWeight: "500",
                                          },
                                        }}
                                        InputLabelProps={{
                                          className: "common-Font-Family",
                                        }}
                                        error={inputErrors.level2}
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                      />
                                      {inputErrors.level2 && (
                                        <span className="errorMessageStyle">
                                          {inputErrors.level2}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {inputFieldHierarchy.length > 2 && (
                                  <div className="grid lg:grid-cols-12 m-5 mt-6 gap-5">
                                    <div className="col-start-3 col-end-8 xl:w-auto">
                                      <TextField
                                        id="outlined-basic"
                                        label="Level 3"
                                        name="level3"
                                        onChange={(evnt) =>
                                          onChangeInputSelect(
                                            index,
                                            "level3",
                                            evnt.target.value
                                          )
                                        }
                                        value={data.level3}
                                        required
                                        InputProps={{
                                          style: {
                                            fontSize: "0.875rem",
                                            fontFamily: "Montserrat",
                                            fontWeight: "500",
                                          },
                                        }}
                                        InputLabelProps={{
                                          className: "common-Font-Family",
                                        }}
                                        error={inputErrors.level3}
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                      />
                                      {inputErrors.level3 && (
                                        <span className="errorMessageStyle">
                                          {inputErrors.level3}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {inputFieldHierarchy.length > 3 && (
                                  <div className="grid lg:grid-cols-12 m-5 mt-6 gap-5">
                                    <div className="col-start-4 col-end-9 xl:w-auto">
                                      <TextField
                                        id="outlined-basic"
                                        label="Level 4"
                                        name="level4"
                                        onChange={(evnt) =>
                                          onChangeInputSelect(
                                            index,
                                            "level4",
                                            evnt.target.value
                                          )
                                        }
                                        value={data.level4}
                                        required
                                        InputProps={{
                                          style: {
                                            fontSize: "0.875rem",
                                            fontFamily: "Montserrat",
                                            fontWeight: "500",
                                          },
                                        }}
                                        InputLabelProps={{
                                          className: "common-Font-Family",
                                        }}
                                        error={inputErrors.level4}
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                      />
                                      {inputErrors.level4 && (
                                        <span className="errorMessageStyle">
                                          {inputErrors.level4}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                              
                              
                             {/* buttons section */}
                             <div className="flex justify-end m-10">
                                <button
                                  type="button"
                                  className="flex items-center text-white p-3 rounded text-sm w-24"
                                  style={{ backgroundColor: "#EEEEEE" , marginRight:'15px' }}
                                >
                                  <span
                                    className="common-Font-Family ml-2"
                                    style={{ color: "#696969" }}
                                  >
                                    {t("Cancel")}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="flex items-center text-white p-3 rounded text-sm w-24"
                                  style={{
                                    backgroundColor:
                                      ColorConstants.primaryColor,
                                  }}
                                >
                                  <span className="common-Font-Family ml-1 mr-2">
                                    {t("Create")}
                                  </span>

                                  <svg
                                    width="20"
                                    height="10"
                                    viewBox="0 0 18 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M0.703112 3.79687H15.5938L13.1271 1.34212C12.8519 1.06818 12.8508 0.623001 13.1248 0.347763C13.3987 0.0724898 13.8439 0.0714705 14.1192 0.345372L17.7931 4.00162C17.7934 4.00183 17.7935 4.00207 17.7938 4.00228C18.0683 4.27622 18.0692 4.72285 17.7938 4.9977C17.7936 4.99791 17.7934 4.99815 17.7932 4.99836L14.1192 8.65461C13.844 8.92847 13.3988 8.92752 13.1248 8.65222C12.8509 8.37698 12.852 7.9318 13.1272 7.65786L15.5938 5.20311H0.703112C0.314775 5.20311 -1.33514e-05 4.88832 -1.33514e-05 4.49999C-1.33514e-05 4.11165 0.314775 3.79687 0.703112 3.79687Z"
                                      fill="white"
                                    />
                                  </svg>
                                </button>
                            </div>
                            {/* button's scetion  */}
                            {/* bank hierarchy  */}
                          </>
                        )
                    })}
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