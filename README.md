# medikart
## 🚀 Key Features

### 🧾 Prescription Upload
- 📤 Upload prescription images directly from the platform
- 🤖 Integrated with OCR (Google Cloud Vision API) to extract medicine names
- 🗄️ Uploaded prescriptions and extracted data are stored in the MySQL database for order processing

### 🔐 Firebase OTP Authentication
- 📱 Login/Signup using **phone number**
- 🔑 OTP-based verification using **Firebase Authentication**
- 🔒 Secure login ensures only verified users can submit consultation or place orders

### 🔍 Search & Browse Medicines
- 🏷️ Browse by medicine category, brand, or disease
- 🔎 Real-time search with filters
- 📦 Product details include price, description, dosage, availability

### 👨‍⚕️ Doctor Consultation System
- 📝 Fill out a consultation form with symptoms and contact info
- 📤 Submit form only after OTP verification
- 📚 View list of available doctors with specializations and ratings
- 🔄 Doctor suggestions based on user symptoms using AI

🧮 Total price auto-calculates based on selected medicines
- 💳 Payment Options:
  - UPI: Opens QR scanner for scan & pay
  - Card: Shows secure card entry form
  - Cash on Delivery: Select and proceed without payment

- 📍 Location Integration:
  - Select your current pin/location
  - Location gets saved to the MySQL database
  - Delivery charges vary based on location

- 📞 WhatsApp Contact Button:
  - Clicking "Call Me" opens a pre-filled WhatsApp chat for user support

- 🔐 Backend stores all data like order details, delivery location, and consultation records
