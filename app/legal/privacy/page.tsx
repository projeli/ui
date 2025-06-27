import PageContainer from "@/components/layout/page-container";
import Link from "next/link";

export default function Page() {
    return (
        <PageContainer className="grid gap-8 mt-12">
            <div>
                <h1 className="text-2xl font-bold">
                    Privacy Policy for Projeli (projeli.com)
                </h1>
                <p>Effective Date: 27/06/2025</p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
                <p>
                    Welcome to Projeli (projeli.com), a website where users can
                    create projects in any category and add wiki pages to those
                    projects. We (&quot;we,&quot; &quot;us,&quot; or
                    &quot;our&quot;) are committed to protecting your privacy
                    and ensuring your personal data is handled in accordance
                    with the General Data Protection Regulation (GDPR). This
                    Privacy Policy explains how we collect, use, store, and
                    protect your personal data when you use our website, as well
                    as your rights under GDPR and how to exercise them.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    2. Data Controller
                </h2>
                <p className="mb-4">
                    As the operator of Projeli, I am the data controller
                    responsible for your personal data. For any data protection
                    inquiries, you can contact me at:
                </p>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>Email:</strong> admin@daqem.com
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    3. Personal Data We Collect
                </h2>
                <p className="mb-4">
                    We collect and process the following personal data:
                </p>
                <ul className="list-disc pl-6">
                    <li className="mb-2">
                        <strong>
                            Data Collected by Clerk (Authentication Provider):
                        </strong>
                        <ul className="list-disc pl-6">
                            <li className="mb-2">Email address</li>
                            <li className="mb-2">Username</li>
                            <li className="mb-2">First name (optional)</li>
                            <li className="mb-2">Last name (optional)</li>
                            <li className="mb-2">
                                Profile picture URL (optional)
                            </li>
                            <li className="mb-2">IP address</li>
                            <li className="mb-2">Session data</li>
                            <li className="mb-2">
                                Discord connection (if applicable, for users who
                                connect their Discord account)
                            </li>
                            <li className="mb-2">
                                Password (hashed and managed by Clerk, not
                                stored in plain text)
                            </li>
                        </ul>
                    </li>
                    <li className="mb-2">
                        <strong>Data Collected Directly by Us:</strong>
                        <ul className="list-disc pl-6">
                            <li className="mb-2">
                                <strong>None.</strong> All personal data is
                                collected through Clerk for authentication and
                                user profile purposes.
                            </li>
                        </ul>
                    </li>
                    <li className="mb-2">
                        <strong>Analytics Data:</strong>
                        <ul className="list-disc pl-6">
                            <li className="mb-2">
                                We use a self-hosted version of Matomo for
                                analytics. Matomo collects anonymized data
                                (e.g., anonymized IP addresses, browser type,
                                pages visited) to help us improve the website.
                                No identifiable personal data is collected
                                through Matomo.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    4. How We Use Your Personal Data
                </h2>
                <p className="mb-4">
                    We use your personal data for the following purposes:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                        <strong>Authentication:</strong> To verify your identity
                        and provide access to your account.
                    </li>
                    <li className="mb-2">
                        <strong>User Profiles:</strong> To display your
                        username, first name, last name, and profile picture on
                        your profile and in connection with your projects and
                        wiki pages.
                    </li>
                    <li className="mb-2">
                        <strong>Service Improvement:</strong> To analyze website
                        usage through anonymized analytics data collected by
                        Matomo.
                    </li>
                </ul>
                <p>
                    We do not use your personal data for marketing or other
                    purposes beyond providing the service.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    5. Legal Basis for Processing Personal Data
                </h2>
                <p className="mb-4">
                    Under the General Data Protection Regulation (GDPR), we
                    process your personal data based on the following legal
                    bases:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                        <strong>Contractual Necessity:</strong> Processing is
                        necessary to perform the contract between you and us,
                        specifically to provide access to the website and enable
                        you to create projects and wiki pages.
                    </li>
                    <li className="mb-2">
                        <strong>Legitimate Interests:</strong> We process
                        anonymized analytics data to improve the website’s
                        functionality and user experience, which is in our
                        legitimate interest and does not override your rights or
                        freedoms.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    6. Data Sharing and Third Parties
                </h2>
                <p className="mb-4">
                    We do not share your personal data with third parties,
                    except as described below:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                        <strong>Clerk:</strong> Our authentication provider,
                        Clerk, processes personal data on our behalf to manage
                        user authentication. Clerk’s privacy policy is available
                        at{" "}
                        <Link
                            className="underline"
                            href="https://clerk.com/legal/privacy"
                        >
                            https://clerk.com/legal/privacy
                        </Link>
                        . We have a Data Processing Agreement (DPA) with Clerk
                        to ensure GDPR compliance.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    7. Data Transfers Outside the EU
                </h2>
                <p className="mb-4">
                    Your personal data is stored on servers located in the
                    United States, which is outside the European Union.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    8. Data Retention
                </h2>
                <p className="mb-4">
                    We retain your personal data for as long as your account
                    remains active. If you delete your account, all associated
                    personal data (including projects, wiki pages, and
                    notifications) will be permanently removed.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    9. Your Rights Under GDPR
                </h2>
                <p className="mb-4">
                    As a user, you have the following rights under GDPR:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                        <strong>Right to Access:</strong> You can request a copy
                        of the personal data we hold about you.
                    </li>
                    <li className="mb-2">
                        <strong>Right to Rectification:</strong> You can update
                        or correct your personal data.
                    </li>
                    <li className="mb-2">
                        <strong>Right to Erasure:</strong> You can request
                        deletion of your personal data.
                    </li>
                    <li className="mb-2">
                        <strong>Right to Restrict Processing:</strong> You can
                        request that we limit how we process your personal data.
                    </li>
                    <li className="mb-2">
                        <strong>Right to Data Portability:</strong> You can
                        request your personal data in a structured,
                        machine-readable format.
                    </li>
                    <li className="mb-2">
                        <strong>Right to Object:</strong> You can object to the
                        processing of your personal data based on legitimate
                        interests.
                    </li>
                </ul>
                <p className="mb-4">
                    To exercise these rights, please contact us at{" "}
                    <a className="underline" href="mailto:admin@daqem.com">
                        admin@daqem.com
                    </a>
                    .
                </p>
                <p className="mb-4">
                    We will respond to your request within one month.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    10. User Data Management
                </h2>
                <p className="mb-4">
                    You can update or delete your personal data at any time
                    through the "Manage Account" feature, accessible by clicking
                    your profile in the header. Deleting your account will
                    permanently remove all associated data.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    11. Cookies and Analytics
                </h2>
                <p className="mb-4">
                    We use a self-hosted version of Matomo for analytics, which
                    uses cookies to collect anonymized data about your website
                    usage (e.g., pages visited, time spent). This helps us
                    improve the website but does not identify you personally.
                    You can manage cookie preferences through your browser
                    settings.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    12. Security Measures
                </h2>
                <p className="mb-4">
                    We take the following measures to protect your personal
                    data:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                        <strong>Access Controls:</strong> Our servers are secure
                        and can only be accessed from specific IP addresses.
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    13. Children’s Privacy
                </h2>
                <p className="mb-4">
                    Projeli is intended for users aged 13 and above. We do not
                    knowingly collect personal data from children under 13. If
                    you are under 16, please ensure you have parental consent
                    before using the website.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    14. Changes to This Privacy Policy
                </h2>
                <p className="mb-4">
                    We may update this Privacy Policy as needed. Significant
                    changes will be communicated via email or a notice on the
                    website. The updated policy will take effect on the date
                    listed at the top.
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">15. Contact Us</h2>
                <p className="mb-4">
                    For questions about this Privacy Policy or to exercise your
                    GDPR rights, contact us at:
                </p>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>Email:</strong> admin@daqem.com
                    </li>
                </ul>
            </div>
        </PageContainer>
    );
}
