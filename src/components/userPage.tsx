import { useMemo } from "react";
import type { Link } from "../types/Link";

type Props = {
    profilePicture: string | null;
    username: string;
    links: Array<Link> | null;
}

const UserPage = ({ profilePicture, username, links }: Props) => {
    const displayPicture = useMemo<JSX.Element>(() => {
        return profilePicture
            ? <img src={profilePicture} alt='profile picture' className='w-20 h-20 rounded-full' />
            : <div className="flex justify-center items-center bg-gray-500 rounded-full w-20 h-20 text-white text-center cursor-pointer text-3xl">
                {username.substring(0, 1).toUpperCase()}
            </div>
    }, [profilePicture, username])
    return (
        <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl">
            <div className="flex flex-col pt-10 pb-4 px-4 items-center gap-y-3">
                {displayPicture}
                <span className="font-bold text-md">@{username}</span>
                {
                    links?.map(x => (
                        <a
                            key={x.id}
                            href={x.url}
                            className="flex bg-white rounded-[0.25rem] drop-shadow-md h-11 w-full text-center text-xs items-center justify-center cursor-pointer transition ease-in-out duration-300 hover:scale-105 ">
                            {x.title}
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default UserPage