import http from '../httpService'
import { adminUrl } from '../../config'

export const getBusinesses = async () => {
    try{
        return http.get(`${adminUrl}/business`)
    }catch(e){
        return null
    }
}


export const getWallets = async () => {
    try{
        return http.get(`${adminUrl}/balances`)
    }catch(e){
        return null
    }
}


export const getPayments = async () => {
    try{
        return http.get(`${adminUrl}/payments`)
    }catch(e){
        return null
    }
}


export const getTransactions = async () => {
    try{
        return http.get(`${adminUrl}/transactions`)
    }catch(e){
        return null
    }
}


export const getAdmins = async () => {
    try{
        return http.get(`${adminUrl}/admins`)
    }catch(e){
        return null
    }
}
