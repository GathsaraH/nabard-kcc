import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { MdArrowBackIos } from "react-icons/md";
import Tippy from "@tippyjs/react";
import { useTranslation } from "react-i18next";
import CommonFilters from "src/components/Filters";
import StatusRenderer from "src/components/StatusRenderer";
// import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox';
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import IconButton from "src/components/Button/IconButtonComponent";
import MUIDataTable from "mui-datatables";
import MenuItemComponent from "src/components/Input/Others/MenuItemComponent";

const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const buttonClassName = (selected) => {
    return `${
      selected ? "bg-primary text-white !outline-none" : ""
    } -mb-[1px] block rounded p-4 py-3.5 text-md font-bold hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`;
  };

  // Define tab titles
  const tabTitles = [
    { id: 1, value: "Head Office" },
    { id: 2, value: "Zone" },
    { id: 3, value: "Region" },
    { id: 4, value: "Cluster" },
    { id: 5, value: "Branch" },
  ];





  const handleRowClicked = (rowData) => {
    // Assuming the row data contains an "id" property
    if (rowData.id) {
      router.push(`/Profile/${rowData.id}/`)
    }
  };

  // Row data and column defs
  const data = [
    {
      id: 1,
      UserID: "141501",
      Posting: "Head office Admin",
      EmployeeName: "Andrew Marcel",
      EmailId: "abc@xyz.com",
      MobileNo: "8401274121",
      status: "Active",
    },
    {
      id: 2,
      UserID: "141501",
      Posting: "Head office Admin",
      EmployeeName: "Andrew Marcel",
      EmailId: "abc@xyz.com",
      MobileNo: "8401274121",
      status: "Inactive",
    },
  ];
  const columns = [
    { label: "Sr No.", name: "id" },
    { label: "UserID", name: "UserID" },
    { label: "Posting", name: "Posting" },
    { label: "Employee Name", name: "EmployeeName" },
    { label: "EmailId", name: "EmailId" },
    { label: "MobileNo", name: "MobileNo" },
    {
      label: "Status",
      name: "status",
      // cellRenderer: (params) => (
      //   <StatusRenderer value={params.value} />
      // ),
      options: {
        filter: true,
        customBodyRender: (value) => {
          return <StatusRenderer value={value} />;
        },
      },
    },
    {
      label: 'Actions',
      name: 'actions',
      // cellRenderer: (params) => (
      //   <MenuItemComponent viewOnclick={handleRowClicked} rowData={params.data}/>
      // ),
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          return <MenuItemComponent viewOnclick={handleRowClicked} rowData={rowData} />;
        }
      }
    },
  ];

  const options = {
    print: false,
    onChangePage(currentPage) {
      console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows) {
      console.log({ numberOfRows });
    },
  };
  const headingSection = () => {
    const handleAddBankUser = () => {
      router.push("/users/Banks/Add");
    };
    return (
      <>
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.back()} // Assuming 'router' is defined elsewhere in the component
            type="button"
            className="flex items-center p-3 rounded text-sm w-24"
          >
            <span className="common-Font-Family ml-4">
              <Tippy content="back">
                <MdArrowBackIos size={20} />
              </Tippy>
            </span>
          </button>
          <span className="heading-Font-Family" style={{ fontWeight: "700" }}>
            {t("RB Enterprise")}
          </span>
          <div className="px-2">
            <IconButton
              label="Add Bank User"
              className="btn-outline-primary"
              icon={<AiOutlinePlus />}
              onClick={handleAddBankUser}
            />
          </div>
        </div>
      </>
    );
  };

  const renderTabTitles = () => {
    return (
      <>
        <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
          {tabTitles.map((item) => (
            <Tab key={item.id} as={Fragment}>
              {({ selected }) => (
                <button className={buttonClassName(selected)}>
                  <span>{item.value}</span>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
      </>
    );
  };

  const renderTabContent = (content, tabTitle) => (
    <Tab.Panel>
      <div className="active pt-5">
        <CommonFilters
          icon={<AiOutlinePlus />}
          addButtonLabel={`Add  ${tabTitle}`}
        />
        <MUIDataTable options={options} data={data} columns={columns} />
        {/* <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} /> */}
        <p>{content}</p>
      </div>
    </Tab.Panel>
  );

  return (
    <div>
      <Tab.Group>
        {headingSection()}
        {/* tabs headings here */}
        {renderTabTitles()}
        <Tab.Panels>
          {renderTabContent("head office content", "Head Office")}
          {renderTabContent("Zone content", "Zone")}
          {renderTabContent("Region content", "Region")}
          {renderTabContent("Cluster content", "Cluster")}
          {renderTabContent("Branch content", "Branch")}
          {/* tabs content here */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Index;
