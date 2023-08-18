import { PropsWithChildren } from 'react';
import App from '../../App';
import NavbarLandingPage from 'src/components/Navbar/NavbarLandingPage';

const LandingPageLayout = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <NavbarLandingPage/>
            <div className="min-h-screen text-black dark:text-white-dark">{children} </div>
        </App>
    );
};

export default LandingPageLayout;
