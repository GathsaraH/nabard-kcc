import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import { HrTag } from 'src/constants/ResponsiveClassName'
import { FaUsers } from 'react-icons/fa'
import { BsCardList } from 'react-icons/bs'

const Index = () => {

    const commonIconProps = {
        className: 'text-primary',
        size: 35,
    };

    const settingsArray = [
        {
            title: "Attributes Module",
            desc: "This module allows you to manage various attributes such as state, district, subdistrict, and more.",
            icons: <BsCardList {...commonIconProps} />
        },
        {
            title: "User Logs & Activity",
            desc: "With this module, you can view all user logs related to each task.",
            icons: <FaUsers {...commonIconProps} />
        },
        {
            title: "Members login & Security",
            desc: "Manage your members and their login security like reset password, change password, and more.",
            icons: <FaUsers {...commonIconProps} />
        }
    ];

    return (
        <div>
            <div className='bg-white p-4'>
                <span className='text-xl text-primary font-bold'>General</span>
                <HrTag />
                <div className='p-5'>
                    <Grid container spacing={2}>
                        {
                            settingsArray.map((item) => {
                                return (
                                    <Grid key={item.title} item xs={12} sm={6} md={4} lg={4}>
                                        <Card elevation={2} style={{ height: '100%' }}>
                                            <CardContent >
                                                <div className="flex items-center flex-col sm:flex-row">
                                                    <div className="mb-4 sm:mb-20">
                                                        {item.icons}
                                                    </div>
                                                    <div className="flex-1 ltr:sm:pl-5 rtl:sm:pr-z text-center sm:text-left">
                                                        <h5 className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">{item.title}</h5>
                                                        <p className="font-semibold text-white-dark mt-4 sm:mt-8">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default Index
