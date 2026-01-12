import { AlertDispatcher } from "./alert.dispatcher.js";

export const AlertService = {
  async priceChanged({ oldPrice, newPrice, productId }) {
    if (oldPrice === newPrice) return;

    const changePercent =
      ((newPrice - oldPrice) / oldPrice) * 100;

    const type =
      changePercent > 0
        ? "PRICE_INCREASE"
        : "PRICE_DECREASE";

    await AlertDispatcher.dispatch({
      type,
      productId,
      oldPrice,
      newPrice,
      changePercent: Number(changePercent.toFixed(2)),
      timestamp: new Date(),
    });
  },

  async inventoryChanged({ productId, stock }) {
    const type =
      stock === 0 ? "OUT_OF_STOCK" : "LOW_STOCK";

    await AlertDispatcher.dispatch({
      type,
      productId,
      stock,
      timestamp: new Date(),
    });
  },
};