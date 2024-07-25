import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { auth } from '~/utils/firebase';

interface AuthProps {
  user?: User;
  initialized?: boolean;
}
const AuthContext = createContext<AuthProps>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialized(true);
    });
  }, []);

  return <AuthContext.Provider value={{ user, initialized }}>{children}</AuthContext.Provider>;
};
