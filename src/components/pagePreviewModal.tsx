import { Transition, Dialog } from '@headlessui/react'
import { Fragment } from 'react'
import UserPage from './userPage'

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const PagePreviewModal = ({ isOpen, onClose }: Props) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10 sm:hidden" onClose={onClose}>
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

                <div className="fixed inset-0 overflow-y-auto w-full">
                    <div className="flex min-h-full w-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="flex flex-col w-full min-h-full transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
                                <UserPage profilePicture={'https://pbs.twimg.com/profile_images/1524749706915565569/0BjuY1n-_400x400.png'} username="devwillholmes" links={[{ id: 'test', title: 'Twitter', url: 'https://twitter.com/user/devwillholmes', order: 0 }]} />

                                <div className="flex flex-row justify-end items-end mt-4 w-full gap-x-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Close
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

export default PagePreviewModal