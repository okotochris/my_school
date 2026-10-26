'use client'
import Footer from '@/app/component/footer'
import Header from '@/app/component/header'
import React, { FormEvent, useState } from 'react'
import {Eye, EyeClosed, EyeOff, GraduationCap, Lock, LogIn, Mail, Shield} from 'lucide-react'
import { useRouter } from 'next/navigation'

function Page() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [form, setForm] = useState({
        email:'',
        password:''
    })

    async function handleSubmit (e:FormEvent){
          e.preventDefault(); // ✅ prevent default form submission
          console.log(typeof e)
        try {
            const res = await fetch('/login', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(form)
            });
            const { redirectTo, user, school } = await res.json();
            if (!res.ok) {
                setError('incorrect email or password')
                return
            }
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('school', JSON.stringify(school))
            localStorage.setItem('isStudent', 'admin')
            return router.push(redirectTo)
        } catch (error) {
            setError('server error')
            console.error(error);
        } finally {
           setLoading(false)
        }
    }



  return (
    <div>
        <Header />
        <section id="result-checker" className="min-h-screen bg-slate-50 px-4 py-12 flex items-center justify-center">
            <div className="w-full max-w-md">

                {/* <!-- Login Card --> */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">

                    {/* <!-- Header --> */}
                    <div className="mb-8 text-center">

                        <div
                            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                            <GraduationCap className="h-7 w-7" />
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            Welcome to MySchoolResult
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to access your school account
                        </p>

                    </div>


                    {/* <!-- Login Form --> */}
                    <form  className="space-y-5" onSubmit={handleSubmit}>

                        {/* <!-- Email --> */}
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                                Email Address
                            </label>

                            <div className="relative">

                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                    <Mail className="h-5 w-5"/>
                                </div>

                                <input type="email" id="email"  placeholder="Enter your email" required
                                    onChange={(e)=>setForm({...form, email:e.target.value})}
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />

                            </div>
                        </div>


                        {/* <!-- Password --> */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">

                                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                                    Password
                                </label>

                            </div>

                            <div className="relative">

                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                    <Lock className="h-5 w-5" />
                                </div>

                                <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Enter your password"
                                    required autoComplete="current-password"
                                    onChange={(e)=>setForm({...form, password:e.target.value})}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />

                                <button type="button" onClick={()=>showPassword ? setShowPassword(false): setShowPassword(true)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-600"
                                    aria-label="Show password">
                                    {showPassword ? <EyeOff className="h-5 w-5 text-black" />: <Eye className="h-5 w-5 text-black" /> }
                                </button>

                            </div>
                        </div>


                        {/* <!-- Login Button --> */}
                        <button type="submit" id="submit-button"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
                            <LogIn className="h-5 w-5" />
                            <span>{loading ? 'login....' : 'Login'}</span>
                        </button>
                        {
                            error ? 
                            <div id="errDiv" className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <Shield className='text-red-500'/>
                                <span className='text-red-500'>{error}</span>
                            </div>
                            :
                            ''
                        }
                    </form>


                    {/* <!-- Footer --> */}
                    <div className="mt-7 border-t border-slate-100 pt-5 text-center">
                        <p className="text-xs text-slate-400">
                            Secure school management portal
                        </p>
                    </div>

                </div>

            </div>
        </section>
        <Footer />
    </div>
  )
}

export default Page
