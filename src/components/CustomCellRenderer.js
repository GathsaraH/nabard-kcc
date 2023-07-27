// components/CustomCellRenderer.js
import React from 'react';
import Dropdown from './Dropdown';
import { BiDotsVertical } from 'react-icons/bi';
import styles from './CustomCellRenderer.module.css';
const CustomCellRenderer = () => {
 

  return (
       <>
        <div className="dropdown">
    <Dropdown
        btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
        button={
          <BiDotsVertical size={25} style={{margin:'6px'}}/>
        }
    >
        <ul className={styles.dropdown} >
            <li>
                <button type="button">
                    Action
                </button>
            </li>
            <li>
                <button type="button">
                    Another action
                </button>
            </li>
            <li>
                <button type="button">
                    Something else here
                </button>
            </li>
            <li>
                <button type="button">
                    Separated link
                </button>
            </li>
        </ul>
    </Dropdown>
</div>
       </>
  );
};

export default CustomCellRenderer;
