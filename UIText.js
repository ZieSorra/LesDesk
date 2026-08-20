// ============================================================
// LESDESK - UI TEXT
// ============================================================
// Pusat teks antarmuka LESDESK.
// Tidak berhubungan dengan backend / database.
// ============================================================

const UI_TEXT = {

    // ========================================================
    // BRAND & SIDEBAR
    // ========================================================

    "brand-name": "LESDESK",
    "brand-subtitle": "School Administration",
    "navigation-caption": "Menu Utama",

    "nav-dashboard": "Dashboard",
    "nav-students": "Siswa",
    "nav-classes": "Kelas",
        "classes-page-title": "Kelas",
        "classes-page-description":
        "Daftar kelas berdasarkan data siswa.",
    "nav-invoices": "Tagihan",
    "nav-payments": "Pembayaran",
    "nav-reports": "Laporan",
    "nav-student-statement": "Pernyataan Siswa",
    "nav-history": "Riwayat",
    "nav-settings": "Pengaturan",

    "collapse-label": "Ciutkan Menu",
    "sidebar-footer": "LESDESK • School Administration",

    // ========================================================
    // HEADER
    // ========================================================

    "search-placeholder": "Cari...",
    "administrator-name": "Administrator",
    "administrator-role": "Admin Sekolah",

    "notification-title": "Notifikasi",
    "notification-description": "Tidak ada notifikasi baru.",

    // ========================================================
    // DASHBOARD
    // ========================================================

    "dashboard-page-title": "Dashboard",
    "dashboard-page-description":
        "Ringkasan administrasi sekolah.",

    "revenue-chart-title": "Pendapatan",
    "revenue-chart-subtitle":
        "Ringkasan pendapatan bulanan.",

    "recent-payments-title": "Pembayaran Terbaru",
    "recent-payments-subtitle":
        "Daftar pembayaran terbaru.",

    "payments-col-receipt": "No. Kwitansi",
    "payments-col-student": "Siswa",
    "payments-col-amount": "Nominal",
    "payments-col-status": "Status",

    "view-all-payments-button":
        "Lihat Semua Pembayaran",

    "summary-card-title": "Ringkasan Keuangan",
    "summary-card-subtitle":
        "Informasi pembayaran sekolah.",

    "summary-outstanding-label":
        "Total Belum Dibayar",

    "summary-unpaid-label":
        "Belum Dibayar",

    "summary-due-today-label":
        "Jatuh Tempo Hari Ini",

    "summary-due-week-label":
        "Jatuh Tempo Minggu Ini",

    "activity-card-title": "Aktivitas Terbaru",
    "activity-card-subtitle":
        "Aktivitas administrasi terbaru.",

    "view-statement-button":
        "Lihat Pernyataan",

    "view-full-history-button":
        "Lihat Riwayat Lengkap",

    // ========================================================
    // SISWA
    // ========================================================

    "students-page-title": "Siswa",
    "students-page-description":
        "Kelola data siswa sekolah.",

    "add-student-button":
        "Tambah Siswa",

    "students-search-placeholder":
        "Cari berdasarkan NIS atau nama siswa...",

    "students-col-nis": "NIS",
    "students-col-name": "Nama Siswa",
    "students-col-class": "Kelas",
    "students-col-phone": "No. Telepon",
    "students-col-status": "Status",

    "students-empty":
        "Tidak ada data siswa.",

    // ========================================================
    // TAGIHAN
    // ========================================================

    "invoices-page-title": "Tagihan",
    "invoices-page-description":
        "Kelola tagihan siswa.",

    "generate-invoice-button":
        "Buat Tagihan",

    "invoices-search-placeholder":
        "Cari nomor tagihan atau nama siswa...",

    "invoices-col-number":
        "No. Tagihan",

    "invoices-col-student":
        "Siswa",

    "invoices-col-class":
        "Kelas",

    "invoices-col-period":
        "Periode",

    "invoices-col-amount":
        "Nominal",

    "invoices-col-status":
        "Status",

    // ========================================================
    // PEMBAYARAN
    // ========================================================

    "payments-page-title": "Pembayaran",
    "payments-page-description":
        "Kelola transaksi pembayaran siswa.",

    "record-payment-button":
        "Catat Pembayaran",

    "payments-search-placeholder":
        "Cari pembayaran...",

    "payments-col-payment-no":
        "No. Pembayaran",

    "payments-col-invoice-no":
        "No. Tagihan",

    "payments-col-student-name":
        "Nama Siswa",

    "payments-col-date":
        "Tanggal",

    "payments-col-amount":
        "Nominal",

    "payments-col-method":
        "Metode",

    // ========================================================
    // LAPORAN
    // ========================================================

    "reports-page-title": "Laporan",
    "reports-page-description":
        "Ringkasan dan analisis administrasi sekolah.",

    "monthly-revenue-title":
        "Pendapatan Bulanan",

    "monthly-revenue-subtitle":
        "Perkembangan pendapatan setiap bulan.",

    "payment-method-title":
        "Metode Pembayaran",

    "payment-method-subtitle":
        "Distribusi pembayaran berdasarkan metode.",

    "invoice-status-title":
        "Status Tagihan",

    "invoice-status-subtitle":
        "Ringkasan status tagihan siswa.",

    "collection-rate-title":
        "Tingkat Penagihan",

    "collection-rate-subtitle":
        "Persentase tagihan yang telah dibayarkan.",

    "outstanding-students-title":
        "Siswa dengan Tagihan",

    "outstanding-col-name":
        "Nama Siswa",

    "outstanding-col-class":
        "Kelas",

    "outstanding-col-amount":
        "Tagihan",

    // ========================================================
    // PERNYATAAN SISWA
    // ========================================================

    "statement-page-title":
        "Pernyataan Siswa",

    "statement-page-description":
        "Lihat riwayat tagihan dan pembayaran siswa.",

    "student-selector-title":
        "Pilih Siswa",

    "student-profile-card":
        "Profil Siswa",

    "invoice-history-title":
        "Riwayat Tagihan",

    "statement-invoice-col-number":
        "No. Tagihan",

    "statement-invoice-col-period":
        "Periode",

    "statement-invoice-col-amount":
        "Nominal",

    "statement-invoice-col-paid":
        "Dibayar",

    "statement-payment-col-date":
        "Tanggal",

    "statement-payment-col-method":
        "Metode",

    "statement-payment-col-amount":
        "Nominal",

    // ========================================================
    // SETTINGS
    // ========================================================

    "settings-page-title":
        "Pengaturan",

    "settings-page-description":
        "Kelola konfigurasi aplikasi dan data sekolah.",

    // Tabs
    "school-profile-tab":
        "Profil Sekolah",

    "academic-year-tab":
        "Tahun Akademik",

    "financial-config-tab":
        "Konfigurasi Keuangan",

    "application-settings-tab":
        "Pengaturan Aplikasi",

    "data-management-tab":
        "Manajemen Data",

    "export-center-tab":
        "Pusat Ekspor",

    "about-system-tab":
        "Tentang Sistem",

    // ========================================================
    // SCHOOL PROFILE
    // ========================================================

    "school-logo-title":
        "Logo Sekolah",

    "school-info-title":
        "Informasi Sekolah",

    "school-name-label":
        "Nama Sekolah",

    "school-npsn-label":
        "NPSN",

    "school-address-label":
        "Alamat",

    "school-principal-label":
        "Kepala Sekolah",

    "school-phone-label":
        "Nomor Telepon",

    "school-email-label":
        "Email",

    "school-academic-year-label":
        "Tahun Akademik",

    "profile-school-name-label":
        "Nama Sekolah",

    "profile-npsn-label":
        "NPSN",

    "profile-principal-label":
        "Kepala Sekolah",

    "profile-academic-year-label":
        "Tahun Akademik",

    "profile-contact-label":
        "Kontak",

    "profile-save-button":
        "Simpan Perubahan",

    "profile-reset-button":
        "Reset",

    // ========================================================
    // ACADEMIC YEAR
    // ========================================================

    "current-academic-year-title":
        "Tahun Akademik Saat Ini",

    "current-academic-year-subtitle":
        "Tentukan tahun akademik yang sedang digunakan.",

    "select-academic-year-label":
        "Tahun Akademik",

    "add-academic-year-button":
        "Tambah Tahun Akademik",

    "semester-title":
        "Semester",

    "semester-subtitle":
        "Tentukan semester aktif.",

    "semester-odd-label":
        "Semester Ganjil",

    "semester-even-label":
        "Semester Genap",

    "academic-calendar-title":
        "Kalender Akademik",

    "academic-calendar-subtitle":
        "Tentukan periode kalender akademik.",

    "start-date-label":
        "Tanggal Mulai",

    "end-date-label":
        "Tanggal Selesai",

    "academic-year-status-title":
        "Status Tahun Akademik",

    "academic-year-status-subtitle":
        "Tentukan status tahun akademik.",

    "year-status-active-label":
        "Aktif",

    "year-status-inactive-label":
        "Tidak Aktif",

    "academic-year-summary-title":
        "Ringkasan Tahun Akademik",

    "summary-academic-year-label":
        "Tahun Akademik",

    "summary-semester-label":
        "Semester",

    "summary-start-date-label":
        "Tanggal Mulai",

    "summary-end-date-label":
        "Tanggal Selesai",

    "summary-year-status-label":
        "Status",

    "academic-year-save-button":
        "Simpan Tahun Akademik",

    "academic-year-cancel-button":
        "Batal",

    "academic-year-history-title":
        "Riwayat Tahun Akademik",

    "history-col-year":
        "Tahun Akademik",

    "history-col-semester":
        "Semester",

    "history-col-start-date":
        "Tanggal Mulai",

    "history-col-end-date":
        "Tanggal Selesai",

    "history-col-status":
        "Status",

    "history-col-actions":
        "Aksi",

    // ========================================================
    // FINANCIAL CONFIGURATION
    // ========================================================

    "invoice-numbering-title":
        "Penomoran Tagihan",

    "invoice-numbering-subtitle":
        "Atur format nomor tagihan.",

    "invoice-prefix-label":
        "Prefix Tagihan",

    "invoice-number-format-label":
        "Format Nomor",

    "payment-numbering-title":
        "Penomoran Pembayaran",

    "payment-numbering-subtitle":
        "Atur format nomor pembayaran.",

    "payment-prefix-label":
        "Prefix Pembayaran",

    "currency-symbol-label":
        "Simbol Mata Uang",

    "currency-decimals-label":
        "Jumlah Desimal",

    "thousands-separator-label":
        "Pemisah Ribuan",

    "decimal-separator-label":
        "Pemisah Desimal",

    "payment-rules-title":
        "Aturan Pembayaran",

    "payment-rules-subtitle":
        "Atur ketentuan pembayaran.",

    "due-date-days-label":
        "Batas Jatuh Tempo",

    "grace-period-label":
        "Masa Tenggang",

    "reminder-label":
        "Pengingat",

    "financial-config-summary-title":
        "Ringkasan Konfigurasi Keuangan",

    "summary-invoice-preview-label":
        "Format Tagihan",

    "summary-payment-preview-label":
        "Format Pembayaran",

    "summary-currency-label":
        "Mata Uang",

    "summary-due-date-label":
        "Jatuh Tempo",

    "summary-partial-payment-label":
        "Pembayaran Sebagian",

    "financial-config-save-button":
        "Simpan Konfigurasi",

    "financial-config-reset-button":
        "Reset",

    // ========================================================
    // APPLICATION SETTINGS
    // ========================================================

    "appearance-title":
        "Tampilan",

    "theme-label":
        "Tema",

    "accent-color-label":
        "Warna Aksen",

    "localization-title":
        "Bahasa & Lokalisasi",

    "language-label":
        "Bahasa",

    "date-format-label":
        "Format Tanggal",

    "timezone-label":
        "Zona Waktu",

    "app-settings-summary-title":
        "Ringkasan Pengaturan Aplikasi",

    "summary-app-theme-label":
        "Tema",

    "summary-app-language-label":
        "Bahasa",

    "summary-app-date-format-label":
        "Format Tanggal",

    "summary-app-timezone-label":
        "Zona Waktu",

    "summary-app-rows-per-page-label":
        "Baris per Halaman",

    "summary-app-landing-label":
        "Halaman Awal",

    "summary-app-accessibility-label":
        "Aksesibilitas",

    "app-settings-save-button":
        "Simpan Pengaturan",

    "app-settings-reset-button":
        "Reset",

    // ========================================================
    // DATA MANAGEMENT
    // ========================================================

    "database-overview-title":
        "Ringkasan Database",

    "database-overview-subtitle":
        "Informasi data yang tersimpan.",

    "import-export-title":
        "Impor & Ekspor Data",

    "import-export-subtitle":
        "Kelola pemindahan data aplikasi.",

    // ========================================================
    // EXPORT CENTER
    // ========================================================

    "export-type-title":
        "Jenis Ekspor",

    "export-type-subtitle":
        "Pilih data yang ingin diekspor.",

    "export-type-students":
        "Data Siswa",

    "export-type-invoices":
        "Data Tagihan",

    "export-type-payments":
        "Data Pembayaran",

    "export-type-financial":
        "Data Keuangan",

    "export-type-outstanding":
        "Tagihan Belum Lunas",

    "export-type-statement":
        "Pernyataan Siswa",

    "export-type-dashboard":
        "Dashboard",

    "export-filters-card":
        "Filter Ekspor",

    // ========================================================
    // PLACEHOLDER / GENERAL
    // ========================================================

    "placeholder-title":
        "Belum Tersedia",

    "placeholder-description":
        "Fitur ini sedang dalam tahap pengembangan.",

    "return-dashboard-button":
        "Kembali ke Dashboard"
};


