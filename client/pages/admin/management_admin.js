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

export default function ManagementAdmin({currentUser}) {
  return (
    <div>
      <Head>
        <title>Management Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAndSidebar nama={currentUser.nama}>
        <h1>Ini Halaman ManagementAdmin</h1>
      </NavbarAndSidebar>

    </div>
  )
}
