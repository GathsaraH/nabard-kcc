import React from 'react';
import DefaultButtonComponent from 'src/components/Button/DefaultButtonComponent';

const Index = () => {
  const content = [
    { title: "Terms and Conditions", content: "Manage terms and conditions content." },
    { title: "Privacy Policy", content: "Manage Privacy Policy content." },
    { title: "Support", content: "Manage Support requests." },
    // Add more items as needed
  ];

  function CardItem(item) {
    return (
      <div className="mb-5 flex justify-between dark:text-white-light">
        <div className=" w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
          <div className="py-7 px-6">
            <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">{item.title}</h5>
            <p className="text-white-dark">{item.content}</p>
           <div className='mt-5' >
           <DefaultButtonComponent title="Manage" />
           </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-5">
        {/* Responsive grid with one row and multiple columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {content.map((item, index) => (
            <div key={index}>{CardItem(item)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
