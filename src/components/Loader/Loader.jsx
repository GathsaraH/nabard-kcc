import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-50 backdrop-filter backdrop-blur-sm"
    >
      <CircularProgress style={{ color: '#006600' }} size={60} />
      <p className="text-2xl text-black font-bold text-primary">Loading...</p>
    </div>
  );
};

export default Loader;
