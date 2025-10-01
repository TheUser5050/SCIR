import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <section className="flex bg-gray-100 rounded-4xl">
        <div className="w-auto mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text">
            Empowering Citizens. Improving Cities.
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Report civic issues like potholes, broken streetlights, or garbage spills directly to your local authorities.
          </p>
          <a
            href="/report"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition"
          >
            Report an Issue
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-4 text-gray-800">How It Works</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our platform bridges the gap between citizens and city officials by providing a simple interface to report and track civic issues.
            Each report is geo-tagged and sent to the relevant department for timely resolution.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-4xl font-bold text-blue-600">1,200+</h4>
            <p className="text-gray-600 mt-2">Issues Reported</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-green-600">950+</h4>
            <p className="text-gray-600 mt-2">Issues Resolved</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-yellow-600">300+</h4>
            <p className="text-gray-600 mt-2">Active Users</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Smart Civic Issue Reporting. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
