import type { NextPage } from 'next'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import LoggedInHeader from '../../components/loggedInHeader'
import { requireAuth } from '../../utils/requireAuth';
import PagePreview from '../../components/pagePreview';
import InputFormField from '../../components/Formik/InputFormField';
import TextAreaFormField from '../../components/Formik/TextAreaFormField';
import { prisma } from "../../server/db/client";
import type { UserProfileWithLinks } from '../../types/UserProfileWIthLinks';
import { getSession } from 'next-auth/react';
import { useUserProfileStore } from '../../userProfileStore';
import { useMemo, useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import AiBioGenerationModal from '../../components/aiBioGenerationModal';
import Head from 'next/head';

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
}, '/admin/profile');

type UserProfileUpdateForm = {
    displayImage: string | null;
    username: string;
    title: string;
    bio: string | null;
}

const Profile: NextPage<Props> = ({ userProfile }) => {
    const queryContext = trpc.useContext();
    const [showAiBioModal, setShowAiBioModal] = useState<boolean>(false);
    const onShowAiBioModal = (): void => setShowAiBioModal(true);
    const onCloseAiBioModal = (): void => setShowAiBioModal(false);
    const userProfileState = useUserProfileStore();
    const displayProfile = useMemo<UserProfileWithLinks>(() => userProfileState.userProfile ?? userProfile, [userProfileState, userProfile]);

    trpc.userProfile.getUserProfile.useQuery(undefined, {
        onSuccess(data) {
            if (!data) return;
            userProfileState.setUserProfile(data);
        },
    });
    const updateUserProfileMutation = trpc.userProfile.updateUserProfile.useMutation({
        onSuccess() {
            queryContext.userProfile.getUserProfile.invalidate();
            toast.success('User profile details updated!');
        },
        onError(error) {
            if (error.data?.code === 'BAD_REQUEST') {
                toast.error(error.message);
            } else {
                toast.error('Failed to update user profile, try again later.');
            }
        }
    });

    const onSubmitUserProfileForm = async (updatedUserProfile: UserProfileUpdateForm): Promise<void> => {
        await updateUserProfileMutation.mutateAsync({ ...updatedUserProfile });
    }

    useEffect(() => {
        if (userProfileState.userProfile === null)
            userProfileState.setUserProfile(userProfile);
    }, [userProfile, userProfileState]);

    // TODO: Add color themeing (choose gradient or block and text color)

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
                        <section className="flex flex-col w-full p-10 gap-y-4">
                            <h2 className='text-2xl font-semibold text-black'>Profile</h2>
                            <div className="flex flex-col w-full bg-white rounded-md p-4 gap-y-4">
                                <Formik
                                    initialValues={{ displayImage: displayProfile.displayImage ?? '', username: displayProfile.username, title: displayProfile.title, bio: displayProfile.bio ?? '' } as UserProfileUpdateForm}
                                    validationSchema={toFormikValidationSchema(z.object({ displayImage: z.string().url('Must be a valid url').nullish(), username: z.string(), title: z.string(), bio: z.string().nullish() }))}
                                    onSubmit={onSubmitUserProfileForm}
                                >
                                    {() => (
                                        <Form className='flex flex-col w-full gap-y-4'>
                                            <div>
                                                <label htmlFor='username' className='text-sm mb-1'>Username</label>
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    component={InputFormField} />
                                                <ErrorMessage name="username" component="div" className='text-xs italic text-red-500' />
                                            </div>

                                            <div>
                                                <label htmlFor='title' className='text-sm mb-1'>Title</label>
                                                <Field
                                                    type="text"
                                                    name="title"
                                                    component={InputFormField} />
                                                <ErrorMessage name="title" component="div" className='text-xs italic text-red-500' />
                                            </div>

                                            <div>
                                                <label htmlFor='displayImage' className='text-sm mb-1'>Profile Image Url</label>
                                                <Field
                                                    type="text"
                                                    name="displayImage"
                                                    component={InputFormField} />
                                                <ErrorMessage name="displayImage" component="div" className='text-xs italic text-red-500' />
                                            </div>

                                            <div>
                                                <label htmlFor='bio' className='text-sm mb-1'>Bio</label>
                                                <Field
                                                    type="text"
                                                    name="bio"
                                                    component={TextAreaFormField} />
                                                <ErrorMessage name="bio" component="div" className='text-xs italic text-red-500' />
                                                <button type='button' onClick={onShowAiBioModal} className='bg-transparent border border-gray-600 hover:bg-gray-700 rounded-md text-gray-600 duration-200 hover:text-white p-2'>Generate with AI</button>
                                            </div>

                                            <button
                                                type='submit'
                                                disabled={updateUserProfileMutation.isLoading}
                                                className='bg-blue-600 hover:bg-blue-700 rounded-full w-full h-12 text-white'>
                                                Save
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </section>
                    </div>
                    <PagePreview userProfile={displayProfile} />
                </div>
                <AiBioGenerationModal isOpen={showAiBioModal} onClose={onCloseAiBioModal} />
            </div>
        </>
    )
}

export default Profile