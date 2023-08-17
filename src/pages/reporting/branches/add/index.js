import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import DefaultForm from 'src/components/Forms/DefaultForm';
const Index = () => {
   const [selectAllChecked, setSelectAllChecked] = useState(false);
   // Define InputFields with form field details
  const InputFields = [
    {
      name: 'BankType',
      label: 'Bank Type',
      type: 'select',
      required: false,
      heading: 'Branch Detail', // Heading for the first new field
      options: [
        { label: 'PSB', value: 'PSB' },
      ],
    },
    {
      name: 'BankName',
      label: 'Bank Name',
      type: 'select',
      required: false,
      heading: 'Branch Detail', // Heading for the first new field
      options: [
        { label: 'Bank Of Baroda', value: 'Bank Of Baroda' },
      ],
    },
    {
      name: 'BranchName',
      label: 'Branch Name',
      type: 'text',
      required: false,
      heading: 'Branch Detail', // Heading for the first new field
    },
    {
      name: 'IFSCCode',
      label: 'IFSC Code',
      type: 'text',
      required: true,
      heading: 'Branch Detail',
    },
    {
      name: 'BranchCategory',
      label: 'Branch Category',
      type: 'select',
      required: false,
      heading: 'Branch Detail', // Heading for the first new field
      options: [
        { label: 'Rural', value: 'Rural' },
      ],
    },
    {
      name: 'KCCTarget',
      label: 'KCC Target',
      type: 'text', // This indicates it's a select input
      required: true,
      heading: 'Branch Detail'
    },
    {
      name: 'State',
      label: 'State',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: 'Branch Loacation',
      options: [
        { label: 'Gujarat', value: 'Gujarat' },
      ],
    },
    {
      name: 'Block',
      label: 'Block',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: 'Branch Loacation',
      options: [
        { label: 'Block1', value: 'Block2' },
      ],
    },
    {
      name: 'District',
      label: 'District',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: 'Branch Loacation',
      options: [
        { label: 'Vadodara', value: 'Vadodara' },
      ],
    },
  ]
  // Define form section headings
  const formHeadings = [
    'Branch Detail',
    'Branch Loacation',
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
    router.push('/reporting/branches');
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
                            {t("Create Reporting Bank & Branch")}
                          </span>
                        </div>

                      </div>
                      <hr></hr>
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