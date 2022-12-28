import Customer from "../models/Customer.js";

export const createCustomer = async (req, res, next) => {
  try {
    const savedCustomer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      profilePic: req.body.profilePic,
    });
    await savedCustomer.save();
    res.status(200).json(savedCustomer);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};
