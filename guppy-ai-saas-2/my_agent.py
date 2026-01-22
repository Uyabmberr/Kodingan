import ollama
import sys

# 1. Tentukan Model (Pakai yang sudah didownload tadi)
MODEL = "qwen2.5-coder:1.5b"

# 2. Definisikan "Jiwa" Agent (System Prompt)
# Ini yang membedakan Agent dengan Chatbot biasa. Kita beri dia peran.
system_prompt = """
Kamu adalah Senior Fullstack Developer yang ahli dalam Next.js, Tailwind CSS, dan TypeScript.
Tugasmu:
1. Menulis kode yang bersih, efisien, dan aman.
2. Jangan banyak bicara, langsung berikan solusi kode.
3. Jika kode butuh penjelasan, tulis sebagai komentar di dalam kode (# atau //).
4. Kamu bekerja untuk proyek SaaS bernama 'Guppy Indonesia'.
"""

def ask_agent(question):
    print(f"\n[AI] Agent sedang berpikir menggunakan otak {MODEL}...\n")

    # 3. Kirim Perintah ke Ollama
    response = ollama.chat(model=MODEL, messages=[
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': question},
    ])

    # 4. Tampilkan Hasil
    print("--- SOLUSI ---")
    print(response['message']['content'])
    print("--------------")

# Agar bisa dijalankan lewat terminal dengan argumen
if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_input = " ".join(sys.argv[1:])
        ask_agent(user_input)
    else:
        print("Cara pakai: python my_agent.py 'tuliskan fungsi login nextjs'")
