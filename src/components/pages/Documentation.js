import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Table, Button, Input, UncontrolledAlert } from "reactstrap";
import { useUser } from "../../context/userContext";
import { useAppState } from '../../context/appContext'
import { parseDataPlans } from '../../utils'

import { saveCallback, saveWebhook } from '../../services/dataService'

// import FullLayout from "../../layouts/FullLayout";
// import tableData from "../../utils/plansTable";

const docs = "https://documenter.getpostman.com/view/17453703/UVksMZmU";

const Documentation = () => {
  const { user } = useUser();
  const { plans } =  useAppState()

  const [loading, setLoading] = useState(false)
  const [webhook, setWebhook] = useState()
  const [callback, setCallback] = useState()

  useEffect(() => {
    setWebhook(user?.webhook)
    setCallback(user?.callback)
  }, [user])

  const tableData = parseDataPlans(plans)

  const handleSaveWebhook = () => {
    saveWebhook(webhook || " ")
    showNotice()
  }
  
  const handleSaveCallback = () => {
    saveCallback(callback || " ")
    showNotice()
  }

  const showNotice = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
      <div>
        <>
          {loading && (
              <UncontrolledAlert dismissible color="success">
              Updated Successfully
              </UncontrolledAlert>
  
          )}
        </>
        <a href={docs} target="_blank" rel="noreferrer">
          <Button color="primary" className="mb-3 px-3">
            API Documentation
          </Button>
        </a>
        <div className="mb-2">
          <b>Authorization Token:</b>
          <div className="text-muted p-3">
            {user?.access_token}
            <Button
                color="info"
                style={{padding: ".2em .4em", marginLeft: ".8em"}}
                onClick={() => {navigator.clipboard.writeText(user?.access_token)}}
                >
                Click to Copy
            </Button> 
          </div>
        </div>

        {/* Webhook URL */}
        <div className="mb-2">
          <b>Webhook URL:</b>
          <div className="text-muted p-3 d-flex align-items-center flex-column flex-lg-row">
            <Input
              value={webhook}
              id="webhook"
              name="webhook"
              onChange={(e) => setWebhook(e.target.value)}
              type="text"
              style={{width: "280px", margin: "0 .8rem"}}
            />

            <Button
              color="info"
              style={{padding: ".2em 2.2em", margin: ".8em 0"}}
              onClick={handleSaveWebhook}
            >
              Save
            </Button>{" "}
          </div>
        </div>

        {/* Callback URL */}
        <div className="mb-2">
          <b>Callback URL:</b>
          <div className="text-muted p-3 d-flex align-items-center flex-column flex-lg-row">
            <Input
              value={callback}
              id="callback"
              name="callback"
              onChange={(e) => setCallback(e.target.value)}
              type="text"
              style={{width: "280px", margin: "0 .8rem"}}
            />

            <Button
              color="info"
              style={{padding: ".2em 2.2em", margin: ".8em 0"}}
              onClick={handleSaveCallback}
            >
              Save
            </Button>{" "}
          </div>
        </div>

        <Card>
          <CardBody>
            <CardTitle className="text-center" tag="h5">
              Data List
            </CardTitle>

            <Table
              striped
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  <th>Data ID</th>
                  <th>Network</th>
                  <th>Plan Type</th>
                  {/* <th>Amount</th> */}
                  <th>Size </th>
                  <th>Validity</th>
                </tr>
              </thead>
              <tbody>
                {tableData
                  .sort((a, b) => a['network'].localeCompare(b['network']))
                  .sort((a,b) => a['plan_type'].localeCompare(b['plan_type']))
                  .map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center py-2">
                        <h6 className="mb-0">{tdata.dataId}</h6>
                      </div>
                    </td>
                    <td>{tdata.network}</td>
                    <td>{tdata.plan_type.toUpperCase()}</td>
                    {/* <td>{tdata.amount}</td> */}
                    <td>{tdata.size}</td>
                    <td>{tdata.duration}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
  );
};

export default Documentation;
