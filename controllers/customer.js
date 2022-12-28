import Customer from "../models/Customer.js";

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const customers = await Customer.findById(req.params.id);
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

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

export const deleteCustomer = async (req, res, next) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedCustomer);
  } catch (error) {
    next(error);
  }
};
