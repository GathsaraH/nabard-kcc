import React from 'react'
import DefaultButtonComponent from 'src/components/Button/DefaultButtonComponent'
import CardContainer from 'src/components/Card/CardContainer'

const Index = () => {
    //make usestate for my component here 
    const [users, setUsers] = React.useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: ''

    })

    //make a function to handle the change of the input
    const handleChange = (e) => {
        const {id, value} = e.target
        setUsers({
            ...users,
            [id]: value
        })
    }



    return (
        <div>
            <p className="text-2xl font-bold">Create User</p>
            <hr/>
            <br/>
            <CardContainer> 
                <form className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="gridEmail">Full Name</label>
                            <input onChange={handleChange} id="name" type="email" placeholder="Enter Email" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="gridPassword">Email</label>
                            <input onChange={handleChange} id="email" type="text" placeholder="Enter Password" className="form-input" />
                        </div>
                    </div>  
                    <div>
                        <label htmlFor="gridAddress1">Phone</label>
                        <input onChange={handleChange} id="phone" type="text" placeholder="Enter Address" className="form-input" />
                    </div>
                    <div>
                        <label htmlFor="gridAddress1">Address</label>
                        <input onChange={handleChange} id="address" type="text" placeholder="Enter Address" className="form-input" />
                    </div>
                    <div>
                        <label htmlFor="gridAddress2">Address2</label>
                        <input onChange={handleChange} id="address2" type="text" placeholder="Enter Address2"s className="form-input" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <label htmlFor="gridCity">City</label>
                            <input onChange={handleChange} id="city" type="text" placeholder="Enter City" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="gridState">State</label>
                            <select onChange={handleChange} id="state" className="form-select text-white-dark">
                                <option>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gridZip">Zip</label>
                            <input onChange={handleChange} id="zip" type="text" placeholder="Enter Zip" className="form-input" />
                        </div>
                    </div>
                    <DefaultButtonComponent title="Submit" />
                </form>
            </CardContainer>

        </div>
    )
}

export default Index