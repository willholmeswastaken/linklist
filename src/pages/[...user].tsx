import type { GetServerSideProps } from "next";
import { type NextPage } from "next";
import Head from "next/head";

import { prisma } from "../server/db/client";
import type { UserProfileWithLinks } from "../types/UserProfileWIthLinks";
import UserPage from "../components/userPage";

type Props = {
    userProfile: UserProfileWithLinks;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const user = ctx.query.user?.toString();
    if (!user) {
        return {
            props: {
            },
            notFound: true
        }
    }
    const userProfile = await prisma.userProfile.findUnique({
        where: {
            username: user
        },
        include: {
            links: true
        }
    });
    if (!userProfile) {
        return {
            props: {
            },
            notFound: true
        }
    }
    await prisma.visit.create({
        data: {
            userProfileId: userProfile!.id,
        }
    });
    return {
        props: {
            userProfile
        } as Props
    }
}

const UserProfilePage: NextPage<Props> = ({ userProfile }) => {
    const ogTitle = `${userProfile.username} - LinkList`;
    const ogDesc = userProfile.bio ?? "LinkList is a free, open-source alternative to the freemium link sharing platforms that exist on the web today. Sign up and share your world to your audience!";

    return (
        <>
            <Head>
                <title>{ogTitle}</title>
                <meta name="title" content={ogTitle} />
                <meta name="description" content={ogDesc} />

                <meta property="twitter:title" content={ogTitle} />
                <meta property="twitter:description" content="LinkList is a free, open-source alternative to the freemium link sharing platforms that exist on the web today. Sign up and share your world to your audience!" />
                <meta property="twitter:image" content="https://linklist.vercel.app/og-image.png" />
                <meta property="twitter:url" content="https://linklist.vercel.app" />
                <meta property="twitter:card" content="summary_large_image" />

                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDesc} />
                <meta property="og:url" content="https://linklist.vercel.app" />
                <meta property="og:image" content="https://linklist.vercel.app/og-image.png" />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-screen h-screen">
                <UserPage userProfile={userProfile} isPreview={false} />
            </div>
        </>
    );
};

export default UserProfilePage;
