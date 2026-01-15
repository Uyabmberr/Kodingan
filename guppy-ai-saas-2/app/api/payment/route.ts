import { NextRequest, NextResponse } from 'next/server';

// Initialize Midtrans Core API (Snap)
const midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: false, // Set to true for production
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

interface PaymentRequest {
  name: string;
  email: string;
  phone: string;
  price: number;
  productName: string;
  id?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.price || !body.productName) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, price, productName' },
        { status: 400 }
      );
    }

    // Validate phone number format (Indonesian WhatsApp)
    if (!body.phone.startsWith('08')) {
      return NextResponse.json(
        { error: 'Phone number must start with 08 (Indonesian format)' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Prepare Midtrans transaction payload
    const transactionData = {
      transaction_details: {
        order_id: orderId,
        gross_amount: body.price,
      },
      customer_details: {
        first_name: body.name,
        email: body.email,
        phone: body.phone, // ✅ CRITICAL: This will be sent to your n8n webhook
      },
      item_details: [
        {
          id: 'GUPPY-AI-' + body.productName.replace(/\s+/g, '-'),
          price: body.price,
          quantity: 1,
          name: body.productName,
          brand: 'Guppy AI',
          category: 'SaaS Plan',
          merchant_name: 'Guppy AI',
        },
      ],
      // Optional: Enable to send data to external webhook after payment
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
      },
    };

    // Create Midtrans transaction token
    const snapToken = await snap.createTransaction(transactionData);

    console.log('✅ Payment token created:', {
      orderId,
      customerPhone: body.phone,
      snapToken: snapToken.token.substring(0, 20) + '...', // Log first 20 chars for security
    });

    return NextResponse.json(
      {
        token: snapToken.token,
        redirect_url: snapToken.redirect_url,
        orderId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Midtrans Error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment request. Please try again.' },
      { status: 500 }
    );
  }
}
