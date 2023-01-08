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
        <div className={`flex flex-row hover:bg-gray-200 items-center rounded-md p-2 cursor-pointer duration-300 gap-x-1 ${isActiveLink ? 'text-brandBlack' : 'text-gray-400'}`}>
            <div className="w-6 h-6">{icon}</div>
            {name}
        </div>
    )
}

export default HeaderItem