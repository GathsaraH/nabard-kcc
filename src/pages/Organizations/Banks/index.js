import Tippy from '@tippyjs/react';
import { useRouter } from 'next/router'
import React , {useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { GrEdit, GrView } from 'react-icons/gr';
import IconButton from 'src/components/Button/IconButtonComponent'
import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox'
import { useTranslation } from "react-i18next";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import DefaultInput from 'src/components/Input/TextField/DefaultInput';
import { Autocomplete, Box, TextField } from '@mui/material';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ResponsiveClassName } from 'src/constants/ResponsiveClassName';
import { ColorConstants } from 'src/constants/ColorConstants';
import CustomCellRenderer from 'src/components/CustomCellRenderer';
import StatusRenderer from 'src/components/StatusRenderer';
const Index = () => {
  const { t } = useTranslation();
  const rowData = [
    {id :1 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Inactive' },
    {id :2 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Active' },
    {id :3 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Inactive' },
    {id :4 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Inactive' },
    {id :5 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Inactive' },
    {id :6 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Active' },
    {id :7 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Inactive' },
    {id :8 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Inactive' },
    {id :9 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Active' },
    {id :10 ,BankType: 'Public Sector', OrganizationName: 'RB Enterprise' , EmailId : 'xyz@gmail.com' , MobileNo : '9999999999' , Status :'Active' },
  ];
  const [startDate, setStartDate] = useState('2022-07-05');
  const [EndDate, setEndDate] = useState('2023-07-10');
  const[status , setStatus] = useState("Inactive");
  const handleEditClick = (id) => {
    // Handle edit click here
    console.log('Edit clicked for ID:', id);
  };

  const handleUpdateClick = (id) => {
    // Handle update click here
    console.log('Update clicked for ID:', id);
  };

  const columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 40,
      suppressMenu: true,
    },
    { headerName: 'Sr No.', field: 'id' , suppressMenu: true},
    { headerName: 'Bank Type', field: 'BankType' , suppressMenu: true },
    { headerName: 'Organization Name', field: 'OrganizationName' , suppressMenu: true },
    { headerName: 'Email Id', field: 'EmailId' , suppressMenu: true },
    { headerName: 'Mobile No', field: 'MobileNo' , suppressMenu: true },
    { headerName: 'Status', field: 'Status' , suppressMenu: true,
    cellRenderer: () => (
      <StatusRenderer value="Active"/>
    ),
  },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: () => (
        <CustomCellRenderer/>
      ),
      width: 100,
      suppressMenu: true, // Remove default filter options from this column
      cellStyle: { textAlign: 'center' },
    },
  ];
  
  const router = useRouter();
  const AddBankHierarchy = () =>{
    router.push('/Organizations/Banks/Hierarchy/Add');
  }
 
  return (
    <div>
       <div
                              className={
                                ResponsiveClassName.responsiveFour4ColParent
                              }
                            >
                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold">
                                <TextField
                                    id="outlined-basic"
                                    label={t("Search user")}
                                    name="Search User"
                                    required 
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                             
                              </div>

                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                <TextField
                                    id="outlined-basic"
                                    label={t("Date")}
                                    name="Date"
                                    required 
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                              
                              </div>

                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                <TextField
                                    id="outlined-basic"
                                    label={t("Start Date")}
                                    name="Start Date"
                                    required 
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                              </div>
                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                <TextField
                                    id="outlined-basic"
                                    label={t("End Date")}
                                    name="End Date"
                                    required 
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                              </div>
                              <div
                                className={
                                  ResponsiveClassName.responsiveFour3ColChild
                                }
                              >
                                <div className="font-semibold font-montserrat">
                                <TextField
                                    id="outlined-basic"
                                    label={t("Select Header column")}
                                    name="select header column"
                                    required 
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                  />
                                </div>
                              </div>
                            </div>
      <IconButton label="Add Bank Hierarchy" className="btn btn-outline-success" icon={<AiOutlinePlus/>} onClick={AddBankHierarchy} />
      <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} />
    </div>
  )
}

export default Index