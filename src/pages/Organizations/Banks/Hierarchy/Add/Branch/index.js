import React from 'react';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import DefaultForm from 'src/components/Forms/DefaultForm';
const Index = () => {
   // Define InputFields with form field details
  const InputFields = [
    {
      name: 'Zone',
      label: 'Zone',
      type: 'select',
      required: true,
      heading: 'Branch Details', // Heading for the first new field
      options:[
        {label:'Z1' , value:'Z1'},
        {label:'Z2' , value:'Z2'},
      ]
    },
    {
      name: 'Region',
      label: 'Region',
      type: 'select',
      required: true,
      heading: 'Branch Details', // Heading for the first new field
      options:[
        {label:'R1' , value:'R1'},
        {label:'R2' , value:'R2'},
      ]
    },
    {
      name: 'Cluster',
      label: 'Cluster',
      type: 'select',
      required: true,
      heading: 'Branch Details', // Heading for the second new field
      options:[
        {label:'C1' , value:'C1'},
        {label:'C2' , value:'C2'},
      ]
    },
    {
      name: 'BranchName',
      label: 'Branch Name',
      type: 'text',
      required: true,
      heading: 'Branch Details', // Heading for the second new field
    },
    {
      name: 'BranchIFSC',
      label: 'Branch IFSC',
      type: 'text',
      required: true,
      heading: 'Branch Details', // Heading for the second new field
    },
    {
      name:"EmployeeName",
      label:"Employee Name",
      type:"text",
      required:true,
      heading:'Branch Admin Details'
    },
    {
      name:"UserID",
      label:"User ID",
      type:"text",
      required:true,
      heading:'Branch Admin Details'
    },
    {
      name:"Designation",
      label:"Designation",
      type:"sleect",
      required:true,
      heading:'Branch Admin Details',
      options:[
        {label:"D1" , value:"D1"},
        {label:"D2" , value:"D2"}
      ]
    },
    {
      name:"EmailID",
      label:"Email ID",
      type:"text",
      required:true,
      heading:'Branch Admin Details'
    },
    {
      name:"ConatctNumber",
      label:"Contact Number",
      type:"text",
      required:true,
      heading:'Branch Admin Details'
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

    }

  ]
  // Define form section headings
  const formHeadings = [
    'Branch Details',
    'Branch Admin Details',
    'Address Details'
    // Add more headings as needed
  ];

  const { t } = useTranslation();
  const router = useRouter();
 // State for managing form hierarchy levels
  // Function to handle form submission
  const handleSubmit = (formData) => {
    console.log(formData);
    // Process the form data when the form is submitted
  };
   // Function to handle form cancellation
  const handleCancel = () => {
     router.back();
  };
  return (
    <div>
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
                            {t("Add New Branch")}
                          </span>
                        </div>

                      </div>
                    <DefaultForm fields={InputFields}
                      onSubmit={handleSubmit}
                      onClick={handleCancel}
                      title="Save"
                      headings={formHeadings}
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