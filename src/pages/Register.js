import React, { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext'
import {useNavigate} from 'react-router-dom';
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
function Register() {
  const [values, setValue] = useState(initialState)
  const navigate = useNavigate()
 const {user, isLoading, showAlert, displayAlert, registerUser, loginUser} = useAppContext()
 

  const toggleMember = () => {
    setValue({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValue({...values,[e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const {name,email, password, isMember} = values
    if(!email || !password || (!isMember && !name)){
      displayAlert()
      return
    }

    const currentUser = {name, email,password}
    if(isMember){
      loginUser(currentUser)

    }else{
   registerUser(currentUser)
    }
  }

  useEffect(() => {
    if(user){
      setTimeout(() => {
        navigate('/')
      }, 3000)
     
    }
  }, [user, navigate])
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}

        {!values.isMember && (
          <FormRow
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
          />
        )}       

        <FormRow
        type='email'
        name='email'
        value={values.email}
        handleChange={handleChange}
        />

       <FormRow
        type='password'
        name='password'
        value={values.password}
        handleChange={handleChange}
        />
        
        <button type="submit" disabled={isLoading}>Submit</button>
        <p>
          {values.isMember ? 'Not a member yet' : 'Already a member ?'}
          <button type='button' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>

        </form>
    </div>
  )
}

export default Register