"use client"
import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { isStrongPassword } from '@/app/_helpers/forms'
import { jwtDecode } from "jwt-decode"
import { useMutation } from '@apollo/client'
import Cookies from 'js-cookie'

//// COMPONENTS
import Nav from '@/app/_components/nav'
// import Footer from '@/app/_components/footer'
import InputFieldPassword from '@/app/_components/forms/inputPasswordField'
import Button from '@/app/_components/forms/button'

//// REDUCERS
import { changeUserValue, resetUser } from '@/app/_redux/features/userSlice'

//// MUTATIONS
import UPDATE_PASSWORD from '@/app/_mutations/updatePasswordAdmin'

const ResetPassword = ({}) => {

  const containerRef                                  = useRef(null)
  const router                                        = useRouter()
  const params                                        = useParams()
  const dispatch                                      = useDispatch()
  const [showPassword, setShowPassword]               = useState('')
  const [dropdown, setDropdown]                       = useState('')
  const [loading, setLoading]                         = useState('')
  const [message, setMessage]                         = useState('')
  const [decoded, setDecoded]                         = useState('')
  const [passwordUpdated, setPasswordUpdated]         = useState(false)
  const user                                          = useSelector((state) => state.userReducer.value)


  const [updatePasswordAdmin, { dataUpdatePassword, loadingUpdatePassword, errorUpdatePassword }] = useMutation(UPDATE_PASSWORD)
  
  useEffect(() => {
    // Function to handle clicks outside the container
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMessage(''); // Clear the message if clicked outside
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])
  
  const submitUpdatePassword = async () => {
    
    if(!isStrongPassword(user.password)) return setMessage("The password must be at least 8 characters long, have one uppercase letter (A-Z), have one lowercase letter (a-z), and one digit (0-9).")
    setMessage('')
    
    try {

      const response = await updatePasswordAdmin({
        variables: {
          newPassword: user.password,
          id: decoded.id,
          token: params.token
        }
      })

      setMessage(response.data.updatePasswordAdmin.message)
      setLoading('')
      setPasswordUpdated(true)

      // Set a cookie with the success message or any other useful data
      Cookies.set('authModal', 'login', { expires: 1 })
      
    } catch (error) {
      console.log(error)
      setLoading('')
      if(error) setMessage(error.message)
    }
    
  }

  useEffect(() => {
    if(params.token) setDecoded(jwtDecode(params.token))
  }, [params.token])
  
  return (
    <>
     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/assets/logo.svg"
          alt="Your Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Update password
        </h2>
      </div>

      <section className="flex justify-center py-20 mb-20 mt-15">
        <div className="dark:bg-gray-800 px-5 py-4 rounded-2xl flex flex-col text-black max-w-[450px]">
          <h1 className="text-[32px] font-[600] dark:text-white">Change your password</h1>
          <h5 className="text-color-grayone dark:text-white mt-5 mb-10">{ passwordUpdated ? 'Login with new password to continue' : 'Enter a new passsword below to change your password'}</h5>
          {!passwordUpdated &&
            <div 
              ref={containerRef}
              className="relative group py-3 w-full rounded-xl hover:cursor-pointer transition-all ease-in-out duration-500"
            >
              <InputFieldPassword
                inputType={'password'}
                label={'Password *'}
                value={user.password}
                dispatch={dispatch}
                changeValue={changeUserValue}
                type={showPassword == 'password' ? 'text' : 'password'}
                labelShow={true}
                inputClassOne={'pl-[20px] text-gray-400'}
                labelClassOne={'start-4'}
                dropdown={''}
                setDropdown={setDropdown}
                id={'password'}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <div className="flex items-center justify-between pt-5">
                <div className="text-sm">
                  <a 
                    className="font-medium text-color-1 dark:text-color-3 hover:text-color-2 hover:cursor-pointer"
                    onClick={() => (
                      router.push('/login'),
                      setMessage('')
                    )}
                  >
                    Already have an account? Login
                  </a>
                </div>
              </div>
              {message &&
                <div className="absolute w-[90%] bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-color-4 text-white text-xs rounded px-2 py-1">
                  {message}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-color-4"></div>
                </div>
              }
            </div>
          }
          {!passwordUpdated &&
            <div 
              className=""
              onClick={() => submitUpdatePassword()}
            >
              <Button
                label='Update Password'
                backgroundColor={''}
                svgColor={'black'}
                width={300}
                height={30}
                font={300}
                fullWidth={true}
                textColor={'white'}
                borderColor={''}
                svg={'arrowRight'}
                backgroundColorSVG={'white'}
                href={''}
                borderRadius={true}
                loading={loading}
                loadingType={'login'}
                inputClassOne={' mt-5 py-2 custom-button '}
              />
            </div>
          }
          {passwordUpdated &&
            <div 
              className=""
              onClick={() => router.push('/login')}
            >
              <Button
                label='Login'
                backgroundColor={''}
                svgColor={'black'}
                width={300}
                height={30}
                font={300}
                fullWidth={true}
                textColor={'white'}
                borderColor={''}
                svg={'arrowRight'}
                backgroundColorSVG={'white'}
                href={''}
                borderRadius={true}
                loading={loading}
                loadingType={'login'}
                inputClassOne={' mt-5 py-2 custom-button '}
              />
            </div>
          }
        </div>
      </section>
    </div>
    {/* <section
      className="w-full flex mt-10"
    >
      <Footer></Footer>
    </section> */}
    </>
  )
}

export default ResetPassword
