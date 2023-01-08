import { Transition, Dialog } from '@headlessui/react';
import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { Fragment, useState } from 'react'
import { isValidURL } from '../utils/regex';

type Props = {
    id: string;
    title: string;
    url: string;
    isOpen: boolean;
    onClose: () => void;
}

const EditLinkModal = ({ id, title, url, isOpen, onClose }: Props) => {
    const [linkUrl, setLinkUrl] = useState<string>(url);
    const [linkTitle, setLinkTitle] = useState<string>(title);
    const [isLinkValid, setIsLinkValid] = useState<boolean>(false);

    const onLinkUrlChange = (e: ChangeEvent<HTMLInputElement>) => setLinkUrl(e.target.value);
    const onLinkTitleChange = (e: ChangeEvent<HTMLInputElement>) => setLinkTitle(e.target.value);

    useEffect(() => {
        const isValidLink = isValidURL(linkUrl);
        const isValidTitle = linkTitle.length > 0;

        setIsLinkValid(isValidLink && isValidTitle);
    }, [linkUrl, linkTitle]);

    useEffect(() => {
        setLinkUrl(url);
        setLinkTitle(title);
    }, [url, title]);

    useEffect(() => {
        if (isOpen) {
            setLinkUrl(url);
            setLinkTitle(title);
        }
    }, [url, title, isOpen])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Edit {title}
                                </Dialog.Title>
                                <div className="flex flex-col my-6 gap-y-4">
                                    <input type='text' placeholder='URL' value={linkUrl} onChange={onLinkUrlChange} className='w-full h-11 p-2 bg-gray-200 text-gray-600 placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 rounded-md' />
                                    <input type='text' placeholder='Title' value={linkTitle} onChange={onLinkTitleChange} className='w-full h-11 p-2 bg-gray-200 text-gray-600 placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 rounded-md' />
                                    {/* <button type='button' className='w-20 h-12 cursor-default bg-gray-200 text-gray-600 rounded-full justify-self-center self-center'>Add</button> */}
                                </div>

                                <div className="flex flex-row w-full mt-4 justify-end gap-x-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 duration-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-900 disabled:hover:bg-gray-300 bg-green-200 duration-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-300 cursor:pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                        disabled={!isLinkValid}
                                    >
                                        Save
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default EditLinkModal