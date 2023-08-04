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
                <span className='text-xl text-primary font-bold' >General</span>
                <HrTag />
                <div className='p-5' >
                <Grid container spacing={2}>
                    {
                        settingsArray.map((item, index) => {
                            return (<Grid key={item.title} item xs={3} sm={3} md={3} lg={3}>
                                <Card elevation={3} style={{ height: '150px' }} >
                                    <CardContent>
                                        <div className="flex items-center"> {/* Flex container to place icon and title horizontally */}
                                            {item.icons}
                                            <span className="text-xl font-semibold ml-2 text-primary">{item.title}</span>
                                        </div>
                                        <br />
                                        <div className="ml-10">
                                            <span className="text-md font-normal">{item.desc}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>)
                        })
                    }

                </Grid>
                </div>
            </div>
        </div>
    )
}

export default Index