'use client'
import Footer from '@/app/component/footer';
import Header from '@/app/component/header';
import { ArrowRightFromLineIcon, GraduationCap, IdCard, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'


function Page() {

    const [form, setForm] = useState({
        studentId: '',
        firstName: ''
    })
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!form.studentId || !form.firstName) {
            return;
        }
        setLoading(true)
        try {
            const response = await fetch("/student/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(form)
                }
            );


            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid login details"
                );
            }
            // Save student information if required
            if (data.student) {
                localStorage.setItem(
                    "student",
                    JSON.stringify(data.student)
                );
            }
            localStorage.setItem(
                "isStudent",
                "student"
            );
            // Redirect
            router.push("/student/dashboard");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(`${error.message || 'server error'}`)

        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <Header />
            {/* <!-- Main --> */}
            <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">

                <div className="w-full max-w-md">

                    {/* <!-- Login Card --> */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">

                        {/* <!-- Icon --> */}
                        <div className="flex justify-center mb-5">

                            <div className="w-16 h-16 rounded-2xl
                                bg-blue-100
                                text-blue-500
                                flex items-center justify-center">

                                <GraduationCap className="text-2xl" />

                            </div>

                        </div>


                        {/* <!-- Heading --> */}
                        <div className="text-center mb-8">

                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                                Student Login
                            </h2>

                            <p className="text-sm text-slate-500 mt-2">
                                Enter your details to access your student portal.
                            </p>

                        </div>


                        {/* <!-- Error Message --> */}
                        <div
                            id="errorMessage"
                            className="hidden mb-5 rounded-lg
                           bg-red-50 border border-red-200
                           text-red-700 text-sm
                           px-4 py-3"
                        >
                        </div>


                        {/* <!-- Login Form --> */}
                        <form onSubmit={handleSubmit} className="space-y-5">


                            {/* <!-- Student ID --> */}
                            <div>

                                <label
                                    htmlFor="studentId"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Student ID
                                </label>

                                <div className="relative">

                                    <IdCard className="
                                      absolute left-4 top-1/2
                                      -translate-y-1/2
                                      text-slate-400" />


                                    <input
                                        type="text"
                                        onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                                        id="studentId"
                                        name="studentId"
                                        placeholder="Enter your student ID"
                                        autoComplete="username"
                                        required
                                        className="w-full pl-11 pr-4 py-3
                                       rounded-lg
                                       border border-slate-300
                                       bg-white
                                       text-slate-800
                                       placeholder-slate-400
                                       focus:outline-none
                                       focus:ring-2
                                       focus:ring-blue-200
                                       focus:border-transparent"
                                    />

                                </div>

                            </div>


                            {/* <!-- First Name --> */}
                            <div>

                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    First Name
                                </label>

                                <div className="relative">

                                    <User className="
                                      absolute left-4 top-1/2
                                      -translate-y-1/2
                                      text-slate-400" />


                                    <input
                                        type="text"
                                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        autoComplete="given-name"
                                        required
                                        className="w-full pl-11 pr-4 py-3
                                       rounded-lg
                                       border border-slate-300
                                       bg-white
                                       text-slate-800
                                       placeholder-slate-400
                                       focus:outline-none
                                       focus:ring-2
                                       focus:ring-blue-200
                                       focus:border-transparent"
                                    />

                                </div>

                            </div>


                            {/* <!-- Login Button --> */}
                            <button
                                type="submit"
                                id="loginBtn"
                                className="w-full flex items-center justify-center gap-2
                               py-3.5
                               rounded-lg
                               bg-blue-500
                               hover:bg-blue-800
                               text-white
                               font-semibold
                               transition
                               disabled:opacity-60
                               disabled:cursor-not-allowed"
                            >

                                <ArrowRightFromLineIcon className="fa-solid fa-right-to-bracket" />

                                <span id="loginBtnText">
                                    {loading ? 'Loging....' : 'Login'}
                                </span>

                            </button>
                            {
                                error ?
                                    <div className='w-full bg-red-200 p-1 flex gap-1 items-center rounded-2xl'>
                                        <Shield className=' text-red-600' />
                                        <span className='text-red-600'>text</span>
                                    </div>
                                    :
                                    ''
                            }
                        </form>


                        {/* <!-- Help --> */}
                        <div className="mt-7 text-center">

                            <p className="text-sm text-slate-500">
                                Do not know your Student ID?
                            </p>

                            <p className="text-sm text-slate-600 mt-1">
                                Please contact your school administrator.
                            </p>

                        </div>


                        {/* <!-- Admin Login --> */}
                        <div className="border-t border-slate-200 mt-7 pt-6 text-center">

                            <p className="text-sm text-slate-500">
                                Are you a school administrator?
                            </p>

                            <Link
                                href="/admin-login"
                                className="inline-flex items-center gap-2
                               mt-2
                               text-sm
                               font-semibold
                               text-blue-700
                               hover:text-blue-800"
                            >

                                <i className="fa-solid fa-user-tie"></i>

                                Admin Login

                            </Link>

                        </div>

                    </div>
                </div>

            </main>
            <Footer />
        </>
    )
}

export default Page
