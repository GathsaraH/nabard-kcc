import React from 'react';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import DefaultTable from 'src/components/Table/DefaultTable';

// Define the class names for the buttons based on their selected state
const buttonClassName = (selected) => {
  return `${selected ? 'bg-primary text-white !outline-none' : ''
    } -mb-[1px] block rounded p-4 py-3.5 text-md font-medium hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`;
};

// Define the tab titles
const tabTitles = ["User's Role and Permissions", "Edit Role and permissions"];

const index = () => {
  return (
    <div>
      <Tab.Group>
        {/* Render the tab titles */}
        {renderTabTitles()}

        {/* Render the tab content */}
        <Tab.Panels>
          {renderTabFirstContent()}
          {renderTabSecondContent()}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

// Function to render the second tab content
function renderTabSecondContent() {
  return (
    <Tab.Panel>
      <div>
        <div className="flex items-start pt-5">
          <div className="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
            <img
              src="/assets/images/profile-34.jpeg"
              alt="img"
              className="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark"
            />
          </div>
          <div className="flex-auto">
            <h5 className="mb-4 text-xl font-medium">Media heading</h5>
            <p className="text-white-dark text-lg">
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at,
              tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
}

// Function to render the first tab content
function renderTabFirstContent() {
  return (
    <Tab.Panel>
      <div className="active pt-5">
        <h4 className="mb-4 text-xl font-semibold">Manage users role and permissions</h4>
      <DefaultTable/>
      </div>
    </Tab.Panel>
  );
}

// Function to render the tab titles
function renderTabTitles() {
  return (
    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
      {tabTitles.map((item) => {
        return (
          <Tab as={Fragment}>
            {({ selected }) => (
              <button className={buttonClassName(selected)}>
                {item}
              </button>
            )}
          </Tab>
        );
      })}
    </Tab.List>
  );
}

export default index;
