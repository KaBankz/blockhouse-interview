import { Storage } from "expo-sqlite/kv-store";
import { createContext, useContext, useEffect, useState } from "react";

const KVStore = {
  setUser: async (user: User) => {
    await Storage.setItem("user", JSON.stringify(user));
  },

  getUser: async () => {
    const user = await Storage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser as User;
    }

    return null;
  },

  removeUser: async () => {
    await Storage.removeItem("user");
  },
};

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
    console.log("User Signed In", email, password);
    const user = await KVStore.getUser();

    if (user) {
      if (user.email === email) {
        setUser(user);
      } else {
        throw new Error("Invalid email or password");
      }
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const signUp = async (email: string, password: string) => {
    const randomId = Math.random().toString(36).substring(2, 15);
    console.log("User Signed Up", email, password, randomId);

    const user = await KVStore.getUser();

    if (user) {
      throw new Error("User already exists");
    }

    KVStore.setUser({ id: randomId, email });
    setUser({ id: randomId, email });
  };

  const signOut = async () => {
    console.log("User Signed Out");
    KVStore.removeUser();
    setUser(null);
  };

  const session: Session = { user };

  useEffect(() => {
    KVStore.getUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
