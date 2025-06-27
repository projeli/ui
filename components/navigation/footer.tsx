import Logo from "@/components/images/logo";
import Link from "next/link";
import {
    FooterBottom,
    FooterColumn,
    FooterContent,
    Footer as Footerr,
} from "../ui/footer";
import { ModeToggle } from "../ui/mode-toggle";

export default function Footer() {
    return (
        <footer className="w-full bg-card px-4 mt-12">
            <div className="mx-auto max-w-7xl">
                <Footerr>
                    <FooterContent>
                        <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
                            <div className="flex items-center gap-2">
                                <a href="/" className="h-12 w-max">
                                    <Logo />
                                </a>
                            </div>
                        </FooterColumn>
                        <FooterColumn>
                            <h3 className="text-md pt-1 font-semibold">
                                Navigation
                            </h3>
                            <Link
                                href="/projects"
                                className="text-sm text-muted-foreground"
                            >
                                Projects
                            </Link>
                        </FooterColumn>
                        <FooterColumn>
                            <h3 className="text-md pt-1 font-semibold">
                                Contact
                            </h3>
                            <Link
                                href="/discord"
                                className="text-sm text-muted-foreground"
                            >
                                Discord
                            </Link>
                            <Link
                                href="https://github.com/projeli"
                                className="text-sm text-muted-foreground"
                            >
                                Github
                            </Link>
                        </FooterColumn>
                    </FooterContent>
                    <FooterBottom>
                        <div>
                            © {new Date().getFullYear()} DAQEM Studios. All
                            rights reserved
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="/legal/privacy">Privacy Policy</a>
                            <a href="/legal/terms">Terms of Service</a>
                            <ModeToggle />
                        </div>
                    </FooterBottom>
                </Footerr>
            </div>
        </footer>
    );
}
