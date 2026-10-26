"use client"
import React, { useEffect, useState } from 'react'
import { School, GraduationCap, ChevronDown, IdCard, CalendarDays, FileSearch, ShieldCheck, CheckCircle, User, School2Icon, Newspaper } from 'lucide-react'
import Footer from './component/footer';
import Header from './component/header';
import { News } from './component/interface';



function Page() {
  const [news, setNews] = useState<News[]>([])


  return (
    <div>

      <Header />

      <section className="relative overflow-hidden bg-blue-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100/70" />

        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              MySchoolResult
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Check Results
              <span className="block text-blue-600">
                Anytime, Anywhere
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Empowering students and schools with fast, secure, and
              convenient access to academic results online.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#result-checker"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Check Result Now
                <i className="fas fa-arrow-right" />
              </a>

              <a
                href="/result_check_guide"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-7 py-3.5 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <i className="fas fa-check-circle text-blue-600" />
                Fast Access
              </span>

              <span className="flex items-center gap-2">
                <i className="fas fa-shield-alt text-blue-600" />
                Secure
              </span>

              <span className="flex items-center gap-2">
                <i className="fas fa-mobile-alt text-blue-600" />
                Mobile Friendly
              </span>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute h-72 w-72 rounded-full bg-blue-200/50 blur-3xl sm:h-96 sm:w-96" />

            <div className="relative w-full max-w-lg">
              <div className="absolute -right-3 -top-3 h-full w-full rounded-3xl bg-blue-600/10" />

              <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-2xl">
                <img
                  src="/images/hero-image.png"
                  alt="Students checking their academic results"
                  className="h-[350px] w-full rounded-2xl object-cover sm:h-[420px]"
                />
              </div>

              <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:-left-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <GraduationCap className="text-lg" />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Results Made Easy
                  </p>
                  <p className="text-xs text-gray-500">
                    Simple &amp; convenient
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section
        id="result-checker"
        className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12"
      >
        <div className="w-full max-w-lg">

          {/* <!-- Card --> */}
          <div
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8"
          >

            {/* <!-- Header --> */}
            <div className="mb-8 text-center">

              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              >
                <GraduationCap className="h-7 w-7" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Check Your Results
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your student details to view your academic result.
              </p>

            </div>


            {/* <!-- Form --> */}
            <form
              action="/result"
              method="post"

              className="space-y-5"
            >

              {/* <!-- Student ID --> */}
              <div>

                <label
                  htmlFor="student-id"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Student ID
                </label>

                <div className="relative">

                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
                  >
                    <IdCard className="h-5 w-5" />
                  </div>

                  <input
                    type="text"
                    id="student-id"
                    name="studentId"
                    placeholder="Enter Student ID"
                    required
                    aria-label="Student ID"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>


              {/* <!-- Class --> */}
              <div>

                <label
                  htmlFor="SclassName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Class
                </label>

                <div className="relative">

                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-slate-400"
                  >
                    <School className="h-5 w-5" />
                  </div>

                  <select
                    id="SclassName"
                    name="className"
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">SELECT CLASS</option>

                    <option value="SS 1">SS1</option>
                    <option value="SS 2">SS2</option>
                    <option value="SS 3">SS3</option>

                    <option value="JSS 1">JSS1</option>
                    <option value="JSS 2">JSS2</option>
                    <option value="JSS 3">JSS3</option>

                    <option value="BASIC 1">BASIC 1</option>
                    <option value="BASIC 2">BASIC 2</option>
                    <option value="BASIC 3">BASIC 3</option>
                    <option value="BASIC 4">BASIC 4</option>
                    <option value="BASIC 5">BASIC 5</option>
                    <option value="BASIC 6">BASIC 6</option>

                    <option value="NURSERY 1">NURSERY 1</option>
                    <option value="NURSERY 2">NURSERY 2</option>
                    <option value="NURSERY 3">NURSERY 3</option>

                    <option value="PRE NURSERY">PRE-NURSERY</option>
                  </select>

                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>

                </div>

              </div>



              <div>

                <label
                  htmlFor="term"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >

                  Term
                </label>

                <div className="relative">

                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-slate-400"
                  >
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <select
                    id="term"
                    name="term"
                    required
                    aria-label="Select Term"
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">SELECT TERM</option>
                    <option value="FIRST TERM">FIRST TERM</option>
                    <option value="SECOND TERM">SECOND TERM</option>
                    <option value="THIRD TERM">THIRD TERM</option>
                  </select>

                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>

                </div>

              </div>


              {/* <!-- Submit --> */}
              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98]"
              >
                <FileSearch className="h-5 w-5" />
                <span>View Result</span>
              </button>

            </form>


            {/* <!-- Footer --> */}
            <div
              className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-400"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Your result information is secure</span>
            </div>

          </div>

        </div>
      </section>


      {/* ==================== NEWS ==================== */}
      <section id="news" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Stay Updated
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Latest School News &amp; Updates
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Stay informed with the latest education news, school updates,
              examination information, and important announcements.
            </p>
          </div>

          {/* News */}
          {news && news.length > 0 ?
            news.map(item => (
              <div
                key={item._id}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center shadow-sm">
                  <div>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Newspaper className="text-xl" />
                    </div>

                    <p className="font-medium text-gray-500">
                      Loading latest news...
                    </p>
                  </div>
                </div>
              </div>
            )) :

            <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center shadow-sm">
              <div>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Newspaper className="text-xl" />
                </div>

                <p className="font-medium text-gray-500">
                  Loading latest news...
                </p>
              </div>
            </div>

          }

          {/* View More */}
          <div className="mt-10 text-center">
            <a
              href="/news"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              View More News
              <i className="fas fa-arrow-right" />
            </a>
          </div>
        </div>
      </section>


      {/* ==================== FEATURES ==================== */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              Our Features
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose My School Result?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Everything you need to make accessing and managing academic
              results simple and convenient.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Feature 1 */}
            <article className="group rounded-2xl border border-blue-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <CheckCircle className="h-6 w-6" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Instant Result Access
              </h3>

              <p className="text-sm leading-7 text-gray-600">
                Check your academic results in seconds with our
                user-friendly platform.
              </p>
            </article>

            {/* Feature 2 */}
            <article className="group rounded-2xl border border-blue-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <ShieldCheck className=" text-2xl" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Secure and Reliable
              </h3>

              <p className="text-sm leading-7 text-gray-600">
                Your data is protected with top-tier security and
                encryption.
              </p>
            </article>

            {/* Feature 3 */}
            <article className="group rounded-2xl border border-blue-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <School2Icon className=" text-2xl" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Multi-School Support
              </h3>

              <p className="text-sm leading-7 text-gray-600">
                Seamlessly manage results for multiple schools in one
                place.
              </p>
            </article>

            {/* Feature 4 */}
            <article className="group rounded-2xl border border-blue-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <User className="fas fa-user-friends text-2xl" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Parent-Student Dashboard
              </h3>

              <p className="text-sm leading-7 text-gray-600">
                Access personalized dashboards for students and parents.
              </p>
            </article>

          </div>
        </div>
      </section>


      {/* ==================== TESTIMONIALS ==================== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Testimonials
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              See how students, parents, and schools are using
              MySchoolResult.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid gap-6 md:grid-cols-3">

            {/* Testimonial 1 */}
            <article className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src="https://ui-avatars.com/api/?name=Student+Name&background=2563EB&color=fff"
                  alt="Student avatar"
                  className="h-14 w-14 rounded-full"
                />

                <div>
                  <h4 className="font-bold text-gray-900">
                    Adeola
                  </h4>
                  <p className="text-sm text-blue-600">
                    Student
                  </p>
                </div>
              </div>

              <div className="mb-4 flex gap-1 text-yellow-400">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>

              <p className="leading-7 text-gray-600">
                &quot;Checking my results was so easy and fast! Highly
                recommend.&quot;
              </p>
            </article>

            {/* Testimonial 2 */}
            <article className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src="https://ui-avatars.com/api/?name=Parent+Name&background=2563EB&color=fff"
                  alt="Parent avatar"
                  className="h-14 w-14 rounded-full"
                />

                <div>
                  <h4 className="font-bold text-gray-900">
                    Mrs. Okonkwo
                  </h4>
                  <p className="text-sm text-blue-600">
                    Parent
                  </p>
                </div>
              </div>

              <div className="mb-4 flex gap-1 text-yellow-400">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>

              <p className="leading-7 text-gray-600">
                &quot;I love the parent dashboard. It keeps me updated
                on my child&apos;s progress.&quot;
              </p>
            </article>

            {/* Testimonial 3 */}
            <article className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src="https://ui-avatars.com/api/?name=Admin+Name&background=2563EB&color=fff"
                  alt="School admin avatar"
                  className="h-14 w-14 rounded-full"
                />

                <div>
                  <h4 className="font-bold text-gray-900">
                    Principal Adebayo
                  </h4>
                  <p className="text-sm text-blue-600">
                    School Admin
                  </p>
                </div>
              </div>

              <div className="mb-4 flex gap-1 text-yellow-400">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>

              <p className="leading-7 text-gray-600">
                &quot;This platform streamlined our result management
                process.&quot;
              </p>
            </article>

          </div>
        </div>
      </section>

      <Footer />

    </div>
  )
}

export default Page
