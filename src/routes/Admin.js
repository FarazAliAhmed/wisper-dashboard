import React, {Suspense, lazy} from 'react'
import {Route} from 'react-router-dom'
import AdminProvider from '../context/adminContext'

const Dashboard = lazy(() => import('../views/admin/Dashboard.Admin'))
const Allocate = lazy(() => import('../views/admin/AllocateData.Admin'))
const Business = lazy(() => import('../views/admin/Business.Admin'))
const Payments = lazy(() => import('../views/admin/Payments.Admin'))
const Pricing = lazy(() => import('../views/admin/Pricing.Admin'))
const Transactions = lazy(() => import('../views/admin/Transactions.Admin'))
const Wallet = lazy(() => import('../views/admin/Wallet.Admin'))
const Account = lazy(() => import('../views/admin/Account.Admin'))


const AdminRoutes = () => {
    return (
        <>
            <AdminProvider>
                <Route exact path='/admin' component={Dashboard}/>
                <Route path='/admin/business' component={Business} />
                <Route path='/admin/allocate' component={Allocate} />
                <Route path='/admin/payment' component={Payments} />
                <Route path='/admin/pricing' component={Pricing} />
                <Route path='/admin/wallet' component={Wallet} />
                <Route path='/admin/transaction' component={Transactions} />
                <Route path='/admin/account' component={Account} />
            </AdminProvider>
        </>
    )
}

export default AdminRoutes