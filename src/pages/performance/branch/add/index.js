import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import { TextField } from '@mui/material';
import DefaultForm from 'src/components/Forms/DefaultForm';
import { ColorConstants } from 'src/constants/ColorConstants';

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
    {
      label: 'Small Farmers',
      values: [
        {
          label: 'Received',
          values: [
            { name: 'A/cs', value: '' },
            { name: 'Amount', value: '' },
          ],
        },
        {
          label: 'Sanctioned',
          values: [
            { name: 'A/cs', value: '' },
            { name: 'Amount', value: '' },
          ],
        },
        {
          label: 'Rejected',
          values: [
            { name: 'A/cs', value: '' },
            { name: 'Amount', value: '' },
          ],
        },       
      ],
    },
    {
      label: 'Marginal Farmers',
      values: [
        {
          label: 'Received',
          values: [
            { name: 'A/cs', value: '' },
            { name: 'Amount', value: '' },
          ],
        },
        {
          label: 'Sanctioned',
          values: [
            { name: 'A/cs', value: '' },
            { name: 'Amount', value: '' },
          ],
        },
        {
          label: 'Rejected',
          values: [
            { name: 'A/cs', value: '' },
            { name: 'Amount', value: '' },
          ],
        },      
      ],

    },
    {
      label: 'Others',
      values: [
        {
          label: 'Received',
          values: [
            { name: 'A/cs', value: '' },
            { name: 'Amount', value: '' },
          ],
        },
        {
          label: 'Sanctioned',
          values: [
            { name: 'A/cs', value: '' },
            { name: 'Amount', value: '' },
          ],
        },
        {
          label: 'Rejected',
          values: [
            { name: 'A/cs', value: '' },
            { name: 'Amount', value: '' },
          ],
        },       
      ],
    },
    {
      label: 'Total',
      values: [
        {
          label: 'Received',
          values: [
            { name: 'A/cs', value: 0 },
            { name: 'Amount', value: 0 },
          ],
        },
        {
          label: 'Sanctioned',
          values: [
            { name: 'A/cs', value: 0 },
            { name: 'Amount', value: 0 },
          ],
        },
        {
          label: 'Rejected',
          values: [
            { name: 'A/cs', value: 0 },
            { name: 'Amount', value: 0 },
          ],
        },        
      ],     
    },
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
      label: 'Reporting Period From',
      type: 'datepicker',
      required: true,
      heading: '',
    },
    {
      name: 'ReportingPeriodTo',
      label: 'Reporting Period To',
      type: 'datepicker',
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
                      className="flex items-center  p-3 rounded text-sm w-1"
                    >
                      <span className="common-Font-Family ml-4">
                        <Tippy content="back">
                          <MdArrowBackIos size={20} />
                        </Tippy>
                      </span>
                    </button>
                    <div className="col-start-2 md:col-start-5 col-end-8">
                      <span className="heading-Font-Family text-lg md:text-xl font-bold whitespace-prewrap flex text-center" style={{ fontWeight: '700' }}>
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
                    <div className="w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {tableData.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="table-container">
                            <table className="data-table">
                              <thead style={{
                                backgroundColor: ColorConstants.lightBlue
                              }}>
                                <tr>
                                  <th colSpan={4} style={{ textAlign: "center" }}>
                                    {section.label}
                                  </th>
                                </tr>
                                <tr>
                                  <th></th>
                                  <th>A/cs</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {section.label === 'Total' ?
                                  section.values.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                      <td className={`visible ${section?.label == "Small Farmers" ? "md:visible" : "md:invisible"}`}>{item.label}</td>
                                      {item.values.map((value, valueIndex) => (
                                        <td key={valueIndex} style={{ height: "64px" }}>
                                          {value.value}
                                        </td>
                                      ))}
                                    </tr>
                                  )) :
                                  section.values.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                      <td className={`visible ${section?.label == "Small Farmers" ? "md:visible" : "md:invisible"}`}>{item.label}</td>
                                      {item.values.map((value, valueIndex) => (
                                        <td key={valueIndex}>
                                          <TextField
                                            fullWidth
                                            id={`data-${sectionIndex}-${itemIndex}-${valueIndex}`}
                                            name={value.name}
                                            value={value.value}
                                            label={value.name}
                                            placeholder={value.name}
                                            onChange={(e) =>
                                              handleInputChange(sectionIndex, itemIndex, valueIndex, e.target.value)
                                            }
                                            variant="outlined"
                                            InputProps={textFieldSize}
                                            InputLabelProps={labelSize}
                                            sx={{width:{xs:"100px",md:"130px"}}}
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                  ))}

                              </tbody>
                            </table>
                          </div>
                        ))}
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