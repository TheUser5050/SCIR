const MobileOnly = (props) => {
  return <div className="md:hidden h-[100vh] w-1/2 transition">
    <a href="./report" className="text-gray-600 hover:text-blue-600 block border-b-2 border-gray-500">Report Issue</a>
    <a href="./about" className="text-gray-600 hover:text-blue-600 block border-b-2 border-gray-500">About</a>
    <a href="./stats" className="text-gray-600 hover:text-blue-600 block border-b-2 border-gray-500">Stats</a>
  </div>
}

export default MobileOnly
