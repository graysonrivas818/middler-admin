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
  const [showProfileMenu, setShowProfileMenu] = useState(false)
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
              {/* <a
                href="#"
                className="text-gray-900 dark:text-gray-300 hover:text-color-3 px-3 py-2 text-sm font-medium"
              >
                Users
              </a>
              <a
                href="#"
                className="text-gray-900 dark:text-gray-300 hover:text-color-3 px-3 py-2 text-sm font-medium"
              >
                Settings
              </a> */}
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
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="bg-white dark:bg-gray-800 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowProfileMenu((v) => !v)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="/assets/rocket.svg"
                  alt=""
                />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (onChangePassword) onChangePassword();
                    }}
                  >
                    Change Password
                  </button>
                </div>
              )}
            </div>
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
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-900 dark:text-gray-300 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Users
            </a>
            <a
              href="#"
              className="text-gray-900 dark:text-gray-300 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Settings
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
