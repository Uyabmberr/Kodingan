import { NextResponse } from "next/server";

// Use FONNTE token from environment for sending WA notifications
const FONNTE_TOKEN = process.env.FONNTE_TOKEN || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Cek Apakah Pembayaran Berhasil
    // Mayar mengirim status 'paid' atau 'payment.received'
    if (body.event === 'payment.received' || body.status === 'PAID') {

      // 2. Ambil Data Pelanggan dari Mayar
      const customerName = body.customer?.name || "Member Guppy";
      const customerWA = body.customer?.mobile || body.customer?.phone;

      // Pastikan ada nomor WA
      if (customerWA) {

        // 3. Susun Pesan WA
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mayar.id';
        const message = `Halo ${customerName}! Pembayaran Sukses ✅\n\nSelamat bergabung di GUPPY INDONESIA VIP.\nBerikut akses rahasia Anda:\n\n🔗 Link: ${baseUrl}/member\n🔑 Kode Akses: GUPPY-VIP-2026\n\nSimpan kode ini baik-baik. Selamat belajar!`;

        // 4. Kirim ke Fonnte (Pengganti n8n)
        if (FONNTE_TOKEN) {
          await fetch('https://api.fonnte.com/send', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${FONNTE_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              target: customerWA,
              message: message,
            })
          });
        } else {
          console.log('FONNTE_TOKEN not set; skipping WA send. Message would be:', message);
        }

        console.log("WA Sukses dikirim ke:", customerWA);
      }
    }

    return NextResponse.json({ status: "OK" });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Gagal memproses" }, { status: 500 });
  }
}
