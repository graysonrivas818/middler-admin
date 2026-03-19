"use client"
import { useState, useEffect, use } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from '@apollo/client'

///// COMPONENTS
import Nav from '@/app/_components/nav'
import Users from '@/app/_components/users'
import PaintCard from '@/app/_components/modals/paintCard'
import UserClients from '@/app/_components/modals/userClients'
import Estimate from '@/app/_components/estimate'
import Estimates from '@/app/_components/estimates'
import Codes from '@/app/_components/codes'
import SVG from '@/app/_libs/svg'

///// QUERIES
import GET_USER from '@/app/_queries/fetchAdmin'
import GET_USERS from '@/app/_queries/fetchUsers'
import GET_ESTIMATES from '@/app/_queries/fetchEstimates'
import GET_CODES from '@/app/_queries/fetchCodes'

///// REDUCERS
import { login, logout } from "@/app/_redux/features/authSlice"
import { changeUserValue, changeUserArray, resetUser } from "@/app/_redux/features/userSlice"
import { changeView, changePopup, changeEdit, changePopupType } from '@/app/_redux/features/navigationSlice'

export default function Home() {

  const dispatch                                      = useDispatch()
  const router                                        = useRouter()
  const [loadingData, setLoadingData]                 = useState(false)
  const [user, setUser]                               = useState('')
  const [view, setView]                               = useState('')
  const [popup, setPopup]                             = useState('')
  const [edit, setEdit]                               = useState('')
  const [editUser, setEditUser]                       = useState('')
  const [isDarkMode, setIsDarkMode]                   = useState(false)
  const [selectedItem, setSelectedItem]               = useState(null)
  const [selectedCode, setSelectedCode]               = useState('')
  const [cookies, setCookie, removeCookie]            = useCookies(['token', 'admin', 'view'])
  const currentNavigation                             = useSelector((state) => state.navigationReducer)

  //// QUERIES
  const dataUser                                      = useQuery(GET_USER, { variables: { id: cookies.admin ? cookies.admin.id : 'unknown', token: cookies.token ? cookies.token : 'unknown'}})
  const dataUsers                                     = useQuery(GET_USERS, { variables: { token: cookies.token ? cookies.token : 'unknown' }})
  const dataEstimates                                 = useQuery(GET_ESTIMATES, { variables: { token: cookies.token ? cookies.token : 'unknown' }})
  const dataCodes                                     = useQuery(GET_CODES, { variables: { token: cookies.token ? cookies.token : 'unknown' }})

  useEffect(() => {
    
    setLoadingData(true)
    
    if(dataUser.error){ 

      console.log('ERROR', dataUser.error)
      dispatch(logout())
      dataUser.error.message = 'Invalid token' ? window.location.href = '/login' : router.push('/error') 

    }

    if(!dataUser.error) setLoadingData(false)
    
    if(dataUser.data && dataUser.data.admin){ 

      setUser(dataUser.data.admin)
      dispatch(login())

      if(Object.keys(dataUser.data.admin)){
        Object.keys(dataUser.data.admin).map(( item ) => 
          dispatch(changeUserValue({ value: dataUser.data.admin[item], type: item }))
        )
      }
      
    }
   
  }, [dataUser])

  // useEffect(() => {
  //   console.log(dataCodes.data)
  // }, [dataCodes])

  useEffect(() => {
    setView(currentNavigation.value.view)
    setPopup(currentNavigation.value.popup)
    setEdit(currentNavigation.value.edit)
  }, [currentNavigation])

  useEffect(() => {
    // Check for dark mode preference (you might already have a similar implementation)
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(darkModeMediaQuery.matches)

    // Listen for changes in the dark mode preference
    const handleThemeChange = (e) => setIsDarkMode(e.matches)
    darkModeMediaQuery.addEventListener('change', handleThemeChange)

    return () => darkModeMediaQuery.removeEventListener('change', handleThemeChange)
  }, [])

  if(!user) return <div className="ring">Loading</div>
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Navigation */}
      <Nav
        dispatch={dispatch}
        logout={logout}
        resetUser={resetUser}
        router={router}
      />

      {/* Main content */}
      {view == 'dashboard' &&
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to your Admin Dashboard
          </h1>
          <div className="mt-4">
            {/* Add your dashboard widgets, tables, or charts here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:cursor-pointer"
                onClick={() => dispatch(changeView('users'))}
              >
                <h3 className="flex items-center gap-x-3 text-xl font-semibold text-gray-900 dark:text-white">
                  <SVG
                    svg={'user'}
                    alt="Users"
                    width={25}
                    height={25}
                    schemeOne={isDarkMode ? 'white' : 'black'}
                  />
                  Users
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  View a list of all users.
                </p>
              </div>
              <div 
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:cursor-pointer"
                onClick={() => dispatch(changeView('estimates'))}
              >
                <h3 className="flex items-center gap-x-3 text-xl font-semibold text-gray-900 dark:text-white">
                  <SVG
                    svg={'estimate'}
                    alt="Estimates"
                    width={25}
                    height={25}
                    schemeOne={isDarkMode ? 'white' : 'black'}
                  />
                  Estimates
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  View a list of all estimates
                </p>
              </div>
              <div 
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:cursor-pointer"
                onClick={() => dispatch(changeView('codes'))}
              >
                <h3 className="flex items-center gap-x-3 text-xl font-semibold text-gray-900 dark:text-white">
                  <SVG
                    svg={'percentage'}
                    alt="Percentages"
                    width={25}
                    height={25}
                    schemeOne={isDarkMode ? 'white' : 'black'}
                  />
                  Codes
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  View a list of all codes
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      }
      {view == 'users' &&
        <Users
          users={ dataUsers.data ? dataUsers.data.users : []}
          dispatch={dispatch}
          changeView={changeView}
          changePopup={changePopup}
          isDarkMode={isDarkMode}
          setEditUser={setEditUser}
          refetchUsers={dataUsers.refetch}
        />
      }
      {view == 'estimate' &&
        <Estimate
          user={editUser}
          estimator={selectedItem}
          dispatch={dispatch}
          changeView={changeView}
          changePopup={changePopup}
          isDarkMode={isDarkMode}
          view={view}
        />
      }
      {view == 'codes' &&
        <Codes
          codes={ dataCodes.data ? dataCodes.data.codes : []}
          dispatch={dispatch}
          changeView={changeView}
          changePopup={changePopup}
          isDarkMode={isDarkMode}
          setSelectedCode={setSelectedCode}
          refetchCodes={dataCodes.refetch}
        />
      }
      {view == 'estimates' &&
        <Estimates
          estimates={ dataEstimates.data ? dataEstimates.data.estimates : []}
          dispatch={dispatch}
          changeView={changeView}
          changePopup={changePopup}
          isDarkMode={isDarkMode}
          setSelectedItem={setSelectedItem}
          user={user}
        />
      }
      {popup == 'paintCard' &&
        <PaintCard
          user={selectedItem}
          dispatch={dispatch}
          changePopup={changePopup}
        />
      }
      {popup == 'userClients' &&
        <UserClients
          user={editUser}
          dispatch={dispatch}
          changePopup={changePopup}
          popupType={'paintCard'}
          viewType={'users'}
          setSelectedItem={setSelectedItem}
        />
      }
      {popup == 'estimates' &&
        <UserClients
          user={editUser}
          dispatch={dispatch}
          changePopup={changePopup}
          popupType={''}
          viewType={'estimate'}
          setSelectedItem={setSelectedItem}
        />
      }
    </div>
  )
}
