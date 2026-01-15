# Guppy AI - Payment Integration Guide

## 🎯 Overview
This is a complete payment flow implementation using Next.js 14, TypeScript, Tailwind CSS, and Midtrans Snap.

---

## 📋 Files Created

### 1. **API Route: `/src/app/api/payment/route.ts`**
- Handles payment token generation
- Validates customer data
- Sends customer details to Midtrans (including phone for n8n)
- Returns token and redirect URL

**Key Features:**
- ✅ Validates phone number format (must start with 08)
- ✅ Generates unique order IDs
- ✅ Includes `customer_details` with phone number for n8n webhook
- ✅ Error handling and logging

### 2. **Component: `/src/components/BuyButton.tsx`**
- Reusable buy button component
- Shows form to collect: Name, Email, Phone
- Triggers Midtrans Snap payment popup
- Handles success, pending, error, and close events

**Props:**
```typescript
<BuyButton productName="Pro Plan" price={100000} />
```

### 3. **Landing Page: `/src/app/page.tsx`**
- Beautiful hero section
- Two pricing plans: Basic (Rp 30K) & Pro (Rp 100K)
- Feature showcase
- Includes BuyButton component in each pricing card

### 4. **Layout: `/src/app/layout.tsx`**
- Global layout with Midtrans Snap script
- Loads from Sandbox: `https://app.sandbox.midtrans.com/snap/snap.js`
- Proper error handling

### 5. **Environment Variables: `/.env.local`**
- Template for required API keys
- Instructions included

---

## ⚙️ Setup Instructions

### Step 1: Install Dependencies
```bash
npm install midtrans-client
```

### Step 2: Get Midtrans API Keys
1. Go to https://dashboard.midtrans.com
2. Sign up for a free Sandbox account
3. Navigate to **Settings → Configuration Info**
4. Copy your:
   - **Client Key** (public)
   - **Server Key** (private/secret)

### Step 3: Update `.env.local`
```env
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key_here
MIDTRANS_SERVER_KEY=your_server_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Create Missing Directories
```bash
mkdir -p src/app/api/payment
mkdir -p src/components
```

### Step 5: Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🔄 Payment Flow Diagram

```
1. User clicks "Beli Sekarang" button
   ↓
2. Form appears asking for Name, Email, Phone
   ↓
3. User clicks "Lanjut Bayar"
   ↓
4. Frontend calls POST /api/payment with customer data
   ↓
5. Backend (route.ts) creates Midtrans transaction
   ↓
6. Backend returns token to frontend
   ↓
7. Frontend triggers window.snap.pay(token)
   ↓
8. Midtrans payment popup appears
   ↓
9. User pays (Midtrans handles payment securely)
   ↓
10. On Success → Redirect to /dashboard
    On Error → Show error message
    On Pending → Show pending message
```

---

## 🌐 How n8n Integration Works

The phone number sent to Midtrans appears in the **customer_details** object:

```json
{
  "customer_details": {
    "first_name": "Budi Santoso",
    "email": "budi@gmail.com",
    "phone": "081234567890"  // ← This is what n8n reads
  }
}
```

### In Your n8n Webhook:
```javascript
// Access phone number from Midtrans callback
const phoneNumber = data.body.customer_details.phone;

// Send WhatsApp message
await sendWhatsAppMessage(phoneNumber, accessLink);
```

---

## 🚀 Deployment Checklist

### For Production:

1. **Update API Endpoint** in `layout.tsx`:
   ```typescript
   // Change from Sandbox to Production
   src="https://app.midtrans.com/snap/snap.js"
   ```

2. **Update API Route** in `src/app/api/payment/route.ts`:
   ```typescript
   isProduction: true, // Change from false
   ```

3. **Set Environment Variables** on your hosting (Vercel, etc.):
   - `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` (Production key)
   - `MIDTRANS_SERVER_KEY` (Production key)
   - `NEXT_PUBLIC_APP_URL` (Your actual domain)

4. **Enable Production Mode** in Midtrans Dashboard:
   - Settings → General Settings
   - Toggle "Production Mode"

---

## 🛡️ Security Best Practices

✅ **Done Correctly:**
- Server Key is in `.env.local` only (not exposed to frontend)
- Phone validation on frontend and backend
- Customer data validated before Midtrans
- Error messages don't leak sensitive info
- Using HTTPS in production

⚠️ **Always Remember:**
- Never commit `.env.local` to Git
- Keep Server Key secret
- Validate all inputs on backend
- Use HTTPS only in production
- Log sensitive data carefully

---

## 🐛 Troubleshooting

### "window.snap is not defined"
- Make sure Midtrans script loaded (check browser console)
- Verify `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` is set
- Clear browser cache and reload

### "Invalid Client Key"
- Double-check your Client Key from Midtrans dashboard
- Make sure it's wrapped in quotes in `.env.local`

### Phone number validation fails
- Ensure phone number starts with 08
- Example: `081234567890` ✅ | `+62 812...` ❌

### n8n not receiving phone number
- Check that payment succeeded (not just pending)
- Verify n8n webhook URL
- Check Midtrans transaction callback settings

---

## 📱 WhatsApp Integration Example (n8n)

When user completes payment, send access via WhatsApp:

```javascript
// n8n workflow example
const phone = data.body.customer_details.phone;
const accessLink = `https://guppy-ai.com/access/${orderId}`;
const message = `
Halo! Pembayaran Anda sudah diterima ✅

Akses kursus: ${accessLink}
Kode: ${orderId}

Terima kasih telah menjadi bagian dari Guppy AI! 🎉
`;

await send_whatsapp_message(phone, message);
```

---

## 📞 Support

- **Midtrans Docs**: https://docs.midtrans.com
- **Midtrans Dashboard**: https://dashboard.midtrans.com
- **n8n Docs**: https://docs.n8n.io

---

## 📝 License

This code is provided as-is for your Guppy AI SaaS platform.
