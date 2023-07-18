import React from 'react';

const IconButton = ({ icon, label, onClick }) => {
    return (

        <button type="button" className={`btn btn-primary`} onClick={onClick} >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
        </button>
    );
};

export default IconButton;
