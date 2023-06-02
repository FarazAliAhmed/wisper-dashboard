import React from "react";
import AdminLayout from '../../layouts/AdminLayout'
// import _Pricing from '../../components/pages/Pricing'
import PricingUserAdmin from "../../components/pages/PricingUserAdmin";
import { useParams } from 'react-router-dom';

const Pricing = () => {
  const { id } = useParams();


  return (
    <AdminLayout>
      <PricingUserAdmin businessId={id} />
    </AdminLayout>
  );
};

export default Pricing;
