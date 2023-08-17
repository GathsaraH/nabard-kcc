import React from 'react';
import { ColorConstants } from 'src/constants/ColorConstants';

const StatusRenderer = ({ value }) => {
  let statusColor;
  let textColor;
  switch (value) {
    case 'Inactive':
      statusColor = ColorConstants.primaryColor;
      textColor = ColorConstants.white;
      break;
    case 'Active':
      statusColor = ColorConstants.secondaryColor;
      textColor = ColorConstants.black;
      break;
    default:
      statusColor = '#777';
      textColor = '#fff';
  }

  return (
    <div
      className={`rounded-full text-white font-semibold text-center text-sm py-1 px-4 w-20 mt-2`}
      style={{ backgroundColor: statusColor, color: textColor }}
    >
      {value}
    </div>
  );
};

export default StatusRenderer;
