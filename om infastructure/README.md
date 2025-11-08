# OMBALAJI INFRA SOLUTION PRIVATE LIMITED - Website

## Features

### ✅ Completed Features

1. **Responsive Design** - Fully responsive for desktop, tablet, and mobile devices
2. **Futuristic UI** - Modern design with glassmorphism effects and animations
3. **Animated Backgrounds** - Dynamic background images with smooth transitions
4. **Gallery Lightbox** - Image gallery with full-screen lightbox modal (same page)
5. **Chatbot** - Interactive chatbot for customer queries
6. **Contact Form** - Backend-enabled contact form with email functionality
7. **Logo Enhancement** - Increased logo size (70px height)
8. **Transparency Effects** - Enhanced transparency and backdrop blur effects
9. **Smooth Animations** - Multiple animation effects throughout the site

## File Structure

```
/
├── index.html
├── about/
├── services/
├── projects/
├── contact/
├── compliance/
├── faqs/
├── privacy/
├── terms/
├── assets/
│   ├── css/
│   │   ├── styles.css (Main styles)
│   │   ├── lightbox.css (Gallery lightbox styles)
│   │   └── chatbot.css (Chatbot styles)
│   └── js/
│       ├── main.js (Main JavaScript)
│       ├── gallery.js (Gallery lightbox functionality)
│       └── chatbot.js (Chatbot functionality)
├── api/
│   └── contact.php (Contact form backend)
└── .htaccess (Server configuration)
```

## Backend Setup

### PHP Contact Form

The contact form uses PHP to send emails. To enable:

1. Ensure your server supports PHP
2. The `api/contact.php` file is configured to send emails to `ombalaji.ltd@gmail.com`
3. Make sure the `api/` directory is writable for logging (optional)

### Email Configuration

Update the email address in `api/contact.php`:
```php
$to = 'ombalaji.ltd@gmail.com';
```

## Features Details

### Gallery Lightbox
- Click any image in the gallery to open in a full-screen lightbox
- Navigate with arrow keys or on-screen buttons
- Close with ESC key or close button
- Smooth animations and transitions

### Chatbot
- Interactive chatbot widget (bottom-right corner)
- Answers common questions about services, contact, projects
- Responsive design for mobile devices
- Easy to customize responses in `assets/js/chatbot.js`

### Contact Form
- Validates email and required fields
- Sends email via PHP backend
- Falls back to mailto: if backend unavailable
- Shows success/error messages

### Animations
- Fade-in animations on scroll
- Hover effects on cards and buttons
- Smooth transitions throughout
- Parallax effects on hero section
- Floating animations on badges

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

1. Upload all files to your web server
2. Ensure PHP is enabled on the server
3. Set proper permissions for the `api/` directory
4. Update email address in `api/contact.php` if needed
5. Test the contact form functionality

## Contact Information

- **Email**: ombalaji.ltd@gmail.com
- **Phone**: +91 7302061615, +91 9997848591, +91 9412257798
- **Instagram**: @obinfrasolution
- **Address**: C-066, SECTOR-36, GREATER NOIDA, Uttar Pradesh 201301

## License

© 2025 OMBALAJI INFRA SOLUTION PRIVATE LIMITED. All rights reserved.

