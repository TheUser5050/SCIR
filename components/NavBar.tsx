"use client"

import { usePathname } from "next/navigation"

const NavBar = () => {
  const pathname = usePathname()
  const hideNavbar = ['/login']
  const isHideNavbar = hideNavbar.includes(pathname)
  return (
    <header className={`bg-white rounded-2xl w-full ${isHideNavbar ? 'hidden' : ''}`} >
      <div className="px-6 md:py-4 flex justify-between items-center max-h-[85px]">
        <a href="./" className="text-xl max-md:text-[17px] font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text"><span className="text-3xl max-md:text-xl">S</span>mart <span className="text-3xl max-md:text-xl">C</span>ivic <span className="text-3xl max-md:text-xl">I</span>ssue <span className="text-3xl max-md:text-xl">R</span>eporting</a>
        <nav className="space-x-10 max-md:hidden">
          <a href="./report" className="text-gray-600 hover:text-blue-600">Report Issue</a>
          <a href="./about" className="text-gray-600 hover:text-blue-600">About</a>
          <a href="./stats" className="text-gray-600 hover:text-blue-600">Stats</a>
        </nav>
        <img src='/hamburger.png' width={40} height={40} className="md:hidden" />
      </div>
    </header >
  )
}

export default NavBar
