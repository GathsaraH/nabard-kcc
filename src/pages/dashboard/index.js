import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Dropdown from 'src/layouts/Dropdown';
import { setPageTitle } from 'store/themeConfigSlice';
import Index from '../datatables';
import ChartSvg from 'src/assets/svg/ChartSvg';
import TableSvg from 'src/assets/svg/TableSvg';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const Analytics = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Analytics Admin'));
    });

    const isDark = useSelector((state) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [isMounted, setIsMounted] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    });

    const handleToggle = () => {
        setIsToggled(!isToggled);
        setIsMounted(isToggled ? false : true);
      };
    // totalVisitOptions

    const totalVisit = {
        series: [{ data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25] }],
        options: {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#009688',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#009688'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    // paidVisitOptions
    const paidVisit = {
        series: [{ data: [22, 19, 30, 47, 32, 44, 34, 55, 41, 69] }],
        options: {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#e2a03f',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#e2a03f'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    // uniqueVisitorSeriesOptions
    const uniqueVisitorSeries = {
        series: [
            {
                name: 'Direct',
                data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
            },
            {
                name: 'Organic',
                data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
            },
        ],
        options: {
            chart: {
                height: 360,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                colors: ['transparent'],
            },
            colors: ['#5c1ac3', '#ffbb44'],
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#515365',
                opacity: 0.4,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: {
                    show: true,
                    color: isDark ? '#3b3f5c' : '#e0e6ed',
                },
            },
            yaxis: {
                tickAmount: 6,
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.8,
                    stops: [0, 100],
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
            },
        },
    };
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Analytics</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        {/* statistics */}
                        <div className="mb-5 flex justify-between dark:text-white-light">
                            <h5 className="text-lg font-semibold ">Statistics</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={
                                        <svg className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    }
                                >
                                    <ul>
                                        <li>
                                            <button type="button">This Week</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Week</button>
                                        </li>
                                        <li>
                                            <button type="button">This Month</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Month</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="grid gap-8 text-sm font-bold text-[#515365] sm:grid-cols-2">
                            <div>
                                <div>
                                    <div>Total Visits</div>
                                    <div className="text-lg text-[#f8538d]">423,964</div>
                                </div>
                                {isMounted && <ReactApexChart series={totalVisit.series} options={totalVisit.options} type="line" height={58} width={'100%'} />}
                            </div>

                            <div>
                                <div>
                                    <div>Paid Visits</div>
                                    <div className="text-lg text-[#f8538d]">7,929</div>
                                </div>

                                {isMounted && <ReactApexChart series={paidVisit.series} options={paidVisit.options} type="line" height={58} width={'100%'} />}
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full">
                        <div className="mb-5 flex justify-between dark:text-white-light">
                            <h5 className="text-lg font-semibold ">Expenses</h5>

                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={
                                        <svg className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    }
                                >
                                    <ul>
                                        <li>
                                            <button type="button">This Week</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Week</button>
                                        </li>
                                        <li>
                                            <button type="button">This Month</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Month</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className=" my-10 text-3xl font-bold text-[#e95f2b]">
                            <span>$ 45,141 </span>
                            <span className="text-sm text-black ltr:mr-2 rtl:ml-2 dark:text-white-light">this week</span>
                            <svg className="inline text-success" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.5"
                                    d="M22 7L14.6203 14.3347C13.6227 15.3263 13.1238 15.822 12.5051 15.822C11.8864 15.8219 11.3876 15.326 10.3902 14.3342L10.1509 14.0962C9.15254 13.1035 8.65338 12.6071 8.03422 12.6074C7.41506 12.6076 6.91626 13.1043 5.91867 14.0977L2 18"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path d="M22.0001 12.5458V7H16.418" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                <div
                                    className="relative h-full w-full rounded-full bg-gradient-to-r from-[#4361ee] to-[#805dca] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                    style={{ width: '65%' }}
                                ></div>
                            </div>
                            <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">57%</span>
                        </div>
                    </div>
                    <div className="panel h-full">
                        <div className="mb-5 flex justify-between dark:text-white-light">
                            <h5 className="text-lg font-semibold ">Expenses</h5>

                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={
                                        <svg className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    }
                                >
                                    <ul>
                                        <li>
                                            <button type="button">This Week</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Week</button>
                                        </li>
                                        <li>
                                            <button type="button">This Month</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Month</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className=" my-10 text-3xl font-bold text-[#e95f2b]">
                            <span>$ 45,141 </span>
                            <span className="text-sm text-black ltr:mr-2 rtl:ml-2 dark:text-white-light">this week</span>
                            <svg className="inline text-success" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.5"
                                    d="M22 7L14.6203 14.3347C13.6227 15.3263 13.1238 15.822 12.5051 15.822C11.8864 15.8219 11.3876 15.326 10.3902 14.3342L10.1509 14.0962C9.15254 13.1035 8.65338 12.6071 8.03422 12.6074C7.41506 12.6076 6.91626 13.1043 5.91867 14.0977L2 18"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path d="M22.0001 12.5458V7H16.418" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                <div
                                    className="relative h-full w-full rounded-full bg-gradient-to-r from-[#4361ee] to-[#805dca] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                    style={{ width: '65%' }}
                                ></div>
                            </div>
                            <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">57%</span>
                        </div>
                    </div>

                </div>

                <div className="mb-6 grid gap-6 lg:grid-cols-3">
                    <div className="panel h-full p-0 lg:col-span-2">
                        <div className="mb-5 flex items-start justify-between border-b border-white-light p-5  dark:border-[#1b2e4b] dark:text-white-light">
                            <h5 className="text-lg font-semibold ">Unique Visitors</h5>
                            <div className="dropdown">
                                <p onClick={handleToggle}>{isToggled ? <ChartSvg/> : <TableSvg/>}</p>
                            </div>
                        </div>

                        {!isToggled ? <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} width={'100%'} /> : <Index/> }
                    </div>

                    <div className="panel h-full">
                        <div className="-mx-5 mb-5 flex items-start justify-between border-b border-white-light p-5 pt-0  dark:border-[#1b2e4b] dark:text-white-light">
                            <h5 className="text-lg font-semibold ">Activity Log</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={
                                        <svg className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    }
                                >
                                    <ul>
                                        <li>
                                            <button type="button">View All</button>
                                        </li>
                                        <li>
                                            <button type="button">Mark as Read</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <PerfectScrollbar className="perfect-scrollbar relative h-[360px] ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3">
                            <div className="space-y-7">
                                <div className="flex">
                                    <div className="relative z-10 shrink-0 before:absolute before:top-10 before:left-4 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white shadow shadow-secondary">
                                            <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold dark:text-white-light">
                                            New project created :{' '}
                                            <button type="button" className="text-success">
                                                [VRISTO Admin Template]
                                            </button>
                                        </h5>
                                        <p className="text-xs text-white-dark">27 Feb, 2020</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="relative z-10 shrink-0 before:absolute before:top-10 before:left-4 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-white shadow-success">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold dark:text-white-light">
                                            Mail sent to{' '}
                                            <button type="button" className="text-white-dark">
                                                HR
                                            </button>{' '}
                                            and{' '}
                                            <button type="button" className="text-white-dark">
                                                Admin
                                            </button>
                                        </h5>
                                        <p className="text-xs text-white-dark">28 Feb, 2020</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="relative z-10 shrink-0 before:absolute before:top-10 before:left-4 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.5" d="M4 12.9L7.14286 16.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20.0002 7.5625L11.4286 16.5625L11.0002 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold dark:text-white-light">Server Logs Updated</h5>
                                        <p className="text-xs text-white-dark">27 Feb, 2020</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="relative z-10 shrink-0 before:absolute before:top-10 before:left-4 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-danger text-white">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.5" d="M4 12.9L7.14286 16.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20.0002 7.5625L11.4286 16.5625L11.0002 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold dark:text-white-light">
                                            Task Completed :
                                            <button type="button" className="ml-1 text-success">
                                                [Backup Files EOD]
                                            </button>
                                        </h5>
                                        <p className="text-xs text-white-dark">01 Mar, 2020</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="relative z-10 shrink-0 before:absolute before:top-10 before:left-4 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning text-white">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z"
                                                    fill="currentColor"
                                                />
                                                <path opacity="0.5" d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold dark:text-white-light">
                                            Documents Submitted from <button type="button">Sara</button>
                                        </h5>
                                        <p className="text-xs text-white-dark">10 Mar, 2020</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="shrink-0 ltr:mr-2 rtl:ml-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dark text-white">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    d="M2 17C2 15.1144 2 14.1716 2.58579 13.5858C3.17157 13 4.11438 13 6 13H18C19.8856 13 20.8284 13 21.4142 13.5858C22 14.1716 22 15.1144 22 17C22 18.8856 22 19.8284 21.4142 20.4142C20.8284 21 19.8856 21 18 21H6C4.11438 21 3.17157 21 2.58579 20.4142C2 19.8284 2 18.8856 2 17Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    opacity="0.5"
                                                    d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2H18C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6C22 7.88562 22 8.82843 21.4142 9.41421C20.8284 10 19.8856 10 18 10H6C4.11438 10 3.17157 10 2.58579 9.41421C2 8.82843 2 7.88562 2 6Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path d="M11 6H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M6 6H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M11 17H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M6 17H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold dark:text-white-light">Server rebooted successfully</h5>
                                        <p className="text-xs text-white-dark">06 Apr, 2020</p>
                                    </div>
                                </div>
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
