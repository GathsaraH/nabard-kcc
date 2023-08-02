import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { MdArrowBackIos } from 'react-icons/md';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
import CommonFilters from 'src/components/Filters';
import StatusRenderer from 'src/components/StatusRenderer';
import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox';
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai';

const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const buttonClassName = (selected) => {
    return `${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block rounded p-4 py-3.5 text-md font-bold hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`;
  };

  // Define tab titles
  const tabTitles = [
    { id: 1, value: 'Head Office' },
    { id: 2, value: 'Zone' },
    { id: 3, value: 'Region' },
    { id: 4, value: 'Cluster' },
    { id: 5, value: 'Branch' },
  ];

  // Row data and column defs
  const rowData = [
    { id: 1, UserID: '141501', Posting: 'Head office Admin', EmployeeName: 'Andrew Marcel', EmailId: 'abc@xyz.com', MobileNo: '8401274121', status: 'Active' },
    { id: 2, UserID: '141501', Posting: 'Head office Admin', EmployeeName: 'Andrew Marcel', EmailId: 'abc@xyz.com', MobileNo: '8401274121', status: 'Inactive' },
  ];
  const columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 40,
      suppressMenu: true,
    },
    { headerName: 'Sr No.', field: 'id', suppressMenu: true },
    { headerName: 'UserID', field: 'UserID', suppressMenu: true },
    { headerName: 'Posting', field: 'Posting', suppressMenu: true },
    { headerName: 'Employee Name', field: 'EmployeeName', suppressMenu: true },
    { headerName: 'EmailId', field: 'EmailId', suppressMenu: true },
    { headerName: 'MobileNo', field: 'MobileNo', suppressMenu: true },
    {
      headerName: 'Status', field: 'status', suppressMenu: true,
      cellRenderer: (params) => (
        <StatusRenderer value={params.value} />
      ),
    },
  ];

  const headingSection = () => {
    return (
      <>
        <div className="grid lg:grid-cols-12 flex items-center">
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
          <span className="heading-Font-Family" style={{ fontWeight: '700' }}>
            {t("RB Enterprise")}
          </span>
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
                  <b style={{ fontSize: '20px' }}>{item.value}</b>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
      </>
    );
  };

  const renderTabContent = (content , tabTitle) => (
    <Tab.Panel>
      <div className="active pt-5">
        <CommonFilters icon={<AiOutlinePlus/>} addButtonLabel={`Add  ${tabTitle}`} />
        <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} />
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
        {renderTabContent('head office content', 'Head Office')}
  {renderTabContent('Zone content', 'Zone')}
  {renderTabContent('Region content', 'Region')}
  {renderTabContent('Cluster content', 'Cluster')}
  {renderTabContent('Branch content', 'Branch')}
          {/* tabs content here */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Index;
