export const SideBarMenuOptions = [
    {
        title: 'Home',
        link: '/',
        icon: homeIcon,
    },
    {
        title: 'Dashboard',
        link: '/dashboard',
        icon: dashboardIcon,
    },
    {
        title: 'Organizations',
        icon: orginazationIcon,
        subMenu: [
            {
                title: 'Central Government',
                link: '/Organizations/Central-government',
                icon: homeIcon,
            },
            {
                title: 'State Government',
                link: '/Organizations/State-government',
                icon: homeIcon,
            },
            {
                title: 'Agencies',
                link: '/Organizations/Agencies',
                icon: homeIcon,
            },
            {
                title: 'NABARD',
                link: '/Organizations/NABARD',
                icon: homeIcon,
            },
        ],
    },
    {
        title: 'Banks',
        icon: claimIcon,
        subMenu: [
            {
                title: 'Public Sector Banks',
                link: '/components/tabs',
                icon: homeIcon,
            },
            {
                title: 'Private Sector Banks',
                link: '/components/accordions',
                icon: homeIcon,
            },
            {
                title: 'Other Types of Banks',
                link: '/components/accordions',
                icon: homeIcon,
            },
        ],
    },
    {
        title: 'Schemes',
        icon: schemeIcon,
        subMenu: [
            {
                title: 'Central Government',
                link: '/components/tabs',
                icon: homeIcon,
            },
            {
                title: 'State Government',
                link: '/components/accordions',
                icon: homeIcon,
            },
            {
                title: 'Central Government and sponsored schemes',
                link: '/components/accordions',
                icon: homeIcon,
            },
        ],
    },
    {
        title: 'Users',
        icon: usersIcon,
        subMenu: [
            {
                title: 'List',
                link: '/components/tabs',
                icon: homeIcon,
            },
            {
                title: 'Banks',
                link: '/components/accordions',
                icon: homeIcon,
            },
            {
                title: 'NABARD',
                link: '/components/accordions',
                icon: homeIcon,
            },
            {
                title: 'Central/State Government',
                link: '/components/accordions',
                icon: homeIcon,
            },
            {
                title: 'Agency',
                link: '/components/accordions',
                icon: homeIcon,
            },
        ],
    },
    {
        title: 'BENEFICIARIES',
        link: '/',
        icon: beneficiaryIcon,
    },
    {
        title: 'Roles & Permissions',
        icon: rolesIcon,
        subMenu: [
            {
                title: 'Roles',
                link: '/components/tabs',
                icon: homeIcon,
            },
            {
                title: 'Permissions',
                link: '/components/accordions',
                icon: homeIcon,
            },
        ],
    },
];
