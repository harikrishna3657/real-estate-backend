const Property = require("../models/Property");

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const addProperty = async (req, res) => {
  const { title, price, location, description } = req.body;

  try {
    const newProperty = new Property({ title, price, location, description });
    await newProperty.save();
    res.status(201).json({ message: "Property added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

module.exports = { getProperties, addProperty };
