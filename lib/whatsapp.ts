export async function sendWhatsAppMessage(phone: string, message: string) {
  // Ganti URL ini sesuai provider WA Gateway Anda (contoh: Fonnte/Wablas)
  const WA_GATEWAY_URL = 'https://api.fonnte.com/send'; 
  const WA_TOKEN = process.env.WA_GATEWAY_TOKEN; // Masukkan token WA Gateway di .env

  if (!WA_TOKEN) {
    console.error("WA Token belum disetting di .env");
    return;
  }

  try {
    const res = await fetch(WA_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Authorization': WA_TOKEN,
        'Content-Type': 'application/json',
      },
      // Sesuaikan body JSON dengan dokumentasi provider WA Anda
      body: JSON.stringify({
        target: phone,
        message: message,
      }),
    });
    
    const result = await res.json();
    console.log("WA Sent:", result);
  } catch (error) {
    console.error("Gagal kirim WA:", error);
  }
}