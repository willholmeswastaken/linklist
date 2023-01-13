import type { NextPage } from 'next'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import LoggedInHeader from '../../components/loggedInHeader'
import { requireAuth } from '../../utils/requireAuth';
import PagePreview from '../../components/pagePreview';
import InputFormField from '../../components/Formik/InputFormField';
import TextAreaFormField from '../../components/Formik/TextAreaFormField';

type UserProfile = {
    profileImageUrl: string;
    username: string;
    bio: string;
}

export const getServerSideProps = requireAuth(async (_) => {
    return {
        props: {
            profileImageUrl: 'https://pbs.twimg.com/profile_images/1524749706915565569/0BjuY1n-_400x400.png',
            username: 'devwillholmes',
            bio: ''
        } as UserProfile
    };
}, '/admin/links');

const Profile: NextPage<UserProfile> = ({ profileImageUrl, username, bio }) => {
    return (
        <div className='flex flex-col gap-y-4'>
            <LoggedInHeader />
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                    <section className="flex flex-col w-full p-10 gap-y-4">
                        <h2 className='text-2xl font-semibold text-black'>Profile</h2>
                        <div className="flex flex-col w-full bg-white rounded-md p-4 gap-y-4">
                            <Formik
                                initialValues={{ profileImageUrl, username, bio }}
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
                <PagePreview />
            </div>
        </div>
    )
}

export default Profile