import type { NextPage } from "next";
import CreateCustomer from "../../../components/customers/create/createCustmer";
import Layout from "../../../components/template/Layout";



const Clientes: NextPage = () => {
  return (
    
      <Layout titulo="Clientes" subtitulo="Cadatro e listagem de clientes">
        <CreateCustomer></CreateCustomer>
      </Layout>
      
  );
};

export default Clientes;
