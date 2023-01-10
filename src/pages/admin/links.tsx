import type { NextPage } from 'next'
import LoggedInHeader from '../../components/loggedInHeader'
import PagePreview from '../../components/pagePreview'
import AddLinkModal from '../../components/addLinkModal'
import { useState } from 'react'
import LinkCard from '../../components/linkCard'
import { PlusIcon } from '@heroicons/react/24/outline'
import { requireAuth } from '../../utils/requireAuth'

export const getServerSideProps = requireAuth(async (_) => {
    return { props: {} };
}, '/admin/links');

const Links: NextPage = () => {
    const [addLinkModalOpen, setIsAddLinkModalOpen] = useState<boolean>(false);
    const openAddLinkModal = (): void => setIsAddLinkModalOpen(true);
    const closeAddLinkModal = (): void => setIsAddLinkModalOpen(false);
    return (
        <>
            <div className='flex flex-col gap-y-4'>
                <LoggedInHeader />
                <div className="flex flex-row">
                    <div className="flex-grow">
                        <section className="flex flex-col w-full p-10">
                            <button
                                type='button'
                                className='bg-blue-500 hover:bg-blue-600 rounded-full w-full h-12 text-white'
                                onClick={openAddLinkModal}>
                                <span className="flex flex-row items-center justify-center gap-x-1">
                                    <PlusIcon className='w-6 h-6' /> Add Link
                                </span>
                            </button>
                            <div className="flex flex-col mt-10">
                                <LinkCard id='test' title='Wills link' url='https://willholmes.dev' isVisible />
                            </div>
                        </section>
                    </div>
                    <div className='sm:flex-1'>
                        <PagePreview />
                    </div>
                </div>
            </div>
            <AddLinkModal isOpen={addLinkModalOpen} closeModal={closeAddLinkModal} />
        </>
    )
}

export default Links