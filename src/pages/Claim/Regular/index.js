import React, { useState, useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import SelectInput from "src/components/Input/Select/SelectInput";
import IconButton from "src/components/Button/IconButtonComponent";
import { AiOutlinePlus } from "react-icons/ai";

import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MenuItemComponent from "src/components/Input/Others/MenuItemComponent";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => ({
  textField: {
    width: '150px',
    // height: '30px',
  },
}));

const dateOptions = [
  { value: "1", label: "01-12-2012" },
  { value: "2", label: "01-12-2011" },
];

const headerOptions = [
  { value: "1", label: "Beneficiary Id" },
  { value: "2", label: "Beneficiary Name" },
];

const Index = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [filterData, setfilterData] = useState({
    search: "",
    date: "",
    startDate: "",
    endDate: "",
    headerColumn: "",
  });
  const [rowData, setRowData] = useState([
    {
      Zone: "Baroda",
      Schemes: "AIF",
      From: "1 Jul 2023",
      From: "AIF",
      To: "30 Sept 2023",
      InterestSubvention: "300000",
      CGTMSEFee: "200000",
      children: [
        {
          Region: "Baroda",
          Schemes: "AIF",
          From: "1 Jul 2023",
          From: "AIF",
          To: "30 Sept 2023",
          InterestSubvention: "300000",
          CGTMSEFee: "200000",
        },
        {
          Region: "Baroda",
          Schemes: "AIF",
          From: "1 Jul 2023",
          From: "AIF",
          To: "30 Sept 2023",
          InterestSubvention: "300000",
          CGTMSEFee: "200000",
        },
      ],
    },
    {
      Zone: "Baroda",
      Schemes: "AIF",
      From: "1 Jul 2023",
      From: "AIF",
      To: "30 Sept 2023",
      InterestSubvention: "300000",
      CGTMSEFee: "200000",
      children: [
        {
          Region: "Baroda",
          Schemes: "AIF",
          From: "1 Jul 2023",
          From: "AIF",
          To: "30 Sept 2023",
          InterestSubvention: "300000",
          CGTMSEFee: "200000",
        },
        {
          Region: "Baroda",
          Schemes: "AIF",
          From: "1 Jul 2023",
          From: "AIF",
          To: "30 Sept 2023",
          InterestSubvention: "300000",
          CGTMSEFee: "200000",
        },
      ],
    },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "Zone",
      cellRenderer: "agGroupCellRenderer",
      headerClass: "bold-header",
    },
    { field: "Schemes", headerClass: "bold-header" },
    { field: "From", headerClass: "bold-header" },
    { field: "To", headerClass: "bold-header" },
    { headerName: "Interest Subvention(₹)", field:"InterestSubvention", headerClass: "bold-header" },
    { headerName: "CGTMSE Fee(₹)", field:"CGTMSEFee", headerClass: "bold-header" },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params) => (
        <MenuItemComponent rowData={params.data}/>
      ),
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);
  const detailCellRendererParams = useMemo(() => {
    return {
      // level 2 grid options
      detailGridOptions: {
        columnDefs: [
          { field: "Region", cellRenderer: "agGroupCellRenderer" },
          { field: "Schemes" },
          { field: "From", headerClass: "bold-header" },
          { field: "To", headerClass: "bold-header" },
          { headerName: "Interest Subvention(₹)", field:"InterestSubvention", headerClass: "bold-header" },
          { headerName: "CGTMSE Fee(₹)", field:"CGTMSEFee", headerClass: "bold-header" },
        ],
        groupDefaultExpanded: 1,
        detailRowHeight: 240,
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.children);
      },
    };
  }, []);

  const AddBankHierarchy = () => {
    router.push("/schemes/add");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setfilterData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="bg-white p-2">
      <div className="flex flex-wrap gap-1 mb-4">
        <div className="px-2">
          <TextField
            label={t("Search user")}
            name="search"
            variant="outlined"
            size="small"
            className={classes.textField}
            onChange={handleInputChange}
          />
        </div>

        <div className="px-2">
          <SelectInput
            name={"date"}
            label="Date"
            options={dateOptions}
            className={classes.textField}
            onChange={handleInputChange}
          />
        </div>

        <div className="px-2">
          <TextField
            label={t("Start Date")}
            name="startDate"
            variant="outlined"
            size="small"
            className={classes.textField}
            onChange={handleInputChange}
          />
          {/* <DatePickerInput label={'Start Date'} name="startDate" onChange={handleInputChange} /> */}
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("End Date")}
            name="endDate"
            className={classes.textField}
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
        </div>

        <div className="px-2">
          <SelectInput
            name={"headerColumn"}
            label="Header"
            options={headerOptions}
            onChange={handleInputChange}
          />
        </div>
        <div className="px-2">
          <IconButton
            label="Add Scheme"
            className="btn-outline-primary"
            icon={<AiOutlinePlus />}
            onClick={AddBankHierarchy}
          />
        </div>
      </div>
      {/* <TableWithCheckBox width={'500'} rowData={rowData} columnDefs={columnDefs} pagination={true} /> */}
      <div className="ag-theme-alpine" style={{ height: "100vh" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          groupDefaultExpanded={0}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
        />
      </div>
    </div>
  );
};

export default Index;
