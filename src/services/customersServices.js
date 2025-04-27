import { addCustomerRepo, getCustomerCpfRepo, getCustomerIdRepo, getCustomerRepo } from "../repositories/customersRepo.js";

export async function addCustomerService({ name, phone, cpf }) {
    const conflict = await getCustomerCpfRepo(cpf);
    if (!conflict){
        throw{type:"conflictCPF", message:"Usuário com esse CPF já cadastrado"}
    };

    const result = await addCustomerRepo(name, phone, cpf);
    return result;
}

export async function getCustomerService() {
    const result = await getCustomerRepo();
    return result;
}

export async function getCustomerIdService(id) {
    const result = await getCustomerIdRepo(id);
    if(!result){
        throw{type:"notFound_Customer", message:"Cliente não encontrado."};
    }
    return result;
}