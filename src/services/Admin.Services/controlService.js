import http from "../httpService";
import { adminUrl } from "../../config";
import { plan_types } from '../../utils'

// check the userContext and dataService for the implementation of this functiion
export const getMaintenance = async () => {
    return null
}
  
export const setMaintenanceNotice = async (message) => {
    try{
        const resp = await http.post(`${adminUrl}/maintenance/notice`, {message})
        return resp.data
    }catch(e){
        return null
    }
}

export const clearMaintenanceNotice = async () => {
    try{
        const resp = await http.get(`${adminUrl}/maintenance/clear`)
        return resp.data
    }catch(e){
        return null
    }
}

export const enterNetworkMaintenance = async (plan_type) => {
    if(!plan_types.includes(plan_type)) return null;

    try{
        const resp = await http.patch(`${adminUrl}/maintenance/enter/${plan_type}`)
        return resp.data
    }catch(e){
        return null
    }
}


export const exitNetworkMaintenance = async (plan_type) => {
    if(!plan_types.includes(plan_type)) return null;

    try{
        const resp = await http.patch(`${adminUrl}/maintenance/exit/${plan_type}`)
        return resp.data
    }catch(e){
        return null
    }
}
  