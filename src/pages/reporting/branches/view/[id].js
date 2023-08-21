import React from 'react'
import HrTag from 'src/components/Hr/HrTag';
import { Grid } from '@mui/material';
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import DetailView from 'src/components/DetailView';

const bankAndBranchDetail = [
    { property: "Bank Type", value: "PSB" },
    { property: "Bank Name ", value: "Bank Of Baroda" },
    { property: "Branch Name", value: "Ved Road" },
    { property: "IFSC Code", value: "BARBUYTR054" },
    { property: "Branch Category", value: "Rural" },
    { property: "KCC Target", value: "Gujarat" },
    { property: "State", value: "Vadodara" },
    { property: "Block", value: "D L Block" },
    { property: "District", value: "Vadodara" },
    { property: "Targeted Application", value: "5000" },
]
const Index = () => {
    const router = useRouter();
    const title="Details of the Reporting Bank & Branch"  

    return (
        <div>
            {/* <BankAccountTable userId={router.query.beneficiaryId} /> */}
            <DetailView
                onBackClick={() => router.back()}
                detail={bankAndBranchDetail}
                title={title}
            />
        </div>
    )
}

export default Index