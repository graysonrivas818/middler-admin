import { useState } from "react"

//// COMPONENTS
import SVG from '@/app/_libs/svg'
import { changeView } from "@/app/_redux/features/navigationSlice"

const UserClients = ({
  user,
  dispatch,
  changePopup,
  popupType,
  viewType,
  setSelectedItem
}) => {

  return (
    <div className="w-full fixed inset-0 flex items-start justify-center bg-gray-600 h-[100%] bg-opacity-30 overflow-y-auto dark:text-black">
      <div className="w-[50%] bg-gray-100 dark:bg-gray-800 relative mt-[100px] h-[80%] rounded-2xl overflow-y-auto max-xl:w-[70%] max-lg:w-[85%] max-sm:w-[95%] max-lg:pb-5 max-md:mt-[100px]">
        <div className="flex items-center w-full pt-2 pb-4 px-5 bg-color-1">
          <div 
            className="flex items-center"
          >
            <h5 className="text-[22px] text-white font-[600]">Paint Card</h5>
          </div>
          <div className="ml-auto">
            <div 
              className="bg-white rounded-full w-[35px] h-[35px] flex items-center justify-center hover:cursor-pointer"
              onClick={() => (  
                dispatch(changePopup(''))
              )}
            >
              <SVG
                svg={'close'}
                alt="Close Modal"
                width={20}
                height={20}
                schemeOne={'black'}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          {/* List of Paint Cards */}
          <div className="w-full max-w-3xl">
            <div className="rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold text-center text-black dark:text-white mb-4">Paint Cards</h2>
              <div className="space-y-3">
                {user.clients.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
                    onClick={() => (
                      dispatch(changePopup(popupType)),
                      dispatch(changeView(viewType)),
                      setSelectedItem(item)
                    )}
                  >
                    <div>
                      <h3 className="font-medium text-black dark:text-white">{item.clientName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.clientPropertyAddress}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-300">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserClients
