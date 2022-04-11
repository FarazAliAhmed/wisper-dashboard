import React, { useContext, createContext, useState, useEffect } from 'react'
import {
    getBusinesses,
    getPayments,
    getTransactions,
    getWallets,
    getAdmins,
} from '../services/Admin.Services/businessService'
const AdminContext = createContext()

const AdminProvider = ({children}) => {
    const [business, setBusiness] = useState({
        lite: [],
        mega: []
    })
    const [wallet, setWallet] = useState([])
    const [transaction, setTransaction] = useState([])
    const [payment, setPayment] = useState([])

    useEffect(() => {
        async function loadAdmin() {
            const result = await Promise.all([
                getBusinesses(),
                getPayments(),
                getTransactions(),
                getWallets(),
                getAdmins(),
            ])
            setBusiness(result[0].data)
            setPayment(result[1].data)
            setTransaction(result[2].data)
            setWallet(result[3].data)
        }
        loadAdmin()
    }, [])
    return(
        <AdminContext.Provider value={{business, wallet, transaction, payment}}>
            {children}
        </AdminContext.Provider>
    )
}
export default AdminProvider

export const useAdmin = () => {
    return useContext(AdminContext)
}