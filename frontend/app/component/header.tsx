"use client"

import Link from "next/link"
import React, { useState } from "react"

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = () => setMenuOpen(false)

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="flex items-center gap-2"
                >
                    <img
                        src="/images/myschoolresult.png"
                        alt="My School Result Logo"
                        className="h-10 w-10 object-contain"
                    />

                    <h2 className="text-xl font-extrabold tracking-tight">
                        <span className="text-blue-600">Myschool</span>
                        <span className="text-gray-800">Result</span>
                    </h2>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-1 md:flex">

                    <Link
                        href="/"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <Link
                        href="/#result-checker"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        Check Result
                    </Link>

                    <Link
                        href="/news"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        News
                    </Link>

                    <Link
                        href="/about"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        About
                    </Link>

                    <Link
                        href="/result_check_guide"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        SSCE
                    </Link>

                    {/* Install App */}
                    <button
                        id="installAppBtn"
                        className="ml-2 flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                        <i className="fas fa-download" />
                        Install App
                    </button>

                    {/* Login */}
                    <Link
                        href="/login"
                        className="ml-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-blue-600 transition hover:bg-blue-50 md:hidden"
                >
                    <i
                        className={`fas ${
                            menuOpen ? "fa-times" : "fa-bars"
                        } text-xl`}
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
                    menuOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="space-y-1 px-4 pb-5 pt-3">

                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="flex items-center rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <i className="fas fa-home mr-3 w-5 text-blue-600" />
                        Home
                    </Link>

                    <Link
                        href="/#result-checker"
                        onClick={closeMenu}
                        className="flex items-center rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <i className="fas fa-search mr-3 w-5 text-blue-600" />
                        Check Result
                    </Link>

                    <Link
                        href="/news"
                        onClick={closeMenu}
                        className="flex items-center rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <i className="fas fa-newspaper mr-3 w-5 text-blue-600" />
                        News
                    </Link>

                    <Link
                        href="/about"
                        onClick={closeMenu}
                        className="flex items-center rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <i className="fas fa-info-circle mr-3 w-5 text-blue-600" />
                        About
                    </Link>

                    <Link
                        href="/result_check_guide"
                        onClick={closeMenu}
                        className="flex items-center rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <i className="fas fa-graduation-cap mr-3 w-5 text-blue-600" />
                        SSCE
                    </Link>

                    {/* Install App */}
                    <button
                        id="installAppBtnMobile"
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700"
                    >
                        <i className="fas fa-download" />
                        Install MySchoolResult
                    </button>

                    {/* Login */}
                    <Link
                        href="/login"
                        onClick={closeMenu}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-3 font-bold text-blue-600 transition hover:bg-blue-50"
                    >
                        <i className="fas fa-sign-in-alt" />
                        Login
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header