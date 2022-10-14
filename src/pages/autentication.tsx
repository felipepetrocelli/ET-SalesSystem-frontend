import { useState } from "react";
import Authinput from "../components/auth/Authinput";
import { errorIcon } from "../components/icons";
import useAuth from "../app/data/hook/useAuth";
import route from "next/router";
import { IUserCreate, IUserLogin } from "../model/User";

export default function Autentication() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [erro, setErro] = useState("");
  const [modo, setModo] = useState<"login" | "cadastro">("login");

  const { user, cadastrar, login } = useAuth();

  async function submeter() {
    const user: IUserCreate = { name: "teste", email, password };

    if (modo === "login") {
      try{
      const loginUser = await login!(user);
      if (loginUser) {
        route.push("/");
      }}catch(e:any){
        
        if(e.response?.data.message){
          exibirErro(e.response.data.message)
        }else{
          exibirErro('Erro interno no seridor contatar o suporte')
        }

      }
    } else {
      const loginUser = await cadastrar!(user);
    }
  }

  function exibirErro(msg: string, tempo = 2) {
    setErro(msg);
    setTimeout(() => setErro(""), tempo * 3000);
  }

  return (
    <div className={`flex  h-screen items-center justify-center`}>
      <div className={`hidden md:block md:w-1/2 lg:w-2/3  `}>
        <img
          src="https://source.unsplash.com/random"
          alt="imagem tela autenticação"
          className={`h-screen w-full object-cover`}
        />
      </div>
      <div className={`md:w-1/2 m-10 w-full lg:w-1/3`}>
        <h1
          className={`
        text-2xl font-bold mb-5 
        `}
        >
          {modo === "login" ? "Entre com sua conta" : "Cadastre sua conta"}
        </h1>
        {erro ? (
          <div
            className={`flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg `}
          >
            {errorIcon} <span className="ml-3 ">{erro}</span>
          </div>
        ) : (
          false
        )}

        <Authinput
          label="e-mail"
          valor={email}
          valorMudou={setEmail}
          tipo={"email"}
          obrigatorio
        />
        <Authinput
          label="senha"
          valor={password}
          valorMudou={setpassword}
          tipo={"password"}
          obrigatorio
        />
        <hr className=" my-6 border-gray-400 w-full" />
        <button
          onClick={submeter}
          className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6 `}
        >
          {modo === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <hr className=" my-6 border-gray-400 w-full" />
        {modo === "login" ? (
          <p className="mt-8">
            {" "}
            Nova conta?
            <a
              className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer `}
              onClick={() => setModo("cadastro")}
            >
              {" "}
              Criar conta
            </a>
          </p>
        ) : (
          <p className="mt-8">
            {" "}
            Ja é cadastrado?
            <a
              className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer `}
              onClick={() => setModo("login")}
            >
              {" "}
              Entre com suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
