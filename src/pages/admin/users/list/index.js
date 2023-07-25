import React from 'react'
import UserTable from 'src/components/Table/UserTable'



const Index = () => {
  return (
    <div>
        <p className="text-2xl font-bold">User List</p>
        <hr/>
        <br/>
        <div>
          <UserTable/>
        </div>
    </div>
  )
}

export default Index