/* =========================================================
   CONFIG.JS - EDIT ISI WEBSITE DARI SINI SAJA
   ========================================================= */
const LOVE_CONFIG = {
  // PIN untuk membuka gerbang taman
  gatePin: "1432",

  // Nama dan teks utama
  title: "Secret Garden Love Letter",
  subtitle: "Sebuah taman rahasia yang cuma terbuka untuk kamu",
  recipientName: "Kamu yang paling istimewa",
  senderName: "Dari Aku",

  // Surat cinta. Bisa tambah paragraf sebanyak apa pun.
  letter: [
    "Dear kamu,",
    "Aku membuat taman kecil ini bukan hanya untuk terlihat indah, tapi untuk menyimpan perasaan yang sering sulit aku ucapkan secara langsung.",
    "Setiap bunga di sini adalah doa baik untukmu. Setiap kupu-kupu adalah rasa rindu yang diam-diam terbang mencari tempat pulang.",
    "Kalau suatu hari dunia terasa ramai dan melelahkan, semoga kamu ingat bahwa ada seseorang yang selalu ingin melihatmu tersenyum dengan tenang.",
    "Terima kasih sudah hadir, sudah menjadi alasan sederhana yang membuat hari-hari terasa lebih hangat.",
    "With love."
  ],

  // Musik romantis. Ganti path sesuai file kamu, contoh: "assets/piano.mp3"
  music: "assets/romantic-piano.mp3",
  musicAutoplay: false,

  // Foto galeri. Ganti src dengan foto kamu sendiri.
  gallery: [
    { src: "assets/photo1.svg", caption: "Momen manis pertama" },
    { src: "assets/photo2.svg", caption: "Senyum favorit" },
    { src: "assets/photo3.svg", caption: "Cerita kecil kita" },
    { src: "assets/photo4.svg", caption: "Kenangan hangat" },
    { src: "assets/photo5.svg", caption: "Bunga untuk kamu" },
    { src: "assets/photo6.svg", caption: "Selalu istimewa" }
  ],

  // Pengaturan animasi ketik surat
  typingSpeed: 35,

  // Teks tombol
  buttonText: {
    unlock: "Buka Gerbang",
    openEnvelope: "Buka Amplop Emas",
    seeGallery: "Lihat Galeri Bunga",
    playMusic: "Musik",
    skip: "Selesaikan Surat"
  }
};
