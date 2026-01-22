import { NextResponse } from "next/server";

// Environment variables
const MAYAR_API_KEY = process.env.MAYAR_API_KEY;
const MAYAR_WEBHOOK_URL = process.env.MAYAR_WEBHOOK_URL || `${process.env.NEXT_PUBLIC_APP_URL}/api/payment`;
const MERCHANT_NAME = process.env.MERCHANT_NAME || "Guppy Indonesia";

export async function POST(request: Request) {
  try {
    const { amount, productName, customerPhone } = await request.json();

    // Validate required fields
    if (!amount || !productName || !customerPhone) {
      return NextResponse.json(
        { error: "Amount, productName, dan customerPhone diperlukan" },
        { status: 400 }
      );
    }

    // Check if Mayar API key is configured
    if (!MAYAR_API_KEY || MAYAR_API_KEY === "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI3N2MyOC00OTgzLTQwNTktOGFlNS1lMjQ1OTBkOTYxZDEiLCJhY2NvdW50SWQiOiJjMTJiMzRmNC0xY2RhLTQxNzctYmQ5ZC1hOWM0OGU4NDc1M2QiLCJjcmVhdGVkQXQiOiIxNzY5MDczMzkzNjIyIiwicm9sZSI6ImRldmVsb3BlciIsInN1YiI6ImFkaXRiYXlwZXJAZ21haWwuY29tIiwibmFtZSI6IkdlbmFydW5pa2EiLCJsaW5rIjoiYWRpdHlhLWJheXUtcGVybWFuYSIsImlzU2VsZkRvbWFpbiI6bnVsbCwiaWF0IjoxNzY5MDczMzkzfQ.k-jICfzR0_kczktvx9aCYdzbzMyiz9dZTHFEve2_Wm42pR54ctKORT9OPiWXOaY-co-cFwoGFOikMccojjPyfmwVpTPVNk44nFGV7OtkLJW3fKVbQ0R4MxKoDe2nRnfkiszJQ_AUQ096PQVfHmiaLUqlJ3hzuKvXA1FQ3hIGK1MqsZcPfyCNN5ud5IGlZrnhFzJ9YvRi-GLOr3Fxa7KzgXNXzMc_gY0Vr9Xi0RuvrBxWVzNi_lmGMCODsunyTDkmCCfYPatIx7yCQpNmOBfPUzUBZ8sd8p2pQh9wiNRNgjT5VMakVsEEyK173hrVKkp15lNMSvd2OjPnmM01nLjxeA") {
      console.log("Mayar API key not configured, using mock payment system");
      
      // Generate mock payment URL for testing
      const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const mockPaymentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/member?order_id=${orderId}&status=pending`;
      
      return NextResponse.json({
        paymentUrl: mockPaymentUrl,
        orderId: orderId,
        message: "Mock payment created successfully (Mayar API not configured)"
      });
    }

    // Prepare Mayar payment payload
    const paymentData = {
      amount: amount.toString(),
      currency: "IDR",
      description: productName,
      external_id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique order ID
      buyer_name: customerPhone, // Using phone as identifier
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/member`, // Redirect after payment
      webhook_url: MAYAR_WEBHOOK_URL,
      expired_time: Date.now() + (24 * 60 * 60 * 1000), // 24 hours from now
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
      const errorData = await response.json().catch(() => ({ message: "Failed to parse error response" }));
      console.error("Mayar API Error:", errorData);
      return NextResponse.json(
        { error: "Gagal membuat invoice di Mayar", details: errorData },
        { status: 500 }
      );
    }

    const responseData = await response.json();
    
    // Return payment URL
    return NextResponse.json({
      paymentUrl: responseData.invoice_url,
      orderId: responseData.external_id,
    });
  } catch (error) {
    console.error("Create Payment Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui";
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat pembayaran", details: errorMessage },
      { status: 500 }
    );
  }
}
