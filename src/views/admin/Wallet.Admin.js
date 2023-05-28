import React from "react";
import { Card, CardBody, CardTitle, Table, CardSubtitle } from "reactstrap";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from "../../context/adminContext";

const Wallet = () => {
  const { wallet } = useAdmin();
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
                  <th>S/N</th>
                  <th>Business ID</th>
                  <th>Business Name</th>
                  <th>Cash (₦)</th>
                  <th>Walet Balance (GB)</th>
                  <th>MTN:SME (GB)</th>
                  <th>MTN:Gifting (GB)</th>
                  <th>Airtel (GB)</th>
                  <th>Glo (GB)</th>
                  <th>9Mobile (GB)</th>
                </tr>
              </thead>
              <tbody>
                {wallet.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>{index}</td>
                    <td>
                      <div className="d-flex align-items-center py-2">
                        <h6 className="mb-0">{tdata.business?._id}</h6>
                      </div>
                    </td>
                    <td>{tdata.business?.name}</td>
                    <td>{tdata.data_volume}</td>
                    <td>{`${tdata.wallet_balance}`.split(".")[0]}</td>
                    <td>{tdata.mega_wallet.mtn_sme/1000}</td>
                    <td>{tdata.mega_wallet.mtn_gifting/1000}</td>
                    <td>{tdata.mega_wallet.airtel/1000}</td>
                    <td>{tdata.mega_wallet.glo/1000}</td>
                    <td>{tdata.mega_wallet["9mobile"]/1000}</td>
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
