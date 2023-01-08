import { Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import HeaderItem from './headerItem'
import type { Route } from '../types/route'

export const routes: Array<Route> = [
    {
        title: 'Links',
        pathname: '/links',
        icon: <Square3Stack3DIcon className='w-full h-full' />
    },
    {
        title: 'Profile',
        pathname: '/profile',
        icon: <UserCircleIcon className='w-full h-full' />
    },
]


const LoggedInHeader = () => {
    return (
        <>
            <div className="hidden md:flex md:flex-row md:gap-x-4 bg-white rounded-xl drop-shadow-sm p-4">
                <div className="flex flex-1">
                    <h1 className="text-4xl text-center font-extrabold tracking-tight text-[#191c1f] mr-12">
                        LinkList
                    </h1>
                    {
                        routes.map(x => <HeaderItem key={x.title} name={x.title} url={x.pathname} icon={x.icon} />)
                    }
                </div>
                <div className="flex justify-center items-center bg-gray-300 rounded-full w-9 h-9 text-white text-center cursor-pointer">
                    WH
                </div>
            </div>
            <div className="flex flex-col md:hidden gap-y-3 bg-white rounded-xl drop-shadow-sm p-4">
                <div className="flex flex-row">
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#191c1f] ml-2 flex-1">
                        LinkList
                    </h1>
                    <div className="flex justify-center items-center bg-gray-300 rounded-full w-9 h-9 text-white text-center cursor-pointer">
                        WH
                    </div>
                </div>
                <div className="flex flex-row">
                    {
                        routes.map(x => <HeaderItem key={x.title} name={x.title} url={x.pathname} icon={x.icon} />)
                    }
                </div>
            </div>
        </>
    )
}

export default LoggedInHeader