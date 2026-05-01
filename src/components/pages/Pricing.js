import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { parseDataPlans } from "../../utils";
import { useAppState } from "../../context/appContext";
import { useUser } from "../../context/userContext";
import packImg from "../../assets/images/users/packages.svg";
import axios from "axios";
import { adminUrl } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pricing = () => {
  const { plansUser, plans } = useAppState();
  const [tableDataAll, setTableDataAll] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (user?.isAdmin) {
      setTableDataAll(plans);
    } else {
      setTableDataAll(plansUser);
    }
  }, [user, plans, plansUser]);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setEditPrice(plan.price);
    toggleEditModal();
  };

  const handleDelete = (plan) => {
    setSelectedPlan(plan);
    toggleDeleteModal();
  };

  const updatePlan = async () => {
    if (!editPrice || editPrice <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setLoading(true);
    try {
      const jwtToken = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

      await axios.put(
        `${adminUrl}/plans_user/${user._id}/${selectedPlan.plan_id}`,
        { price: Number(editPrice) }
      );

      toast.success("Plan updated successfully!");
      toggleEditModal();
      
      // Refresh the page to show updated data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error updating plan:", error);
      toast.error("Failed to update plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async () => {
    setLoading(true);
    try {
      const jwtToken = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

      await axios.delete(
        `${adminUrl}/plans_user/${user._id}/${selectedPlan.plan_id}`,
        { data: { planId: selectedPlan.plan_id } }
      );

      toast.success("Plan deleted successfully!");
      toggleDeleteModal();
      
      // Refresh the page to show updated data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error("Failed to delete plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Card>
        <CardBody>
          <CardTitle className="text-center" tag="h5">
            Data Plans and Pricing
          </CardTitle>

          <Table
            striped
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
          >
            <thead>
              {plansUser.length !== 0 && (
                <tr>
                  <th>Network</th>
                  <th>Size</th>
                  <th>Validity</th>
                  {!user?.isAdmin && <th>Price (₦)</th>}
                  {!user?.isAdmin && <th>Actions</th>}
                </tr>
              )}
            </thead>
            <tbody>
              {tableDataAll
                ?.sort((a, b) => a["network"].localeCompare(b["network"]))
                .map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>{tdata.network.toUpperCase()}</td>
                    <td>
                      {tdata.size ||
                        `${tdata.volume}${tdata.unit?.toUpperCase()}`}
                    </td>
                    <td>{tdata.validity}</td>
                    {!user?.isAdmin && <td>₦{tdata.price}</td>}
                    {!user?.isAdmin && (
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(tdata)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(tdata)}
                        >
                          Delete
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
          {plansUser.length === 0 && (
            <div className="col-12 flex text-center px-4 pb-4">
              <img src={packImg} style={{ width: "200px" }} alt="packages" />

              <h5 className="mb-4">
                Apologies for any confusion. We are currently in the process of
                setting up data pricing for your account. Please check back
                shortly for the updated pricing information. Thank you for your
                patience.
              </h5>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Plan Price</ModalHeader>
        <ModalBody>
          {selectedPlan && (
            <Form>
              <FormGroup>
                <Label>Network</Label>
                <Input
                  type="text"
                  value={selectedPlan.network.toUpperCase()}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label>Size</Label>
                <Input
                  type="text"
                  value={
                    selectedPlan.size ||
                    `${selectedPlan.volume}${selectedPlan.unit?.toUpperCase()}`
                  }
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label>Validity</Label>
                <Input
                  type="text"
                  value={selectedPlan.validity}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label>Price (₦)</Label>
                <Input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="Enter new price"
                />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={updatePlan} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete Plan</ModalHeader>
        <ModalBody>
          {selectedPlan && (
            <div>
              <p>Are you sure you want to delete this plan?</p>
              <p>
                <strong>Network:</strong> {selectedPlan.network.toUpperCase()}
              </p>
              <p>
                <strong>Size:</strong>{" "}
                {selectedPlan.size ||
                  `${selectedPlan.volume}${selectedPlan.unit?.toUpperCase()}`}
              </p>
              <p>
                <strong>Price:</strong> ₦{selectedPlan.price}
              </p>
              <p className="text-danger">
                <strong>Warning:</strong> This action cannot be undone!
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
          <Button color="danger" onClick={deletePlan} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Pricing;
