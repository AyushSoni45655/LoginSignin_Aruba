import React, { useContext, useEffect } from 'react'
import { AppContextt } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const {token} = useContext(AppContextt);
  const navigator = useNavigate();
  useEffect(()=>{
    if(!token){
      navigator("/signin",{replace:true})
    }
  },[token,navigator]);
  if(!token){
    return null
  }
  return children
}

export default PrivateRoute
