const mongoose = require("mongoose");
require("./config/db");
const Admin = require("./models/Admin");
const Donor = require("./models/Donor");

async function seedUsers() {
  try {
    console.log('Starting to seed users...');
    
    // Wait for connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create admin
    await Admin.deleteMany({});
    const admin = await Admin.create({
      email: "admin@test.com",
      password: "admin123",
      name: "Admin User"
    });
    console.log("✅ Admin created:");
    console.log("   Email:", admin.email);
    console.log("   Password:", admin.password);

    // Create test donor
    await Donor.deleteMany({ email: "donor@test.com" });
    const donor = await Donor.create({
      name: "Test Donor",
      email: "donor@test.com",
      password: "donor123",
      phone: "1234567890",
      bloodGroup: "O+",
      city: "Test City",
      approved: true,
      availability: true
    });
    console.log("✅ Donor created:");
    console.log("   Email:", donor.email);
    console.log("   Password:", donor.password);
    console.log("   Approved:", donor.approved);

    console.log("\n✅ Login users seeded successfully!");
    console.log("\nTest with:");
    console.log("Admin - Email: admin@test.com, Password: admin123");
    console.log("Donor - Email: donor@test.com, Password: donor123");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seedUsers();
