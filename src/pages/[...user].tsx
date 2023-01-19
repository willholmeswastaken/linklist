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
    return (
        <>
            <Head>
                <title>{userProfile.username} - LinkList</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-screen h-screen">
                <UserPage userProfile={userProfile} isPreview={false} />
            </div>
        </>
    );
};

export default UserProfilePage;
