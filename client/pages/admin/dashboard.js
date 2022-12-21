import Head from 'next/head';
import Image from 'next/image';

// Component
import NavbarAndSidebar from '../../component/admin/NavbarAndSidebar';

// Utils
import {withAuth} from "../../utils/gsspAdmin";

export const getServerSideProps = withAuth(context => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
});

export default function Dashboard({currentUser}) {
  return (
    <div>
      <Head>
        <title>Dashboard Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAndSidebar nama={currentUser.nama}>
        <h1>Ini Halaman Dashboard Admin</h1>
      </NavbarAndSidebar>

    </div>
  )
}
