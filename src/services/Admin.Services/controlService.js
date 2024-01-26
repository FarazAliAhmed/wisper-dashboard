import http from "../httpService";
import { adminUrl } from "../../config";
import { plan_types } from "../../utils";
import { toast } from "react-toastify";

// check the userContext and dataService for the implementation of this functiion
export const getMaintenance = async () => {
  return null;
};

export const setMaintenanceNotice = async (message) => {
  try {
    const resp = await http.post(`${adminUrl}/maintenance/notice`, { message });
    return resp.data;
  } catch (e) {
    return null;
  }
};

export const clearMaintenanceNotice = async () => {
  try {
    const resp = await http.get(`${adminUrl}/maintenance/clear`);
    return resp.data;
  } catch (e) {
    return null;
  }
};

export const enterNetworkMaintenance = async (plan_type) => {
  if (!plan_types.includes(plan_type)) return null;

  try {
    const resp = await http.patch(`${adminUrl}/maintenance/enter/${plan_type}`);
    return resp.data;
  } catch (e) {
    return null;
  }
};

export const exitNetworkMaintenance = async (plan_type) => {
  if (!plan_types.includes(plan_type)) return null;

  try {
    const resp = await http.patch(`${adminUrl}/maintenance/exit/${plan_type}`);
    return resp.data;
  } catch (e) {
    return null;
  }
};

export const enterMegaNetworkMaintenance = async (plan_type) => {
  if (!plan_types.includes(plan_type)) return null;

  try {
    const resp = await http.post(
      `${adminUrl}/megaMaintenance/enter/${plan_type}`
    );
    // toast.success("maintenance entered");

    return resp.data;
  } catch (e) {
    // toast.error("error entering maintenance");

    return null;
  }
};

export const exitMegaNetworkMaintenance = async (plan_type) => {
  if (!plan_types.includes(plan_type)) return null;

  try {
    const resp = await http.post(
      `${adminUrl}/megaMaintenance/exit/${plan_type}`
    );
    // toast.success("maintenance exited");
    return resp.data;
  } catch (e) {
    // toast.error("error exiting maintenance");

    return null;
  }
};

export const enterAirtimeNetworkMaintenance = async (plan_type) => {
  // if (!plan_types.includes(plan_type)) return null;

  try {
    const resp = await http.post(
      `${adminUrl}/airtimeMaintenance/enter/${plan_type}`
    );
    // toast.success("maintenance entered");
    return resp.data;
  } catch (e) {
    // toast.error("error entering maintenance");
    // return null;
  }
};

export const exitAirtimeNetworkMaintenance = async (plan_type) => {
  // if (!plan_types.includes(plan_type)) return null;

  try {
    const resp = await http.post(
      `${adminUrl}/airtimeMaintenance/exit/${plan_type}`
    );
    // toast.success("maintenance exited");
    return resp.data;
  } catch (e) {
    // toast.error("error exiting maintenance");

    return null;
  }
};

export async function getAirtimeMaintenance() {
  try {
    const res = await http.get(`${adminUrl}/getAirtimeMaintenance`);
    return res;
  } catch (error) {
    return null;
  }
}

export async function getSFMaintenance() {
  try {
    const res = await http.get(`${adminUrl}/getSFMaintenance`);
    return res;
  } catch (error) {
    return null;
  }
}

export const enterSFNetworkMaintenance = async (feature) => {
  // if (!plan_types.includes(plan_type)) return null;

  try {
    const resp = await http.post(`${adminUrl}/sFMaintenance/enter/${feature}`);
    // toast.success("maintenance entered");
    return resp.data;
  } catch (e) {
    // toast.error("error entering maintenance");
    // return null;
  }
};

export const exitSFNetworkMaintenance = async (feature) => {
  // if (!plan_types.includes(plan_type)) return null;

  try {
    const resp = await http.post(`${adminUrl}/sFMaintenance/exit/${feature}`);
    // toast.success("maintenance exited");
    return resp.data;
  } catch (e) {
    // toast.error("error exiting maintenance");

    return null;
  }
};
