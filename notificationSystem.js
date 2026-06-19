// Optional: Push Notification System for Emergency Alerts
// This is a template for implementing push notifications to nearby donors

// Install required packages:
// npm install firebase-admin

const admin = require('firebase-admin');

// Initialize Firebase Admin (add your service account key)
// const serviceAccount = require('./path/to/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

/**
 * Send push notification to nearby donors
 * @param {Array} donors - List of nearby donors
 * @param {Object} emergencyData - Emergency request details
 */
async function notifyNearbyDonors(donors, emergencyData) {
  const { patientName, bloodGroup, hospital, urgencyLevel, distance } = emergencyData;

  // Prepare notification payload
  const notification = {
    title: urgencyLevel === 'Critical' ? '🚨 CRITICAL Blood Emergency!' : '🩸 Emergency Blood Request',
    body: `${bloodGroup} blood needed for ${patientName} at ${hospital}. Distance: ${distance}km`,
    priority: urgencyLevel === 'Critical' || urgencyLevel === 'High' ? 'high' : 'normal',
    sound: 'emergency_alert.mp3',
    badge: '1'
  };

  const data = {
    type: 'emergency_request',
    emergencyId: emergencyData.id,
    bloodGroup: bloodGroup,
    urgencyLevel: urgencyLevel,
    hospital: hospital,
    distance: distance.toString()
  };

  // Send to each donor's device token
  const tokens = donors
    .filter(d => d.fcmToken) // Ensure donor has registered device token
    .map(d => d.fcmToken);

  if (tokens.length === 0) {
    console.log('No donors with registered device tokens');
    return;
  }

  try {
    const message = {
      notification: notification,
      data: data,
      tokens: tokens,
      android: {
        priority: 'high',
        notification: {
          channelId: 'emergency_alerts',
          sound: 'emergency_alert.mp3',
          color: '#d32f2f'
        }
      },
      apns: {
        payload: {
          aps: {
            sound: 'emergency_alert.mp3',
            badge: 1,
            category: 'EMERGENCY_REQUEST'
          }
        }
      }
    };

    const response = await admin.messaging().sendMulticast(message);
    console.log(`✅ Notifications sent: ${response.successCount} successful, ${response.failureCount} failed`);
    
    return response;
  } catch (error) {
    console.error('❌ Error sending notifications:', error);
    throw error;
  }
}

/**
 * Add to Emergency Routes (emergencyRoutes.js)
 * 
 * After creating emergency and finding donors:
 * 
 * router.post("/create", async (req, res) => {
 *   try {
 *     const emergency = new Emergency(req.body);
 *     await emergency.save();
 * 
 *     // Find nearby donors
 *     const donors = await Donor.find({
 *       bloodGroup: req.body.bloodGroup,
 *       approved: true,
 *       available: true,
 *       location: {
 *         $near: {
 *           $geometry: {
 *             type: 'Point',
 *             coordinates: req.body.location.coordinates
 *           },
 *           $maxDistance: 50000
 *         }
 *       }
 *     }).limit(50);
 * 
 *     // Send notifications
 *     if (donors.length > 0) {
 *       await notifyNearbyDonors(donors, {
 *         id: emergency._id,
 *         patientName: req.body.patientName,
 *         bloodGroup: req.body.bloodGroup,
 *         hospital: req.body.hospital,
 *         urgencyLevel: req.body.urgencyLevel,
 *         distance: 'nearby'
 *       });
 *     }
 * 
 *     res.json({ message: "Emergency request saved and notifications sent", id: emergency._id });
 *   } catch (error) {
 *     console.log(error);
 *     res.status(500).json({ error: "Server error" });
 *   }
 * });
 */

/**
 * Update Donor Model to include FCM token:
 * 
 * const donorSchema = new mongoose.Schema({
 *   // ... existing fields
 *   fcmToken: {
 *     type: String,
 *     default: null
 *   },
 *   notificationsEnabled: {
 *     type: Boolean,
 *     default: true
 *   }
 * });
 */

/**
 * Client-side: Register device for notifications
 * Add to donor registration/profile page:
 * 
 * // Import Firebase messaging
 * import { getMessaging, getToken } from "firebase/messaging";
 * 
 * async function registerForNotifications() {
 *   const messaging = getMessaging();
 *   
 *   try {
 *     const token = await getToken(messaging, {
 *       vapidKey: 'YOUR_VAPID_KEY'
 *     });
 *     
 *     // Send token to backend
 *     await fetch('/donors/update-fcm-token', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({ donorId: currentDonorId, fcmToken: token })
 *     });
 *     
 *     console.log('✅ Registered for notifications');
 *   } catch (error) {
 *     console.error('❌ Notification registration failed:', error);
 *   }
 * }
 */

/**
 * Donor Response Tracking
 * Add these routes to handle donor responses:
 */

// Route: POST /emergency/:id/respond
async function handleDonorResponse(req, res) {
  try {
    const { emergencyId } = req.params;
    const { donorId, response } = req.body; // response: 'accepted', 'declined'

    // Create response record
    const donorResponse = {
      donorId: donorId,
      response: response,
      timestamp: new Date()
    };

    // Update emergency with donor response
    await Emergency.findByIdAndUpdate(emergencyId, {
      $push: { donorResponses: donorResponse }
    });

    // If accepted, notify requester
    if (response === 'accepted') {
      const emergency = await Emergency.findById(emergencyId);
      const donor = await Donor.findById(donorId);
      
      // Send notification to requester (implement based on your notification system)
      console.log(`✅ Donor ${donor.name} accepted emergency request ${emergencyId}`);
    }

    res.json({ message: 'Response recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record response' });
  }
}

/**
 * Update Emergency Model for response tracking:
 * 
 * const emergencySchema = new mongoose.Schema({
 *   // ... existing fields
 *   donorResponses: [{
 *     donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
 *     response: { type: String, enum: ['accepted', 'declined', 'not_responded'] },
 *     timestamp: { type: Date, default: Date.now }
 *   }],
 *   acceptedDonorId: {
 *     type: mongoose.Schema.Types.ObjectId,
 *     ref: 'Donor',
 *     default: null
 *   }
 * });
 */

module.exports = {
  notifyNearbyDonors,
  handleDonorResponse
};
