import React from 'react';
import { Grid } from '@mui/material';
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import HrTag from '../Hr/HrTag';

function PageTitle(title) {
    return <div>
        <span className="text-lg md:text-xl font-bold whitespace-prewrap flex text-center">
            {title}
        </span>
    </div>
}

function TableFields(data) {
    return (
        <>
            {data.map((item, index) => (
                <Grid key={index} px={3} columns={12} container className='mt-5'>
                    <Grid item xs={6} sm={3}>
                        <span className='font-bold text-sm md:text-lg'>{item.property}</span>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                    <span className='font-bold text-sm md:text-lg'>:</span>
                    </Grid>
                    <Grid item xs={5} sm={6}>
                        <span className='text-sm md:text-lg font-semibold'>{item.value}</span>
                    </Grid>
                </Grid>
            ))}
        </>
    );
}

function DetailView({ onBackClick,detail,title }) {
    return (
        <div className="w-full h-full block rounded-lg shadow-lg bg-white text-left p-2">
            <div className="grid grid-cols-12 m-1 gap-3">
                <div className="col-start-1 col-end-2 flex justify-center items-center">
                    <button
                        onClick={onBackClick}
                        type="button"
                        className="flex items-center  p-3 rounded text-sm w-24"
                    >
                        <span className="common-Font-Family ml-4">
                            <Tippy content="back">
                                <MdArrowBackIos size={20} />
                            </Tippy>
                        </span>
                    </button>
                </div>
                <div className="col-start-2 col-end-13 flex text-bold justify-start md:justify-center items-center">
                    {PageTitle(title)}
                </div>
            </div>
            <HrTag />
            <div className="w-full">
                {TableFields(detail)}
            </div>
        </div>
    );
}

export default DetailView;