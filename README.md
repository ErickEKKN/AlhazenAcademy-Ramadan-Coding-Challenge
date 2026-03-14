# Ramadhan Portal 1447 H

Ramadhan Portal 1447 H merupakan website sederhana yang berfungsi sebagai pusat berbagai fitur Ramadhan dalam satu halaman. Proyek ini dibuat dengan HTML, CSS, dan JavaScript tanpa framework, lalu setiap fitur utama dihubungkan lewat halaman portal utama.

## Isi Proyek

Website ini menyediakan beberapa fitur berikut:

- Jadwal imsakiyah berdasarkan kota
- Counter dzikir dengan target hitungan
- Doa sahur dan buka puasa
- Kalkulator zakat
- Catatan amalan ibadah harian

File `index.html` berperan sebagai halaman utama yang menghubungkan seluruh fitur di dalam portal.

## Fitur Utama

### 1. Portal utama

Halaman utama menampilkan navigasi ke semua fitur Ramadhan dalam tampilan yang rapi dan responsif.

### 2. Jadwal imsakiyah

Fitur ini mengambil data jadwal shalat dan imsakiyah berdasarkan kota yang dipilih. Data jadwal menggunakan API dari MyQuran, jadi koneksi internet dibutuhkan saat membuka halaman ini.

### 3. Counter dzikir

Pengguna bisa menambah hitungan dzikir, memilih target, dan melihat notifikasi saat target tercapai.

### 4. Doa sahur dan buka puasa

Halaman ini berisi doa sahur dan buka puasa untuk dibaca dengan mudah.

### 5. Kalkulator zakat

Pengguna dapat menghitung zakat penghasilan dan zakat emas berdasarkan harga emas yang dimasukkan.

### 6. Amalan harian

Fitur ini membantu mencatat progress ibadah harian seperti shalat, baca Quran, puasa, dan dzikir. Beberapa data disimpan di localStorage agar tetap ada saat halaman dibuka lagi di browser yang sama.

## Struktur Folder Singkat

```text
.
|-- index.html
|-- jadwal.html
|-- doa.html
|-- doa-sahur-buka.html
|-- zakat.html
|-- todo.html
|-- main.js
|-- styles.css
`-- views/
    |-- Misi 1/
    |-- Misi 2/
    |-- Misi 3/
    |-- Misi 4/
    `-- Misi 5/
```

Folder `views/` berisi halaman dari misi sebelumnya, lalu proyek Misi 6 menyatukannya ke dalam portal utama.

## Teknologi

- HTML
- CSS
- JavaScript
- localStorage browser
- API jadwal shalat MyQuran

## Cara Menjalankan

1. Clone atau download repository ini.
2. Buka folder proyek.
3. Jalankan file `index.html` di browser.

Untuk pengujian yang lebih stabil, disarankan menjalankan proyek menggunakan local server, misalnya melalui ekstensi Live Server pada VS Code.

## Catatan

- Fitur jadwal imsakiyah memerlukan internet karena mengambil data dari API.
- Fitur amalan harian menyimpan data di browser lokal.
- Tampilan portal dirancang agar dapat digunakan dengan baik di perangkat desktop maupun mobile.

## Tujuan Proyek

Proyek ini dibuat sebagai latihan pengembangan web front-end dengan tema Ramadhan. Fokus utamanya adalah membuat portal yang sederhana, mudah dipakai, dan menggabungkan beberapa fitur ibadah dalam satu halaman.