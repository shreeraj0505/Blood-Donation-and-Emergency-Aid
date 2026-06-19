const mongoose = require('mongoose');
require('./config/db');
const Admin = require('./models/Admin');

const defaultAdmin = {
  email: 'admin@bloodbank.com',
  password: 'admin123',
  name: 'System Admin',
  role: 'admin'
};

async function seedAdmin() {
  try {
    // Check if admin already exists
    const existing = await Admin.findOne({ email: defaultAdmin.email });
    
    if (existing) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }
    
    const admin = new Admin(defaultAdmin);
    await admin.save();
    
    console.log('✅ Default admin created successfully!');
    console.log('Email:', defaultAdmin.email);
    console.log('Password:', defaultAdmin.password);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

seedAdmin();
