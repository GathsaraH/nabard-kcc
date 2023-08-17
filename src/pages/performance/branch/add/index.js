import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import { TextField } from '@mui/material';
import DefaultForm from 'src/components/Forms/DefaultForm';

const textFieldSize = {
  style: {
    height: 40,
  },
}

const labelSize = {
  style: {
    fontSize: 14,
    margin: `-4px 0 0 0px`,
    marginRight: 2
  },
}

const Index = () => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const data = [
    { label: 'Received', values: 
      [{ name: 'A/cs', value: '' },
      { name: 'Amount', value: '' },
      { name: 'A/cs', value: '' },
      { name: 'Amount', value: '' },
      { name: 'A/cs', value: '' },
      { name: 'Amount', value: ''}],
      totalAccount:0,totalAmount:0 },
    { label: 'Sanctioned', values: 
      [{ name: 'A/cs', value: '' },
      { name: 'Amount', value: '' },
      { name: 'A/cs', value: '' },
      { name: 'Amount', value: '' },
      { name: 'A/cs', value: '' },
      { name: 'Amount', value: ''}],
      totalAccount:0,totalAmount:0 },
    { label: 'Rejected', values: 
      [{ name: 'A/cs', value: '' },
      { name: 'Amounts', value: '' },
      { name: 'A/cs', value: '' },
      { name: 'Amount', value: '' },
      { name: 'A/cs', value: '' },
      { name: 'Amount', value: ''}],
      totalAccount:0,totalAmount:0 },
    { label: 'Disbursed', values: 
      [{ name: 'A/cs', value: '' },
      { name: 'Amount', value: '' },
      { name: 'A/cs', value: '' },
      { name: 'Amount', value: '' },
      { name: 'A/cs', value: '' },
      { name: 'Amount', value: ''}],
      totalAccount:0,totalAmount:0 },
  ];
  const [tableData, setTableData] = useState(data);

  const handleInputChange = (sectionIndex, valueIndex, newValue) => {
    const newData = [...tableData];
    newData[sectionIndex].values[valueIndex].value = newValue;
    setTableData(newData);
    CalculateTotals();
  };
  //Calculation Total No Of Application And Amount
  const CalculateTotals = () => {
    const updatedData = tableData.map(section => {
      let totalAccount = 0;
      let totalAmount = 0;

      section.values.forEach(input => {
        if (input.name === 'A/cs') {
          totalAccount += parseInt(input.value, 10) || 0;
        } else if (input.name === 'Amount') {
          totalAmount += parseInt(input.value.replace(/,/g, ''), 10) || 0;
        }
      });

      return { ...section, totalAccount, totalAmount };
    });
    setTableData(updatedData);
  };


  // Define InputFields with form field details
  const InputFields = [
    {
      name: 'BankType',
      label: 'Bank Type',
      type: 'select',
      required: false,
      heading: '', // Heading for the first new field
      options: [
        { label: 'PSB', value: 'PSB' },
      ],
    },
    {
      name: 'BankName',
      label: 'Bank Name',
      type: 'select',
      required: false,
      heading: '', // Heading for the first new field
      options: [
        { label: 'Bank Of Baroda', value: 'Bank Of Baroda' },
      ],
    },
    {
      name: 'BranchName',
      label: 'Branch Name',
      type: 'text',
      required: false,
      heading: '', // Heading for the first new field
    },
    {
      name: 'ReportingPeriodFrom',
      label: 'Reporting Periof From',
      type: 'text',
      required: true,
      heading: '',
    },
    {
      name: 'ReportingPeriodTo',
      label: 'Reporting Periof To',
      type: 'text',
      required: true,
      heading: '',
    },
    {
      name: 'KccType',
      label: 'KCC Type',
      type: 'select', // This indicates it's a select input
      required: true,
      heading: '',
      options: [
        { label: 'Gujarat', value: 'Gujarat' },
      ],
    },
  ]
  // Define form section headings
  const formHeadings = [
    '',
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
                        {t("Performance Data Entry")}
                      </span>
                    </div>

                  </div>
                  <hr></hr>
                  <DefaultForm
                    fields={InputFields}
                    onSubmit={handleSubmit}
                    onClick={handleCancel}
                    onChange={handleFormChange}
                    title="Create"
                    headings={formHeadings}
                  >
                    <div className="w-full p-2">
                      <div className="table-container">
                        <table className="data-table">
                          <thead style={{ backgroundColor: '#D2ECFA' }}>
                            <tr>
                              <th rowSpan={2}>Application</th>
                              <th colSpan={2}>Small Farmer</th>
                              <th colSpan={2}>Marginal Farmer</th>
                              <th colSpan={2}>Other</th>
                              <th colSpan={2}>Total</th>
                            </tr>
                            <tr>
                              <th>A/cs</th>
                              <th>Amount</th>
                              <th>A/cs</th>
                              <th>Amount</th>
                              <th>A/cs</th>
                              <th>Amount</th>
                              <th>A/cs</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((item, sectionIndex) => (
                              <tr key={sectionIndex}>
                                <td>{item.label}</td>
                                {item.values.map((input, valueIndex) => (
                                  <td key={valueIndex}>
                                    <TextField
                                    id="data"
                                    name={input.name}
                                    value={input.value}
                                    label={input.name}
                                    placeholder={input.name}
                                    onChange={(e) =>
                                      handleInputChange(sectionIndex, valueIndex, e.target.value)
                                    }
                                    variant="outlined"
                                    InputProps={textFieldSize}
                                    InputLabelProps={labelSize}
                                  />
                                  </td>
                                ))}
                                <td>{item.totalAccount}</td>
                                <td>{item.totalAmount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </DefaultForm>
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