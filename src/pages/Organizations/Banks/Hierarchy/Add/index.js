import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import DefaultForm from 'src/components/Forms/DefaultForm';
const Index = () => {
   // Define InputFields with form field details
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
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
    },
    {
      name: 'SubDistrict',
      label: 'Sub District',
      type: 'select',
      required: true,
      heading: 'Address Details', // Adjust the heading
      options: [
        { label: 'Sub1', value: 'Sub1' },
        { label: 'Sub2', value: 'Sub2' },
      ],
    },
    {
      name: 'Village',
      label: 'Village',
      type: 'select',
      required: true,
      heading: 'Address Details', // Adjust the heading
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
                            {t("Add Bank Hierarchy")}
                          </span>
                        </div>

                      </div>
                    <DefaultForm fields={InputFields}
                      onSubmit={handleSubmit}
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