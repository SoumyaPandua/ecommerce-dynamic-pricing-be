import fetch from "node-fetch";

export const sendWebhook = async (url, payload) => {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};