import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

type Props = {
    name: string;
    url: string;
    icon: JSX.Element;
}

const HeaderItem = ({ name, url, icon }: Props) => {
    const { pathname } = useRouter();
    const isActiveLink = useMemo<boolean>(() => pathname.includes(url), [url, pathname]);

    return (
        <Link className={`flex flex-row hover:bg-gray-200 dark:hover:bg-[#3c3e4a] dark:hover:text-white items-center rounded-md p-2 cursor-pointer duration-300 gap-x-1 ${isActiveLink ? 'text-brandBlack dark:text-white' : 'text-gray-400'}`} href={url}>
            <span className="w-6 h-6">{icon}</span>
            {name}
        </Link>
    )
}

export default HeaderItem