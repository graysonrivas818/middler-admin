import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useCookies } from 'react-cookie'

//// LIBS
import { convertIsoStringToDate } from '@/app/_helpers/main'
import { codesTable, codesTableTitles, convertDateTypes, codesSubmenu } from '@/app/_libs/tables'

//// COMPONENTS
import SVG from '@/app/_libs/svg'

//// MUTATIONS
import CREATE_PROMOTION from '@/app/_mutations/createPromotion'
import DELETE_PROMOTION from '@/app/_mutations/deletePromotion'

const emptyForm = { type: 'subscription', code: '', plan: 'standard', days: '30', description: '', affiliate: '' }

const Codes = ({
  codes,
  dispatch,
  changeView,
  changePopup,
  isDarkMode,
  setSelectedCode,
  refetchCodes
}) => {
  
  const [dropdown, setDropdown]                           = useState('')
  const [dropdownSubitem, setDropdownSubitem]             = useState('')
  const [allCodes, setAllCodes]                           = useState([])
  const [isDescending, setIsDescending]                   = useState(true)
  const [showCreateForm, setShowCreateForm]               = useState(false)
  const [formData, setFormData]                           = useState(emptyForm)
  const [formError, setFormError]                         = useState('')
  const [formSuccess, setFormSuccess]                     = useState('')
  const [formLoading, setFormLoading]                     = useState(false)
  const [cookies]                                         = useCookies(['token'])

  const [createPromotion]  = useMutation(CREATE_PROMOTION)
  const [deletePromotion]  = useMutation(DELETE_PROMOTION)


  const filterObjectKeys = (obj, keys) => {
    return Object.keys(obj)
      .filter(key => keys.includes(key))
      .reduce((filteredObj, key) => {
        filteredObj[key] = obj[key];
        return filteredObj;
      }, {});
  }

  useEffect(() => {
    const sortedCodes = [...allCodes].sort((a, b) => 
      isDescending 
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    setAllCodes(sortedCodes);
  }, [isDescending])

  useEffect(() => {
    const sortedCodes = [...codes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    setAllCodes(sortedCodes)
  }, [codes])

  const handleCreateSubmit = async () => {
    setFormError('')
    setFormSuccess('')
    if (!formData.code || !formData.plan || !formData.days) {
      return setFormError('Code, Plan and Days are required.')
    }
    setFormLoading(true)
    try {
      const res = await createPromotion({
        variables: {
          token: cookies.token || '',
          type: formData.type,
          code: formData.code.trim(),
          plan: formData.plan.trim(),
          days: formData.days.toString(),
          description: formData.description,
          affiliate: formData.affiliate
        }
      })
      setFormSuccess(res.data.createPromotion.message)
      setFormData(emptyForm)
      if (refetchCodes) refetchCodes()
    } catch (err) {
      setFormError(err.message || 'Failed to create code')
    }
    setFormLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this promotion code?')) return
    try {
      await deletePromotion({ variables: { id, token: cookies.token || '' } })
      if (refetchCodes) refetchCodes()
    } catch (err) {
      alert(err.message || 'Failed to delete code')
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
            <div className="flex justify-between px-5 mb-3">
              <div className="flex items-center gap-x-3">
                <h1 className="my-3 px-3 font-[400] text-[28px] text-black dark:text-white">Codes</h1>
                <button 
                  onClick={() => setIsDescending(!isDescending)} 
                  className="bg-color-1 px-4 py-2 text-white rounded-lg hover:opacity-90"
                >
                  {isDescending ? "Sort: Oldest to Newest" : "Sort: Newest to Oldest"}
                </button>
              </div>
              <button
                onClick={() => { setShowCreateForm(!showCreateForm); setFormError(''); setFormSuccess('') }}
                className="bg-green-600 px-4 py-2 text-white rounded-lg hover:opacity-90"
              >
                {showCreateForm ? 'Cancel' : '+ New Code'}
              </button>
            </div>

            {/* Create Code Form */}
            {showCreateForm && (
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 mb-6 mx-2">
                <h2 className="text-[20px] font-[600] text-black dark:text-white mb-4">Create Promotion Code</h2>
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type *</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-black"
                    >
                      <option value="subscription">subscription</option>
                      <option value="trial">trial</option>
                      <option value="discount">discount</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Code * (must be unique)</label>
                    <input
                      type="text"
                      placeholder="e.g. SUMMER2024"
                      value={formData.code}
                      onChange={e => setFormData({ ...formData, code: e.target.value })}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-black"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Plan *</label>
                    <input
                      type="text"
                      placeholder="e.g. standard"
                      value={formData.plan}
                      onChange={e => setFormData({ ...formData, plan: e.target.value })}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-black"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Days * (free trial length)</label>
                    <input
                      type="number"
                      placeholder="e.g. 30"
                      value={formData.days}
                      onChange={e => setFormData({ ...formData, days: e.target.value })}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-black"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <input
                      type="text"
                      placeholder="Optional description"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-black"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Affiliate</label>
                    <input
                      type="text"
                      placeholder="Optional affiliate name"
                      value={formData.affiliate}
                      onChange={e => setFormData({ ...formData, affiliate: e.target.value })}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-black"
                    />
                  </div>
                </div>
                {formError && <p className="text-red-500 text-sm mt-3">{formError}</p>}
                {formSuccess && <p className="text-green-600 text-sm mt-3">{formSuccess}</p>}
                <button
                  onClick={handleCreateSubmit}
                  disabled={formLoading}
                  className="mt-4 bg-color-1 text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                >
                  {formLoading ? 'Saving...' : 'Save Code'}
                </button>
              </div>
            )}
            
            <div className="shadow-2xl rounded-2xl pb-8 w-full overflow-x-auto">
              <div className="min-w-[1400px]">
                {/* Header Row */}
                <div className="flex justify-start items-center gap-x-2 p-5 bg-color-1 text-white rounded-t-2xl">
                  <div 
                    className="bg-color-1 w-[140px] min-w-[140px] flex-shrink-0 flex items-center gap-x-3 px-3 py-2 rounded-2xl hover:cursor-pointer"
                  >
                  </div>
                  {codesTable.length > 0 && codesTable.map((heading, idx) => (
                    <h1 key={idx} className="w-[200px] min-w-[180px] flex-shrink-0 text-[18px] font-[600] capitalize text-center">
                      {codesTableTitles.find((item) => item.type == heading).title}
                    </h1>
                  ))}
                </div>
                {allCodes.length > 0 && allCodes.map((obj, index) => {
                  const filteredObj = filterObjectKeys(obj, codesTable)
                  return (
                    <div key={index} className={`flex items-center gap-x-2 py-3  px-5 ${index % 2 ? 'bg-color-2 bg-opacity-50 text-black' : 'bg-transparent'}`}>
                      <div className="w-[140px] min-w-[140px] flex justify-center items-center gap-x-5 relative">
                        <div 
                          className="flex flex-col justify-center items-center relative hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-out text-black"
                          onClick={() => setSelectedCode(obj)}
                        >
                          <SVG
                            svg={'percentage'}
                            alt="Percentage"
                            width={30}
                            height={30}
                            schemeOne={isDarkMode ? 'white' : 'black'}
                          />
                          <span className="text-[10px] dark:text-white">Code</span>
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
                        onClick={() => dropdown === `code${index}` ? setDropdown('') : setDropdown(`code${index}`)}
                      >
                        <SVG
                          svg={'options'}
                          alt="Logo"
                          width={30}
                          height={30}
                          schemeOne={isDarkMode ? 'white' : 'black'}
                        />
                        { dropdown === `code${index}` &&
                        <div className="absolute top-[95%] right-0 w-[150px] rounded-lg bg-gray-200 shadow-2xl z-100">
                          {codesSubmenu && codesSubmenu.map(( item, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center justify-start gap-x-3 px-2 py-2 hover:cursor-pointer hover:bg-red-500 hover:text-white text-center rounded-lg dark:text-black"
                              onMouseEnter={() => setDropdownSubitem(`code-${item.label}`)}
                              onMouseLeave={() => setDropdownSubitem('')}
                              onClick={() => item.type === 'delete' ? handleDelete(obj.id) : null}
                            >
                              <SVG
                                svg={item.svg}
                                alt="Logo"
                                width={20}
                                height={20}
                                schemeOne={ dropdownSubitem === `code-${item.label}` ? 'white' : 'black' }
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

export default Codes
