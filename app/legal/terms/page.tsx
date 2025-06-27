import PageContainer from "@/components/layout/page-container";
import Link from "next/link";

export default function Page() {
    return (
        <PageContainer className="grid gap-8 mt-12">
            <div>
                <h1 className="text-2xl font-bold">
                    Terms of Service for Projeli (projeli.com)
                </h1>
                <p>Last Updated: 27/06/2025</p>
            </div>
            <div>
                <p>
                    Welcome to Projeli (projeli.com), a platform for creating
                    and sharing educational projects and wiki pages. These Terms
                    of Service ("ToS") govern your use of our website and
                    services ("Services"). By accessing or using Projeli, you
                    agree to be bound by these terms. If you do not agree,
                    please do not use our Services.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">1. Eligibility</h2>
                <ul className="list-disc pl-6">
                    <li>You must be at least 13 years old to use Projeli.</li>
                    <li>
                        If you are under 16, you confirm that you have parental
                        consent to use the Services, as required by applicable
                        laws (e.g., GDPR).
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
                <ul className="list-disc pl-6">
                    <li>
                        You are responsible for maintaining the confidentiality
                        of your account credentials.
                    </li>
                    <li>
                        Notify us immediately if you suspect unauthorized use of
                        your account.
                    </li>
                    <li>
                        We reserve the right to suspend or terminate accounts
                        for violations of these ToS.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    3. Content Guidelines
                </h2>
                <ul className="list-disc pl-6">
                    <li>
                        All content posted on Projeli must be suitable for a
                        general audience and must not be offensive,
                        inappropriate, or illegal.
                    </li>
                    <li>
                        Content must be related to educational purposes only.
                    </li>
                    <li>
                        Prohibited content includes, but is not limited to:
                        <ul>
                            <li>Hate speech or discrimination</li>
                            <li>Explicit or sexually suggestive material</li>
                            <li>Illegal content or activities</li>
                            <li>Harassment, bullying, or threats</li>
                            <li>Spam or unsolicited advertising</li>
                        </ul>
                    </li>
                    <li>
                        We reserve the right to remove any content that violates
                        these guidelines.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    4. Content Moderation
                </h2>
                <ul>
                    <li>
                        Violations of these ToS may result in the removal of
                        content or suspension of accounts.
                    </li>
                    <li>
                        If you encounter any issues or wish to report a
                        violation, please contact us via Discord (
                        <Link
                            className="underline"
                            href="https://projeli.com/discord"
                        >
                            Join our Discord
                        </Link>
                        ).
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    5. Intellectual Property
                </h2>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>Your Content: </strong>You retain ownership of
                        all projects and wiki pages you create on Projeli.
                    </li>
                    <li>
                        <strong>Our Rights: </strong>By posting content, you
                        grant Projeli the right to display and store your
                        content for the purpose of providing our Services.
                    </li>
                    <li>
                        <strong>Copyright Complaints: </strong>If you believe
                        your copyright has been infringed, please contact us at
                        admin@daqem.com, and we will remove the infringing
                        content.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    6. User Responsibilities
                </h2>
                <p className="mb-2">You agree to:</p>
                <ul className="list-disc pl-6">
                    <li>
                        Provide accurate and truthful information when using
                        Projeli.
                    </li>
                    <li>
                        Ensure your content complies with all applicable laws
                        and regulations.
                    </li>
                    <li>
                        Not misuse our Services (e.g., hacking, spamming, or
                        other malicious activities).
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    7. Limitation of Liability
                </h2>
                <ul className="list-disc pl-6">
                    <li>Projeli is provided "as is" without any warranties.</li>
                    <li>
                        We are not liable for any damages resulting from the use
                        or inability to use our Services.
                    </li>
                    <li>
                        The site or any part of it may be unavailable or shut
                        down at any time without prior notice.
                    </li>
                    <li>
                        We do not guarantee uptime or continuous availability of
                        our Services.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    8. Account Termination
                </h2>
                <ul>
                    <li>
                        We may suspend or terminate your account if you violate
                        these ToS.
                    </li>
                    <li>
                        You may terminate your account at any time by contacting
                        us at admin@daqem.com.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    9. Governing Law and Dispute Resolution
                </h2>
                <ul>
                    <li>
                        These ToS are governed by the laws of the Netherlands.
                    </li>
                    <li>
                        Any disputes arising from these ToS will be resolved
                        through mediation or arbitration in the Netherlands, in
                        accordance with Dutch law.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    10. Changes to These Terms
                </h2>
                <ul>
                    <li>We may update these ToS from time to time.</li>
                    <li>
                        We will notify you of any changes via email or a notice
                        on our website.
                    </li>
                    <li>
                        Your continued use of Projeli after such changes
                        constitutes acceptance of the updated terms.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">11. Contact Us</h2>
                <p>
                    If you have any questions or concerns about these Terms of
                    Service, please contact us at{" "}
                    <a className="underline" href="mailto:admin@daqem.com">
                        admin@daqem.com
                    </a>
                </p>
            </div>
            <div>
                <p>
                    <strong>Privacy Note:</strong> Your use of Projeli is also
                    governed by our Privacy Policy,{" "}
                    <Link className="underline" href="/legal/privacy">
                        available on our website
                    </Link>
                    .
                </p>
            </div>
        </PageContainer>
    );
}