// ============================================================
// HELPER
// ============================================================

function humanizeTemplateId(id) {

    if (!id) {
        return "";
    }

    return id
        .replace(/[-_]+/g, " ")
        .replace(/\bcol\b/gi, "")
        .replace(/\bpage\b/gi, "")
        .replace(/\btitle\b/gi, "")
        .replace(/\bdescription\b/gi, "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, char =>
            char.toUpperCase()
        );
}


// ============================================================
// APPLY TEXT
// ============================================================

function applyUIText() {

    let applied = 0;
    let missing = [];

    /*
     * 1. Elemen teks
     *
     * Hanya .canva-text.
     *
     * Ini penting agar data-template-id pada
     * article/card/container tidak menghancurkan
     * isi HTML di dalamnya.
     */

    document
        .querySelectorAll(
            '[data-template-id].canva-text'
        )
        .forEach(element => {

            const key =
                element.dataset.templateId;

            if (
                Object.prototype.hasOwnProperty.call(
                    UI_TEXT,
                    key
                )
            ) {

                element.textContent =
                    UI_TEXT[key];

                applied++;

            } else {

                /*
                 * Fallback sementara agar tidak
                 * ada teks kosong.
                 */

                const fallback =
                    humanizeTemplateId(key);

                if (fallback) {

                    element.textContent =
                        fallback;

                    missing.push(key);
                }
            }
        });


    /*
     * 2. Placeholder input
     */

    document
        .querySelectorAll(
            'input[data-template-id]'
        )
        .forEach(input => {

            const key =
                input.dataset.templateId;

            if (
                Object.prototype.hasOwnProperty.call(
                    UI_TEXT,
                    key
                )
            ) {

                input.placeholder =
                    UI_TEXT[key];

                applied++;
            }
        });


    /*
     * 3. Button dengan data-template-id
     *
     * Jangan menggunakan textContent langsung
     * karena button mungkin memiliki icon.
     */

    document
        .querySelectorAll(
            'button[data-template-id]'
        )
        .forEach(button => {

            const key =
                button.dataset.templateId;

            const text =
                UI_TEXT[key] ||
                humanizeTemplateId(key);

            if (!text) {
                return;
            }

            /*
             * Jika sudah ada label yang dibuat
             * sebelumnya, update saja.
             */

            let label =
                button.querySelector(
                    ".ui-template-label"
                );

            if (!label) {

                label =
                    document.createElement("span");

                label.className =
                    "ui-template-label";

                button.appendChild(label);
            }

            label.textContent = text;

            applied++;
        });


    /*
     * 4. Debug
     */

    console.log(
        "[LESDESK] UI text applied:",
        applied
    );

    if (missing.length > 0) {

        console.warn(
            "[LESDESK] UI text menggunakan fallback:",
            [...new Set(missing)]
        );
    }
}


// ============================================================
// PUBLIC HELPER
// ============================================================

window.UI_TEXT = UI_TEXT;
window.applyUIText = applyUIText;


// ============================================================
// AUTO INITIALIZE
// ============================================================

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        applyUIText
    );

} else {

    applyUIText();
}