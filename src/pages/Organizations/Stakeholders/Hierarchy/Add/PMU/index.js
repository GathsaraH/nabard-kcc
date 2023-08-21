import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import DefaultForm from 'src/components/Forms/DefaultForm';
const Index = () => {
   // Define InputFields with form field details
  const InputFields = [
    // {
    //   name: 'Type',
    //   label: 'Type',
    //   type: 'select',
    //   required: false,
    //   heading: 'Agency Details', // Heading for the first new field
    //   options: [
    //     { label: '', value: '' },
    //     { label: 'Central Government', value: 'Central Government' },
    //     { label: 'State Government', value: 'State Government' },
    //   ],
    // },
    {
      name: 'Name',
      label: 'Name',
      type: 'text',
      required: false,
      heading: 'Agency Details', // Heading for the second new field
    },
    {
      name: 'Department',
      label: 'Department',
      type: 'text',
      required: false,
      heading: 'Agency Details', // Heading for the second new field
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
      heading: 'Admin Details',
    },
    {
      name: 'UserID',
      label: 'User ID',
      type: 'text',
      required: true,
      heading: 'Admin Details',
    },
    {
      name: 'Designation',
      label: 'Designation',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: ' Admin Details',
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
      heading: 'Admin Details',
    },
    {
      name: 'ContactNumber',
      label: 'Contact Number',
      type: 'text',
      required: true,
      heading: 'Admin Details',
    },

    {
      name: 'All India',
      label: 'All Inida',
      type: 'checkbox',
      required: true,
      heading: 'Area of Opeartion',
    },
    {
      name: 'State',
      label: 'State',
      type: 'checkbox',
      required: true,
      heading: 'Area of Opeartion',
    },
    {
      name: 'SelectInput',
      label: 'State',
      type: 'select',
      required: true,
      heading: 'Area of Opeartion',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
    },
  ]
  // Define form section headings
  const formHeadings = [
    'Agency Details',
    'Address Details',
    'Admin Details',
    'Area of Opeartion'
    // Add more headings as needed
  ];

  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({});

 
  // Function to handle form submission
  const handleSubmit = (formData) => {
    // Process the form data when the form is submitted
    console.log(formData);
  };
   // Function to handle form cancellation
  const handleCancel = () => {
    router.back();
  };
  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
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
                          className="flex items-center  p-3 rounded text-sm w-1"
                        >
                          <span className="common-Font-Family ml-4">
                            <Tippy content="back">
                              <MdArrowBackIos size={20} />
                            </Tippy>
                          </span>
                        </button>
                        <div className="col-start-5 col-end-8">
                          <span className="heading-Font-Family text-lg md:text-xl font-bold whitespace-prewrap flex text-center" style={{ fontWeight: '700' }}>
                            {t("Add PMU")}
                          </span>
                        </div>

                      </div>
                    <DefaultForm
                      fields={InputFields}
                      onSubmit={handleSubmit}
                      onClick={handleCancel}
                      onChange = {handleFormChange}
                      title="Create"
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