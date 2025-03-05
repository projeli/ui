import Image from "next/image";
import Link from "next/link";

const ProjeliLogo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/images/logo.svg"
                className="size-8"
                alt="Logo"
                width={64}
                height={64}
            />
            <span className="text-2xl font-bold">
                Projeli
                <span className="text-sm text-primary hidden sm:inline">
                    .com
                </span>
            </span>
        </Link>
    );
};

export default ProjeliLogo;
