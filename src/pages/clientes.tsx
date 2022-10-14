import type { NextPage } from "next";
import Layout from "../components/template/Layout";
import CreateCustomer from "../components/customers/create/createCustmer";


const Clientes: NextPage = () => {
  return (
    
      <Layout titulo="Clientes" subtitulo="Cadatro e listagem de clientes">
        <CreateCustomer></CreateCustomer>
      </Layout>
      
  );
};

export default Clientes;
