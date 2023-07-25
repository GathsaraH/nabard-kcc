import React , {Fragment} from 'react';
import { Tab } from '@headlessui/react';
import DefaultForm from 'src/components/Forms/DefaultForm';
import CommonTable from 'src/components/Table/CommonTable';
import { useRouter } from 'next/router';
// Define the class names for the buttons based on their selected state
const buttonClassName = (selected) => {
  return `${selected ? 'bg-primary text-white !outline-none' : ''
    } -mb-[1px] block rounded p-4 py-3.5 text-md font-medium hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`;
};

// Define the tab titles
const tabTitles = ["Account Details", "Loan Details" , "Transaction Details" , "Claim Details"];

const Index = () => {
     const router = useRouter();
     const { title } = router.query;
     console.log("a" ,title);
  return (
    <div>
      <Tab.Group>
        {/* Render the tab titles */}
        {renderTabTitles()}

        {/* Render the tab content */}
        <Tab.Panels>
          {renderTabFirstContent()}
          {renderTabSecondContent()}
          {renderTabThirdContent()}
          {renderTabFourthContent()}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
// Function to render the fourth tab content 
function renderTabFourthContent(){
  const formFields = [
    { name: 'Scheme Type', label: 'Scheme  Type', type: 'text' , required : true},
    { name: 'Period', label: 'Period ', type: 'text' },
    {name : 'Type of Benefits' , label :'Type of Benefits' , type:'select',
      options: [
        {label :'Intrest Subvention' , value :'Intrest Subvention'},
        {label :'Subsidy' , value: 'Subsidy'},
        {label :'CGTMSE Fee' , value: 'CGTMSE Fee'},
      ]
  },
    { name: 'Amount of Benefit', label: 'Amount of Benefit', type: 'number' },
    {name : 'status' , label :'status' , type:'select',
      options: [
        {label :'approve' , value :'approve'},
        {label :'reject' , value: 'reject'},
      ]
  },
  {name:'date of status' , label :'date of status' , type:'date'},
  {name:'Effective Date' , label :'Effective Date' , type:'date'},
  {name:'Rate of intrest' , label :'Rate of intrest' , type:'number'},
  {name:'Date of Disbursement' , label :'Date of Disbursement' , type:'date'},
  {name:'Disbursemnt Amount' , label :'Disbursement Amount' , type:'number'},

    // You can add more form fields here as needed
  ];
  const handleFormSubmit = (formData) => {
    // Do something with the form data, e.g., submit it to a server
    console.log(formData);
  };
  return(
    <Tab.Panel>
      <div className='pt-5'>
      <p>Claim Details</p>
      <DefaultForm fields={formFields} onSubmit={handleFormSubmit} title={"Update"}/>
      </div>
    </Tab.Panel>
  )
}
// Function to render the third tab content 
function renderTabThirdContent(){
  const data = [
    ['15/10/2001', '15/10/2006', 'xyz' , '10000' , "20000" , "5000"],
    ['15/10/2001', '15/10/2006', 'xyz' , '10000' , "20000" , "5000"],
    ['15/10/2001', '15/10/2006', 'xyz' , '10000' , "20000" , "5000"],
    ['15/10/2001', '15/10/2006', 'xyz' , '10000' , "20000" , "5000"],
  ];
  
  const columns = ['Transaction Date', 'Value Date', 'Particulars' , 'Debit' , 'Credit' , 'Outstanding'];
  
  const CalculationData = [
    ['15/10/2001', '15/10/2006', 'xyz' , 'Credit' , "-" , "5000" , "10" , "15000"],
    ['15/10/2001', '15/10/2006', 'xyz' , 'Debit' , "-" , "5000" , "9" , "39000"],
    ['15/10/2001', '15/10/2006', 'xyz' , 'Debit' , "-" , "5000" ,"7" , "19000"],
    ['15/10/2001', '15/10/2006', 'xyz' , 'Credit' , "-" , "5000" ,"25" , "15500"],
  ];
  
  const details = ['Transaction Date', 'Value Date', 'Particulars' , 'Transcation Type' , 'Sub-Type' , 'Outstandings' , 'days' , 'Int. Sbv Amount'];
    return(
      <Tab.Panel>
        <div className='pt-5'>
          <b className='mb-5'>Transaction Details</b>
        <CommonTable columns={columns} data={data} />
          <br/>
          <hr/>
          <b className='mt-5'>Interest Subvention Calculation Details </b>
          <CommonTable columns ={details} data ={CalculationData}/>
        </div>
      </Tab.Panel>
    )
}
// Function to render the second tab content
function renderTabSecondContent() {
  const formFields = [
    { name: 'Application ID', label: 'Application ID', type: 'text' },
    { name: 'Scheme Name', label: 'Scheme Name ', type: 'text' },
    { name: 'Loan Limit', label: 'Loan Limit', type: 'number' },
    {name : 'Convergence with other Scheme' , label :'Convergence with other scheme' , type:'select',
      options: [
        {label :'yes' , value :'yes'},
        {label :'no' , value: 'no'}
      ]
  },
  {name : 'Asset Classification' , label :'Asset Classification' , type:'select',
  options: [
    {label :'NPA' , value :'NPA'},
    {label :'std' , value: 'Std'},
    {label :'Restructured' , value: 'Restructured'},
  ]
},
    { name: 'Date of NPA', label: 'Date of NPA', type: 'date' },
    { name: 'Sanction Date', label: 'Sanction Date', type: 'date' },
    { name: 'Installment type', label: 'Installment Type', type: 'text' },
    { name: 'Repayment Start Date', label: 'Repayment Start Date', type: 'date' },
    { name: 'First Disbursement Date', label: 'First Disbursement Date', type: 'date' },
    {name : 'Claim Type' , label :'Claim Type' , type:'select',
    options: [
      {label :'Subvention' , value :'Subvention'},
      {label :'Subsidy' , value: 'Subsidy'},
    ]
  },
  { name: 'Restructured/Rephasement Date', label: 'Restructured/Rephasement Date', type: 'date' },

    
    // You can add more form fields here as needed
  ];
  const handleFormSubmit = (formData) => {
    // Do something with the form data, e.g., submit it to a server
    console.log(formData);
  };
  return (
    <Tab.Panel>
      <div className='pt-5'>
       <DefaultForm fields={formFields} onSubmit={handleFormSubmit} title={"Update"}/>
      </div>
    </Tab.Panel>
  );
}

// Function to render the first tab content
function renderTabFirstContent() {
  const formFields = [
    { name: 'Bank Name', label: 'Bank Name', type: 'text' },
    { name: 'Branch Name', label: 'Branch Name ', type: 'text' },
    { name: 'Account No.', label: 'Account No.', type: 'number' },
    { name: 'IFSC', label: 'IFSC', type: 'number' },
    { name: 'Account Opening Date', label: 'Account Opening Date', type: 'date' },
    {name : 'Claim Period' , label :'Claim Period' , type:'select',
      options: [
        {label :'10days' , value :'10days'},
        {label :'15days' , value: '15dyas'},
        {label :'30days' , value :'30days'},
      ]
  }
    // You can add more form fields here as needed
  ];
  const handleFormSubmit = (formData) => {
    // Do something with the form data, e.g., submit it to a server
    console.log(formData);
  };
  return (
    <Tab.Panel>
      <div className="active pt-5">
        <DefaultForm fields={formFields} onSubmit={handleFormSubmit} title={"Update"}/>
      </div>
    </Tab.Panel>
  );
}

// Function to render the tab titles
function renderTabTitles() {
  return (
    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
      {tabTitles.map((item) => {
        return (
          <Tab as={Fragment}>
            {({ selected }) => (
              <button className={buttonClassName(selected)}>
                {item}
              </button>
            )}
          </Tab>
        );
      })}
    </Tab.List>
  );
}

export default Index;
