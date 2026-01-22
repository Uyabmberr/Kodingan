import { NextResponse } from 'next/server';

// Environment variables
const MAYAR_API_KEY = process.env.MAYAR_API_KEY;
const MAYAR_WEBHOOK_URL = process.env.MAYAR_WEBHOOK_URL || `${process.env.NEXT_PUBLIC_APP_URL}/api/payment`;
const MERCHANT_NAME = process.env.MERCHANT_NAME || "Guppy Insider";

export async function POST(request: Request) {
  try {
    const { amount, productName, customerName, customerEmail, customerPhone } = await request.json();

    // Validate required fields
    if (!amount || !productName || !customerName) {
      return NextResponse.json(
        { error: "Amount, productName, dan customerName diperlukan" },
        { status: 400 }
      );
    }

    // Prepare Mayar payment payload
    const paymentData = {
      amount: amount.toString(),
      currency: "IDR",
      description: productName,
      external_id: `order-${Date.now()}`, // Unique order ID
      buyer_name: customerName,
      buyer_email: customerEmail || customerPhone,
      buyer_phone: customerPhone,
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/member`, // Redirect after payment
      webhook_url: MAYAR_WEBHOOK_URL,
      expired_time: Date.now() + (24 * 60 * 60 * 1000), // 24 hours from now
      type: "ONETIME", // ONETIME or RECURRING
    };

    // Call Mayar API to create payment
    const response = await fetch("https://api.mayar.id/v2/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${MAYAR_API_KEY}:`).toString('base64')}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mayar API Error:", errorData);
      return NextResponse.json(
        { error: "Gagal membuat invoice di Mayar", details: errorData },
        { status: 500 }
      );
    }

    const responseData = await response.json();
    
    // Return payment URL and order details
    return NextResponse.json({
      paymentUrl: responseData.invoice_url,
      orderId: responseData.external_id,
      amount: responseData.amount,
      description: responseData.description,
    });
  } catch (error) {
    console.error("Create Payment Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat pembayaran" },
      { status: 500 }
    );
  }
}