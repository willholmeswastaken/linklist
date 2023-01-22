import { type NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import Header from "../components/header";
import Socials from '../../public/socials.jpg';

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { push } = useRouter();
  const onGetStarted = () => {
    if (sessionData?.user !== undefined) {
      push('/admin/links');
    } else {
      signIn(undefined, { callbackUrl: `${window.location.origin}/admin/links` });
    }
  };

  return (
    <>
      <Head>
        <title>LinkList - Share your brand</title>
        <meta name="title" content="LinkList - Share your brand" />
        <meta name="description" content="LinkList is a free, open-source alternative to the freemium link sharing platforms that exist on the web today. Sign up and share your world to your audience!" />

        <meta property="twitter:title" content="LinkList - Share your brand" />
        <meta property="twitter:description" content="LinkList is a free, open-source alternative to the freemium link sharing platforms that exist on the web today. Sign up and share your world to your audience!" />
        <meta property="twitter:image" content="https://linklist.vercel.app/og-image.png" />
        <meta property="twitter:url" content="https://linklist.vercel.app" />
        <meta property="twitter:card" content="summary_large_image" />

        <meta property="og:title" content="LinkList - Share your brand" />
        <meta property="og:description" content="LinkList is a free, open-source alternative to the freemium link sharing platforms that exist on the web today. Sign up and share your world to your audience!" />
        <meta property="og:url" content="https://linklist.vercel.app" />
        <meta property="og:image" content="https://linklist.vercel.app/og-image.png" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4">
        <Header />
      </div>
      <div className="flex flex-col gap-y-10 items-center justify-center px-4 md:px-12 py-16">
        <div className="flex flex-col items-center gap-y-10">
          <div className="flex flex-col items-center gap-y-2 md:gap-y-6">
            <h1 className="p-2 text-4xl sm:text-5xl lg:text-6xl text-center font-extrabold tracking-tight bg-gradient-to-br text-transparent from-black to-stone-500 dark:from-white dark:to-white bg-clip-text">
              The <span className="bg-gradient-to-br text-transparent from-brandBlue to-blue-500 bg-clip-text">open-source</span> <br />link displaying <span className="bg-gradient-to-br text-transparent from-brandBlue to-blue-500 bg-clip-text">App</span>.
            </h1>
            <div className="text-gray-600 dark:text-white text-center md:text-xl max-w-[450px]">A lightweight, paywall free alternative to share your portfolio of links. Be up and running within 1 minute.</div>
          </div>
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 duration-300 rounded-full w-fit px-10 py-3 text-xl font-semibold"
            onClick={onGetStarted}>Get Started</button>
        </div>
        <div className="grid grid-cols-4 gap-4 w-full max-w-screen-xl pb-4">
          <div className="col-span-4 md:col-span-2 relative bg-white shadow-md border border-gray-200 rounded-xl p-2 h-96 overflow-hidden">
            <div className="flex h-56 items-center justify-center">
              <Image
                src={Socials}
                alt="social media icons"
                width={350}
                height={350} />
            </div>
            <div className="mx-auto max-w-md text-center h-full flex flex-col gap-y-1">
              <span className="text-center bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent text-2xl sm:text-3xl font-semibold">
                Sharing socials, made easy.
              </span>
              <span className="text-gray-500 max-w-md text-center">Creating a new link and publishing it is quick and easy with LinkList.</span>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 relative bg-white shadow-md border border-gray-200 rounded-xl p-2 h-96 overflow-hidden">
            <div className="flex h-56 items-center justify-center">
              <div className="relative h-full w-full">
                <svg className="absolute inset-0 m-auto" viewBox="0 0 100 100" width="140" height="140"><circle strokeWidth="7" strokeDasharray="1px 1px" strokeLinecap="round" transform="rotate(-90 50 50)" cx="50" cy="50" r="45" fill="#DCFCE7" stroke="#22C55E" pathLength="1" strokeDashoffset="0px"></circle></svg>
                <p className="absolute inset-0 mx-auto flex items-center justify-center font-display text-5xl text-green-500">100</p>
              </div>
            </div>
            <div className="mx-auto max-w-md text-center h-full flex flex-col gap-y-1">
              <span className="text-center bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent text-2xl md:text-3xl font-semibold">
                Performance First
              </span>
              <span className="text-gray-500 max-w-md text-center">Performance = traffic. A blazing fast page makes LinkList an easy choice.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
