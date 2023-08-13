import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import DefaultForm from 'src/components/Forms/DefaultForm';
import { getAllDistrictApi, getAllStateApi, getAllSubDistrictApi, getAllVillageApi } from 'src/services/Attributes/AttributeService';
import { getAllBankTypeApi , getAllBankNameApi , addBankMastersApi } from 'src/services/Banks/BankService';
const noOptions = [{
  label: 'No Data Available',
  value: '',
}]

const DefaultInputFields = [
  {
    name: 'BankType',
    label: 'Type of Bank',
    type: 'select',
    required:false,
    heading: 'Bank Details', // Heading for the first new field
    // options: [
    //   { label: 'Public Sector', value: 'Public Sector' },
    //   { label: 'Local Area Banks', value: 'Local Area Banks' },
    // ],
    options:noOptions
  },
  {
    name: 'BankName',
    label: 'Bank Name',
    type: 'select',
    required: false,
    heading: 'Bank Details', // Heading for the second new field
    options:noOptions
    // options: [
    //   { label: '1', value: '1' },
    //   { label: '2', value: '2' },
    // ],
  },
  {
    name: 'ShortName',
    label: 'Short Name',
    type: 'text',
    required: false,
    heading: 'Bank Details', // Heading for the third new field
  },
  {
    name: 'fileField',
    label: 'Upload Image',
    type: 'file',
    required: false,
    heading: 'Bank Logo'
  },
  {
    name: 'Address',
    label: 'Address',
    type: 'textarea',
    required: false,
    heading: 'Address Details',
  },
  {
    name: 'State',
    label: 'State',
    type: 'select',
    required: false,
    heading: 'Address Details', // Adjust the heading
    options: [
      { label: 'S1', value: 's1' },
      { label: 's2', value: 's2' },
    ],
  },
  {
    name: 'District',
    label: 'District',
    type: 'select',
    required: true,
    heading: 'Address Details', // Adjust the heading
    options: noOptions,
  },
  {
    name: 'SubDistrict',
    label: 'Sub District',
    type: 'select',
    required: true,
    heading: 'Address Details', // Adjust the heading
    options: noOptions,
  },
  {
    name: 'Village',
    label: 'Village',
    type: 'select',
    required: true,
    heading: 'Address Details', // Adjust the heading
    options: noOptions,
  },
  {
    name: 'Pincode',
    label: 'Pincode',
    type: 'text',
    required: true,
    heading: 'Address Details', // Adjust the heading
  },
  {
    name: 'EmployeeName',
    label: 'Employee Name',
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
      { label: 'D1', value: '1' },
      { label: 'D2', value: '1' },
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
const Index = () => {
  const [inputFields, setinputFields] = useState([...DefaultInputFields])
  const [stateList, setStateList] = useState([]);
  const [bankType, setBankType] = useState([]);
  const[bankName ,setBankName] = useState([]);
  const [selectedBankTypeId, setSelectedBankTypeId] = useState(null);
  const [selectedBankNameId, setSelectedBankNameId] = useState(null);
  // const [districtList, setdistrictList] = useState([]);
  // const [subDistrictList, setsubDistrictList] = useState([]);
  // const [villageList, setvillageList] = useState([]);
  const [formData, setFormData] = useState({});
  // Define form section headings
  const formHeadings = [
    'Bank Details',
    'Bank Logo',
    'Address Details',
    'Super Admin Details',
    'Bank Hierarchy'
    // Add more headings as needed
  ];

  const { t } = useTranslation();
  const router = useRouter();
  // State for managing form hierarchy levels
  const [inputFieldHierarchy, setInputFieldHierarchy] = useState([
    {
      level: 'Head Office',
      data: { level2: '', level3: '', level4: '' },
      inputErrors: { level2: '', level3: '', level4: '' },
    },
  ]);
  // Function to handle form submission
  // const handleSubmit = (formData) => {
  //   // Process the form data when the form is submitted
  //   console.log("formdata" , formData);
  // };
  const handleSubmit = async () => {
    console.log("formdata" , formData)
    console.log("selectedBankTypeId" , selectedBankTypeId);
    console.log("selectedBankNameId" , selectedBankNameId);
    // try {
    //   // Prepare the request body using the formData
    //   const bankData = {
    //     nabUserDTO: {
    //       firstName: formData.EmployeeName,
    //       middleName:"",
    //       lastName:"",
    //       email:formData.EmailID,
    //       mobileNo:formData.ContactNumber,
    //       nabRoleID:formData.Designation,
    //       // ... (other user details)
    //     },
    //     bankMasterDTO: {
    //       email: "",
    //       mobileNo:"",
    //       shortName:formData.ShortName,
    //       fileName:formData.fileField,
    //       bankTypeMasterId:formData.bankType.id,
    //       bankNameMasterId:formData.bankName.id
    //     },
    //     addressDTO:{
    //       address:formData.Address,
    //       pincode:formData.Pincode,
    //       villageMasterId:formData.Village.id
    //     },
    //     bankHierarchyNameDTO:[{
    //       name:"HO"  
    //   },{
    //    name:""
    //    },{
    //         name:""  
    //    },{
    //    name:""  
    //    },{
    //    name:""  
    //    }]
    //     // ... (other parts of the request body)
    //   };
  
    //   // Call the addBankMastersApi with the prepared request body
    //   const response = await addBankMastersApi(bankData);
  
    //   // Handle the API response here
    //   console.log('API response:', response);
    //   // You can extract the status and data from the response object
    //   const { status, data } = response;
    //   // Do further processing based on the status and data
  
    //   // If the API call is successful, you can navigate or perform other actions
    //   if (status === 201) {
    //     router.push('/Organizations/Banks'); // Redirect to a success page or another route
    //   }
    // } catch (error) {
    //   console.error('API error:', error);
    // }
  };
  
  // Function to handle form cancellation
  const handleCancel = () => {
    router.push('/Organizations/Banks');
  };

  const noValuesFound = () => {
    // const stateFieldIndex = inputFields.findIndex(field => field.name === 'District');
    // const updatedInputFields = [...inputFields];
    // updatedInputFields[stateFieldIndex].options = data.data.map(() => ({
    //   label: "No data found",
    //   value: ""
    // }));
    // setinputFields(updatedInputFields);
  }

  const getAllState = async () => {
    try {
      const data = await getAllStateApi();
      setStateList(data.data);
      const stateFieldIndex = inputFields.findIndex(field => field.name === 'State');
      if (stateFieldIndex !== -1) {
        const updatedInputFields = [...inputFields];
        updatedInputFields[stateFieldIndex].options = data.data.map(state => ({
          label: state.label,
          value: state.value
        }));
        setinputFields(updatedInputFields);
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  
  const getAllBankType = async () => {
    try {
      const data = await getAllBankTypeApi();
      setBankType(data); // Assuming data is an array of objects
      const BankFieldIndex = inputFields.findIndex(field => field.name === 'BankType');
      if (BankFieldIndex !== -1) {
        const updatedInputFields = [...inputFields];
        updatedInputFields[BankFieldIndex].options = data.response.map(bank => ({
          label: bank.name,
          value: bank.name
        }));
        setinputFields(updatedInputFields);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllBankName = async () => {
    try {
      const data = await getAllBankNameApi();
      setBankName(data); // Assuming data is an array of objects
      const BankFieldIndex = inputFields.findIndex(field => field.name === 'BankName');
      if (BankFieldIndex !== -1) {
        const updatedInputFields = [...inputFields];
        updatedInputFields[BankFieldIndex].options = data.response.map(bank => ({
          label: bank.name,
          value: bank.name
        }));
        setinputFields(updatedInputFields);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getAllState();
    getAllBankType();
    getAllBankName();
  }, []);

  // Get All District By State Id
  const getDistrictByStateId = async (stateId) => {
    try {
      const data = await getAllDistrictApi(stateId);
      if (data.data.length > 0) {
        const stateFieldIndex = inputFields.findIndex(field => field.name === 'District');
        if (stateFieldIndex !== -1) {
          const updatedInputFields = [...inputFields];
          updatedInputFields[stateFieldIndex].options = data.data.map(state => ({
            label: state.label,
            value: state.value
          }));
          setinputFields(updatedInputFields);
        }
      } else {
        noValuesFound()
      }
    } catch (error) {
      console.log(error);
    }
  };


  // Get All Sub District By District Id
  const getSubDistrictByDistrictId = async (districtId) => {
    try {
      const data = await getAllSubDistrictApi(districtId);
      if (data.data) {
        const stateFieldIndex = inputFields.findIndex(field => field.name === 'SubDistrict');
        if (stateFieldIndex !== -1) {
          const updatedInputFields = [...inputFields];
          updatedInputFields[stateFieldIndex].options = data.data.map(state => ({
            label: state.label,
            value: state.value
          }));
          setinputFields(updatedInputFields);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get All Sub District By District Id
  const getVillagesBySubDistrictId = async (subDistictId) => {
    try {
      const data = await getAllVillageApi(subDistictId);
      if (data.data) {
        const stateFieldIndex = inputFields.findIndex(field => field.name === 'Village');
        if (stateFieldIndex !== -1) {
          const updatedInputFields = [...inputFields];
          updatedInputFields[stateFieldIndex].options = data.data.map(state => ({
            label: state.label,
            value: state.value
          }));
          setinputFields(updatedInputFields);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  // Get All District By State Id
  useEffect(() => {
    if (formData.State) {
      getDistrictByStateId(formData.State);
    }
  }, [formData.State]);

  // Get All Sub District By District Id
  useEffect(() => {
    if (formData.District) {
      getSubDistrictByDistrictId(formData.District);
    }
  }, [formData.District]);

  // Get All Sub District By District Id
  useEffect(() => {
    if (formData.SubDistrict) {
      getVillagesBySubDistrictId(formData.SubDistrict);
    }
  }, [formData.SubDistrict]);


  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
      // Get selected bank type id
      const selectedBankType = bankType.find(item => item.name === updatedData.BankType);
      if (selectedBankType) {
        setSelectedBankTypeId(selectedBankType.id);
      }
  
      // Get selected bank name id
      const selectedBank = bankName.find(item => item.name === updatedData.BankName);
      if (selectedBank) {
        setSelectedBankNameId(selectedBank.id);
      }
  };

  return (
    <div>
      {/* {console.log(formData)} */}
      {/* {console.log(inputFields)} */}
      <main className="flex flex-col w-full bg-gray-100 overflow-x-hidden overflow-y-auto mb-14">
        <div className="flex w-full mx-auto ">
          <div className="flex flex-col w-full h-full text-gray-900 text-xl ">
            <div>
              <div className="flex w-full">
                <div className="w-full block rounded-lg shadow-lg bg-white">
                  <div className="grid lg:grid-cols-10  items-center">
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
                  <DefaultForm fields={inputFields}
                    onSubmit={handleSubmit}
                    onChange = {handleFormChange}
                    onClick={handleCancel}
                    title="Create"
                    headings={formHeadings}
                    inputFieldHierarchy={inputFieldHierarchy}
                  />
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