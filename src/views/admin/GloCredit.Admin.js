import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { getAdminGloCredit } from "../../services/dataService";

const gb = (n) => `${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 3 })} GB`;
const naira = (n) => `₦${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

// GLO credit customers: GB given, consumption and outstanding bill
const GloCredit = () => {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getAdminGloCredit().then((res) => setRows(res?.data || []));
  }, []);

  const totalOwed = (rows || []).reduce((sum, r) => sum + Number(r.owed || 0), 0);

  return (
    <AdminLayout>
      <Card>
        <CardBody>
          <CardTitle className="text-center" tag="h5">
            GLO Wallets
          </CardTitle>
          <CardSubtitle className="mb-2 d-block text-muted text-center" tag="small">
            GB given on credit, GB used and outstanding bill per customer. Total outstanding: <b>{naira(totalOwed)}</b>
          </CardSubtitle>

          {rows === null ? (
            <p className="text-center mt-3">Loading...</p>
          ) : (
            <Table striped className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Rate (₦/GB)</th>
                  <th>GB Given</th>
                  <th>GB Used</th>
                  <th>Used Today</th>
                  <th>GB Left</th>
                  <th>Repaid</th>
                  <th>Outstanding Bill</th>
                  <th>Naira Wallet</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r._id} className="border-top">
                    <td>
                      <Link to={`/admin/business/${r._id}`} className="text-decoration-none">
                        <h6 className="mb-0">{r.username}</h6>
                      </Link>
                      <small className="text-muted">{r.email}</small>
                    </td>
                    <td>{naira(r.rate)}</td>
                    <td>{gb(r.allocated_gb)}</td>
                    <td>{gb(r.used_gb)}</td>
                    <td>
                      {gb(r.used_today_gb)}
                      <br />
                      <small className="text-muted">{r.orders_today} orders</small>
                    </td>
                    <td className={r.remaining_gb < 1000 ? "text-danger fw-bold" : ""}>{gb(r.remaining_gb)}</td>
                    <td>{naira(r.repaid)}</td>
                    <td className="fw-bold text-danger">{naira(r.owed)}</td>
                    <td>{naira(r.wallet_balance)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </AdminLayout>
  );
};

export default GloCredit;
