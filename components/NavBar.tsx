"use client"

import { usePathname } from "next/navigation"

const NavBar = () => {
  const pathname = usePathname()
  const hideNavbar = ['/login']
  const isHideNavbar = hideNavbar.includes(pathname)
  return (
    <header className={`bg-white shadow rounded-2xl w-full ${isHideNavbar ? 'hidden' : ''}`} >
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text"><span className="text-3xl">S</span>mart <span className="text-3xl">C</span>ivic <span className="text-3xl">I</span>ssue <span className="text-3xl">R</span>eporting</h1>
        <nav className="space-x-10">
          <a href="./report" className="text-gray-600 hover:text-blue-600">Report Issue</a>
          <a href="./about" className="text-gray-600 hover:text-blue-600">About</a>
          <a href="./stats" className="text-gray-600 hover:text-blue-600">Stats</a>
        </nav>
      </div>
    </header >
  )
}

export default NavBar
