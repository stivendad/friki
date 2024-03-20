'use client'

import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { SidebarItemMenu } from "./SidebarItemMenu";
import { useUiStore } from "@/store";
import clsx from "clsx";

interface ItemMenuProps {
    title: string;
    href: string;
    icon: JSX.Element;
    isLine?: boolean;
}


export const Sidebar = () => {

    const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
    const closeMenu = useUiStore(state => state.closeSideMenu);

    const itemMenu = [
        {
            title: 'Perfil',
            href: '/',
            icon: <IoPersonOutline size={30} />,
            id: 1,
        },
        {
            title: 'Ordenes',
            href: '/',
            icon: <IoTicketOutline size={30} />,
            id: 2,
        },
        {
            title: 'Ingresar',
            href: '/',
            icon: <IoLogInOutline size={30} />,
            id: 3,
        },
        {
            title: 'Salir',
            href: '/',
            icon: <IoLogOutOutline size={30} />,
            isLine: true,
            id: 4,
        },
        {
            title: 'Productos',
            href: '/',
            icon: <IoShirtOutline size={30} />,
            id: 5,
        },
        {
            title: 'Ordenes',
            href: '/',
            icon: <IoTicketOutline size={30} />,
            id: 6,
        },
        {
            title: 'Usuarios',
            href: '/',
            icon: <IoPeopleOutline size={30} />,
            id: 7,
        },
    ]

    return (
        <div>

            {/* Background black */}
            {
                isSideMenuOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
                )
            }

            {/* Blur */}
            {isSideMenuOpen && (
                <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" onClick={closeMenu}></div>
            )}

            {/* Sidemenu */}
            <nav
                // todo: Efecto de slide 
                className={
                    clsx(
                        "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                        {
                            'translate-x-full': !isSideMenuOpen
                        }
                    )
                }>
                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />

                {/* Input */}
                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input type="text" placeholder="Buscar" className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500" />
                </div>

                {/* Menu */}

                {
                    itemMenu.map((item) => (
                        <>
                            <SidebarItemMenu key={item.id} title={item.title} href={item.href} icon={item.icon} />
                            {(item.isLine) && <div className="w-full h-px bg-gray-200 my-10" />}
                        </>

                    ))
                }


            </nav>
        </div>
    )
}
