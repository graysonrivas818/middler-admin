import { useState, useEffect } from 'react'

//// COMPONENTS
import SVG from '@/app/_libs/svg'

const PaintCard = ({
  user,
  dispatch,
  changePopup
}) => {
  
  return (
    <div className="w-full fixed inset-0 flex items-start justify-center bg-gray-600 h-[100%] bg-opacity-30 overflow-y-auto dark:text-black">
      <div className="w-[50%] bg-gray-100 dark:bg-gray-800 relative mt-[100px] h-[80%] rounded-2xl overflow-y-auto max-xl:w-[70%] max-lg:w-[85%] max-sm:w-[95%] max-lg:pb-5 max-md:mt-[100px]">
        <div className="flex items-center w-full pt-2 pb-4 px-5 bg-color-1">
          <div 
            className="flex items-center"
          >
            <h5 className="text-[22px] text-white font-[600]">Paint Card</h5>
            <div 
              className="w-[50px] h-[50px] mx-3 flex items-center justify-center hover:cursor-pointer"
              onClick={() => (  
                dispatch(changePopup('userClients'))
              )}
            >
              <SVG
                svg={'arrowBack'}
                alt="Arrow Back"
                width={40}
                height={40}
                schemeOne={'white'}
              />
            </div>
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

        <div className="mx-5 mt-4">
          <div className="px-6 py-4 text-center rounded-t-3xl text-black shadow-3xl dark:text-white">
            <h3 className="text-2xl font-bold capitalize ">{user.clientName} Paint Card</h3>
            <p className="text-sm mt-2">Details of your current paint selection. Calculations are for 2 coats of paint.</p>
          </div>
          
          <div className="p-6 space-y-6 dark:text-white">

            <div className="border-t border-gray-200 pt-4 ">
              <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Interior Paint</h4>
              
              <p className="text-sm text-gray-600 mt-1 dark:text-white">Total Gallons: <span className="font-semibold">{parseFloat(+user.interiorGallons + +user.interiorIndividualItems?.reduce((total, item) => total + parseFloat(item.gallons), 0) || 0).toFixed(2)}</span></p>
              <p className="text-sm text-gray-600 dark:text-white">Estimated Retail Cost: <span className="font-semibold">${parseFloat(+user.interiorGallonsCost + +user.interiorIndividualItems?.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0) || 0).toFixed(2)}</span></p>
              <ul className="mt-3 space-y-2">
                {user.interiorGallonsItems?.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-gray-100 p-3 rounded-md text-sm dark:text-black">
                    <span className='capitalize'>{item.type.replaceAll('_', ' ')}</span>
                    <span>{parseFloat(item.gallons).toFixed(2)} gallons</span>
                  </li>
                ))}
              </ul>
              {user.interiorIndividualItems && user.interiorIndividualItems.length > 0 &&
                <>
                  <h4 className="text-[16px] mt-2 pt-3 font-[600] text-color-grayone dark:text-white">Individual Items</h4>
                  <ul className="mt-3 space-y-2 border-t border-gray-200 pt-4">
                    {user.interiorIndividualItems && user.interiorIndividualItems.map((item, idx) => 
                      <li key={idx} className="flex justify-between items-center bg-gray-100 p-3 rounded-md text-sm">
                      <span className='capitalize'>{item.title}</span>
                      <span>{item.price} / {parseFloat(item.gallons).toFixed(2)} gallons</span>
                    </li>
                    )}
                  </ul>
                </>
              }
            </div>

            <div className="border-t border-gray-200 pt-4 ">
              <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Cabinet Paint</h4>
              <p className="text-sm text-gray-600 mt-1 dark:text-white">
                Total Gallons: <span className="font-semibold ">{parseFloat(user.cabinetGallons).toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-white">
                Estimated Retail Cost: <span className="font-semibold">${parseFloat(user.cabinetGallonsCost).toFixed(2)}</span>
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4 ">
              <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Exterior Paint</h4>
              <p className="text-sm text-gray-600 mt-1 dark:text-white">
                Total Gallons: <span className="font-semibold">{parseFloat(+user.exteriorGallons + +user.exteriorIndividualItems?.reduce((total, item) => total + parseFloat(item.gallons), 0) || 0).toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-white">
                Estimated Retail Cost: <span className="font-semibold">${parseFloat(+user.exteriorGallonsCost + +user.exteriorIndividualItems?.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0) || 0).toFixed(2)}</span>
              </p>
              <ul className="mt-3 space-y-2">
                {user.exteriorGallonsItems?.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-gray-100 p-3 rounded-md text-sm dark:text-black">
                    <span className='capitalize'>{item.type.replaceAll('_', ' ')}</span>
                    <span>{parseFloat(item.gallons).toFixed(2)} gallons</span>
                  </li>
                ))}
              </ul>
              {user.exteriorIndividualItems && user.exteriorIndividualItems.length > 0 &&
                <>
                  <h4 className="text-[16px] mt-2 pt-3 font-[600] text-color-grayone">Individual Items</h4>
                  <ul className="mt-3 space-y-2 border-t border-gray-200 pt-4">
                    {user.exteriorIndividualItems && user.exteriorIndividualItems.map((item, idx) => 
                      <li key={idx} className="flex justify-between items-center bg-gray-100 p-3 rounded-md text-sm">
                      <span className='capitalize'>{item.title}</span>
                      <span>{item.price} / {parseFloat(item.gallons).toFixed(2)} gallons</span>
                    </li>
                    )}
                  </ul>
                </>
              }
            </div>


          </div>
          
        </div>

      </div>
      
    </div>
  )
}

export default PaintCard
