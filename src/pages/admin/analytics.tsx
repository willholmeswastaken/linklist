import type { NextPage } from 'next'
import LoggedInHeader from '../../components/loggedInHeader'

const Analytics: NextPage = () => {
    return (
        <>
            <div className='flex flex-col gap-y-4 p-2 md:p-6'>
                <LoggedInHeader />
                hi
            </div>
        </>
    )
}

export default Analytics