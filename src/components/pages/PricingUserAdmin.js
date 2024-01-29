import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table, CardSubtitle } from "reactstrap";
import { parseDataPlans } from "../../utils";
import { useAppState } from "../../context/appContext";

import tableData, { tableDataWhole } from "../../utils/plansTable";
import { getSingleBusiness } from "../../services/Admin.Services/businessService";
import { adminUrl, apiUrl } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PricingUser = ({ businessId }) => {
  const jwtToken = localStorage.getItem("token");

  // const { user } = useUser();
  const { plans } = useAppState();
  const tableDataAll = parseDataPlans(plans);

  const [business, setBusiness] = useState({});
  const [userPlans, setUserPlans] = useState([]);

  const [newPrice, setNewPrice] = useState();

  useEffect(() => {
    async function fetchBusinessDetails() {
      const res = await getSingleBusiness(businessId);
      setBusiness({ ...res.data.business, balance: { ...res.data.balance } });
    }
    fetchBusinessDetails();
  }, [businessId]);

  useEffect(() => {
    const getPlansByUserId = async () => {
      try {
        const response = await axios.get(
          `${adminUrl}/plans_user/${businessId}`
        );
        setUserPlans(response?.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };

    getPlansByUserId();
  }, [businessId]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  }, [jwtToken]);

  const createPlanUser = async (
    plan_id,
    network,
    plan_type,
    price,
    volume,
    unit,
    validity
  ) => {
    try {
      const newPlan = {
        plan_id,
        network,
        plan_type,
        price: price || 0,
        volume,
        unit,
        validity,
      };

      const response = await axios.post(
        `${adminUrl}/plans_user/${businessId}`,
        newPlan
      );

      toast.success("Plan Created!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      window.location.reload();
    } catch (error) {
      toast.error("Error Occured Try Again!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      // console.error('Error:', error.response.data.error);
    }
  };

  // Update a plan for a user
  const updatePlanUser = async (planId, price, dataId) => {
    try {
      const newPlan = {
        price,
      };

      const response = await axios.put(
        `${adminUrl}/plans_user/${businessId}/${planId}`,
        newPlan
      );

      document.getElementById(`myInput${dataId}`).value = "";

      toast.info("Price Updated", {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.location.reload();
    } catch (error) {
      document.getElementById(`myInput${dataId}`).value = "";
      // console.error('Error:', error.response.data.error);

      toast.error("Error Occured Try Again!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <Card>
        <ToastContainer />
        <CardBody>
          <CardTitle className="text-center" tag="h5">
            {business?.name && <>Packages for {business?.name} </>}
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
                {/* <th>Price</th> */}
                {/* <th>Amount</th> */}

                <th>Network</th>
                <th>Size </th>
                <th>Price (₦)</th>
                <th>Validity</th>
                {/* <th>Plan Type</th> */}
                <th>Set Amount</th>

                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {tableDataAll
                .sort((a, b) => a["network"].localeCompare(b["network"]))
                .map((tdata, index) => (
                  <tr key={index} className="border-top">
                    {/* <td>
                    <div className="d-flex align-items-center py-2">
                    <h6 className="mb-0">{tdata.amount}</h6>
                    </div>
                </td> */}
                    {/* <td>{tdata.amount}</td> */}
                    <td>{tdata.network.toUpperCase()}</td>
                    <td>{tdata.size}</td>

                    {userPlans && (
                      <td>
                        {(() => {
                          const matchingPlan = userPlans.find(
                            (obj) => obj.plan_id === tdata.dataId
                          );
                          if (matchingPlan) {
                            const price = matchingPlan.price;
                            return "₦" + price;
                          } else {
                            return 0;
                          }
                        })()}
                      </td>
                    )}

                    <td>{tdata.duration}</td>
                    {/* <td>{tdata.plan_type.toUpperCase()}</td> */}

                    {userPlans.find((obj) => obj.plan_id == tdata.dataId) ? (
                      <td>
                        <input
                          type="text"
                          id={`myInput${tdata.dataId}`}
                          onChange={(e) => setNewPrice(e.target.value)}
                        />
                      </td>
                    ) : (
                      <td>Create A Plan To Update</td>
                    )}

                    {userPlans && (
                      <td>
                        {(() => {
                          const matchingPlan = userPlans.find(
                            (obj) => obj.plan_id === tdata.dataId
                          );
                          if (matchingPlan) {
                            return (
                              <td>
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    updatePlanUser(
                                      matchingPlan.plan_id,
                                      newPrice,
                                      tdata.dataId
                                    );
                                  }}
                                >
                                  <button
                                    type="submit"
                                    style={{
                                      border: "none",
                                      color: "white",
                                      borderRadius: "8px",
                                      padding: "0.5rem",
                                      background: "purple",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Update Plan
                                  </button>
                                </form>
                              </td>
                            );
                          } else {
                            return (
                              <td>
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    createPlanUser(
                                      tdata.dataId,
                                      tdata.network,
                                      tdata.plan_type,
                                      tdata.price,
                                      parseFloat(tdata.size),
                                      tdata.size.slice(-2),
                                      tdata.duration
                                    );
                                  }}
                                >
                                  <button
                                    type="submit"
                                    style={{
                                      border: "none",
                                      color: "white",
                                      borderRadius: "8px",
                                      padding: "0.5rem",
                                      background: "green",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Create Plan
                                  </button>
                                </form>
                              </td>
                            );
                          }
                        })()}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default PricingUser;
