import { Provider } from 'react-redux';
import store from '../../store';
import Head from 'next/head';
import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from 'ni18n.config.ts';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'tippy.js/dist/tippy.css';
import '../styles/tailwind.css';
import DefaultLayout from 'src/layouts/DefaultLayout';


export const NextPageWithLayout = (Component) => {
    return Component;
};

const App = ({ Component, pageProps }) => {
    const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

    return (
        <Provider store={store}>
            <Head>
                <title>NabNext</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            {getLayout(<Component {...pageProps} />)}
        </Provider>
    );
};

export default appWithI18Next(App, ni18nConfig);
