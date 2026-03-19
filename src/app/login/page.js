"use client"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useMutation } from '@apollo/client'
import { validateEmail } from '@/app/_helpers/main'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'

//// COMPONENTS
import InputFieldText from '@/app/_components/forms/inputTextField'
import InputFieldPassword from '@/app/_components/forms/inputPasswordField'
import Button from '@/app/_components/forms/submitButton'

//// REDUCERS
import { changeUserValue, resetUser } from '@/app/_redux/features/userSlice'

//// MUTATIONS
import ADMIN_LOGIN from '@/app/_mutations/login'
import FORGOT_PASSWORD from '@/app/_mutations/forgotPasswordAdmin'

const Login = ({}) => {
  
  const [loading, setLoading]                                                 = useState('')
  const [view, setView]                                                       = useState('login')
  const [showPassword, setShowPassword]                                       = useState('')
  const [dropdown, setDropdown]                                               = useState('')
  const [message, setMessage]                                                 = useState('')
  const [error, setError]                                                     = useState('')
  const dispatch                                                              = useDispatch()
  const router                                                                = useRouter()
  const user                                                                  = useSelector((state) => state.userReducer.value)
  const [cookies, setCookie, removeCookie]                                    = useCookies(['email', 'token', 'admin'])

  const [adminLogin, { dataAdminLogin, loadingAdminLogin, errorAdminLogin }]  = useMutation(ADMIN_LOGIN)
  const [forgotPasswordAdmin, { dataForgotPassword, loadingForgotPassword, errorForgotPassword }] = useMutation(FORGOT_PASSWORD)

  const handleSubmit = async () => {
    
    setMessage('')
    setError('')
    
    if(user.email){
      if(!validateEmail(user.email)){
        return setMessage('Email is not valid')
      }
    }

    setLoading('login')
    
    try {

      const response = await adminLogin({
        variables: {
          email: user.email.toLowerCase(),
          password: user.password
        }
      })

      setLoading('')
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 48 * 60 * 60 * 1000)
      
      setCookie('token', response.data.adminLogin.token, { 
        expires: expirationDate,
        path: '/',
        sameSite: 'lax',
      })

      setCookie('admin', response.data.adminLogin, { 
        expires: expirationDate,
        path: '/',
        sameSite: 'lax',
       })

      setMessage(response.data.adminLogin.message)
      router.push(`/`)
      dispatch(resetUser())
      
    } catch (error) {
      console.log('ERROR', error)
      setLoading('')

      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const graphQLError = error.graphQLErrors[0]; // Access the first error in the array
        
        // Check if the error has the extensions property
        if (graphQLError.extensions && graphQLError.extensions.code) {
          
          const errorCode = graphQLError.extensions.code
    
          if (errorCode === 'UNAUTHORIZED') {
            setError('Unauthorized access')
          } else if ( errorCode === 'FORBIDDEN') {

            setError(error.message)

          } else {

            setMessage('An unknown error occurred')

          }
        }
      } else {
        // Handle non-GraphQL errors
        setMessage(error.message)
      }
    }
    
  }

  const submitForgotPassword = async () => {

    setMessage('')
    setError('')
    
    if(user.email){
      if(!validateEmail(user.email)){
        return setMessage('Email is not valid')
      }
    }

    setLoading('forgotPassword')
    
    try {

      const response = await forgotPasswordAdmin({
        variables: {
          email: user.email.toLowerCase()
        }
      })

      setMessage(response.data.forgotPasswordAdmin.message)
      setLoading('')
      
    } catch (error) {
      console.log('ERROR', error)
      setLoading('')
      if (error) setMessage(error.message)
      
    }
    
  }
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/assets/logo.svg"
          alt="Your Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Admin Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-2 shadow sm:rounded-lg sm:px-5">
          {view == 'login' &&
            <div className="space-y-6">
              <InputFieldText
                inputType={'text'}
                label={'Email'}
                value={user.email}
                dispatch={dispatch}
                changeValue={changeUserValue}
                type={'email'}
                labelShow={true}
                inputClassOne={''}
                labelClassOne={''}
                dropdown={''}
                setDropdown={setDropdown}
                id={'email'}
              />
              <InputFieldPassword
                inputType={'password'}
                label={'Password *'}
                value={user.password}
                dispatch={dispatch}
                changeValue={changeUserValue}
                type={showPassword == 'password' ? 'text' : 'password'}
                labelShow={true}
                inputClassOne={''}
                labelClassOne={''}
                dropdown={''}
                setDropdown={setDropdown}
                id={'password'}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                SVGColor={'gray'}
              />
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a 
                    className="font-medium text-color-1 dark:text-color-3 hover:text-color-2 hover:cursor-pointer"
                    onClick={() => (
                      setView('forgotPassword'),
                      setMessage('')
                    )}
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div
                onClick={() => handleSubmit()}
              >
                <Button
                  label='Sign in'
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
                  inputClassOne={' '}
                />
              </div>

              {!message && !error &&
                <div className="w-full h-[14px]">
                </div>
              }

              {message &&
                <div className="w-full text-[16px] font-[500] text-color-1 dark:text-color-3 py-1 px-2">
                  * {message.substring(0, 120)}
                </div>
              }

              {error &&
                <div className="w-full text-[16px] font-[500] text-red-400 py-1 px-2">
                  * {error.substring(0, 120)}
                </div>
              }
              
            </div>
          }
          {view == 'forgotPassword' &&
            <div className="space-y-6">
              <InputFieldText
                inputType={'text'}
                label={'Email'}
                value={user.email}
                dispatch={dispatch}
                changeValue={changeUserValue}
                type={'email'}
                labelShow={true}
                inputClassOne={''}
                labelClassOne={''}
                dropdown={''}
                setDropdown={setDropdown}
                id={'email'}
              />
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a 
                    className="font-medium text-color-1 dark:text-color-3 hover:text-color-2 hover:cursor-pointer"
                    onClick={() => (
                      setView('login'),
                      setMessage('')
                    )}
                  >
                    Already have an account? Login
                  </a>
                </div>
              </div>

              <div
                onClick={() => submitForgotPassword()}
              >
                <Button
                  label='send request'
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
                  loadingType={'forgotPassword'}
                  inputClassOne={' '}
                />
              </div>

              {!message && !error &&
                <div className="w-full h-[14px]">
                </div>
              }

              {message &&
                <div className="w-full text-[16px] font-[500] text-color-1 dark:text-color-3 py-1 px-2">
                  * {message.substring(0, 120)}
                </div>
              }

              {error &&
                <div className="w-full text-[16px] font-[500] text-red-400 py-1 px-2">
                  * {error.substring(0, 120)}
                </div>
              }
              
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
