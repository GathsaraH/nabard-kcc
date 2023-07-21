import { useRouter } from 'next/router'
import React from 'react'
import BankAccountTable from 'src/pages/datatables/BankAccountTable'

const Index = () => {
  const router = useRouter()
  return (
    <div>
      <BankAccountTable userId={router.query.beneficiaryId} />
    </div>
  )
}

export default Index