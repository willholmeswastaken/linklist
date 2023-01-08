import { Switch } from '@headlessui/react';
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react'
import DeleteLinkModal from './deleteLinkModal';
import EditLinkModal from './editLinkModal';

type Props = {
    id: string;
    title: string;
    url: string;
    isVisible: boolean;
}

type OpenModal = 'edit' | 'delete' | 'none';

const LinkCard = ({ id, title, url, isVisible }: Props) => {
    const [openModal, setOpenModal] = useState<OpenModal>('none');
    const openDeleteLinkModal = (): void => setOpenModal('delete');
    const openEditLinkModal = (): void => setOpenModal('edit');
    const closeModal = (): void => setOpenModal('none');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const setLinkVisible = (): void => { };
    return (
        <>
            <div className="flex flex-row bg-white rounded-lg w-full h-26 px-2 py-4 drop-shadow-sm gap-x-2">
                <div className='justify-self-center self-center'>
                    <EllipsisVerticalIcon className='w-6 h-6' />
                </div>
                <div className='flex flex-col w-full gap-y-1'>
                    <div className="flex flex-row gap-x-4">
                        <div className="flex flex-row flex-1 gap-x-2">
                            <span className="font-bold text-black text-md">{title}</span>
                            <span className='cursor-pointer' onClick={openEditLinkModal}><PencilSquareIcon className='w-5 h-5' /></span>
                        </div>
                        <Switch
                            checked={isVisible}
                            onChange={setLinkVisible}
                            className={`${isVisible ? 'bg-[#30a72d]' : 'bg-gray-800'}
          relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={`${isVisible ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[18px] w-[20px] transform rounded-full bg-white ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                    </div>

                    <span className="text-gray-800 text-sm">{url}</span>
                    <span className='justify-self-end self-end text-gray-500 cursor-pointer' onClick={openDeleteLinkModal}><TrashIcon className='w-5 h-5' /></span>
                </div>
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <DeleteLinkModal id={id} title={title} isOpen={openModal === 'delete'} onClose={closeModal} onDelete={() => { }} />
            <EditLinkModal id={id} title={title} url={url} isOpen={openModal === 'edit'} onClose={closeModal} />
        </>
    )
}

export default LinkCard