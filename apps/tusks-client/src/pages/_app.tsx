import { AppProps } from 'next/app';
import { Layout } from '@loxodonta/tusks-client/components';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout className="ui-main-layout">
      <Component {...pageProps} />
    </Layout>
  );
};

export default CustomApp;
