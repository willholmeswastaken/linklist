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
import { useMemo, useEffect } from 'react';

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
}, '/admin/profile');

const Profile: NextPage<Props> = ({ userProfile }) => {
    const userProfileState = useUserProfileStore();
    const displayProfile = useMemo<UserProfileWithLinks>(() => userProfileState.userProfile ?? userProfile, [userProfileState, userProfile]);
    useEffect(() => {
        if (userProfile !== userProfileState.userProfile)
            userProfileState.setUserProfile(userProfile);
    }, [userProfile, userProfileState]);
    return (
        <div className='flex flex-col gap-y-4'>
            <LoggedInHeader />
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                    <section className="flex flex-col w-full p-10 gap-y-4">
                        <h2 className='text-2xl font-semibold text-black'>Profile</h2>
                        <div className="flex flex-col w-full bg-white rounded-md p-4 gap-y-4">
                            <Formik
                                initialValues={{ profileImageUrl: displayProfile.displayImage ?? '', username: displayProfile.username, bio: displayProfile.bio ?? '' }}
                                onSubmit={e => {
                                    console.log(e);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className='flex flex-col w-full gap-y-4'>
                                        <div>
                                            <label htmlFor='imageUrl' className='text-sm mb-1'>Profile Image Url</label>
                                            <Field
                                                type="text"
                                                name="profileImageUrl"
                                                component={InputFormField} />
                                            <ErrorMessage name="profileImageUrl" component="div" />
                                        </div>

                                        <div>
                                            <label htmlFor='imageUrl' className='text-sm mb-1'>Username</label>
                                            <Field
                                                type="text"
                                                name="username"
                                                component={InputFormField} />
                                            <ErrorMessage name="username" component="div" />
                                        </div>

                                        <div>
                                            <label htmlFor='imageUrl' className='text-sm mb-1'>Bio</label>
                                            <Field
                                                type="text"
                                                name="bio"
                                                component={TextAreaFormField} />
                                            <ErrorMessage name="bio" component="div" />
                                        </div>

                                        <button
                                            type='submit'
                                            disabled={isSubmitting}
                                            className='bg-blue-500 hover:bg-blue-600 rounded-full w-full h-12 text-white'>
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
        </div>
    )
}

export default Profile