import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import UserInterface, {
  ILogedUser,
  IUserCreate,
  IUserLogin,
} from "../../model/User";
import route from "next/router";
import Cookies from "js-cookie";
import {
  api,
  createSession,
  createUser,
} from "../../services/auth/AuthService";

interface AuthContextProps {
  user?: ILogedUser;
  carregando?: boolean;
  loginGoogle?: () => Promise<void>;
  login?: (user: IUserLogin) => Promise<boolean>;
  cadastrar?: (user: IUserCreate) => Promise<IUserCreate>;
  logout?: () => Promise<void>;
}

interface Children {
  children: any;
}

const AuthContext = createContext<AuthContextProps>({});

function gerenciarCookie(logado: string) {
  if (logado) {
    Cookies.set("sales-auth", logado, {
      expires: 7,
    });
  } else {
    Cookies.remove("sales-auth");
  }
}

export function AuthProvider(props: Children) {
  const [user, setUser] = useState<ILogedUser>();
  const [carregando, setCarregando] = useState(true);

  async function configurarSessao(logedUser: any) {
    if (logedUser?.email) {
      setUser(logedUser);
      gerenciarCookie("logado");
      setCarregando(false);
      Cookies.set("token", logedUser.token);
      localStorage.setItem("user", JSON.stringify(logedUser));
      api.defaults.headers.authorization = `Barer ${logedUser.token}`;
      return user?.email;
    } else {
      setUser(null!);
      gerenciarCookie("");
      setCarregando(false);
      return false;
    }
  }

  async function logout() {
    try {
      gerenciarCookie("");
      setCarregando(true);
      Cookies.remove("sales-auth")
      Cookies.remove("token")
      localStorage.removeItem("user")
      route.push('/autentication')
    } finally {
      setCarregando(false);
    }
  }

  async function login(user: IUserLogin): Promise<boolean> {
    try {
      setCarregando(true);
      const sessionUser = await createSession(user);
      await configurarSessao(sessionUser.data);
      if (sessionUser) {
        return true;
      } else {
        return false;
      }
    } finally {
      setCarregando(false);
    }
  }

  async function cadastrar(user: IUserCreate): Promise<IUserCreate> {
    try {
      const newUser = await createUser(user);

      return newUser;
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("sales-auth")) {
      configurarSessao(JSON.parse(localStorage.getItem("user")!));
      return;
    } else {
      setCarregando(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, logout, carregando, login, cadastrar }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
