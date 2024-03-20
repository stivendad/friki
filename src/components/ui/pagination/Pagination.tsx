'use client';

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;

    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathName);
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);
    console.log(allPages)

    const createPageUrl = (pageNumber: number | string) => {

        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathName}?${params.toString()}`;
        }

        if (+pageNumber <= 0) {
            return `${pathName}`;
        }

        if (+pageNumber > totalPages) {
            return `${pathName}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());
        return `${pathName}?${params.toString()}`;

    }

    return (
        <div className="flex text-center justify-center mt-10 mb-32">
            <nav aria-label="Page navigation">
                <ul className="inline-flex space-x-2">
                    <li>
                        <Link href={createPageUrl(currentPage - 1)}>
                            <button className="flex items-center justify-center w-10 h-10 text-blue-700 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">
                                <IoChevronBackOutline size={30} />
                            </button>
                        </Link>
                    </li>

                    {
                        allPages.map((page, i) => (
                            <li key={page + '-' + i}>
                                <Link href={createPageUrl(page)}>
                                    <button className={
                                        clsx(
                                            "w-10 h-10 text-black transition-colors duration-150 rounded-full focus:shadow-outline",
                                            {
                                                'text-white bg-blue-700 border border-r-0 border-blue-700 rounded-full hover:bg-blue-800': page === currentPage,
                                                'hover:bg-blue-100': page !== currentPage
                                            }
                                        )
                                    }>
                                        {page}
                                    </button>
                                </Link>
                            </li>
                        ))
                    }

                    <li>
                        <Link href={createPageUrl(currentPage + 1)}>
                            <button className="flex items-center justify-center w-10 h-10 text-blue-700 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">
                                <IoChevronForwardOutline size={30} />
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
