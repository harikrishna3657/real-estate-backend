const express = require("express");
const Property = require("../models/Property");
const router = express.Router();

const handleError = (res, message) => {
  res.status(500).json({ message });
};

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch {
    handleError(res, "Error retrieving properties");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    property ? res.json(property) : res.status(404).json({ message: "Property not found" });
  } catch {
    handleError(res, "Error retrieving property");
  }
});

router.post("/", async (req, res) => {
  const { title, price, location, description, contact } = req.body;
  if (!title || !price || !location || !contact) {
    return res.status(400).json({ message: "Required fields: title, price, location, contact" });
  }

  try {
    const newProperty = await Property.create({ title, price, location, description, contact });
    res.status(201).json(newProperty);
  } catch {
    handleError(res, "Error adding property");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updatedProperty ? res.json(updatedProperty) : res.status(404).json({ message: "Property not found" });
  } catch {
    handleError(res, "Error updating property");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    deletedProperty ? res.json({ message: "Property deleted" }) : res.status(404).json({ message: "Property not found" });
  } catch {
    handleError(res, "Error deleting property");
  }
});

module.exports = router;
