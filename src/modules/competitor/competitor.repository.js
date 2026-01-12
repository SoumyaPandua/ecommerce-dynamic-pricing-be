import CompetitorPrice from "./competitor.model.js";

export const CompetitorRepository = {
  upsert(data) {
    return CompetitorPrice.findOneAndUpdate(
      {
        productId: data.productId,
        competitor: data.competitor,
      },
      {
        ...data,
        fetchedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      }
    );
  },

  findByProduct(productId) {
    return CompetitorPrice.find({ productId });
  },

  findFreshByProduct(productId, maxAgeMinutes = 60) {
    const cutoff = new Date(
      Date.now() - maxAgeMinutes * 60 * 1000
    );

    return CompetitorPrice.find({
      productId,
      fetchedAt: { $gte: cutoff },
    });
  },
};