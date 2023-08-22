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
      label: 'Farmer Reached',
      name: 'Farmer Reached', value: 10
    }
    ,
    {
      label: 'Applications Received',
      name: 'Applications Received', value: 10
    }
    ,
    {
      label: 'Applications Sanctioned',
      name: 'Applications Sanctioned', value: 10
    }
    ,
    {
      label: 'Applications Rejected',
      name: 'Applications Rejected', value: 10
    }  
    
  ];
  const [tableData, setTableData] = useState(data);

  const handleInputChange = (sectionIndex, valueIndex, newValue) => {
    const newData = [...tableData];
    newData[sectionIndex].values[valueIndex].value = newValue;
    setTableData(newData);
  };


  // Define InputFields with form field details
  const InputFields = [
    {
      name: 'NameOftheCampaign',
      label: 'Name of the Camapign',
      type: 'text',
      required: false,
      heading: '', // Heading for the first new field
    },
    {
      name: 'OrganizingInstitution',
      label: 'Organizing Institution',
      type: 'text',
      required: false,
      heading: '', // Heading for the first new field
    },
    {
      name: 'State',
      label: 'State',
      type: 'select',
      required: false,
      heading: 'Location', // Heading for the first new field
      options: [
        { label: 'Gujarat', value: 'Gujarat' },
      ],
    },
    {
      name: 'District',
      label: 'District',
      type: 'select',
      required: true,
      heading: 'Location',
      options: [
        { label: 'Gujarat', value: 'Gujarat' },
      ],
    },
    {
      name: 'Block',
      label: 'Block',
      type: 'select',
      required: true,
      heading: 'Location',
      options: [
        { label: 'Gujarat', value: 'Gujarat' },
      ],
    },
    {
      name: 'Village',
      label: 'Village',
      type: 'text', // This indicates it's a select input
      required: true,
      heading: 'Location',

    },
    {
      name: 'Date',
      label: 'Camp Date',
      type: 'datepicker',
      required: true,
      heading: 'Location',
    },   
    {
      name: 'Participatedfarmers',
      label: 'Participated-Farmers',
      type: 'text',
      required: true,
      heading: 'Location',
    },   
    {
      name: 'ParticipatedOthers',
      label: 'Participated-Others',
      type: 'text',
      required: true,
      heading: 'Location',
    },   
    {
      name: 'fileField',
      label: 'Upload Image',
      type: 'file',
      required: false,
      heading: 'Photo Upload'
    },
    {
      name: 'fileField',
      label: 'Upload Image',
      type: 'file',
      required: false,
      heading: 'Photo Upload'
    },
  ]
  // Define form section headings
  const formHeadings = [
    '',
    "Location",
    'Photo Upload'
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
    router.push('/campaign');
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
                      <span className="common-Font-Family ml-0">
                        <Tippy content="back">
                          <MdArrowBackIos size={20} />
                        </Tippy>
                      </span>
                    </button>
                    <div className="col-start-5 col-end-8">
                      <span className="heading-Font-Family text-lg md:text-xl font-bold whitespace-prewrap flex text-center">
                        {t("Details of the Awareness & Outreach Camp")}
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
                   {/* <div className="w-full p-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                        {tableData.map((item, itemIndex) => (
                          <table key={itemIndex}>
                            <thead style={{
                              backgroundColor: ColorConstants.lightBlue
                            }}><tr><th>{item.label}</th></tr>
                            </thead>
                            <br />
                            <tbody><tr><td>
                              <TextField
                                fullWidth
                                id="data"
                                name={item.name}
                                value={item.value}
                                label={item.name}
                                placeholder={item.name}
                                // onChange={(e) =>
                                //   handleInputChange(itemIndex, e.target.value)
                                // }
                                variant="outlined"
                                InputProps={textFieldSize}
                                InputLabelProps={labelSize}
                              />
                            </td></tr></tbody>
                          </table>
                        ))}
                      </div>
                          </div>*/}
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