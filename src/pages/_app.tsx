import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // TODO: Add dark mode
  return (
    <SessionProvider session={session}>
      <div className="bg-[#F5F6F7] min-h-screen w-screen">
        <ToastContainer />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
