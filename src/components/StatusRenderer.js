// components/CustomCellRenderer.js
import React from 'react';
import { ColorConstants } from 'src/constants/ColorConstants';
const StatusRenderer = ({ value }) => {
  const statusStyle = {
    padding: '3px , 16px , 10px , 5px',
    borderRadius: '50px',
    color: '#fff',
    fontWeight: '700',
    textAlign : 'center',
    fontSize: '14px',
    width:'84px',
    height:'35px'
  };

  let statusColor;
  let color 
  switch (value) {
    case 'Inactive':
      statusColor = ColorConstants.primaryColor;
      color = ColorConstants.white
      break;
    case 'Active':
      statusColor = ColorConstants.secondaryColor;
      color = ColorConstants.black
      break;
    default:
      statusColor = '#777';
  }

  return (
    <div style={{ ...statusStyle, backgroundColor: statusColor , color : color}}>
      {value}
    </div>
  );
};

export default StatusRenderer;
