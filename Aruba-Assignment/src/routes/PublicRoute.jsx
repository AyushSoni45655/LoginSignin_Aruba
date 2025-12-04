

import React, { useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { AppContextt } from '../Context/AppContext';

const PublicRoute = ({children}) => {
  const {token} = useContext(AppContextt);
  const navigator = useNavigate();
  useEffect(()=>{
    if(token)navigator("/",{replace:true})
  },[token,navigator]);
if(token){
  return null;
}
  return children;
}

export default PublicRoute
