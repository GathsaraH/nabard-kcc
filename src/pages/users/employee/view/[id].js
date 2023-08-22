import React from 'react'
import { useRouter } from 'next/router'
import DetailView from 'src/components/DetailView';

const organizationUser = [
    { property: "Name of the RO", value: "Gujarat RO" },
    { property: "Name of the DDM", value: "Vadodara" },
    { property: "Designation", value: "Manager" },
    { property: "Mobile", value: "9563345698" },
    { property: "Office Address", value: "A 407 mahal Society BH Complex templte,Vadodara,Gujarat" },
    { property: "State", value: "Gujarat" },
    { property: "District", value: "Vadodara" },
    { property: "Area Of Operation", value: "Vadodara,Anand,Ahmedabad" },
]
const Index = () => {
    const router = useRouter();
    const title = "Ranjeet Gautam"

    return (
        <div>
            {/* <BankAccountTable userId={router.query.beneficiaryId} /> */}
            <DetailView
                onBackClick={() => router.back()}
                detail={organizationUser}
                title={title}
            />
        </div>
    )
}

export default Index