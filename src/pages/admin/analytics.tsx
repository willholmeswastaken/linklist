import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { getSession } from 'next-auth/react'
import dayjs from 'dayjs';

import { prisma } from "../../server/db/client";
import LoggedInHeader from '../../components/loggedInHeader'
import type { DisplayDateVisit } from '../../types/DateVisit';
import { getDates } from '../../utils/dates';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getSession({ ctx });
    const startOfMonth = dayjs().subtract(1, 'month');
    const visits = await prisma.visit.findMany({
        where: {
            userProfile: {
                userId: session?.user?.id,
            },
            AND: {
                timestamp: {
                    gte: startOfMonth.toDate()
                }
            }
        },
    });

    const dates = getDates(startOfMonth, dayjs());
    const returnDates: Array<DisplayDateVisit> = [];
    for (const dateVisit of dates) {
        const startDate = dateVisit.date.startOf('day').toDate();
        const endDate = dateVisit.date.endOf('day').toDate();
        returnDates.push({
            date: dateVisit.date.format('DD/MM'),
            visits: visits.filter(x => x.timestamp >= startDate && x.timestamp <= endDate).length
        });
    }

    return {
        props: {
            visits: returnDates
        } as Props
    };
}

type Props = {
    visits: Array<DisplayDateVisit>;
}

const Analytics: NextPage<Props> = ({ visits }) => {
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
                <div className="flex flex-col w-full h-[500px] p-2 md:p-10 gap-y-4">
                    <h2 className='text-2xl font-semibold text-black dark:text-white'>Visits in the last 30 days</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={500} height={300} data={visits} >
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="visits" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default Analytics