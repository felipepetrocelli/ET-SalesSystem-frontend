import { AxiosResponse } from "axios";
import { httpClient } from "../../http";
import { ICustomer } from "../../model/ICustomer";

const resourceURL: string = "/customer"

export const useClienteService = () => {

    const salvar = async (cliente: ICustomer) : Promise<ICustomer> => {
       const response: AxiosResponse<ICustomer> = await httpClient.post<ICustomer>(`${resourceURL}/create`, cliente )
       return response.data;
    }

    const atualizar = async (cliente: ICustomer) : Promise<void> => {
        const url: string = `${resourceURL}/${cliente.id}` 
        await httpClient.put<ICustomer>(url, cliente)
    }

    const carregarCliente = async (id:string) : Promise<ICustomer> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<ICustomer> = await httpClient.get(url);
        return response.data;
    }

    const deleteCustomer = async (id:string) : Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url)
        
    }

    const list = async () : Promise<ICustomer[]> => {
        const response: AxiosResponse<ICustomer[]> = await httpClient.get(resourceURL)
        return response.data
        
    }
    const findByNameOrCpf = async (
        nome: string = '', 
        cpf: string = '' 
       ) : Promise<ICustomer> =>  {
        const url = `${resourceURL}?nome=${nome}&cpf=${cpf}`
        const response: AxiosResponse<ICustomer> = await httpClient.get(url);
        return response.data;
    }

    return {
        salvar,
        atualizar,
        carregarCliente,
        deleteCustomer,
        list,
        findByNameOrCpf
    }
}