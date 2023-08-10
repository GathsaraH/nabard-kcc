import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import DefaultForm from 'src/components/Forms/DefaultForm';
import { getAllDistrictApi, getAllStateApi, getAllSubDistrictApi, getAllVillageApi } from 'src/services/Attributes/AttributeService';

const noOptions = [{
  label: 'No Data Available',
  value: '',
}]

const DefaultInputFields = [
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
    label: 'Upload Image',
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
    type: 'select',
    required: true,
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
const Index = () => {
  const [inputFields, setinputFields] = useState([...DefaultInputFields])
  const [stateList, setStateList] = useState([]);
  const [districtList, setdistrictList] = useState([]);
  const [subDistrictList, setsubDistrictList] = useState([]);
  const [villageList, setvillageList] = useState([]);
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
  const handleSubmit = (formData) => {
    // Process the form data when the form is submitted
    console.log(formData);
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

  useEffect(() => {
    getAllState();
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