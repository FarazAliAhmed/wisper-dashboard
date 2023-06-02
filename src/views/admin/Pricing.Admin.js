import React from "react";
import AdminLayout from '../../layouts/AdminLayout'
// import _Pricing from '../../components/pages/Pricing'
import PricingUser from "../../components/pages/PricingUser";
import { useParams } from 'react-router-dom';

const Pricing = () => {
  const { id } = useParams();


  return (
    <AdminLayout>
      <PricingUser businessId={id} />
    </AdminLayout>
  );
};

export default Pricing;
