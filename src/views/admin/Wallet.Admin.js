import React from "react";
import { Card, CardBody, CardTitle, Table, CardSubtitle } from "reactstrap";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from '../../context/adminContext'


const Wallet = () => {
  const { wallet } = useAdmin()
  console.log(wallet)
  return (
    <AdminLayout>
      <div>
        <Card>
          <CardBody>
            <CardTitle className="text-center" tag="h5">
              Wallet Balances
            </CardTitle>
            {/*      <CardSubtitle
              className="mb-2 d-block text-danger text-center"
              tag="small"
            >
              MTN Gifting Data Plans are unavailable for now!
            </CardSubtitle> */}

            <Table
              striped
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  <th>Business ID</th>
                  <th>Cash</th>
                  <th>MTN:SME</th>
                  <th>MTN:Gifting</th>
                  <th>Airtel</th>
                  <th>Glo</th>
                </tr>
              </thead>
              <tbody>
                {wallet.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center py-2">
                        <h6 className="mb-0">{tdata.business}</h6>
                      </div>
                    </td>
                    <td>{`${tdata.wallet_balance}`.split('.')[0]}</td>
                    <td>{tdata.mega_wallet.mtn_sme}</td>
                    <td>{tdata.mega_wallet.mtn_gifting}</td>
                    <td>{tdata.mega_wallet.airtel}</td>
                    <td>{tdata.mega_wallet.glo}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Wallet;
