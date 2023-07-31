import { Autocomplete, Box, TextField, TextareaAutosize } from '@mui/material';
import Tippy from '@tippyjs/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { MdArrowBackIos, MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ColorConstants } from 'src/constants/ColorConstants';
import { ResponsiveClassName } from 'src/constants/ResponsiveClassName';
import * as yup from "yup";
const Index = () => {
  const IntialInputFields = {
    ZoneId:'',
    ZoneName:"",
    RegionId :"",
    RegionName :"",
    ClusterId:"",
    ClusterName:"",
    BranchName:"",
    BranchIFSC:"",
    address: "",
    state: "",
    district: "",
    subDistrict: "",
    pincode: "",
    ename: "",
    userId: "",
    designation: "",
    email: "",
    cnumber: "",
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputFields, setInputFields] = useState([{ ...IntialInputFields }]);
  const [inputErrors, setInputErrors] = useState({});
  const[ZoneId , setZoneid] = useState("");
  const[ZoneName , setZoneName] = useState("");
  const[RegionId , setRegionId] = useState("");
  const[RegionName , setRegionName] = useState("");
  const[ClusterId , setClusterId] = useState("");
  const[ClusterName , setClusterName] = useState("");
  const[BranchName , setBranchName] = useState("");
  const[BranchIFSC , setBranchIFSC] = useState();
  const[SaleId , setSaleId] = useState();
  const[address , setAddress] = useState("");
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [subDistrictList, setSubDistrictList] = useState([]);
  const[pincode , setPincode] = useState();
  const[designationList , setDesignationList] = useState([]);
  const InputObject = {
    label: "",
    name: "",
  };
  const onChangeInputSelect = (index, name, value) => {
    if (name === "pincode") {
      value = value.replace(/\D/g, "");
    }
    if (inputErrors?.[name]) {
      let newtemp = { ...inputErrors };
      newtemp[name] = "";
      setInputErrors({ ...newtemp });
    }
    let temp = [...inputFields];

    temp[index][name] = value;
    setInputFields(temp);
  };
  const mapInputFieldToErrorPayload = (item) => ({
    Zoneid: (item.Zoneid) || "" ,
    ZoneName: (item.ZoneName) || "" ,
    address: (item.address) || "",
    state: item.state?.value || "",
    district: item.district?.value || "",
    subDistrict: item.subDistrict?.value || "",
    pincode: item.pincode || "",
  });
  const createErrorPayload = () => inputFields.map(mapInputFieldToErrorPayload);
  const IntialIField = {
    AssestId: "",
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
    setInputErrors(errors);
    return Object.keys(errors).length > 0 ? false : true;
  };
  const inputSchema = yup.object().shape({
    Zoneid: yup.string().required("zone id  is required"),
    RegionId: yup.string().required("region id is required"),
    ClusterId: yup.string().required("cluster id is required"),
    ClusterName: yup.string().required("cluster name is required"),
    address: yup.string().required("address is required"),
  });
  const onBackButton = () => {
    router.push("/Organizations/Banks");
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
                    {inputFields.map((data, index) => {
                        return (
                          <>
                             <div className="text-left p-4" key={data.id}>
                              {/* heading section  */}
                             <div className="grid lg:grid-cols-10 flex items-center">
                             <button
                                  onClick={() => onBackButton()}
                                  type="button"
                                  className="flex items-center  p-3 rounded text-sm w-24"
                                 >
                                  <span className="common-Font-Family ml-4">
                                    <Tippy content ="back">
                                    <MdArrowBackIos size ={20}/>
                                    </Tippy>
                                  </span>
                                </button>
                              <div className="col-start-5 col-end-8">
                                <span className="heading-Font-Family" style={{fontWeight:'700'}}>
                                  {t("Add New Branch")}
                                </span>
                              </div>
                              </div>
                              {/* heading section  */}
                              <div className="grid lg:grid-cols-2 m-3">
                              <span
                                className="subheading-Font-Family"
                                style={{ color: ColorConstants.primaryColor , fontWeight: '700' }}
                              >
                                {t("Branch Details")}
                              </span>
                            </div>
                              <div className="w-auto m-3">
                              <hr style={{ color: "#000000" }}></hr>
                            </div>
                            
                            {/* Bank details  */}
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
                             <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    sx={{ className: "common-Font-Family" }}
                                    className="common-Font-Family"
                                    // options={}
                                    name="ZoneId"
                                    // value={data.RegionId}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "ZoneId",
                                        option
                                      );
                                    }}
                                    autoHighlight
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("Zone")}
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
                                
                              
                              <div className='font-semibold font-montserrat mt-3'>
                              <TextField
                                    id="outlined-basic"
                                    label={t("BranchName")}
                                    name="BranchName"
                                    inputProps={{ maxLength: 4 }}
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "BranchName",
                                        evnt.target.value.trim()
                                      )
                                    }
                                    value={data.BranchName}
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
                              <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    sx={{ className: "common-Font-Family" }}
                                    className="common-Font-Family"
                                    // options={}
                                    name="RegionId"
                                    // value={data.RegionId}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "RegionId",
                                        option
                                      );
                                    }}
                                    autoHighlight
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("Region")}
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
                               
                                <div className="font-semibold font-montserrat mt-3">
                                <TextField
                                    id="outlined-basic"
                                    label={t("BranchIFSC")}
                                    name="BranchIFSC"
                                    inputProps={{ maxLength: 4 }}
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "BranchIFSC",
                                        evnt.target.value.trim()
                                      )
                                    }
                                    value={data.BranchIFSC}
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
                             <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    sx={{ className: "common-Font-Family" }}
                                    className="common-Font-Family"
                                    // options={}
                                    name="ClusterId"
                                    // value={data.RegionId}
                                    popupIcon = {<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25}/>}
                                    onChange={(e, option) => {
                                      onChangeInputSelect(
                                        index,
                                        "ClusterId",
                                        option
                                      );
                                    }}
                                    autoHighlight
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={t("Cluster")}
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
                              
                              </div>
                              </div>
                            </div>
                              {/* bank details  */}
                              <div className="grid lg:grid-cols-2 m-3">
                              <span
                                className="subheading-Font-Family"
                                style={{ color: ColorConstants.primaryColor , fontWeight : '700' }}
                              >
                                {t("Branch Admin Details")}
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
                                    label={t("EmployeeName")}
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
                                    label={t("UserId")}
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
                                {/* <div className="font-semibold font-montserrat">
                                  <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    name="designation"
                                    options=""
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
                                )} */}
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
                                    label={t("EmailID")}
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
                                    label={t("ContactNumber")}
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
                                        label={t("state")}
                                        required
                                      />
                                    )}
                                  />
                                </div>
                                <div className="font-semibold font-montserrat mt-3">
                              <TextField
                                    id="outlined-basic"
                                    label={t("subDistrict")}
                                    name="pincode"
                                    inputProps={{ maxLength: 4 }}
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "subDistrict",
                                        evnt.target.value.trim()
                                      )
                                    }
                                    value={data.subDistrict}
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
                                        label={t("District")}
                                        required
                                      />
                                    )}
                                  />
                                </div>
                                
                             
                                <div className="font-semibold font-montserrat mt-3">
                              <TextField
                                    id="outlined-basic"
                                    label={t("pincode")}
                                    name="pincode"
                                    inputProps={{ maxLength: 4 }}
                                    onChange={(evnt) =>
                                      onChangeInputSelect(
                                        index,
                                        "pincode",
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
                          
                            </div>
                            {/* buttons section */}
                            <div className="grid lg:grid-cols-10 mt-6 mb-6">
                              <div className="col-start-9 col-end-10 gap-2">
                                <button
                                  type="button"
                                  className="flex items-center text-white p-3 rounded text-sm w-24"
                                  style={{ backgroundColor: "#EEEEEE" }}
                                >
                                  <span
                                    className="common-Font-Family ml-2"
                                    style={{ color: "#696969" }}
                                  >
                                    {t("Cancel")}
                                  </span>
                                </button>
                              </div>

                              <div className="col-start-10 col-end-11 gap-2">
                                <button
                                  type="button"
                                  className="flex items-center text-white p-3 rounded text-sm w-24"
                                  style={{
                                    backgroundColor:
                                      ColorConstants.primaryColor,
                                  }}
                                >
                                  <span className="common-Font-Family ml-1 mr-2">
                                    {t("Save")}
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
                            </div>
                            {/* button's scetion  */}
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