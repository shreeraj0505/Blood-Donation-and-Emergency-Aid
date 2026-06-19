// Test data seeder - Run this to populate donors with GPS coordinates
// Usage: node seedTestDonors.js

const mongoose = require('mongoose');
require('./config/db');
const Donor = require('./models/Donor');

const testDonors = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    bloodGroup: 'O+',
    city: 'New York',
    approved: true,
    available: true,
    location: {
      type: 'Point',
      coordinates: [-74.006, 40.7128] // NYC coordinates
    },
    lastDonationDate: new Date('2024-01-15')
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    bloodGroup: 'A+',
    city: 'New York',
    approved: true,
    available: true,
    location: {
      type: 'Point',
      coordinates: [-73.995, 40.7200]
    },
    lastDonationDate: new Date('2023-12-20')
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567892',
    bloodGroup: 'B+',
    city: 'New York',
    approved: true,
    available: true,
    location: {
      type: 'Point',
      coordinates: [-74.015, 40.7050]
    },
    lastDonationDate: null
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1234567893',
    bloodGroup: 'O+',
    city: 'Brooklyn',
    approved: true,
    available: true,
    location: {
      type: 'Point',
      coordinates: [-73.950, 40.6782]
    },
    lastDonationDate: new Date('2024-02-10')
  },
  {
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+1234567894',
    bloodGroup: 'AB+',
    city: 'Queens',
    approved: true,
    available: false,
    location: {
      type: 'Point',
      coordinates: [-73.794, 40.7282]
    },
    lastDonationDate: new Date('2024-03-01')
  }
];

async function seedDonors() {
  try {
    console.log('Seeding test donors...');
    
    // Clear existing test donors (optional)
    // await Donor.deleteMany({});
    
    await Donor.insertMany(testDonors);
    
    console.log('✅ Test donors seeded successfully!');
    console.log(`Added ${testDonors.length} donors with GPS coordinates`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding donors:', error);
    process.exit(1);
  }
}

seedDonors();
