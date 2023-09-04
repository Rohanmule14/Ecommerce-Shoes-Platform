import Order from "../models/ordersModel.js";

class orderDataController {
  static orderData = async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, {
      Order_date: req.body.order_date,
    });
    let eId = await Order.findOne({ email: req.body.email });
    console.log(eId);
    if (eId === null) {
      try {
        await Order.create({
          email: req.body.email,
          order_data: [data],
        }).then(() => {
          res.json({ success: true });
        });
      } catch (error) {
        console.log(error.message);
        res.send({ message: error.message });
      }
    } else {
      try {
        await Order.findOneAndUpdate(
          { email: req.body.email },
          {
            $push: {
              order_data: [data],
            },
          }
        ).then(() => {
          res.json({ success: true });
        });
      } catch (error) {
        console.log(error.message);
        res.send({ message: error.message });
      }
    }
  };
}
export default orderDataController;
