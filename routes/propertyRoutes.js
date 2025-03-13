const express = require("express");
const Property = require("../models/Property");
const router = express.Router();

const handleError = (res, error, customMessage = "Server error") => {
  console.error(error);
  return res.status(500).json({ message: customMessage, error: error.message });
};

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    handleError(res, error, "Failed to retrieve properties");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    handleError(res, error, "Failed to retrieve property");
  }
});

router.post("/", async (req, res) => {
  const { title, price, location, description, contact } = req.body;

  if (!title || !price || !location || !contact) {
    return res
      .status(400)
      .json({ message: "Title, price, location, and contact are required" });
  }

  try {
    const newProperty = new Property({
      title,
      price,
      location,
      description,
      contact,
    });
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    handleError(res, error, "Failed to add property");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(updatedProperty);
  } catch (error) {
    handleError(res, error, "Failed to update property");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    handleError(res, error, "Failed to delete property");
  }
});

module.exports = router;
