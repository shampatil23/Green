# GreenRoots - Dynamic Environmental Website

A fully dynamic environmental conservation website with Firebase integration for real-time content management and admin authentication.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Dynamic Content**: All content sections are dynamically loaded from Firebase
- **Real-time Updates**: Content updates instantly when admin makes changes
- **Interactive Gallery**: Image upload and management system
- **Form Submissions**: Contact forms with Firebase storage
- **Fallback Content**: Graceful degradation when Firebase is unavailable

### Admin Panel Features
- **Firebase Authentication**: Secure admin login system
- **Content Management**: Edit hero, about, impact stats, and more
- **Image Upload**: Direct image upload to Firebase Storage
- **Gallery Management**: Add/remove gallery images with preview
- **Form Analytics**: View and manage form submissions
- **Real-time Preview**: Changes reflect immediately on the main site

## 🚀 Setup Instructions

### Prerequisites
- A modern web browser
- Firebase project with the provided credentials
- Web server (for local development, you can use Live Server extension in VS Code)

### Firebase Setup
1. The Firebase configuration is already set up in `firebase-config.js`
2. Make sure your Firebase project has:
   - **Authentication** enabled with Email/Password provider
   - **Realtime Database** with appropriate security rules
   - **Storage** for image uploads

### Admin Account Setup
1. Go to your Firebase Console
2. Navigate to Authentication > Users
3. Add a new user with email and password
4. This will be your admin login credentials

### Running the Website
1. Serve the files using a web server (required for ES6 modules)
2. Open `index.html` for the main website
3. Open `admin.html` for the admin panel
4. Login with your Firebase admin credentials

## 📁 File Structure

```
cpepro/
├── index.html              # Main website
├── admin.html              # Admin dashboard
├── styles.css              # Website styles
├── script.js               # Main website functionality
├── firebase-config.js      # Firebase configuration
├── dynamic-content.js      # Dynamic content management
└── README.md              # This file
```

## 🔧 Configuration

### Firebase Security Rules

**Realtime Database Rules:**
```json
{
  "rules": {
    "content": {
      ".read": true,
      ".write": "auth != null"
    },
    "submissions": {
      ".read": "auth != null",
      ".write": true
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🎨 Content Management

### Available Content Sections
1. **Hero Section**: Main title and subtitle
2. **About Section**: Problem/solution descriptions
3. **Impact Stats**: Trees planted, volunteers, cities, CO2 absorbed
4. **Gallery**: Image uploads with captions
5. **Testimonials**: Coming soon
6. **Events**: Coming soon

### How to Update Content
1. Login to the admin panel (`admin.html`)
2. Navigate to the desired content tab
3. Make your changes
4. Click "Save" - changes appear instantly on the main site

## 🖼️ Gallery Management

### Adding Images
1. Go to Admin Panel > Gallery tab
2. Click the upload area or drag and drop images
3. Images are automatically uploaded to Firebase Storage
4. They appear immediately in the main website gallery

### Image Requirements
- Supported formats: JPG, PNG, GIF, WebP
- Recommended size: 800x600px or larger
- File size: Under 5MB per image

## 📊 Form Submissions

The website captures:
- **Contact Form**: General inquiries
- **Event Registrations**: Tree planting events
- **School Registrations**: Educational programs
- **Event Planning**: Custom event requests

All submissions are stored in Firebase and viewable in the admin panel.

## 🔒 Security Features

- **Admin Authentication**: Only authenticated users can modify content
- **Input Validation**: All forms include client-side validation
- **Error Handling**: Graceful error handling for network issues
- **Fallback Content**: Default content when Firebase is unavailable

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🚨 Troubleshooting

### Common Issues

**Admin login not working:**
- Check Firebase Authentication is enabled
- Verify user exists in Firebase Console
- Check browser console for errors

**Images not loading:**
- Verify Firebase Storage rules
- Check internet connection
- Ensure images are under 5MB

**Content not updating:**
- Check Firebase Realtime Database rules
- Verify admin is logged in
- Check browser console for errors

**Gallery shows "No images uploaded":**
- This is normal when no admin has uploaded images yet
- Upload images through the admin panel

## 🔄 Real-time Features

The website includes real-time listeners that automatically update content when changes are made in the admin panel. No page refresh required!

## 📈 Performance

- **Lazy Loading**: Images load only when needed
- **Optimized Assets**: Compressed images and minified code
- **Caching**: Firebase provides automatic caching
- **CDN**: Firebase Storage serves images via CDN

## 🤝 Contributing

To add new features:
1. Update the admin panel with new content fields
2. Add corresponding database save/load functions
3. Update the dynamic content loader
4. Test thoroughly with and without Firebase connection

## 📞 Support

For technical support or questions about the implementation, please refer to:
- Firebase Documentation
- Browser Developer Tools Console
- This README file

---

**Made with 💚 for our planet - GreenRoots Environmental Initiative**
