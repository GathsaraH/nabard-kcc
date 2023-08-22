import { Card, CardContent, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import CardContainer from "src/components/Card/CardContainer";
import SelectInput from "src/components/Input/Select/SelectInput";
import { formatIndianNumber } from "src/hooks/NumberSystem/useIndianFormatHook";

const isDark = false;

const mappingSelectOptions = [
  { value: "1", label: "KCC - Crop - Small Farmer" },
  { value: "2", label: "KCC - Crop - Medium Farmer" },
  { value: "3", label: "KCC - Crop - Large Farmer" }
]

const data = [
  {
    id: 1,
    Title: "Received Application",
    number: "02K",
    amount: formatIndianNumber("100000"),
  },
  {
    id: 2,
    Title: "Sanction Application",
    number: "02K",
    amount: formatIndianNumber("100000"),
  },
  {
    id: 3,
    Title: "Rejected Application",
    number: "02K",
    amount: formatIndianNumber("100000"),
  },
];
const dataSelectMapping = [
  {
    id: 1,
    Title: "No Of Application",
    amount: formatIndianNumber("100000"),
  },
  {
    id: 2,
    Title: "Application Amount",
    amount: formatIndianNumber("100000"),
  },
  {
    id: 3,
    Title: "No Of Bank In Disctrict",
    amount: formatIndianNumber("100000"),
  },
];

const FirstSection = () => {
  const [applicationMapping, setapplicationMapping] = useState("")


  const handleApplicationMapping = (e) => {
    setapplicationMapping(e.target.value)
  }

  const revenueChart = {
    series: [
      {
        name: "Income",
        data: [
          16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000,
          14000, 17000,
        ],
      },
      {
        name: "Expenses",
        data: [
          16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000,
          18000, 19000,
        ],
      },
    ],
    options: {
      chart: {
        height: "100%",
        type: "area",
        fontFamily: "Nunito, sans-serif",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        width: 2,
        lineCap: "square",
      },
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 10,
        left: -7,
        top: 22,
      },
      colors: isDark ? ["#2196F3", "#E7515A"] : ["#1B55E2", "#E7515A"],
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: "#1B55E2",
            strokeColor: "transparent",
            size: 7,
          },
          {
            seriesIndex: 1,
            dataPointIndex: 5,
            fillColor: "#E7515A",
            strokeColor: "transparent",
            size: 7,
          },
        ],
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          offsetX: true ? 2 : 0,
          offsetY: 5,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: (value) => {
            return `${value / 1000}K`;
          },
          offsetX: -10,
          offsetY: 0,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-yaxis-title",
          },
        },
        opposite: false,
      },
      grid: {
        borderColor: isDark ? "#191E3A" : "#E0E6ED",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left", // Change from 'right' to 'left'
        fontSize: "16px",
        markers: {
          width: 10,
          height: 10,
          offsetX: 2, // Change to 2 from -2
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: isDark ? 0.19 : 0.28,
          opacityTo: 0.05,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
    },
  };

  function statusBox(item) {
    return (
      <div className={`p-2 mt-2 border border-solid border-2 border-[#EEF2F0]`}>
        <div className="flex flex-col ">
          <h5 className="text-lg font-semibold ">{item.Title}</h5>
          <div>
            {" "}
            <h5 className="text-xl font-bold ">{item.amount}</h5>
          </div>
        </div>
      </div>
    );
  }

  function textFieldHeaders() {
    return (
      <div className="flex flex-wrap gap-1 mb-4 justify-around sm:justify-start px-0 sm:px-4">
        <div className="py-5 sm:py-0">
          <TextField
            id="outlined-basic"
            label={"Date"}
            name="date"
            variant="outlined"
            size="small"
          />
        </div>

        <div className="py-2 sm:py-0 px-2">
          <TextField
            id="outlined-basic"
            label={"Start Date"}
            name="startDate"
            variant="outlined"
            size="small"
          />
        </div>

        <div className="py-2 sm:py-0 px-2">
          <TextField
            id="outlined-basic"
            label={"End Date"}
            name="endDate"
            variant="outlined"
            size="small"
          />
        </div>

        <div className="py-2 sm:py-0 px-2">
          <TextField
            id="outlined-basic"
            label={"Location"}
            name="location"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="py-2 sm:py-0 px-2">
          <TextField
            id="outlined-basic"
            label={"Bank"}
            name="bank"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="py-2 sm:py-0 px-2">
          <TextField
            id="outlined-basic"
            label={"Application"}
            name="application"
            variant="outlined"
            size="small"
          />
        </div>

        {/* <div className="px-2">
  <IconButton label="Add Stakeholder Hierarchy" className="btn-outline-primary" icon={<AiOutlinePlus />} onClick={AddStakeholderHierarchy} />
  </div> */}
      </div>
    );
  }
  return (
    <div className="py-2">
      <CardContainer>
        <div className="flex p-4 justify-between">
          <span className="font-bold text-lg mt-1">Application </span>
          <div className="mt-5 sm:mt-0">
            <span className="font-bold text-md mt-1 text-primary">Reset</span>
          </div>
        </div>
        {textFieldHeaders()}
        <div className="flex flex-col lg:flex-row px-4 gap-12">
          <div className="w-full sm:w-1/4 grid sm:grid-col-1 lg:grid-col-2">
            {data.map((item) => {
              return <div key={item.id}>{statusBox(item)}</div>;
            })}
          </div>
          <div className="mt-5 sm:mt-0 w-full">
            <div className="rounded-lg bg-white dark:bg-black">
              <ReactApexChart
                series={revenueChart.series}
                options={revenueChart.options}
                type="area"
                height={320}
                width={"90%"}
              />
            </div>
          </div>
        </div>
        <div className="w-full grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-3">
          <Card>
            <CardContent>
              <div className="flex flex-col " >
                <span className="font-bold text-lg" >Application Mapping</span>
                <div className="py-4 mr-4" >
                  <SelectInput onChange={handleApplicationMapping} value={applicationMapping} wdith={"100%"} label="Select Mapping" options={mappingSelectOptions} />
                  {/* <div className="flex flex-col " >
                    <span className="font-bold text-lg" >Application Mapping</span>
                    <span className="font-bold text-lg" >Application Mapping</span>

                  </div> */}
                  <div className="py-4">
                    {
                      dataSelectMapping.map((item) => {
                        return (
                          <div key={item.id} className={`p-2 mt-4`}>
                            <div className="flex flex-col ">
                              <h5 className="text-lg font-semibold ">{item.Title}</h5>
                              <div>
                                {" "}
                                <h5 className="text-xl font-bold ">{item.amount}</h5>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
            <div className="flex flex-col " >
            <span className="font-bold text-lg" >Application Mapping</span>
                    
            </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>1</CardContent>
          </Card>
        </div>
      </CardContainer>
    </div>
  );
};

export default FirstSection;
