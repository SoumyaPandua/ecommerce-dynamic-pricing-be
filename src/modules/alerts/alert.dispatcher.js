import Alert from "./alert.model.js";
import { sendEmail } from "./channels/email.channel.js";
import { sendWebhook } from "./channels/webhook.channel.js";
import logger from "../../config/logger.js";

export const AlertDispatcher = {
  async dispatch(event) {
    const alerts = await Alert.find({
      enabled: true,
      type: event.type,
    });

    for (const alert of alerts) {
      try {
        if (alert.channels.includes("EMAIL")) {
          await sendEmail({
            to: alert.target,
            subject: `Alert: ${event.type}`,
            body: JSON.stringify(event, null, 2),
          });
        }

        if (alert.channels.includes("WEBHOOK")) {
          await sendWebhook(alert.target, event);
        }
      } catch (err) {
        logger.error("Alert dispatch failed", err);
      }
    }
  },
};