import { Switch } from '@headlessui/react';
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react'
import DeleteLinkModal from './deleteLinkModal';
import EditLinkModal from './editLinkModal';
import type { Link } from '@prisma/client';
import { toast } from 'react-toastify';
import { trpc } from '../utils/trpc';

type Props = {
    link: Link;
}

type OpenModal = 'edit' | 'delete' | 'none';

const LinkCard = ({ link }: Props) => {
    const [openModal, setOpenModal] = useState<OpenModal>('none');
    const queryContext = trpc.useContext();
    const toggleLinkVisibilityMutation = trpc.links.toggleLink.useMutation({
        onSuccess() {
            queryContext.userProfile.getUserProfile.invalidate();
        },
        onError() {
            toast.error('Unable to toggle link visibility, try again later.');
        }
    });

    const onSetLinkVisibility = async (): Promise<void> => {
        await toggleLinkVisibilityMutation.mutateAsync({ id: link.id, isVisible: !link.isVisible });
    }
    const openDeleteLinkModal = (): void => setOpenModal('delete');
    const openEditLinkModal = (): void => setOpenModal('edit');
    const closeModal = (): void => setOpenModal('none');
    return (
        <>
            <div className="flex flex-row bg-white dark:bg-brandDark rounded-lg w-full h-26 px-2 py-4 drop-shadow-sm gap-x-2">
                <div className='justify-self-center self-center'>
                    <EllipsisVerticalIcon className='w-6 h-6 dark:text-white' />
                </div>
                <div className='flex flex-col w-full gap-y-1'>
                    <div className="flex flex-row gap-x-4">
                        <div className="flex flex-row flex-1 gap-x-2 text-black dark:text-white">
                            <span className="font-bold text-md">{link.title}</span>
                            <span className='cursor-pointer' onClick={openEditLinkModal}><PencilSquareIcon className='w-5 h-5' /></span>
                        </div>
                        <Switch
                            checked={link.isVisible}
                            onChange={onSetLinkVisibility}
                            className={`${link.isVisible ? 'bg-[#30a72d]' : 'bg-gray-800'}
          relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={`${link.isVisible ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[18px] w-[20px] transform rounded-full bg-white ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                    </div>

                    <span className="text-gray-800 dark:text-white text-sm">{link.url}</span>
                    <span className='justify-self-end self-end text-gray-500 dark:text-white cursor-pointer' onClick={openDeleteLinkModal}><TrashIcon className='w-5 h-5' /></span>
                </div>
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <DeleteLinkModal id={link.id} title={link.title} isOpen={openModal === 'delete'} onClose={closeModal} />
            <EditLinkModal link={link} isOpen={openModal === 'edit'} onClose={closeModal} />
        </>
    )
}

export default LinkCard