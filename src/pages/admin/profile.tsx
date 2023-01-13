import type { NextPage } from 'next'
import LoggedInHeader from '../../components/loggedInHeader'
import { requireAuth } from '../../utils/requireAuth';
import PagePreview from '../../components/pagePreview';

type ProfileProps = {
    profileImageUrl: string;
    username: string;
    bio: string | null;
}

export const getServerSideProps = requireAuth(async (_) => {
    return {
        props: {
            profileImageUrl: 'https://pbs.twimg.com/profile_images/1524749706915565569/0BjuY1n-_400x400.png',
            username: 'devwillholmes',
            bio: null
        } as ProfileProps
    };
}, '/admin/links');



const Profile: NextPage<ProfileProps> = ({ profileImageUrl, username, bio }) => {
    return (

        <div className='flex flex-col gap-y-4'>
            <LoggedInHeader />
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                    <section className="flex flex-col w-full p-10 gap-y-4">
                        <h2 className='text-2xl font-semibold text-black'>Profile</h2>
                        <div className="flex flex-col w-full bg-white rounded-md p-4 gap-y-4">
                            <div className="flex flex-col">
                                <label htmlFor='imageUrl' className='text-sm mb-1'>Profile Image Url</label>
                                <input id='imageUrl' type='text' value={profileImageUrl} placeholder='Image Url' className='w-full h-11 p-2 bg-[#f6f7f5] text-gray-600 placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 rounded-md' />
                                <span className='ml-1 text-xs italic text-gray-600 word-break w-fit'>For example: https://picsum.photos/200</span>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor='username' className='text-sm mb-1'>Username</label>
                                <input id='username' type='text' value={username} placeholder='Profile Title' className='w-full h-11 p-2 bg-[#f6f7f5] text-gray-600 placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 rounded-md' />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor='bio' className='text-sm mb-1'>Bio</label>
                                <textarea id='bio' placeholder='Bio' value={bio!} className='w-full h-24 p-2 bg-[#f6f7f5] text-gray-600 placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 rounded-md' />
                            </div>
                            <button
                                type='button'
                                className='bg-blue-500 hover:bg-blue-600 rounded-full w-full h-12 text-white'>
                                Save
                            </button>
                        </div>
                        {/* Add formik */}
                    </section>
                </div>
                <PagePreview />
            </div>
        </div>
    )
}

export default Profile