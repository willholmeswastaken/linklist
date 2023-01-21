import type { NextPage } from 'next'
import LoggedInHeader from '../../components/loggedInHeader'
import PagePreview from '../../components/pagePreview'
import AddLinkModal from '../../components/addLinkModal'
import { useEffect, useMemo, useState } from 'react'
import LinkCard from '../../components/linkCard'
import { PlusIcon } from '@heroicons/react/24/outline'
import { requireAuth } from '../../utils/requireAuth'
import { prisma } from "../../server/db/client";
import { getSession } from 'next-auth/react'
import { useUserProfileStore } from '../../userProfileStore'
import type { UserProfileWithLinks } from '../../types/UserProfileWIthLinks'
import { trpc } from '../../utils/trpc'
import Head from 'next/head'

type Props = {
    userProfile: UserProfileWithLinks;
}

export const getServerSideProps = requireAuth(async (ctx) => {
    const session = await getSession({ ctx });
    const userProfile = await prisma.userProfile.findFirst({
        where: {
            userId: session?.user?.id
        },
        include: {
            links: true
        }
    });
    return {
        props: {
            userProfile
        } as Props
    };
}, '/admin/links');

const Links: NextPage<Props> = ({ userProfile }) => {
    const [addLinkModalOpen, setIsAddLinkModalOpen] = useState<boolean>(false);
    const openAddLinkModal = (): void => setIsAddLinkModalOpen(true);
    const closeAddLinkModal = (): void => setIsAddLinkModalOpen(false);

    const userProfileState = useUserProfileStore();
    const displayProfile = useMemo<UserProfileWithLinks>(() => userProfileState.userProfile ?? userProfile, [userProfileState, userProfile]);

    trpc.userProfile.getUserProfile.useQuery(undefined, {
        onSuccess(data) {
            if (!data) return;
            userProfileState.setUserProfile(data);
        },
    });

    useEffect(() => {
        if (userProfileState.userProfile === null)
            userProfileState.setUserProfile(userProfile);
    }, [userProfile, userProfileState]);

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
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <section className="flex flex-col w-full p-10">
                            <button
                                type='button'
                                className='bg-blue-600 hover:bg-blue-700 rounded-full w-full h-12 text-white'
                                onClick={openAddLinkModal}>
                                <span className="flex flex-row items-center justify-center gap-x-1">
                                    <PlusIcon className='w-6 h-6' /> Add Link
                                </span>
                            </button>
                            <div className="flex flex-col mt-10 gap-y-3">
                                {
                                    displayProfile.links.length > 0 ?
                                        displayProfile.links.map((link) => (
                                            <LinkCard key={link.id} link={link} />
                                        ))
                                        : (
                                            <div className="flex flex-row bg-white rounded-lg w-full h-26 px-2 py-4 drop-shadow-sm gap-x-2 justify-center">
                                                No Links Created, click the button above to get started!
                                            </div>
                                        )
                                }
                            </div>
                        </section>
                    </div>
                    <PagePreview userProfile={displayProfile} />
                </div>
            </div>
            <AddLinkModal isOpen={addLinkModalOpen} closeModal={closeAddLinkModal} />
        </>
    )
}

export default Links