import React from 'react'
  import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowRightToLine, GraduationCap, UserCheck2 } from 'lucide-react';

function Page() {
  return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12">

        <div className="w-full max-w-4xl">

            {/* <!-- Heading --> */}
            <div className="text-center mb-10">

                <div className="inline-flex items-center justify-center
                            w-14 h-14 rounded-2xl
                            bg-emerald-100 text-emerald-700 mb-5">

                    <ArrowRightToLine className="text-2xl" />

                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
                    Welcome Back
                </h2>

                <p className="mt-3 text-slate-500">
                    Choose your account type to continue
                </p>

            </div>


            {/* <!-- Login Options --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

                {/* <!-- Admin Login --> */}
                <Link
                    href="/login/admin-login"
                    className="group bg-white rounded-2xl border border-slate-200
                           p-7 sm:p-8
                           shadow-sm
                           hover:shadow-xl
                           hover:-translate-y-1
                           hover:border-emerald-300
                           transition-all duration-300"
                >

                    <div className="flex items-start justify-between">

                        <div className="w-14 h-14 rounded-xl
                                    bg-emerald-100
                                    text-emerald-700
                                    flex items-center justify-center">

                            <UserCheck2 className="fa-solid fa-user-tie text-2xl" />

                        </div>

                        <GraduationCap className="text-slate-300
                                  group-hover:text-emerald-600
                                  group-hover:translate-x-1
                                  transition-all" />
                        

                    </div>


                    <h3 className="mt-7 text-xl font-bold text-slate-800">
                        Admin Login
                    </h3>

                    <p className="mt-2 text-slate-500 leading-relaxed">
                        Login to manage your school, students, results,
                        teachers and other school activities.
                    </p>


                    <div className="mt-6 flex items-center gap-2
                                text-emerald-700 font-semibold text-sm">

                        <span>Continue as Admin</span>

                        <ArrowRightToLine className="fa-solid fa-arrow-right text-xs"/>

                    </div>

                </Link>


                {/* <!-- Student Login --> */}
                <Link
                    href="/student/dashboard"
                    className="group bg-white rounded-2xl border border-slate-200
                           p-7 sm:p-8
                           shadow-sm
                           hover:shadow-xl
                           hover:-translate-y-1
                           hover:border-blue-300
                           transition-all duration-300"
                >

                    <div className="flex items-start justify-between">

                        <div className="w-14 h-14 rounded-xl
                                    bg-blue-100
                                    text-blue-600
                                    flex items-center justify-center">

                            <GraduationCap className="fa-solid fa-graduation-cap text-2xl" />

                        </div>

                        <ArrowRight className="fa-solid fa-arrow-right text-slate-300
                                  group-hover:text-blue-600
                                  group-hover:translate-x-1
                                  transition-all" />
                    </div>


                    <h3 className="mt-7 text-xl font-bold text-slate-800">
                        Student Login
                    </h3>

                    <p className="mt-2 text-slate-500 leading-relaxed">
                        Login to access your result, timetable, assignments,
                        announcements and school information.
                    </p>


                    <div className="mt-6 flex items-center gap-2
                                text-blue-600 font-semibold text-sm">

                        <span>Continue as Student</span>

                        <ArrowRight className="text-xs" />

                    </div>

                </Link>

            </div>


            {/* <!-- Back --> */}
            <div className="text-center mt-10">

                <Link
                    href="/"
                    className="inline-flex items-center gap-2
                           text-sm text-slate-500
                           hover:text-emerald-700
                           transition"
                >

                    <ArrowLeft className="text-xs"/>

                    Back to Home

                </Link>

            </div>

        </div>

    </main>


  )
}

export default Page
