import { useState } from 'react';
import PagePreviewModal from './pagePreviewModal';
import UserPage from './userPage'
import type { UserProfileWithLinks } from '../types/UserProfileWIthLinks';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Props = {
    userProfile: UserProfileWithLinks;
}

const PagePreview = ({ userProfile }: Props) => {
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

    const openPreviewModal = (): void => setIsPreviewModalOpen(true);
    const closePreviewModal = (): void => setIsPreviewModalOpen(false);

    return (
        <>
            <div className="hidden sm:flex justify-center p-10">
                <div className='w-[250px] md:w-[300px] h-[600px] border-8 border-black rounded-3xl drop-shadow-md'>
                    <UserPage userProfile={userProfile} />
                </div>
            </div>

            <button
                className="sm:hidden fixed left-[92%] right-0 bottom-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-fit py-4 px-5 drop-shadow-md ml-[-50px]"
                onClick={openPreviewModal}>
                <MagnifyingGlassIcon className='w-6 h-6' />
            </button>

            <PagePreviewModal userProfile={userProfile} isOpen={isPreviewModalOpen} onClose={closePreviewModal} />
        </>
    )
}

export default PagePreview