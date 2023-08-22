import React from 'react'
import { useRouter } from "next/router";
import DetailView from 'src/components/DetailView';

const campaignDetail = [
    { property: "Name of the Campaign", value: "Awareness" },
    { property: "Organization Institution", value: "Details of the Awareness & Outreach Camp" },
    { property: "State", value: "Gujarat" },
    { property: "District", value: "Vadodara" },
    { property: "Block", value: "D Block" },
    { property: "Village", value: "Ved Road" },
    { property: "Camp Date", value: "10 Aug 2023" },
    { property: "Participated-Farmers", value: "10" },
    { property: "Participated-Others", value: "10" },

]
const Index = () => {
    const router = useRouter();
    const title="Details of the Awareness & Outreach Camp"
  
    return (
        <div>
            {/* <BankAccountTable userId={router.query.beneficiaryId} /> */}
            <DetailView
            onBackClick={() => router.back()}
            detail={campaignDetail}
            title={title}
        />           
            </div>
    )
}

export default Index