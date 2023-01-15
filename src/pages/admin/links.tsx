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

type Props = {
    userProfile: UserProfileWithLinks;
}

export const getServerSideProps = requireAuth(async (ctx) => {
    const session = await getSession({ ctx });
    console.log(session);
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
    // TODO: Create trpc query / mutation (s) for all interactions i.e. add, edit, delete links, get profile, update profile.
    const [addLinkModalOpen, setIsAddLinkModalOpen] = useState<boolean>(false);
    const openAddLinkModal = (): void => setIsAddLinkModalOpen(true);
    const closeAddLinkModal = (): void => setIsAddLinkModalOpen(false);

    const userProfileState = useUserProfileStore();
    const displayProfile = useMemo<UserProfileWithLinks>(() => userProfileState.userProfile ?? userProfile, [userProfileState, userProfile]);
    useEffect(() => {
        if (userProfile !== userProfileState.userProfile)
            userProfileState.setUserProfile(userProfile);
    }, [userProfile, userProfileState]);

    return (
        <>
            <div className='flex flex-col gap-y-4'>
                <LoggedInHeader />
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <section className="flex flex-col w-full p-10">
                            <button
                                type='button'
                                className='bg-blue-500 hover:bg-blue-600 rounded-full w-full h-12 text-white'
                                onClick={openAddLinkModal}>
                                <span className="flex flex-row items-center justify-center gap-x-1">
                                    <PlusIcon className='w-6 h-6' /> Add Link
                                </span>
                            </button>
                            <div className="flex flex-col mt-10">
                                {
                                    displayProfile.links.length > 0 &&
                                    displayProfile.links.map((link) => (
                                        <LinkCard key={link.id} link={link} isVisible />
                                    ))
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