import { titleFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
    span?: string;
}

export const Title = ({ title, subtitle, className, span }: Props) => {
    return (
        <div className={`mt-3 ${className}`}>
            <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-10`}>{title} <span className="capitalize">{span}</span></h1>

            {
                subtitle && (
                    <h3 className="text-xl mb-5">{subtitle}</h3>
                )
            }
        </div>
    )
}
