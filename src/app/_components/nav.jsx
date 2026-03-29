import { useState } from 'react'
import { changeView } from '../_redux/features/navigationSlice'

const Nav = ({
  dispatch,
  logout,
  resetUser,
  router,
  onChangePassword
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 py-3">
              <img
                className="h-8 w-8"
                src="/assets/logo.png"
                alt="Logo"
              />
            </div>
            <div className="hidden py-3 sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#"
                className="text-gray-900 dark:text-gray-300 dpx-3 py-2 text-sm font-medium"
                onClick={() => dispatch(changeView('dashboard'))}
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-900 dark:text-gray-300 px-3 py-2 text-sm font-medium"
                onClick={() => {
                  if (onChangePassword) onChangePassword()
                }}
              >
                Change Password
              </a>
              <a
                className="text-gray-900 px-3 py-2 text-sm font-medium dark:text-gray-300 hover:cursor-pointer"
                onClick={() => {
                  dispatch(logout()),
                  dispatch(resetUser()),
                  router.push('/login')
                }}
              >
               Logout
              </a>
            </div>
          </div>
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-white dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="text-gray-900 dark:text-gray-300 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => {
                dispatch(changeView('dashboard'))
                setMobileMenuOpen(false)
              }}
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-900 dark:text-gray-300 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => {
                if (onChangePassword) onChangePassword()
                setMobileMenuOpen(false)
              }}
            >
              Change Password
            </a>
            <a
              href="#"
              className="text-gray-900 dark:text-gray-300 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => {
                dispatch(logout())
                dispatch(resetUser())
                router.push('/login')
                setMobileMenuOpen(false)
              }}
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
