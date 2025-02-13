import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">TaskMaster</div>
            <div>
              <Link href="/login" className="text-gray-800 hover:text-gray-600 mr-4">
                Login
              </Link>
              <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center">Manage Your Tasks with Ease</h1>
          <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
            TaskMaster helps you organize your daily tasks and projects, boosting your productivity and keeping you on track.
          </p>
          <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Task Organization</h3>
              <p className="text-gray-600">Easily create, categorize, and prioritize your tasks.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Project Management</h3>
              <p className="text-gray-600">Group related tasks into projects for better organization.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your productivity with intuitive dashboards and reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-500 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">Ready to Get Organized?</h2>
          <p className="text-xl text-white mb-8">Join thousands of users who have improved their productivity with TaskMaster.</p>
          <Link href="/register" className="bg-white text-blue-500 font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-100">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-semibold">TaskMaster</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-300">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
