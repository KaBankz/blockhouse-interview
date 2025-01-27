import { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  email: string;
};

type Session = {
  user: User | null;
};

export const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session: Session;
}>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  session: { user: null },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    console.log('User Signed In', email, password);
    setUser({ id: '1', email: email });
  };

  const signUp = async (email: string, password: string) => {
    const randomId = Math.random().toString(36).substring(2, 15);
    console.log('User Signed Up', email, password, randomId);
    setUser({ id: randomId, email: email });
  };

  const signOut = async () => {
    console.log('User Signed Out');
    setUser(null);
  };

  const session: Session = { user };

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
