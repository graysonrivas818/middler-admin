import { useState } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

//// COMPONENTS
import Button from '@/app/_components/forms/submitButton'
import SVG from '@/app/_libs/svg'
import Image from 'next/image'

///// LIBS
import { dateToday, totalEstimate, totalEstimateAdjusted } from '@/app/_helpers/main'
import { interiorConditions, interiorDetails, cabinetConditions, cabinetDetail, exteriorConditions, exteriorDetails } from '@/app/_helpers/constants'

const Estimate = ({
  estimator,
  user,
  dispatch,
  changeView,
  changePopup,
  view
}) => {
  
  const [loading, setLoading] = useState('')
  
  return (
    
    <div className="px-[80px] py-10 dark:bg-gray-800 max-lg:px-5 max-sm:px-2">
        <div className="px-[60px] flex flex-col bg-gray-100 dark:bg-gray-800  pb-10 pt-5 rounded-2xl max-lg:px-[2px] max-sm:pt-0">
        <div className="px-[50px] flex flex-col bg-gray-100 dark:bg-gray-800  pb-10 pt-5 rounded-2xl  max-lg:px-[2px]">
        {estimator && 
          <>
          <div 
            className="flex items-center w-full bg-color-1 rounded-tl-xl rounded-tr-xl max-sm:flex-col"
          >
            <div
              onClick={() => (
                view == 'users'
                ?
                (
                  dispatch(changeView('users')),
                  dispatch(changePopup('estimates'))
                )
                :
                (
                  dispatch(changeView('estimates'))
                )
              )}
            >
              <Button
                label='Back'
                backgroundColor={'#1D42F3'}
                svgColor={'white'}
                width={200}
                height={30}
                font={300}
                fullWidth={false}
                textColor={'white'}
                borderColor={''}
                svg={'arrowBack'}
                href={''}
                borderRadius={true}
                loading={'false'}
                loadingType={''}
                inputClassOne={' py-1 shadow-none !text-[18px] !rounded-none !rounded-tl-xl capitalize hover:shadow-none '}
              />
            </div>
            {/* <div
              onClick={() => (
                dispatch(changeView('updateEstimate'))
              )}
            >
              <Button
                label='update'
                backgroundColor={'#1D42F3'}
                svgColor={'white'}
                width={200}
                height={30}
                font={300}
                fullWidth={false}
                textColor={'white'}
                borderColor={''}
                svg={'edit'}
                href={''}
                borderRadius={true}
                loading={'false'}
                loadingType={''}
                inputClassOne={' py-1 shadow-none !text-[18px] !rounded-none !rounded-tl-xl capitalize hover:shadow-none '}
              />
            </div> */}
            {/* <div
              onClick={() => 
                // checkCurrentPeriodCycle(user, dispatch, changePopup, 'upgradePlan', changePopupType, 'paymentPlan')
                // ?
                // dispatch(changePopup('sendEstimate'))
                // :
                // null
                dispatch(changePopup('sendEstimate'))
              }
            >
              <Button
                label='send estimate'
                backgroundColor={'#1D42F3'}
                svgColor={'white'}
                width={200}
                height={30}
                font={300}
                fullWidth={false}
                textColor={'white'}
                borderColor={''}
                svg={'send'}
                href={''}
                borderRadius={true}
                loading={'false'}
                loadingType={''}
                inputClassOne={' py-1 shadow-none !rounded-none !rounded-tl-xl capitalize hover:shadow-none '}
              />
            </div> */}
          </div>
          <div className="flex flex-col py-8 shadow-md text-color-grayone ">
            <div className="flex justify-between items-center text-color-grayone border-b-[3px] px-10 py-10 max-lg:flex-col max-lg:gap-y-3">
              <div className="flex flex-col items-center text-[18px] font-[600] gap-y-3">
                <div className="relative bg-white rounded-full ">
                  {user.businessLogo &&
                    <Image
                      src={user.businessLogo}
                      width={120}
                      height={120}
                      alt="Logo"
                      layout="contain" // This helps maintain aspect ratio and quality
                      quality={100} // Set the quality to 100 for maximum quality (0-100 scale)
                      className="object-cover"
                      unoptimized
                    />
                  }
                  {!user.businessLogo &&
                    <SVG
                     svg={'placeholderImage'}
                     alt="Logo"
                     width={60}
                     height={60}
                     schemeOne={'black'}
                    />
                  }
                  <div 
                    className="absolute left-[80%] bottom-[75%] bg-color-1 p-1 rounded-full hover:cursor-pointer"
                    onClick={() => dispatch(changePopup('upload'))}
                  >
                    <SVG
                      svg={'upload'}
                      alt="Logo"
                      width={15}
                      height={15}
                      schemeOne={'white'}
                    />
                  </div>
                </div>
                {!user.businessLogo && <h3 className="relative dark:text-white">Logo</h3>}
              </div>
              <div className="flex flex-col text-[18px] font-[400] gap-y-1 dark:text-white max-lg:items-center">
                <h3 className="font-[600] uppercase">{user.businessName}</h3>
                <h3>{user.businessAddress}</h3>
                <h3>License: {user.businessLicenseNumber}</h3>
                <h3>{user.businessEmail}</h3>
                <h3>{user.businessPhone}</h3>
              </div>
            </div>
            <div className=" bg-color-1 bg-opacity-80 rounded-md flex items-center px-10 py-5 text-[28px] font-[600] text-white">Job Estimate</div>
            <div className="flex justify-between items-center text-color-grayone px-10 py-10 border-b-[2px] border-color-graytwo max-lg:flex-col max-lg:gap-y-5 max-sm:px-2">
              <div className="flex flex-col text-[18px] font-[400] gap-y-1 px-10 dark:text-white max-lg:order-2">
                <h1 className="text-[28px] capitalize font-[600] dark:text-white text-color-grayone">To:</h1>
                <div className="px-3 ">
                  <h3>{estimator.clientName}</h3>
                  <h3>{estimator.clientPhone}</h3>
                  <h3>{estimator.clientPropertyAddress}</h3>
                  <h3>{estimator.clientEmail}</h3>
                </div>
              </div>
              <div className="flex flex-col items-center text-[18px] font-[400] gap-y-3 px-10 dark:text-white max-lg:order-1">
                <div className="relative w-[120px] h-[120px]">
                  <img src="/assets/seal.png" alt="Seal" className="w-[100%] bg-cover object-cover dark:bg-white rounded-md" quality={100} layout="fill"/>
                </div>
                <h3 className="">Middler Certified</h3>
              </div>
            </div>
            <div className="flex justify-between items-center text-color-grayone px-10 pt-10 pb-3 dark:text-white max-sm:px-5">
              <p className="capitalize">Hello, {estimator.clientName}</p>
              <p className="capitalize">{dateToday()}</p>
            </div>
            <div className="grid grid-cols-1 items-center text-color-grayone px-10 py-10 dark:text-white max-sm:px-5">
              <p>We would like to thank you for the opportunity to provide you with our estimate for your project and hope that we will be able to complete it for you to our highest standards. Please find enclosed the detailed summary of the job and our estimate. If you have any questions please do not hesitate to contact us. Again we sincerely appreciate the opportunity to estimate your project and look forward to working together.</p>
            </div>
            {estimator.userType &&
            <div className="grid grid-cols-4 items-center text-color-grayone my-5 px-10 dark:text-white max-xl:grid-cols-1 max-sm:px-5">
              <div className="flex flex-col">
                <div className="relative bg-color-1 bg-opacity-80 text-left font-[500] text-[18px] text-white py-2 rounded-xl flex flex-nowrap items-center truncate max-xl:rounded-tr-xl px-2">
                  User Type: <span className="capitalize px-2"> {estimator.userType}</span>
                </div>
              </div>
            </div>
            }
            {estimator.where &&
            <div className="grid grid-cols-4 items-center text-color-grayone mb-5 px-10 dark:text-white max-xl:grid-cols-1 max-sm:px-5">
              <div className="flex flex-col">
                <div className="relative bg-color-1 bg-opacity-80 text-left font-[500] text-[18px] text-white py-2 rounded-xl flex flex-nowrap items-center truncate max-xl:rounded-tr-xl px-2">
                  Buy Where Preference: <span className="capitalize px-2"> {estimator.where}</span>
                </div>
              </div>
            </div>
            }
            {estimator.why &&
            <div className="grid grid-cols-4 items-center text-color-grayone mb-5 px-10 dark:text-white max-xl:grid-cols-1 max-sm:px-5">
              <div className="flex flex-col">
                <div className="relative bg-color-1 bg-opacity-80 text-left font-[500] text-[18px] text-white py-2 rounded-xl flex flex-nowrap items-center truncate max-xl:rounded-tr-xl px-2">
                  Why Why Preference: <span className="capitalize px-2"> {estimator.why}</span>
                </div>
              </div>
            </div>
            }
            <div className="grid grid-cols-4 items-center text-color-grayone px-10 dark:text-white max-xl:grid-cols-1 max-sm:px-5">
              <div className="flex flex-col">
                <div className="relative bg-color-1 bg-opacity-80 text-center font-[500] text-[18px] text-white py-2 rounded-tl-xl flex flex-nowrap items-center justify-center truncate max-xl:rounded-tr-xl">
                  Interior Estimate
                  {/* {estimator.adjustment &&
                    <div
                      className="absolute right-5 bg-color-3 px-2 py-1 text-black rounded-xl text-[12px] hover:cursor-pointer"
                      onClick={() => showOriginalEstimate()}
                    >
                      original
                    </div>
                  } */}
                </div>
                <div 
                  className="border-[1px] border-color-1 text-center font-[500] text-[18px] py-2 relative"
                >
                  <span className="hover:cursor-pointer">{estimator.adjustment 
                    ? `$${parseInt(estimator.adjustments[estimator.adjustments.length -1].interiorAdjusted.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}` 
                    : `$${parseInt(estimator.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                  </span>
                  {/* <div 
                    onClick={() => dispatch(changePopup('adjust'))}
                    className="absolute right-1 top-[10%] bg-color-1 px-2 py-1 text-white rounded-xl text-[12px] hover:cursor-pointer"
                  >
                    adjust
                  </div> */}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="relative bg-color-1 bg-opacity-80 text-center font-[500] text-[18px] text-white py-2 flex flex-nowrap justify-center truncate">
                  Cabinets Estimate
                  {/* {estimator.adjustment &&
                    <div
                      className="absolute right-5 bg-color-3 px-2 py-1 text-black rounded-xl text-[12px] hover:cursor-pointer"
                    >
                      original
                    </div>
                  } */}
                </div>
                <div 
                  className="border-[1px] border-color-1 text-center font-[500] text-[18px] py-2 relative"
                >
                  <span className="hover:cursor-pointer">{estimator.adjustment 
                  ? `$${parseInt(estimator.adjustments[estimator.adjustments.length -1].cabinetAdjusted.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}` : `$${parseInt(estimator.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</span>
                  {/* <div 
                    className="absolute right-1 top-[10%] bg-color-1 px-2 py-1 text-white rounded-xl text-[12px] hover:cursor-pointer"
                    onClick={() => dispatch(changePopup('adjust'))}
                  >
                    adjust
                  </div> */}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="relative bg-color-1 bg-opacity-80 text-center font-[500] text-[18px] text-white py-2 flex flex-nowrap justify-center truncate">
                  Exterior Estimate
                  {/* {estimator.adjustment &&
                    <div
                      className="absolute right-5 bg-color-3 px-2 py-1 text-black rounded-xl text-[12px] hover:cursor-pointer"
                    >
                      original
                    </div>
                  } */}
                </div>
                <div 
                  className="border-[1px] border-color-1 text-center font-[500] text-[18px] py-2 relative"
                >
                  <span className="hover:cursor-pointer">{estimator.adjustment 
                    ? `$${parseInt(estimator.adjustments[estimator.adjustments.length - 1].exteriorAdjusted.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}` 
                    : `$${parseInt(estimator.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                  </span>
                  {/* <div 
                    className="absolute right-1 top-[10%] bg-color-1 px-2 py-1 text-white rounded-xl text-[12px] hover:cursor-pointer"
                    onClick={() => dispatch(changePopup('adjust'))}
                  >
                    adjust
                  </div> */}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="relative bg-color-1 bg-opacity-80 text-center font-[500] text-[18px] text-white py-2 rounded-tr-xl max-xl:rounded-none flex flex-nowrap justify-center truncate">
                  Total Estimate
                  {/* {estimator.adjustment &&
                    <div
                      className="absolute right-5 bg-color-3 px-2 py-1 text-black rounded-xl text-[12px] hover:cursor-pointer"
                    >
                      original
                    </div>
                  } */}
                </div>
                <div 
                  className="border-[1px] border-color-1 text-center font-[500] text-[18px] py-2 relative"
                >
                  <span className="hover:cursor-pointer">{estimator.adjustment 
                    ? `$${parseInt(totalEstimateAdjusted(estimator).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}` 
                    : `$${parseInt(totalEstimate(estimator).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                  }
                  </span>
                  {/* <div 
                    className="absolute right-1 top-[10%] bg-color-1 px-2 py-1 text-white rounded-xl text-[12px] hover:cursor-pointer"
                    onClick={() => dispatch(changePopup('adjust'))}
                  >
                    adjust
                  </div> */}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div className="flex items-center gap-x-6 mx-10 mt-10 bg-color-1 bg-opacity-80 px-10 py-2 text-white rounded-t-xl text-[18px] font-[500] max-sm:px-5 max-sm:mx-5">
                <div>Notes & Disclosures</div>
                {/* <div 
                  className=""
                  onClick={() => saveDisclosure()}
                >
                  <Button
                    label='Save'
                    backgroundColor={'white'}
                    svgColor={'white'}
                    width={200}
                    height={30}
                    font={300}
                    fullWidth={false}
                    textColor={'black'}
                    borderColor={''}
                    svg={''}
                    href={''}
                    borderRadius={true}
                    loading={loading}
                    loadingType={'notesAndDisclosure'}
                    inputClassOne={' '}
                  />
                </div> */}
              </div>
              <div className="flex items-center mx-10 px-2 py-2 text-white text-[18px] font-[500] border-color-1 border-[1px] max-sm:mx-5">
                <div className="w-full">
                  <div style={{ width: '100%', height: '100%', color: 'black'}}>
                    {estimator.notesAndDisclosure ? estimator.notesAndDisclosure : ''}
                    {/* {estimator &&
                      <ReactQuill theme="snow" value={estimator.notesAndDisclosure ? estimator.notesAndDisclosure : ''}/>
                    } */}
                  </div>
                </div>
              </div>
              {/* <div 
                className="flex items-center justify-center mx-10 px-2 py-2 text-white text-[18px] font-[500] border-color-1 border-[1px] rounded-b-xl max-sm:px-5 max-sm:mx-5"
                onClick={() => dispatch(changePopup('notesAndDisclosure'))}
              >
                 <div className="w-max bg-color-1 mx-10 px-5 my-3 capitalize py-1 text-white rounded-xl text-[16px]  hover:cursor-pointer">
                  add optional notes and disclosures
                 </div>
              </div> */}
            </div>



            <div>
              <div className="grid grid-cols-1 items-center mx-10 mt-10 px-5 py-2 text-[24px] font-[500] bg-gray-50 dark:bg-color-1 dark:text-white dark:rounded-lg max-sm:px-5 max-sm:mx-5">
                Interior
              </div>
              <div className="grid grid-cols-1 gap-y-5 items-center mx-10 mb-5 px-10 py-2 text-[18px] font-[500] dark:text-white max-sm:px-5 max-sm:mx-5">
                <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <div>
                    <h1>Interior Sqft</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.interiorSquareFeet ? estimator.interiorSquareFeet : 'unknown'}</h3>
                  </div>
                  <div>
                    <h1>Interior Condition</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.interiorCondition ? interiorConditions.find((item) => item.type == estimator.interiorCondition).title : 'unknown'}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <div>
                    <h1>Interior Detail</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.interiorDetail ? interiorDetails.find((item) => item.type == estimator.interiorDetail).title : 'unknown'}</h3>
                  </div>
                  <div>
                    <h1>Items to be Painted</h1>
                    <div className="flex items-center gap-x-1 w-full flex-wrap gap-y-1">
                    {estimator.interiorItems.length > 0 && estimator.interiorItems.map((item, idx) => 
                        <span 
                          key={idx}
                          className="px-1 py-1 border-[1px] border-color-grayone text-[12px] rounded-full"
                        >
                          {item.title}
                        </span>
                    )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <h1>Extras</h1>
                  <div className="flex items-center gap-x-1 w-full my-2 flex-wrap gap-y-1">
                    {estimator.interiorIndividualItems.length > 0 && estimator.interiorIndividualItems.map((item, idx) => 
                        <span 
                          key={idx}
                          className="px-1 py-1 border-[1px] border-color-grayone text-[12px] rounded-2xl"
                        >
                          {item.title} - {item.price}
                        </span>
                    )}
                  </div>
                </div>
              </div>
            </div>




            <div>
              <div className="grid grid-cols-1 items-center mx-10 mt-3 px-5 py-2 text-[24px] font-[500] bg-gray-50 dark:bg-color-1 dark:text-white dark:rounded-lg max-sm:px-5 max-sm:mx-5">
                Cabinets
              </div>
              <div className="grid grid-cols-1 gap-y-5 items-center mx-10 mb-5 px-10 py-2 text-[18px] font-[500] dark:text-white max-sm:px-5 max-sm:mx-5">
                <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <div>
                    <h1>Number of Cabinets</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.doorsAndDrawers ? estimator.doorsAndDrawers : 'unknown'}</h3>
                  </div>
                  <div>
                    <h1>Cabinet Conditions</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.cabinetCondition ? cabinetConditions.find((item) => item.type == estimator.cabinetCondition).title : 'unknown'}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <div>
                    <h1>Painting Cabinet</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.insideCabinet ? 'Yes' : 'No'}</h3>
                  </div>
                  <div>
                    <h1>Cabinet Detail</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.cabinetDetail ? cabinetDetail.find((item) => item.type == estimator.cabinetDetail).title : 'unknown'}</h3>
                  </div>
                </div>
              </div>
            </div>




            <div>
              <div className="grid grid-cols-1 items-center mx-10 mt-3 px-5 py-2 text-[24px] font-[500] bg-gray-50 dark:bg-color-1 dark:text-white dark:rounded-lg max-sm:px-5 max-sm:mx-5">
                Exterior
              </div>
              <div className="grid grid-cols-1 gap-y-5 items-center mx-10 mb-5 px-10 py-2 text-[18px] font-[500] dark:text-white max-sm:px-5 max-sm:mx-5">
                <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <div>
                    <h1>Exterior Sqft</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.exteriorSquareFeet ? estimator.exteriorSquareFeet : 'unknown'}</h3>
                  </div>
                  <div>
                    <h1>Exterior Condition</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.exteriorCondition ? exteriorConditions.find((item) => item.type == estimator.exteriorCondition).title : 'unknown'}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <div>
                    <h1>Exterior Detail</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.exteriorDetail ? exteriorDetails.find((item) => item.type == estimator.exteriorDetail).title : 'unknown'}</h3>
                  </div>
                  <div>
                    <h1>Items to be Painted</h1>
                    <div className="flex items-center gap-x-1 w-full flex-wrap gap-y-1">
                    {estimator.exteriorItems.length > 0 && estimator.exteriorItems.map((item, idx) => 
                        <span key={idx} className="px-1 py-1 border-[1px] border-color-grayone text-[12px] rounded-full">{item.title}</span>
                    )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <h1>Extras</h1>
                  <div className="flex items-center gap-x-1 w-full my-2 flex-wrap gap-y-1">
                    {estimator.exteriorIndividualItems.length > 0 && estimator.exteriorIndividualItems.map((item, idx) => 
                        <span 
                          key={idx}
                          className="px-1 py-1 border-[1px] border-color-grayone text-[12px] rounded-2xl"
                        >
                          {item.title} - {item.price}
                        </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            


            <div>
              <div className="grid grid-cols-1 items-center mx-10 mt-3 px-5 py-2 text-[24px] font-[500] bg-gray-50 dark:bg-color-1 dark:text-white dark:rounded-lg max-sm:px-5 max-sm:mx-5">
                Terms
              </div>
              <div className="grid grid-cols-1 gap-y-5 items-center mx-10 mb-5 px-10 py-2 text-[18px] font-[500] dark:text-white max-sm:px-5 max-sm:mx-5">
                <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <div>
                    <h1>Paint Brand</h1>
                    <h3 className="font-[400] text-[14px] capitalize">{estimator.paintBrand ? estimator.paintBrand.replace('_', ' ') : 'unknown'}</h3>
                  </div>
                  <div>
                    <h1>Paint Quality</h1>
                    <h3 className="font-[400] text-[14px] capitalize">{estimator.paintQuality ? estimator.paintQuality : 'unknown'}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <div>
                    <h1>Years of Warranty</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.warranty ? estimator.warranty : 'unknown'}</h3>
                  </div>
                  <div>
                    <h1>Payment Schedule</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.payments ? estimator.payments : 'unknown'}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <div>
                    <h1>Deposit</h1>
                    <h3 className="font-[400] text-[14px]">{estimator.depositType == 'dollar' ? `$${estimator.deposit}` : `${estimator.deposit}%`}</h3>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          </>
        }
      </div>
      </div>
    </div>
  )
}

export default Estimate
