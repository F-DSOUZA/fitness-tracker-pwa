import { userInfo } from 'os';
import React, { useState } from 'react';
import { json } from 'react-router-dom';
export type sessionResponse = {
  [key: string]: string | { [key: string]: string };
} | null;
export default function Auth({
  setSessionToken,
}: {
  setSessionToken: (x: sessionResponse) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const sendUserDetails = async () => {
    console.log(JSON.stringify({ password, email }));
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
    if (response.status === 200) {
      console.log('success 200', response);
      const responseObj = (await response.json()) as sessionResponse; //note this returns a js obj and not json
      return responseObj;
    }
    console.log('fetch fail', response);
    return null;
  };
  //ask Rui about the promise problem when i remove void
  //why cant i see network request
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendUserDetails();
      const response = await sendUserDetails();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (
        response &&
        response?.user &&
        typeof response?.user != 'string' &&
        'role' in response.user &&
        response.user.role === 'authenticated'
      ) {
        setSessionToken(response);
        // note if i just savw with local state The token is currently stored using a local state, which means that it is stored in JavaScript memory.
        //If you open a new window, tab, or even just refresh the page, you will lose the token
      }
      return;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div>lOADING....</div>
  ) : (
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
