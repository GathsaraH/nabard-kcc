import React, { useEffect, useState } from 'react'
import DefaultButtonComponent from 'src/components/Button/DefaultButtonComponent';
import DefaultInput from 'src/components/Input/TextField/DefaultInput';
import ModalContainer from 'src/components/Modal/ModalContainer';

import { AiOutlineInfoCircle } from 'react-icons/ai'
import Tippy from '@tippyjs/react';
import DefaultCheckbox from 'src/components/Input/CheckBox/DefaultCheckBox';
import DefaultTable from 'src/components/Table/DefaultTable';

const items = [
  {
    id: 1,
    title: 'Bank Module',
    content: [{ id: 1, value: "Read" }, { id: 2, value: "Write" }, { id: 3, value: "Create" }],
  },
  {
    id: 2,
    title: 'User Module',
    content: [{ id: 1, value: "Read" }, { id: 2, value: "Write" }, { id: 3, value: "Create" }],
  }
];

const content = [
  { id: 1, title: "Bank Admin", content: "example this text" },
  { id: 2, title: "Branch Manager", content: "example this text" },
  { id: 3, title: "Bank Manager", content: "example this text" },
];


const Index = () => {
  const [showRoleModal, setshowRoleModal] = useState(false)
  const [rolesData, setrolesData] = useState([...items])
  // eslint-disable-next-line no-unused-vars
  const [rolesWithPermissions, setRolesWithPermissions] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false)

  const showRoleModalHandler = (item) => {
    setshowRoleModal(item)
  }

  function CardItem(item) {
    return (
      <div className="mb-5 flex justify-between dark:text-white-light">
        <div className=" w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
          <div className="py-7 px-6">
            <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">{item.title}</h5>
            <p className="text-white-dark">{item.content}</p>
            <div className='mt-5' >
              <DefaultButtonComponent onClick={() => showRoleModalHandler(true)} title="Edit Role" />
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Helper function to update the state of the nested checkboxes
  const handleNestedCheckboxChange = (itemId, innerItemId) => {
    setrolesData((prevData) =>
      prevData.map((item) =>
        item.id === itemId
          ? {
            ...item,
            content: item.content.map((innerItem) =>
              innerItem.id === innerItemId
                ? { ...innerItem, checked: !innerItem.checked }
                : innerItem
            )
          }
          : item
      )
    );
  };


  // Helper function to handle main checkbox (Bank Module) click
  const handleMainCheckboxChange = (itemId) => {
    setrolesData((prevData) =>
      prevData.map((item) =>
        item.id === itemId
          ? {
            ...item,
            content: item.content.map((innerItem) => ({
              ...innerItem,
              checked: !item.content.every((innerItem) => innerItem.checked)
            }))
          }
          : item
      )
    );
  };


  // Helper function to update the rolesWithPermissions state based on selected checkboxes
  const updateRolesWithPermissions = () => {
    const updatedRoles = rolesData.reduce((acc, item) => {
      const selectedPermissions = item.content
        .filter((innerItem) => innerItem.checked)
        .map((innerItem) => innerItem.value);

      if (selectedPermissions.length > 0) {
        acc.push({ title: item.title, permissions: selectedPermissions });
      }
      return acc;
    }, []);
    setRolesWithPermissions(updatedRoles);
  };

  // Update the rolesWithPermissions state whenever rolesData changes
  // This will recompute the selected checkboxes for the rolesWithPermissions
  // whenever the nested checkboxes are updated.
  useEffect(() => {
    updateRolesWithPermissions();
  }, [rolesData]);

  // Function to handle "Select all" checkbox change event
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;

    setSelectAllChecked(isChecked);

    // Update the state of all nested checkboxes
    setrolesData((prevData) =>
      prevData.map((item) => ({
        ...item,
        content: item.content.map((innerItem) => ({
          ...innerItem,
          checked: isChecked,
        })),
      }))
    );
  };


  function ModalContent() {
    return <>
      <DefaultInput placeholder="Enter Role Name" icon={false} />
      <br />
      <p className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Role Permissions:</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex flex justify-start">
          <p className="text-[#3b3f5c] text-md font-semibold mb-4 dark:text-white-light">Administrator Access</p>
          <Tippy content="Gives full system access" placement="top">
            <button className='mb-5'>  <AiOutlineInfoCircle /></button>
          </Tippy>
        </div>
        <div className="flex items-center">
          <DefaultCheckbox label="Select all" onChange={handleSelectAll} checked={selectAllChecked} />
        </div>
      </div>
      {/* <hr className="border-gray-300 my-4" /> */}
      {rolesData.map((item, id) => {
        const isMainCheckboxChecked = item.content.every(
          (innerItem) => innerItem.checked
        );
        return (
          <div key={item.id} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex items-center">
              <div key={item.id} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex items-center">
                  <label htmlFor={item.id} className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={isMainCheckboxChecked}
                      onChange={() => handleMainCheckboxChange(item.id)} />
                    <span className={"text-md font-semibold"}>{item.title}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {item.content.map((innerItem, innerId) => {
                return (
                  <div className='ml-5' key={innerItem.id}>
                    <label htmlFor={`${id}-${innerId}`} className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={innerItem.checked || false}
                        onChange={() => handleNestedCheckboxChange(item.id, innerItem.id)} />
                      <span className={"text-lg font-semibold"}>{innerItem.value}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      )}
      <div className="flex justify-start mt-5">
        <DefaultButtonComponent title={"Submit"} />
        <DefaultButtonComponent onClick={() => showRoleModalHandler(false)} color="none" className="ml-5" title={"Cancel"} />
      </div>
    </>;
  }

  return (
    <div>
      <div className="pt-5">
        {/* Responsive grid with one row and multiple columns */}
        <p className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Roles list</p>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {content.map((item) => (
            <div key={item.id}>{CardItem(item)}</div>
          ))}
        </div>
        <p className="text-[#3b3f5c] text-xl font-semibold  dark:text-white-light">Total users with their roles</p>
        <p className="text-gray-400 text-md font-semibold mb-2 ">Find all of your company’s administrator accounts and their associate roles.</p>
        <DefaultTable/>
      </div>
      <ModalContainer title="Edit Role" showModal={showRoleModal} handleModal={showRoleModalHandler}>
        {ModalContent()}
      </ModalContainer>
    </div>
  )
}

export default Index