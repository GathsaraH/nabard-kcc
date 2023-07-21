import React, { useEffect, useState } from 'react';
import DefaultCheckbox from '../Input/CheckBox/DefaultCheckBox';

const RolesAccordion = ({ items }) => {
    const [activeIndexes, setActiveIndexes] = useState([]);

    const [gettingData, setGettingData] = useState(items);
    const [rolesWithPermissions, setRolesWithPermissions] = useState([]);

    const toggleAccordion = (index) => {
        setActiveIndexes((prevIndexes) => {
            if (prevIndexes.includes(index)) {
                // If the index is already in the activeIndexes array, remove it
                return prevIndexes.filter((item) => item !== index);
            } else {
                // If the index is not present in the activeIndexes array, add it
                return [...prevIndexes, index];
            }
        });
    };

    // Helper function to update the state of the nested checkboxes
    const handleNestedCheckboxChange = (itemId, innerItemId) => {
        setGettingData((prevData) =>
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
        setGettingData((prevData) =>
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
        const updatedRoles = gettingData.reduce((acc, item) => {
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

    // Update the rolesWithPermissions state whenever gettingData changes
    // This will recompute the selected checkboxes for the rolesWithPermissions
    // whenever the nested checkboxes are updated.
    useEffect(() => {
        updateRolesWithPermissions();
    }, [gettingData]);

    return (
        <div className="space-y-2">
            {console.log(rolesWithPermissions)}
            {gettingData.map((item, id) => {
                const isMainCheckboxChecked = item.content.every(
                    (innerItem) => innerItem.checked
                );

                return (
                    <div className="border border-gray-300 rounded p-2" key={id}>
                        <button
                            type="button"
                            className="w-full flex items-center justify-between focus:outline-none"
                            onClick={() => toggleAccordion(id)}
                        >
                            <label htmlFor={item.id} className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={isMainCheckboxChecked}
                                    onChange={() => handleMainCheckboxChange(item.id)}
                                />
                                <span className={"text-lg font-semibold"}>{item.title}</span>
                            </label>
                            <span className="transform transition-transform">
                                {activeIndexes?.includes(id) ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                )}
                            </span>
                        </button>
                        {activeIndexes.includes(id) && <hr />}
                        {activeIndexes.includes(id) && (
                            <div className="mt-2">
                                {item.content.map((innerItem, innerId) => {
                                    return (
                                        <div key={innerId}>
                                            <label htmlFor={`${id}-${innerId}`} className="flex cursor-pointer items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox"
                                                    checked={innerItem.checked || false}
                                                    onChange={() =>
                                                        handleNestedCheckboxChange(item.id, innerItem.id)
                                                    }
                                                />
                                                <span className={"text-lg font-semibold"}>{innerItem.value}</span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    </div>
                );
            })}
        </div>
    );
};

export default RolesAccordion;
