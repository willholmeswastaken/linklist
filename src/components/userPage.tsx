import { useMemo } from "react";
import type { UserProfileWithLinks } from "../types/UserProfileWIthLinks";
import Image from "next/image";

type Props = {
    userProfile: UserProfileWithLinks;
    isPreview?: boolean;
}

const UserPage = ({ userProfile, isPreview = true }: Props) => {
    const displayPicture = useMemo<JSX.Element>(() => {
        return userProfile.displayImage
            ? <Image src={userProfile.displayImage} alt='profile picture' priority width={80} height={80} className='rounded-full' />
            : <div className="flex justify-center items-center bg-gray-500 rounded-full w-20 h-20 text-white text-center cursor-pointer text-3xl">
                {userProfile.username.substring(0, 1).toUpperCase()}
            </div>
    }, [userProfile])
    return (
        <div className={`w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 ${isPreview ? 'rounded-2xl' : ''} overflow-y-scroll`}>
            <div className="flex flex-col pt-10 pb-4 px-4 items-center gap-y-3">
                {displayPicture}
                <div className="flex flex-col items-center">
                    <span className="font-bold text-md">{userProfile.title}</span>
                    {userProfile.bio && userProfile.bio.length > 0 && <span className="text-xs mt-1 word-break">{userProfile.bio}</span>}
                </div>
                {
                    userProfile.links.length > 0 &&
                    userProfile.links.filter(x => x.isVisible).map(x => (
                        <a
                            key={x.id}
                            href={x.url}
                            className={`flex bg-white rounded-[0.25rem] drop-shadow-md h-11 ${isPreview ? 'w-full' : 'w-full md:w-1/2 lg:w-5/8 2xl:w-1/4'} w-full text-center text-xs items-center justify-center cursor-pointer transition ease-in-out duration-300 hover:scale-105`}>
                            {x.title}
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default UserPage