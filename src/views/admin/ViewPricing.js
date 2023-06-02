import React from "react";
import AdminLayout from '../../layouts/AdminLayout'
import _Pricing from '../../components/pages/Pricing'
import { useParams } from 'react-router-dom';

const ViewPricing = () => {
  

  return (
    <AdminLayout>
      <_Pricing />
    </AdminLayout>
  );
};

export default ViewPricing;
