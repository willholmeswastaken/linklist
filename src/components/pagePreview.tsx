import { useState } from 'react';
import PagePreviewModal from './pagePreviewModal';
import UserPage from './userPage'
import type { UserProfileWithLinks } from '../types/UserProfileWIthLinks';

type Props = {
    userProfile: UserProfileWithLinks;
}

const PagePreview = ({ userProfile }: Props) => {
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

    const openPreviewModal = (): void => setIsPreviewModalOpen(true);
    const closePreviewModal = (): void => setIsPreviewModalOpen(false);

    return (
        <>
            <div className="hidden sm:flex justify-center items-center p-10">
                <div className='w-[250px] md:w-[300px] h-[600px] border-8 border-black rounded-3xl drop-shadow-md'>
                    <UserPage userProfile={userProfile} />
                </div>
            </div>

            <button
                className="sm:hidden absolute left-[50%] right-[50%] bottom-[50px] bg-blue-500 hover:bg-blue-600 text-white rounded-full w-fit py-4 px-8 drop-shadow-md ml-[-50px]"
                onClick={openPreviewModal}>
                Preview
            </button>

            <PagePreviewModal userProfile={userProfile} isOpen={isPreviewModalOpen} onClose={closePreviewModal} />
        </>
    )
}

export default PagePreview