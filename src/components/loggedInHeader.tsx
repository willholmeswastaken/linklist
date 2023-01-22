import { ChartBarIcon, Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import HeaderItem from './headerItem'
import type { Route } from '../types/route'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { signOut } from 'next-auth/react'

export const routes: Array<Route> = [
    {
        title: 'Links',
        pathname: '/admin/links',
        icon: <Square3Stack3DIcon className='w-full h-full' />
    },
    {
        title: 'Profile',
        pathname: '/admin/profile',
        icon: <UserCircleIcon className='w-full h-full' />
    },
    {
        title: 'Analytics',
        pathname: '/admin/analytics',
        icon: <ChartBarIcon className='w-full h-full' />
    }
]


const LoggedInHeader = () => {
    return (
        <>
            <div className="hidden md:flex md:flex-row md:gap-x-4 bg-white dark:bg-brandDark rounded-xl drop-shadow-sm p-4">
                <div className="flex flex-1">
                    <h1 className="text-4xl text-center font-extrabold tracking-tight text-[#191c1f] dark:text-white mr-12">
                        LinkList
                    </h1>
                    {
                        routes.map(x => <HeaderItem key={x.title} name={x.title} url={x.pathname} icon={x.icon} />)
                    }
                </div>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="iflex justify-center items-center bg-gray-300 rounded-full w-9 h-9 text-white text-center cursor-pointer">
                            WH
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'bg-brandBlue text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            type='button'
                                            onClick={() => signOut()}
                                        >
                                            Sign Out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
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