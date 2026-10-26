import Link from "next/link"
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer id="contact" className="bg-blue-950 text-white">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

                {/* Footer Grid */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* About */}
                    <div>
                        <Link
                            href="/"
                            className="mb-4 inline-flex items-center gap-2"
                        >
                            <img
                                src="/images/myschoolresult.png"
                                alt="My School Result Logo"
                                className="h-10 w-10 object-contain"
                            />

                            <span className="text-xl font-extrabold">
                                <span className="text-blue-400">
                                    Myschool
                                </span>
                                <span className="text-white">
                                    Result
                                </span>
                            </span>
                        </Link>

                        <p className="max-w-sm text-sm leading-7 text-blue-100/80">
                            Empowering education with seamless result access
                            for students, parents, and schools.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/"
                                className="text-sm text-blue-100/80 transition hover:text-white"
                            >
                                Home
                            </Link>

                            <Link
                                href="/#result-checker"
                                className="text-sm text-blue-100/80 transition hover:text-white"
                            >
                                Check Result
                            </Link>

                            <Link
                                href="/news"
                                className="text-sm text-blue-100/80 transition hover:text-white"
                            >
                                News
                            </Link>

                            <Link
                                href="/about"
                                className="text-sm text-blue-100/80 transition hover:text-white"
                            >
                                About
                            </Link>

                            <Link
                                href="/contact"
                                className="text-sm text-blue-100/80 transition hover:text-white"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Legal
                        </h3>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/privacy-policy"
                                className="text-sm text-blue-100/80 transition hover:text-white"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms-of-service"
                                className="text-sm text-blue-100/80 transition hover:text-white"
                            >
                                Terms of Service
                            </Link>

                            <Link
                                href="/contact"
                                className="text-sm text-blue-100/80 transition hover:text-white"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Contact Us
                        </h3>

                        <div className="space-y-4 text-sm text-blue-100/80">
                            <Link
                                href="mailto:info@myschoolresult.com"
                                className="flex items-start gap-3 transition hover:text-white"
                            >
                                <i className="fas fa-envelope mt-1 w-4 text-blue-400" />
                                <span>info@myschoolresult.com</span>
                            </Link>

                            <Link
                                href="tel:+2349157303724"
                                className="flex items-start gap-3 transition hover:text-white"
                            >
                                <i className="fas fa-phone mt-1 w-4 text-blue-400" />
                                <span>+234 915 7303 724</span>
                            </Link>

                            <div className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt mt-1 w-4 text-blue-400" />
                                <span>
                                    184, Second East Circular Rd,
                                    <br />
                                    Benin City
                                </span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-6">
                            <p className="mb-3 text-sm font-semibold text-white">
                                Follow Us
                            </p>

                            <div className="flex gap-3">
                                <Link
                                    href="https://wa.me/2349157303724?text=Hello%20I%20visited%20your%20myschoolresult%20and%20want%20to%20know%20more%20about%20your%20services"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-green-500"
                                >
                                    <FaWhatsapp />
                                </Link>

                                <Link
                                    href="https://www.facebook.com/myschoolresultpage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-blue-600"
                                >
                                    <FaFacebook className=" text-blue-500" />
                                </Link>

                                <Link
                                    href="#"
                                    aria-label="Instagram"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-pink-600"
                                >
                                    <FaInstagram />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-white/10 pt-6">
                    <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-blue-100/60 sm:flex-row sm:text-left">
                        <p>
                            &copy; {new Date().getFullYear()} My School Result.
                            All rights reserved.
                        </p>

                        <div className="flex gap-4">
                            <Link
                                href="/privacy-policy"
                                className="transition hover:text-white"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms-of-service"
                                className="transition hover:text-white"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer