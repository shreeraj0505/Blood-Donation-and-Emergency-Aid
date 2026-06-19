const mongoose = require('mongoose');
require('./config/db');
const Donor = require('./models/Donor');

const sampleDonors = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    bloodGroup: 'O+',
    city: 'Mumbai',
    latitude: 19.0760,
    longitude: 72.8777,
    lastDonationDate: new Date('2024-01-15'),
    availability: true,
    approved: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    bloodGroup: 'A+',
    city: 'Mumbai',
    latitude: 19.0896,
    longitude: 72.8656,
    lastDonationDate: new Date('2023-12-20'),
    availability: true,
    approved: true
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567892',
    bloodGroup: 'B+',
    city: 'Mumbai',
    latitude: 19.0728,
    longitude: 72.8826,
    lastDonationDate: null,
    availability: true,
    approved: true
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1234567893',
    bloodGroup: 'O+',
    city: 'Mumbai',
    latitude: 19.0825,
    longitude: 72.8750,
    lastDonationDate: new Date('2024-02-10'),
    availability: true,
    approved: true
  },
  {
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+1234567894',
    bloodGroup: 'AB+',
    city: 'Mumbai',
    latitude: 19.0650,
    longitude: 72.8900,
    lastDonationDate: new Date('2024-03-01'),
    availability: false,
    approved: true
  }
];

async function seedDonors() {
  try {
    console.log('Seeding sample donors...');
    await Donor.insertMany(sampleDonors);
    console.log('✅ Successfully seeded', sampleDonors.length, 'donors');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding donors:', error);
    process.exit(1);
  }
}

seedDonors();
