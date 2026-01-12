import Alert from "./alert.model.js";

export const AlertController = {
  async create(req, res) {
    const alert = await Alert.create(req.body);
    res.status(201).json({ success: true, data: alert });
  },

  async list(req, res) {
    const alerts = await Alert.find();
    res.json({ success: true, data: alerts });
  },
};