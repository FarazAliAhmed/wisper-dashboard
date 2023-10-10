import http from "./httpService";
import { apiUrl, apiUrlV2, adminUrl } from "../config.js";

export async function getAllPlans() {
  try {
    const res = await http.get(`${apiUrl}/plans`);
    // console.log(res)
    return res;
  } catch (error) {
    return null;
  }
}

export async function getAllPlansUser(userId) {
  try {
    const res = await http.get(`${adminUrl}/plans_user/${userId}`);
    console.log("plans user", res);
    return res;
  } catch (error) {
    return null;
  }
}
export async function getCustomerName(phone) {
  try {
    console.log("plans user", phone);

    const res = await http.get(`${apiUrl}/store-fronts-phone/${phone}`);
    return res;
  } catch (error) {
    return null;
  }
}
export async function getBalance() {
  try {
    const res = await http.get(`${apiUrl}/balance`);
    return res;
  } catch (error) {
    return null;
  }
}

export async function checkUsername(username) {
  try {
    const res = await http.get(`${apiUrl}/check-store-username/${username}`);
    return res;
  } catch (error) {
    return null;
  }
}

export async function getSFTransactionsTable(business_id) {
  try {
    const res = await http.get(`${apiUrl}/store-fronts-history/${business_id}`);
    return res;
  } catch (error) {
    return null;
  }
}

export async function getSFAnalysis(business_id) {
  try {
    const res = await http.get(
      `${apiUrl}/store-fronts/analysis/${business_id}`
    );
    console.log(res);
    return res;
  } catch (error) {
    return null;
  }
}

// export async function getSFTransactionsTable(business_id) {
//   try {
//     const res = await http.get(`${apiUrl}/store-fronts-all-history/${business_id}`);
//     return res;
//   } catch (error) {
//     return null;
//   }
// }

export async function allocateData(body, apiKey) {
  const headers = { "x-api-key": apiKey };

  // console.log("body", body);
  const payload = {
    network: body.network,
    plan_id: body.plan_id,
    phone_number: body.phone_number,
    allocate_for_business: body.allocate_for_business,
    business_id: body.business_id,
    price: body.price,
    volume: body.volume,
  };

  const res = await http.post(`${apiUrl}/buy`, payload, { headers });
  return res;
}

export async function allocateSFData(body) {
  console.log(body, "fluter");
  const res = await http.post(`${apiUrl}/store-fronts/allocateData`, body);
  return res;
}

export async function uploadImage(body) {
  const res = await http.post(`${apiUrl}/store-fronts-upload`, body);
  return res;
}

export async function updateMegaPrice(body, apiKey) {
  const headers = { "x-api-key": apiKey };

  // console.log("body", body);
  const payload = {
    business_id: body.business_id,
    mtn_sme: body.mtn_sme,
    mtn_gifting: body.mtn_gifting,
    airtel: body.airtel,
    "9mobile": body["9mobile"],
    glo: body.glo,
  };
  const res = await http.post(`${apiUrl}/editMegaPrice`, payload, { headers });
  return res;
}

export async function purchaseMegaPrice(body, apiKey) {
  const headers = { "x-api-key": apiKey };

  // console.log("body", body);
  const payload = {
    business_id: body.business_id,
    network: body.network,
    amountInGB: body.amountInGB,
  };
  const res = await http.post(
    `${apiUrl}/purchaseMegaData
`,
    payload,
    { headers }
  );
  return res;
}

export async function allocateAgentsPrice(body, apiKey) {
  const headers = { "x-api-key": apiKey };

  // console.log("body", body);
  // const payload = {
  //   business_id: body.business_id,
  //   network: body.network,
  //   amountInGB: body.amountInGB,
  // };
  const res = await http.post(
    `${apiUrl}/subdealer/allocateData
`,
    body,
    { headers }
  );
  return res;
}

export async function updateStoreFront(body, apiKey) {
  const headers = { "x-api-key": apiKey };

  // console.log("body", body);
  // const payload = {
  //   business_id: body.business_id,
  //   network: body.network,
  //   amountInGB: body.amountInGB,
  // };
  const res = await http.put(
    `${apiUrl}/store-fronts/${body.id}
`,
    body,
    { headers }
  );
  return res;
}

export async function updateSellingPrice(body, apiKey) {
  const headers = { "x-api-key": apiKey };

  // console.log("body", body);
  // const payload = {
  //   business_id: body.business_id,
  //   network: body.network,
  //   amountInGB: body.amountInGB,
  // };

  const { id, ...rest } = body;
  console.log(rest);
  const res = await http.post(`${apiUrl}/admin/update_selling/${id}`, rest, {
    headers,
  });
  return res;
}

export async function getUserMegaPrice(id) {
  try {
    const res = await http.get(`${apiUrl}/getMegaPriceUser/${id}`);
    // console.log(res, "jj1");
    return res;
  } catch (error) {
    return null;
  }
}

export async function getStoreFront(id) {
  try {
    const res = await http.get(`${apiUrl}/store-fronts/${id}`);
    // console.log(res, "jj1");
    console.log("ssf", res);

    return res;
  } catch (error) {
    return null;
  }
}

