import React, { Fragment, useState } from 'react'
import { toast } from 'react-toastify';
import { trpc } from '../utils/trpc';
import { useUserProfileStore } from '../userProfileStore';
import { Transition, Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const AiBioGenerationModal = ({ isOpen, onClose }: Props) => {
    const [bioGenerationContext, setBioGenerationContext] = useState<string>('');
    const aiBioMutation = trpc.userProfile.generateBio.useMutation({
        onSuccess() {
            toast.success('Bio created using ai! See the preview in the bio box.');
        },
        onError() {
            toast.error('Failed to generate bio with ai, try again later.')
        }
    });

    const onGenerateAiBio = async (): Promise<void> => {
        await aiBioMutation.mutateAsync(bioGenerationContext);
    };

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
                            <Dialog.Panel className="flex flex-col w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                <div className="flex flex-col items-center w-full gap-x-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-left text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Describe yourself here
                                    </Dialog.Title>
                                    <div className="flex flex-col mt-2 w-full gap-y-4">
                                        <textarea value={bioGenerationContext} onChange={e => setBioGenerationContext(e.target.value)} className='rounded-md border border-gray-600 w-full h-20 caret-black text-black p-2' />
                                        {
                                            aiBioMutation.isLoading && <p>Loading...</p>
                                        }
                                        {
                                            aiBioMutation.isSuccess && <p>{aiBioMutation.data.choices[0]?.text}</p>
                                        }
                                    </div>
                                </div>

                                <div className="flex flex-row justify-end items-end mt-4 w-full gap-x-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onGenerateAiBio}
                                    >
                                        Generate
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}

export default AiBioGenerationModal