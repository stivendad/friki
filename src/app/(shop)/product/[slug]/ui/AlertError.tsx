import { IoAlertCircleOutline, IoAlertOutline } from "react-icons/io5";


interface Props {
    message: string;
}


export const AlertError = ({ message }: Props) => {
    return (
        <>
            <div
                className="font-regular relative block w-full rounded-lg bg-gradient-to-tr from-red-600 to-red-400 px-4 py-4 text-base text-white fade-in"
                data-dismissible="alert"
            >
                <div className="absolute top-3 left-4">
                    <IoAlertCircleOutline size={35} />
                </div>

                <div className="ml-12 mr-12">{message}</div>
            </div>
        </>
    )
}
