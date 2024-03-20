import Link from 'next/link'

interface Props {
    title: string;
    href: string;
    icon: JSX.Element;
}

export const SidebarItemMenu = ({ title, href, icon }: Props) => {
    return (
        <Link href={href} className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
            {icon}
            <span className="ml-3 text-xl">{title}</span>
        </Link>
    )
}
