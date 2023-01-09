import React from 'react'
import UserPage from './userPage'

const PagePreview = () => {
    return (
        <>
            <div className="hidden sm:flex justify-center items-center p-10">
                <div className='w-[300px] h-[600px] border-8 border-black rounded-3xl drop-shadow-md'>
                    <UserPage profilePicture={'https://pbs.twimg.com/profile_images/1524749706915565569/0BjuY1n-_400x400.png'} username="devwillholmes" links={[{ id: 'test', title: 'Twitter', url: 'https://twitter.com/user/devwillholmes', order: 0 }]} />
                </div>
            </div>
            <div className="flex flex-col sm:hidden">

            </div>
        </>
    )
}

export default PagePreview