import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "store/themeConfigSlice";
import BreadCrumb from "src/components/BreadCrumb/BreadCrumb";
import SelectInput from "src/components/Input/Select/SelectInput";
import {
    getAllDistrictApi,
    getAllStateApi,
    getAllSubDistrictApi,
    getAllVillageApi,
} from "src/services/Attributes/AttributeService";
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';


const Index = () => {
    const dispatch = useDispatch();
    const [stateList, setStateList] = useState([]);
    const [districtList, setdistrictList] = useState([]);
    const [subDistrictList, setsubDistrictList] = useState([]);
    const [villageList, setvillageList] = useState([]);
    const [selectedData, setselectedData] = useState({
        state: "",
        district: "",
        subDistict: "",
        village: "",
    });

    const data = [
        {
            id: 1,
            title: "Address Attributes",
        },
        {
            id: 2,
            title: "Other Attributes",
        },
    ];

    const [currentData, setCurrentData] = useState(data[0]);
    const [isShowCryptoMenu, setIsShowCryptoMenu] = useState(false);

    // Address Attributes Content
    const addressAttributesContent = () => {


        function renderIcons() {
            return <div>
                <AddIcon className="text-dark" fontSize={'large'} />
                <CreateIcon className="text-primary" fontSize={'large'} />
                <DeleteIcon className="text-danger" fontSize={'large'} />
            </div>
        }
        const handleChange = (e) => {
            const { name, value } = e.target;
            setselectedData({ ...selectedData, [name]: value });
            if(name === "state" ) {
                setselectedData((prevData) => ({
                    ...prevData,
                    subDistict: "",
                    village: "",
                  }));
                  setsubDistrictList([]);
                  setvillageList([]);
            }
        };
        return (
            <>
            {console.log(selectedData)}
                <div className="flex items-center ml-3 p-2">
                    <div className="text-md font-base">
                        Update the attributes that are used to describe addresses.
                    </div>
                </div>
                <div className="mb-5 grid grid-rows-1 gap-4 border-b border-[#ebedf2] p-4 dark:border-[#253b5c] sm:grid-cols-1">
                    <div className="flex gap-2 items-center">
                        <SelectInput
                            width="40%"
                            className="mb-5"
                            name="state"
                            onChange={handleChange}
                            value={selectedData.state}
                            options={stateList}
                            label="State"
                        />
                        {renderIcons()}
                    </div>
                    {districtList.length > 0 && (
                        <div className="flex gap-2 items-center">
                            <SelectInput
                                width="40%"
                                className="mb-5"
                                name="district"
                            value={selectedData.district}
                                onChange={handleChange}
                                options={districtList}
                                label="District"
                            />
                            {renderIcons()}
                        </div>
                    )}
                    {subDistrictList.length > 0 && (
                        <div className="flex gap-2 items-center">
                            <SelectInput
                                width="40%"
                                className="mb-5"
                                name="subDistict"
                                value={selectedData.subDistict}
                                onChange={handleChange}
                                options={subDistrictList}
                                label="Sub-District"
                            />
                            {renderIcons()}

                        </div>

                    )}
                    {villageList.length > 0 && (
                        <div className="flex gap-2 items-center">

                            <SelectInput
                                width="40%"
                                className="mb-5"
                                value={selectedData.village}
                                name="village"
                                onChange={handleChange}
                                options={villageList}
                                label="Village"
                            />
                            {renderIcons()}

                        </div>
                    )}
                </div>
            </>
        );
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setPageTitle("Attributes"));
    }, [dispatch]);

    // Get All State
    const getAllState = async () => {
        try {
            const data = await getAllStateApi();
            setStateList(data.data);
         
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllState();
    }, []);

    // Get All District By State Id
    const getDistrictByStateId = async (stateId) => {
        try {
            const data = await getAllDistrictApi(stateId);
            if(data.data){
                setdistrictList(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Get All Sub District By District Id
    const getSubDistrictByDistrictId = async (districtId) => {
        try {
            const data = await getAllSubDistrictApi(districtId);
            setsubDistrictList(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Get All Sub District By District Id
    const getVillagesBySubDistrictId = async (subDistictId) => {
        try {
            const data = await getAllVillageApi(subDistictId);
            setvillageList(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Get All District By State Id
    useEffect(() => {
        if (selectedData.state) {
            getDistrictByStateId(selectedData.state);
        }
    }, [selectedData.state]);

    // Get All Sub District By District Id
    useEffect(() => {
        if (selectedData.district) {
            getSubDistrictByDistrictId(selectedData.district);
        }
    }, [selectedData.district]);

    // Get All Sub District By District Id
    useEffect(() => {
        if (selectedData.subDistict) {
            getVillagesBySubDistrictId(selectedData.subDistict);
        }
    }, [selectedData.subDistict]);

    return (
        <div>
        {console.log(districtList)}
            <BreadCrumb
                textOne="Settings"
                textTwo="Attributes"
                href={"/Settings/admin"}
            />
            <div className="relative mt-5 flex flex-col gap-5 xl:flex-row">
                <div
                    className={`${isShowCryptoMenu ? "!block h-full xl:h-auto" : ""
                        } panel absolute z-10 hidden w-80 flex-none divide-y divide-[#ebedf2] overflow-y-auto border-0 p-0 dark:divide-[#191e3a] xl:relative xl:block`}
                >
                    {data.map((item) => (
                        <div key={item.id}>
                            <button
                                type="button"
                                className={`${item.id === currentData.id
                                    ? "bg-gray-100 dark:bg-[#192A3A]"
                                    : ""
                                    } flex w-full items-center p-4 hover:bg-gray-100 dark:hover:bg-[#192A3A]`}
                                onClick={() => {
                                    setCurrentData(item);
                                    setIsShowCryptoMenu(!isShowCryptoMenu);
                                }}
                            >
                                <div className="ltr:pr-4 rtl:pl-4">
                                    <div className="flex items-baseline font-semibold">
                                        <div className="text-md ltr:mr-1 rtl:ml-1">
                                            {item.title}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="panel flex-1 p-0">
                    <div className="flex-wrap items-center border-b border-[#ebedf2] p-4 dark:border-[#191e3a] md:flex">
                        <div className="flex flex-1 items-start ltr:pr-4 rtl:pl-4">
                            <div>
                                <div className="flex items-center">
                                    <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1">
                                        {currentData.title}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {currentData.title === data[0].title && addressAttributesContent()}
                </div>
            </div>
        </div>
    );
};

export default Index;
