import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useAuthToken() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Function to check if the token exists in cookies
    const checkTokenInCookies = () => {
      const authToken = Cookies.get('authToken');
      if (authToken) {
        setToken(authToken);
      }
    };

    checkTokenInCookies();
  }, []);

  // Function to set the token in cookies
  const setAuthToken = (tokenValue) => {
    const cookieOptions = {
      expires: 1, // Set your desired expiration time
      // secure: true, // The cookie will only be sent over secure (HTTPS) connections
      // httpOnly: true, // The cookie cannot be accessed by client-side scripts
      // sameSite: 'lax', // Controls when the cookie is sent in cross-site requests
    };
    Cookies.set('authToken', tokenValue, cookieOptions); // 'expires' sets the cookie's expiration date (1 days in this case)
    setToken(tokenValue);
  };

  // Function to remove the token from cookies (useful when the user logs out)
  const removeAuthToken = () => {
    Cookies.remove('authToken');
    setToken(null);
  };

  return { token, setAuthToken, removeAuthToken };
}
