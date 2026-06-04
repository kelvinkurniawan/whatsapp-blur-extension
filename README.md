# WA Privacy — WhatsApp Web Privacy Extension

Ekstensi Chrome untuk WhatsApp Web yang menambahkan tema glassmorphism gelap sekaligus memblur nama kontak dan avatar di chat list — cocok dipakai saat presentasi, screensharing, atau kerja di tempat umum.

![WA Privacy Preview](icon.png)

---

## Fitur

- **Privacy blur** — nama kontak, preview pesan, dan avatar di chat list diblur secara default. Hover untuk melihat sebentar.
- **Screen share mode** — blur konten pesan + media saat screen sharing (ideal untuk pair programming atau presentasi sensitif). Hover di bubble chat untuk temporarily reveal pesan.
- **Adjustable blur intensity** — slider 4-20px untuk customize blur strength sesuai kebutuhan.
- **Persistent settings** — blur state, screen share mode, dan blur intensity disimpan via `chrome.storage.sync` (sinkron lintas device).
- **Popup UI** — kontrol blur, screen share mode, dan lihat keyboard shortcuts dari extension icon di toolbar.
- **Toggle shortcuts** — `Ctrl + Shift + 0` / `Cmd + Shift + 0` toggle blur; `Ctrl + Shift + 9` / `Cmd + Shift + 9` untuk screen share mode.
- **Toast notifikasi** — konfirmasi visual kecil setiap kali status blur berubah.
- **Tema gelap glassmorphism** — tampilan WhatsApp Web dirombak total: background gradient, panel kaca, bubble pesan biru/putih transparan, floating header, dan floating compose bar.

---

## Instalasi via Unpacked Extension (Chrome)

Karena ekstensi ini belum dipublikasikan ke Chrome Web Store, pemasangannya dilakukan secara manual lewat mode **Developer**.

### Langkah-langkah

**1. Download / clone repo ini**

```bash
git clone https://github.com/kelvinkurniawan/whatsapp-blur.git
```

Atau download sebagai ZIP dan ekstrak ke folder yang mudah diingat (misalnya `~/Extensions/whatsapp-blur`).

**2. Buka halaman Extensions di Chrome**

Ketik di address bar:

```
chrome://extensions
```

**3. Aktifkan Developer Mode**

Di pojok kanan atas halaman Extensions, nyalakan toggle **"Developer mode"**.

![Developer mode toggle](https://developer.chrome.com/static/docs/extensions/get-started/tutorial/hello-world/image/extensions-page-e0d64d89a6acf_856.png)

**4. Load ekstensi**

Klik tombol **"Load unpacked"** yang muncul di kiri atas, lalu pilih folder hasil clone/ekstrak tadi (folder yang berisi `manifest.json`).

**5. Buka WhatsApp Web**

Buka [https://web.whatsapp.com](https://web.whatsapp.com) — tampilan langsung berubah dan blur aktif.

---

## Cara Pakai

| Aksi                           | Shortcut / Cara                                                  |
| ------------------------------ | ---------------------------------------------------------------- |
| Toggle blur ON/OFF             | `Cmd + Shift + 0` (Mac) / `Ctrl + Shift + 0` (Win/Linux)         |
| Toggle screen share mode       | `Cmd + Shift + 9` (Mac) / `Ctrl + Shift + 9` (Win/Linux)         |
| Lihat kontak sebentar          | Hover cursor ke chat list item (saat blur ON)                    |
| Reveal pesan di screen share   | Hover cursor ke message bubble (saat screen share mode ON)       |
| Adjust blur intensity          | Klik extension icon → geser "Blur Intensity" slider (4-20px)     |
| Lihat shortcuts                | Klik extension icon → lihat daftar shortcuts di bagian bawah     |
| Customize shortcut keys        | `chrome://extensions/shortcuts` → cari WhatsApp Blur             |

Status blur ditampilkan lewat toast notifikasi di bagian bawah layar.

---

## Struktur File

```
whatsapp-blur/
├── manifest.json    # Konfigurasi ekstensi (Manifest v3)
├── background.js    # Service worker: handle Chrome commands + state relay
├── content.js       # Logika toggle blur, screen share, storage sync
├── style.css        # Tema glassmorphism + blur CSS (sidebar + screen share)
├── popup.html       # UI popup: toggle switch, blur slider, shortcuts
├── popup.js         # Popup logic: sync state dengan content.js, debounce slider
├── popup.css        # Styling popup dengan glassmorphism theme
└── icon.png         # Ikon ekstensi
```

---

## Changelog

### v1.1.0 (2026-06-04)
**Fitur Baru:**
- ✨ **Screen Share Mode** — blur konten pesan + media saat screen sharing. Hover di message bubble untuk temporarily reveal pesan.
- ✨ **Popup UI** — kontrol blur, screen share mode, dan blur intensity dari extension icon di toolbar.
- ✨ **Adjustable Blur Intensity** — slider 4-20px untuk customize blur strength sesuai preferensi.
- ✨ **Persistent Settings** — blur state, screen share mode, dan blur intensity disimpan via `chrome.storage.sync` (sinkron lintas device).
- ✨ **Chrome Commands API** — keyboard shortcuts terdaftar di `chrome://extensions/shortcuts` dan bisa di-customize.
- ✨ **Background Service Worker** — handle Chrome commands dan relay state antar tab.

**Perbaikan:**
- Debounce blur intensity slider untuk avoid `MAX_WRITE_OPERATIONS_PER_MINUTE` quota error.
- Hover reveal untuk message bubbles di screen share mode.
- Improved CSS variables untuk flexible blur radius control.

### v1.0.0 (initial)
- Privacy blur di chat list dengan hover reveal
- Toggle shortcut (`Cmd+Shift+0`)
- Tema glassmorphism gelap
- Toast notifikasi

---

## Catatan

- Ekstensi ini hanya bekerja di **WhatsApp Web** (`web.whatsapp.com`).
- Karena WhatsApp Web sering update struktur HTML-nya, beberapa selector CSS mungkin perlu disesuaikan jika tampilan mendadak tidak berubah.
- Tidak ada data yang dikirim ke server manapun — semua berjalan lokal di browser.

---

## Lisensi

MIT
