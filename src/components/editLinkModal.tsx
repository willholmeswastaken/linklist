import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react'
import type { Link } from '../types/Link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { title } from 'process';
import InputFormField from './Formik/InputFormField';
import { trpc } from '../utils/trpc';
import { toast } from 'react-toastify';
import type { UpsertLink } from '../types/UpsertedLink';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

type Props = {
    link: Link;
    isOpen: boolean;
    onClose: () => void;
}

const EditLinkModal = ({ link, isOpen, onClose }: Props) => {
    const queryContext = trpc.useContext();
    const addLinkMutation = trpc.links.updateLink.useMutation({
        onSuccess() {
            queryContext.userProfile.getUserProfile.invalidate();
            onClose();
            toast.success('Link updated successfully');
        },
        onError() {
            toast.error('Unable to add link, try again later.');
        }
    });

    const onLinkFormSubmit = async (upsertedLink: UpsertLink): Promise<void> => {
        await addLinkMutation.mutateAsync({ id: link.id, order: link.order, ...upsertedLink });
    }
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-brandDark p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                >
                                    Edit {title}
                                </Dialog.Title>
                                <div className="flex flex-col my-6 gap-y-4">
                                    <Formik
                                        initialValues={{ url: link.url, title: link.title } as UpsertLink}
                                        validationSchema={toFormikValidationSchema(z.object({ url: z.string().url('Must be a valid url'), title: z.string() }))}
                                        onSubmit={onLinkFormSubmit}
                                    >
                                        {() => (
                                            <Form className='flex flex-col w-full gap-y-4 dark:text-white text-black'>
                                                <div>
                                                    <label htmlFor='url' className='text-sm mb-1'>Url</label>
                                                    <Field
                                                        type="text"
                                                        name="url"
                                                        component={InputFormField} />
                                                    <ErrorMessage name="url" component="div" className='text-xs italic text-red-500' />
                                                </div>

                                                <div>
                                                    <label htmlFor='title' className='text-sm mb-1'>Title</label>
                                                    <Field
                                                        type="text"
                                                        name="title"
                                                        component={InputFormField} />
                                                    <ErrorMessage name="title" component="div" className='text-xs italic text-red-500' />
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
                                                        type="submit"
                                                        className="inline-flex justify-center rounded-md border border-transparent disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-900 disabled:hover:bg-gray-300 bg-green-200 duration-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-300 cursor:pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={onClose}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
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