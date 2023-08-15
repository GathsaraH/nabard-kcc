export const ResponsiveClassName = {
  kccLoanRequestLoanPurpose:
    "grid lg:grid-cols-12 m-3 text-base font-bold shadow-md sm:rounded-lg bg-white rounded border border-gray-200 borde-5",
  MobileApplicantDetails:
    "text-left mb-2 md:mb-0 md:col-start-1 md:col-end-3 md:text-right",
  START: "justify-start",
  END: "justify-end",
  responsiveFour2Col1Col:
    "grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 sm:flex-col sm:flex-row",
  responsiveFour4ColParent:
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 m-5 gap-5",
  responsiveFour3ColParent:
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 m-5 gap-5",
  responsiveFour3ColChild:
    "col-span-1 sm:col-span-4 md:col-span-1 lg:col-span-4 mt-1 ml-1",
   
};

export function OneRowMultipleCol({ cols, children }) {
  return <div className={`grid grid-cols-${cols}`}>{children}</div>;
}

export function SpanTitle({ children }) {
  return <span className="font-bold">{children}</span>;
}
export function HrTag() {
  return (
    <div className="col-start-1 col-end-13 m-2">
      <hr className="border-gray-300"></hr>
      <span className="m-t10"></span>
    </div>
  );
}