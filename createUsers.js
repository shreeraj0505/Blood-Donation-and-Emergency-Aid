const mongoose = require("mongoose");
require("./config/db");

setTimeout(async () => {
  try {
    const Admin = mongoose.model('Admin', new mongoose.Schema({
      email: String,
      password: String,
      name: String
    }));

    const Donor = mongoose.model('Donor', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      phone: String,
      bloodGroup: String,
      city: String,
      approved: Boolean,
      availability: Boolean
    }));

    await Admin.deleteMany({});
    await Donor.deleteMany({ email: "donor@test.com" });

    await Admin.create({
      email: "admin@test.com",
      password: "admin123",
      name: "Admin User"
    });

    await Donor.create({
      name: "Test Donor",
      email: "donor@test.com",
      password: "donor123",
      phone: "1234567890",
      bloodGroup: "O+",
      city: "Test City",
      approved: true,
      availability: true
    });

    console.log("✅ Users created successfully!");
    console.log("Admin: admin@test.com / admin123");
    console.log("Donor: donor@test.com / donor123");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}, 2000);
