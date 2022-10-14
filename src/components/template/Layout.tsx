import useAppData from "../../app/data/hook/useAppData";
import ForcarAutenticacao from "../auth/ForceAutentication";
import NewSideMenu from "./SideMenu";
import MiniDrawer from './Drawer'


export interface LayoutProps {
  titulo?: string;
  subtitulo?: string;
  children?: any;
}

export default function Layout(props: LayoutProps) {
  const { tema } = useAppData();
  return (
    <ForcarAutenticacao>
      <div className={`${tema} flex h-screen w-screen`}>
        {/* <NewSideMenu titulo={props.titulo} children={props.children} /> */}
        <MiniDrawer titulo={props.titulo} children={props.children}/>
        
      </div>
    </ForcarAutenticacao>
  );
}

