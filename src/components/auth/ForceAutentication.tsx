import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'
import loading from '../../../public/images/loading.gif'
import useAuth from '../../app/data/hook/useAuth'

interface ConteudoProps {
    children?: any;
  }

export default function ForcarAutenticacao(props:ConteudoProps) {

    const { user, carregando } = useAuth()

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("sales-auth")) {
                                    window.location.href = "/autentication"
                                }
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loading} />
            </div>
        )
    }

    if(!carregando && user?.email) {
        return renderizarConteudo()
    } else if(carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autentication')
        return null
    }
}