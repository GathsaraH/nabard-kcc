import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import DefaultForm from 'src/components/Forms/DefaultForm';
const Index = () => {
//    const [selectAllChecked, setSelectAllChecked] = useState(false);
   // Define InputFields with form field details
  const InputFields = [
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
      heading: 'Admin Details',
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
    {
      name: 'Assignment',
      label: 'Assignment',
      type: 'checkbox',
      required: true,
      heading: 'Admin Actitivity Role',
    },
    {
      name: 'ChangeofRole',
      label: 'Change of Role',
      type: 'checkbox',
      required: true,
      heading: 'Admin Actitivity Role',
    },
    {
        name: 'AddEmployee',
        label: 'Add Employee',
        type: 'checkbox',
        required: true,
        heading: 'Admin Actitivity Role',
      },
      {
        name: 'DeleteEmployee',
        label: 'Delete Employee',
        type: 'checkbox',
        required: true,
        heading: 'Admin Actitivity Role',
      },
      {
        name: 'Monitoring',
        label: 'Monitoring',
        type: 'checkbox',
        required: true,
        heading: 'Admin Actitivity Role',
      },
  ]
  // Define form section headings
  const formHeadings = [
    'Admin Details',
    'Area of Opeartion',
    'Admin Actitivity Role'
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
    router.push('/users/Stakeholders');
  };
  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
     // Update Select All checkbox based on the checked states of other checkboxes
     const isAllChecked = InputFields.filter((field) => field.name !== 'AllIndia').every(
        (field) => field.checked || field.name === 'State' // Only consider the 'State' checkbox for now
      );
      setSelectAllChecked(isAllChecked);
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
                            {t("Add Stake Holder User")}
                          </span>
                        </div>

                      </div>
                      {/* // */}
                    <DefaultForm
                      fields={InputFields}
                      onSubmit={handleSubmit}
                      onClick={handleCancel}
                      onChange = {handleFormChange}
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