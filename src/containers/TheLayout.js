import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from '../constants/appRoutePaths'
import { logoutUser, useAuthDispatch, useAuthState } from '../context'
import { quizList } from '../mockStaticData/quizList'
import TheContent from './TheContent'
import TheFooter from './TheFooter'
import TheHeader from './TheHeader'

const TheLayout = () => {
  const { authUser, isAuthenticated } = useAuthState();

  const history = useHistory();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    if (!authUser || !isAuthenticated) {
      logoutUser(dispatch);
      history.push(login.path);
    }
  }, [isAuthenticated, authUser, dispatch, history]);

  return (
    <>
        <TheHeader />
        <TheContent />
        <TheFooter />
    </>
  )
}

export default TheLayout