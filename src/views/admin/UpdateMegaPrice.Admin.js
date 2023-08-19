import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
// import _Pricing from '../../components/pages/Pricing'
import { useParams } from "react-router-dom";
import UpdateMegaPrice from "../../components/pages/UpdateMegaPriceAdmin";

const Pricing = () => {
  const { id } = useParams();

  return (
    <AdminLayout>
      <UpdateMegaPrice userId={id} />
    </AdminLayout>
  );
};

export default Pricing;
