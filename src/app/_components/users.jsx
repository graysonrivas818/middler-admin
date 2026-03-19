import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useCookies } from 'react-cookie'

//// LIBS
import { convertIsoStringToDate } from '@/app/_helpers/main'
import { usersTable, usersTableTitles, convertDateTypes, usersSubmenu } from '@/app/_libs/tables'

//// COMPONENTS
import SVG from '@/app/_libs/svg'

//// MUTATIONS
import ADMIN_DELETE_USER from '@/app/_mutations/adminDeleteUser'

const Users = ({
  users,
  dispatch,
  changeView,
  changePopup,
  isDarkMode,
  setEditUser,
  refetchUsers
}) => {
  
  const [dropdown, setDropdown]                       = useState('')
  const [dropdownSubitem, setDropdownSubitem]         = useState('')
  const [allUsers, setAllUsers]                       = useState([])
  const [isDescending, setIsDescending]               = useState(true)
  const [cookies]                                     = useCookies(['token'])

  const [adminDeleteUser] = useMutation(ADMIN_DELETE_USER)
  
  const filterObjectKeys = (obj, keys) => {
    return Object.keys(obj)
      .filter(key => keys.includes(key))
      .reduce((filteredObj, key) => {
        filteredObj[key] = obj[key];
        return filteredObj;
      }, {});
  }

  useEffect(() => {
    // Sort users based on isDescending state
    const sortedUsers = [...allUsers].sort((a, b) => 
      isDescending 
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    setAllUsers(sortedUsers);
  }, [isDescending])

  useEffect(() => {
    
    const sortedUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    setAllUsers(sortedUsers)

  }, [users])

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Permanently delete this user and all their data?')) return
    try {
      await adminDeleteUser({ variables: { id, token: cookies.token || '' } })
      if (refetchUsers) refetchUsers()
    } catch (err) {
      alert(err.message || 'Failed to delete user')
    }
    setDropdown('')
  }
  
  return (
    <>
      <div className="px-[80px] py-10 max-lg:px-5 max-sm:px-2">
        <div className="px-[40px] flex flex-col bg-gray-100 dark:bg-gray-800 pb-10 pt-5 rounded-2xl max-lg:px-[2px] max-sm:pt-0">
        <div className="px-[50px] flex flex-col bg-gray-100 dark:bg-gray-800 pb-10 pt-5 rounded-2xl max-lg:px-[2px]">

          <div className="px-[3px] flex flex-col bg-gray-100 dark:bg-gray-800 pb-10 pt-5 rounded-2xl max-lg:px-[2px]">
            <div 
              className="flex items-center gap-x-3 text-black dark:text-white  mx-3 hover:cursor-pointer"
              onClick={() => (  
                dispatch(changeView('dashboard'))
              )}
            >
              <SVG
                svg={'arrowBack'}
                alt="Back"
                width={25}
                height={25}
                schemeOne={isDarkMode ? 'white' : 'black'}
              />
              <h5 className="">Back</h5>
            </div>
            <div className="flex justify-end px-5 mb-3">
              <div className="flex items-center">
                <h1 className="my-3 px-3 font-[400] text-[28px] text-black dark:text-white">Users</h1>
                <button 
                  onClick={() => setIsDescending(!isDescending)} 
                  className="bg-color-1 px-4 py-2 text-white rounded-lg hover:opacity-90"
                >
                  {isDescending ? "Sort: Oldest to Newest" : "Sort: Newest to Oldest"}
                </button>
              </div>
              {/* <div 
                className="bg-color-1 w-[140px] min-w-[140px] flex-shrink-0 flex items-center gap-x-3 px-3 py-2 rounded-2xl dark:text-white hover:cursor-pointer"
                onClick={() => (
                  dispatch(changeView('newEstimate')),
                  dispatch(resetEstimator())
                )}
              >
                <SVG
                  svg={'plus'}
                  alt="Logo"
                  width={30}
                  height={30}
                  schemeOne={'white'}
                />
                <span>Add new</span>
              </div> */}
            </div>
            
            <div className="shadow-2xl rounded-2xl pb-8 w-full overflow-x-auto">
              <div className="min-w-[1400px]"> {/* Adjust this minimum width as needed */}
                {/* Header Row */}
                <div className="flex justify-start items-center gap-x-2 p-5 bg-color-1 text-white rounded-t-2xl">
                  <div 
                    className="bg-color-1 w-[140px] min-w-[140px] flex-shrink-0 flex items-center gap-x-3 px-3 py-2 rounded-2xl hover:cursor-pointer"
                  >
                  </div>
                  {usersTable.length > 0 && usersTable.map((heading, idx) => (
                    <h1 key={idx} className="w-[200px] min-w-[180px] flex-shrink-0 text-[18px] font-[600] capitalize text-center">
                      {usersTableTitles.find((item) => item.type == heading).title}
                    </h1>
                  ))}
                </div>
                {allUsers.length > 0 && allUsers.map((obj, index) => {
                  const filteredObj = filterObjectKeys(obj, usersTable)
                  return (
                    <div key={index} className={`flex items-center gap-x-2 py-3  px-5 ${index % 2 ? 'bg-color-2 bg-opacity-50 text-black' : 'bg-transparent'}`}>
                      <div className="w-[140px] min-w-[140px] flex justify-center items-center gap-x-5 relative">
                        {/* <button 
                          className={`text-center px-5 py-3 rounded-sm hover:scale-105 transition-all duration-500 ease-out ${index % 2 ? 'bg-white text-schemethree' : 'bg-color-1 text-white'}`}
                          onClick={() => (
                            dispatch(changePopup('estimateDetails')),
                            setEstimator(obj)
                          )}
                        >
                          details
                        </button> */}
                        <div 
                          className="flex flex-col justify-center items-center relative hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-out text-black"
                          onClick={() => (
                            null
                          )}
                        >
                          <SVG
                            svg={'user'}
                            alt="User"
                            width={30}
                            height={30}
                            schemeOne={isDarkMode ? 'white' : 'black'}
                          />
                          <span className="text-[10px] dark:text-white">User</span>
                        </div>
                        <div 
                          className="flex flex-col justify-center items-center relative hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-out text-black"
                          onClick={() => (
                            setEditUser(obj),
                            dispatch(changePopup('userClients'))
                          )}
                        >
                          <SVG
                            svg={'bucket'}
                            alt="Paint Card"
                            width={30}
                            height={30}
                            schemeOne={isDarkMode ? 'white' : 'black'}
                          />
                          <span className="text-[10px] dark:text-white">Paint</span>
                        </div>
                        <div 
                          className="flex flex-col justify-center items-center relative hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-out text-black"
                          onClick={() => (
                            setEditUser(obj),
                            dispatch(changePopup('estimates'))
                          )}
                        >
                          <SVG
                            svg={'estimate'}
                            alt="Paint Card"
                            width={30}
                            height={30}
                            schemeOne={isDarkMode ? 'white' : 'black'}
                          />
                          <span className="text-[10px] dark:text-white">Estimates</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2">
                        {Object.entries(filteredObj).map(([key, value]) => (
                          <div key={key} className="w-[200px] min-w-[180px] flex-shrink-0 text-center py-5 lowercase text-black dark:text-white">
                            {convertDateTypes.includes(key) ? convertIsoStringToDate(value) : typeof value === 'string' ? key == 'email' ? `${value.slice(0, 30)}...` : `${value.slice(0, 30)}` : String(value)}
                          </div>
                        ))}
                      </div>
                      <div 
                        className="hover:cursor-pointer relative hover:scale-110 transition-all duration-300 ease-out"
                        onClick={() => dropdown === `user${index}` ? setDropdown('') : setDropdown(`user${index}`)}
                      >
                        <SVG
                          svg={'options'}
                          alt="Logo"
                          width={30}
                          height={30}
                          schemeOne={isDarkMode ? 'white' : 'black'}
                        />
                        { dropdown === `user${index}` &&
                        <div className="absolute top-[95%] right-0 w-[150px] rounded-lg bg-gray-200 shadow-2xl z-100">
                          {usersSubmenu && usersSubmenu.map(( item, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center justify-start gap-x-3 px-2 py-2 hover:cursor-pointer hover:bg-red-500 hover:text-white text-center rounded-lg dark:text-black"
                              onMouseEnter={() => setDropdownSubitem(`user-${item.label}`)}
                              onMouseLeave={() => setDropdownSubitem('')}
                              onClick={() => item.type === 'delete' ? handleDeleteUser(obj.id) : null}
                            >
                              <SVG
                                svg={item.svg}
                                alt="Logo"
                                width={20}
                                height={20}
                                schemeOne={ dropdownSubitem === `user-${item.label}` ? 'white' : 'black' }
                              />
                              {item.label}
                            </div>
                          ))}
                        </div>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


          </div>
        
        </div>
        </div>
      </div>
    </>
  )
}

export default Users
