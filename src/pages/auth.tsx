import { AssertionError } from 'assert';
import React, { useState } from 'react';
import { useAuthContext } from '../utils/AuthContext/authContext';

type User = {
  accessToken: string;
  role: string;
};

const assertResponseType = (param: unknown): asserts param is User => {
  if (!param || typeof param != 'object') {
    throw new AssertionError({ message: 'no user found' });
  }
  if (!param.hasOwnProperty('role')) {
    throw new AssertionError({ message: 'user has no role' });
  }
  if (!param.hasOwnProperty('accessToken')) {
    throw new AssertionError({ message: 'user has no userToken' });
  }
};

export type sessionResponse = {
  [key: string]: string | { [key: string]: string };
} | null;

export default function Auth() {
  const { setToken, token } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const sendUserDetails = async () => {
    const options = {
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ password, email }),
    };
    //await fetch('http://localhost:3000/auth/signup', options);
    const response: Response = await fetch(
      'http://localhost:3000/auth/login',
      options
    );
    // !!!!!!!!  need to set this straight to auth context so we can keep a valid token and then on every route reuse token for fetch request
    if (response.status === 200) {
      console.log('success 200', response);

      const responseObj = (await response.json()) as sessionResponse; //note this returns a js obj and not json
      if (
        responseObj &&
        'data' in responseObj &&
        typeof responseObj.data != 'string' &&
        'user' in responseObj.data
      ) {
        return (
          responseObj.data.user && assertResponseType(responseObj.data.user)
        );
      }
    }
    return null;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendUserDetails();
      const response = (await sendUserDetails()) as sessionResponse;
      console.log('handlelogin response received ', response);

      if (
        response &&
        response.role === 'authenticated' &&
        typeof response.accessToken == 'string'
      ) {
        return setToken(response.accessToken);
        // note if i just savw with local state The token is currently stored using a local state, which means that it is stored in JavaScript memory.
        //If you open a new window, tab, or even just refresh the page, you will lose the token
      }
      console.log(
        'response not valid, user not authenticated ot accestoken not valid ',
        response
      );
      return;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div>Loading....</div>
  ) : (
    //Rui - error when removing ts below
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="inputField"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        className="inputField"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
//const App = () => <Auth supabaseClient={supabase} />;