export async function getUsernameStoreFront(username) {
  try {
    const res = await http.get(`${apiUrl}/store-fronts-username/${username}`);
    // console.log(res, "jj1");
    console.log("ssf", res);

    return res;
  } catch (error) {
    return null;
  }
}

export async function getAllTransactions() {
  try {
    const res = await http.get(`${apiUrl}/transactions`);
    return res;
  } catch (error) {
    return null;
  }
}

export async function getMegaMaintenance() {
  try {
    const res = await http.get(`${apiUrl}/admin/getMegaMaintenance`);
    return res;
  } catch (error) {
    return null;
  }
}

export async function getSingleTrx(id) {
  try {
    const res = await http.get(`${apiUrl}/trxSingle/${id}`);
    return res;
  } catch (error) {
    return null;
  }
}

export async function getSingleSold(id) {
  try {
    const res = await http.get(`${apiUrl}/totalDataSingle/${id}`);
    return res;
  } catch (error) {
    return null;
  }
}

export async function getAllTransactionsV2(
  { limit, offset } = { limit: 50, offset: 0 }
) {
  try {
    const transactions = await http.get(
      `${apiUrlV2}/transactions?limit=${limit}&offset=${offset}`
    );
    // console.log({ transactions });
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function FilterTransactionsV2(
  filter,
  { limit, offset } = { limit: 50, offset: 0 }
) {
  try {
    const transactions = await http.post(
      `${apiUrlV2}/transactions/filter?limit=${limit}&offset=${offset}`,
      filter
    );
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getMegaPurchaseTransactions(
  { limit, offset, userId } = { limit: 50, offset: 0 }
) {
  try {
    const transactions = await http.get(
      `${apiUrl}/getMegaHistory/${userId}?limit=${limit}`
    );
    // console.log(limit, "trans56");
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function PurchaseMegaPriceTransactions(
  filter,
  { limit, offset, userId } = { limit: 50, offset: 0 }
) {
  try {
    const transactions = await http.get(
      `${apiUrl}/getMegaHistory/${userId}?limit=${limit}`
    );
    // console.log(transactions, "moni");
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getAgents({ userId }) {
  try {
    const subDealer = await http.get(
      `${apiUrl}/subdealer/getAllSubdealersId/${userId}`
    );
    console.log(subDealer, "sub");
    return subDealer.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getAgentsInfo({ userId }) {
  try {
    const subDealer = await http.get(
      `${apiUrl}/subdealer/getSubdealersInfo/${userId}`
    );
    console.log(subDealer, "subInfo");
    return subDealer.data;
  } catch (error) {
    return { data: {} };
  }
}

export async function getAgentsTransactions({ userId }) {
  try {
    const subDealer = await http.get(`${apiUrl}/subdealer/allTrx/${userId}`);
    console.log(subDealer, "subInfoTrans");
    return subDealer.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getMonifyTransactions(
  { limit, offset, userId } = { limit: 50, offset: 0 }
) {
  try {
    const transactions = await http.get(
      `${apiUrl}/getMonnifyTrx/${userId}?limit=${limit}`
    );
    // console.log(transactions, "moni");
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function PurchaseMonifyTransactions(
  filter,
  { limit, offset, userId } = { limit: 50, offset: 0 }
) {
  try {
    const transactions = await http.get(
      `${apiUrl}/getMonnifyTrx/${userId}?limit=${limit}`
    );
    // console.log(transactions, "monify");
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function AgentsAllocationTransactions(
  { limit, offset, userId } = { limit: 50, offset: 0 }
) {
  try {
    console.log(userId, "ooo882");

    const transactions = await http.get(
      `${apiUrl}/subdealer/getSubdealerHistory/${userId}?limit=${limit}`
    );
    console.log(transactions, "ooo");
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function AllAgentsAllocationTransactions(
  { limit, offset, userId } = { limit: 50, offset: 0 }
) {
  try {
    console.log(userId, "ooo882");

    const transactions = await http.get(
      `${apiUrl}/subdealer/DealerGetHistory/${userId}?limit=${limit}`
    );
    console.log(transactions, "ooosubi");
    return transactions.data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getAllPayments() {
  try {
    const res = await http.get(`${apiUrl}/payments`);
    return res;
  } catch (error) {
    return null;
  }
}

export async function addPayment(payment) {
  try {
    const res = await http.post(`${apiUrl}/payments`, payment);
    return res;
  } catch (error) {
    return null;
  }
}

export async function getMaintenance() {
  try {
    const res = await http.get(`${apiUrl}/maintenance`);
    return res;
  } catch (e) {
    return null;
  }
}

export async function saveWebhook(webhook = " ") {
  try {
    const res = await http.post(`${apiUrl}/url/webhook`, { url: webhook });
    return res;
  } catch (e) {
    return null;
  }
}

export async function saveCallback(callback = " ") {
  try {
    const res = await http.post(`${apiUrl}/url/callback`, { url: callback });
    return res;
  } catch (e) {
    return null;
  }
}
