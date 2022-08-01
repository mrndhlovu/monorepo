import styles from './layout.module.scss';
import { Header, Footer } from '@loxodonta/deal-client/ui-shared';
import { ReactNode } from 'react';
import Head from 'next/head';

/* eslint-disable-next-line */
export interface LayoutProps {
  className: string;
  children: ReactNode;
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Welcome to deal-client!</title>
      </Head>
      <main className={styles[className]}>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
