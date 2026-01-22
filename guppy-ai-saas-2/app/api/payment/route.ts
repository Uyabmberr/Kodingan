import { NextResponse } from "next/server";

// --- ISI TOKEN FONNTE DISINI ---
const FONNTE_TOKEN = "BikdrZFkUW9ztDuePKy5";

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
        const message = `Halo ${customerName}! Pembayaran Sukses ✅\n\nSelamat bergabung di GUPPY INDONESIA VIP.\nBerikut akses rahasia Anda:\n\n🔗 Link: https://guppyindonesia.com/member\n🔑 Kode Akses: GUPPY-VIP-2026\n\nSimpan kode ini baik-baik. Selamat belajar!`;

        // 4. Kirim ke Fonnte (Pengganti n8n)
        await fetch('https://api.fonnte.com/send', {
          method: 'POST',
          headers: {
            'Authorization': FONNTE_TOKEN,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            target: customerWA,
            message: message,
          })
        });

        console.log("WA Sukses dikirim ke:", customerWA);
      }
    }

    return NextResponse.json({ status: "OK" });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Gagal memproses" }, { status: 500 });
  }
}
