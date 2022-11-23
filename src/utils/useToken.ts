//import { useState } from 'react';
//import { sessionResponse } from '../pages/auth';
//
//type tokenHook = {
//  setToken: (x: sessionResponse) => void;
//  token: string | null;
//};
//
//export default function useToken(): tokenHook {
//  const getToken = (): string | null => {
//    const tokenString = sessionStorage.getItem('token');
//    if (tokenString !== null) {
//      const userToken = JSON.parse(tokenString) as sessionResponse;
//      if (
//        userToken &&
//        userToken?.user &&
//        typeof userToken?.user != 'string' &&
//        'role' in userToken.user &&
//        userToken.user.role === 'authenticated'
//      ) {
//        console.log(userToken);
//        return tokenString;
//      }
//    }
//    return null;
//  };
//  const [token, setToken] = useState(getToken());
//
//  const saveTokenToSession = (userToken: sessionResponse) => {
//    sessionStorage.setItem('token', JSON.stringify(userToken));
//    setToken(JSON.stringify(userToken));
//  };
//
//  return {
//    setToken: saveTokenToSession,
//    token,
//  };
//}
