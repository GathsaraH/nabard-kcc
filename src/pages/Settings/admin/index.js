import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import { HrTag } from 'src/constants/ResponsiveClassName'
import {FaUsers} from 'react-icons/fa'
const Index = () => {

    const settingsArray = [{ title: "Attributes Set", desc: "Manage user logs", icons: <FaUsers /> }]

    return (
        <div>
            <div className='bg-white p-4'>
                <span className='text-xl text-primary font-bold' >General</span>
                <HrTag />
                <Grid container spacing={2}>
                    {
                        settingsArray.map((item, index) => {
                            return (<Grid key={item.title} item xs={3} sm={3} md={3} lg={3}>
                                <Card>
                                    <CardContent >
                                    {item.icons}
                                        <span className='text-xl font-semibold' >{item.title} </span>
                                        <br />
                                        <div className='p-3' >
                                            <span className='text-md font-normal' >{item.desc} </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>)
                        })
                    }

                </Grid>
            </div>
        </div>
    )
}

export default Index