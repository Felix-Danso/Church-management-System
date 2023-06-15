import React from 'react'
import MembersTable from '../MembersTable'

const Members = () => {
  return (
    <div>
          <MembersTable
                  heads={[
                      'Name',
                      'Tithe',
                      'Department',
                      'Contact',
                      'Date Joined',
                      'Status',
                  ]}
                  details={""}
              /> 
      
    </div>
  )
}

export default Members
