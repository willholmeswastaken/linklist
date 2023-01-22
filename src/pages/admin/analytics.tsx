import type { NextPage } from 'next'
import LoggedInHeader from '../../components/loggedInHeader'
import Head from 'next/head'

const Analytics: NextPage = () => {
    // TODO: Add a chart here showing page views over the past 30 days
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
            <div className='flex flex-col gap-y-4 p-2 md:p-6'>
                <LoggedInHeader />
                hi
            </div>
        </>
    )
}

export default Analytics