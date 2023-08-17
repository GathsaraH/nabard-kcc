import Image from 'next/image'
import React from 'react'
import nabardLogo from 'src/assets/images/nabardGreenLogo.png'

const navLinks = [
    {
        title: 'About Scheme',
        link: '/about/schemes',
    },
    {
        title: 'Dashboard',
        link: '#',
    },
    {
        title: 'Documents',
        link: '#',
    },
    {
        title: 'Notifications',
        link: '#',
    },
    {
        title: 'Support',
        link: '#',
    },
]

const NavbarLandingPage = () => { 
    return (
        <>

            <nav className="bg-white border-gray-200 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center">
                        <Image width={150} height={100} src={nabardLogo} className="h-10 mr-3 " alt="Flowbite Logo" />
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 19.5H0V22.5H24V19.5Z" fill="#286435" />
                            <path d="M24 10.5H0V13.5H24V10.5Z" fill="#286435" />
                            <path d="M24 1.5H0V4.50003H24V1.5Z" fill="#286435" />
                        </svg>

                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-primary md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                            </li>
                            {
                                navLinks.map((link, index) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <li key={index}>
                                        <a href={link.link} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{link.title}</a>

                                    </li>
                                ))
                            }
                            
                        </ul>
                        
                    </div>
                    
                </div>
            </nav>

        </>
    )
}

export default NavbarLandingPage