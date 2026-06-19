const mongoose = require("mongoose");
require("./config/db");
const Admin = require("./models/Admin");
const Donor = require("./models/Donor");

async function checkUsers() {
  try {
    const admins = await Admin.find({});
    const donors = await Donor.find({});
    
    console.log("\n=== ADMINS ===");
    console.log("Count:", admins.length);
    admins.forEach(a => {
      console.log(`Email: ${a.email}, Password: ${a.password}, Name: ${a.name}`);
    });
    
    console.log("\n=== DONORS ===");
    console.log("Count:", donors.length);
    donors.forEach(d => {
      console.log(`Email: ${d.email}, Password: ${d.password}, Name: ${d.name}, Approved: ${d.approved}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

checkUsers();
