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
const Index = () => {
    const IntialInputFields = {
        id: "",
        schemeType: "",
        schemeCode: "",
    };
    const { t } = useTranslation();
    const router = useRouter();
    const [inputFields, setInputFields] = useState([{ ...IntialInputFields }]);
    const [inputErrors, setInputErrors] = useState({});
    const [allBankTypeList, setAllBankTypeList] = useState([]);

 

    const onBackButton = () => {
        router.push("/Organizations/Banks");
    };

    function productSelection() {
        router.push("/Organizations/Banks");
    }

    function SubTitle(title) {
        return <div className="grid lg:grid-cols-2 m-3 mt-8">
            <span className="subheading-Font-Family"
                style={{
                    color:
                        ColorConstants.primaryColor,
                    fontWeight: '700'
                }} >
                {title}
            </span>
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
                                        {inputFields.map((data, index) => {
                                            return (
                                                <>
                                                    <div className="text-left p-4" key={data.id}>
                                                        {/* heading section  */}
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
                                                                    Add Scheme
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {SubTitle('Add New Scheme')}
                                                        {/* heading section  */}
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
                                                                <div className="font-semibold">
                                                                    <Autocomplete
                                                                        id="country-select-demo"
                                                                        size="small"
                                                                        sx={{ className: "common-Font-Family" }}
                                                                        className="common-Font-Family"
                                                                        options={allBankTypeList}
                                                                        name="bankType"
                                                                        value={IntialInputFields.schemeType}
                                                                        popupIcon={<MdKeyboardArrowDown color={ColorConstants.lightDark} size={25} />}
                                                                        onChange={(e, option) => {
                                                                            onChangeInputSelect(
                                                                                index,
                                                                                "bankType",
                                                                                option
                                                                            );
                                                                        }}
                                                                        autoHighlight
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label={"Scheme Type"}
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
                                                                        label={"Scheme Code"}
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
                                                                    <TextField
                                                                        label={"Name of the Scheme"}
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
                                                                    <TextField
                                                                        label={"Short Description"}
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
                                                                    <TextField
                                                                        label={"Scheme Effective Start Date"}
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
                                                        </div>
                                                        {/* bank details  */}

                                                  
                                                    </div>
                                                    {/* super admin details  */}

                                                   
                                                   
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