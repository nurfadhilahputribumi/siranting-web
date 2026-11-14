import { useState } from "react";
import "./App.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import DataSkrining from "./pages/DataSkrining";
import Education from "./pages/Education";
import BalitaScreening from "./pages/Screening/BalitaScreening";
import RingkasanSkrining from "./pages/RingkasanSkrining";

function App() {
  const [language, setLanguage] = useState(null);
  const [page, setPage] = useState("language");
  const [showPassword, setShowPassword] = useState(false);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const isEnglish = language === "en";

const handleAdminLogin = async () => {
  setLoginError("");

  if (!adminEmail || !adminPassword) {
    setLoginError(
      isEnglish
        ? "Please enter your email and password."
        : "Silakan masukkan email dan kata sandi."
    );
    return;
  }

  try {
    // Login menggunakan Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword
    );

    const user = userCredential.user;

    // Ambil data pengguna dari Firestore
    const userDoc = await getDoc(
      doc(db, "users", user.uid)
    );

    // Pastikan data pengguna tersedia
    if (!userDoc.exists()) {
      setLoginError(
        isEnglish
          ? "User data was not found."
          : "Data pengguna tidak ditemukan."
      );

      await auth.signOut();
      return;
    }

    const userData = userDoc.data();

    // Periksa role pengguna
    if (userData.role !== "admin") {
      setLoginError(
        isEnglish
          ? "You do not have permission to access the admin dashboard."
          : "Anda tidak memiliki akses ke dashboard admin."
      );

      await auth.signOut();
      return;
    }

    // Jika role = admin
    setPage("admin-dashboard");

  } catch (error) {
    console.error(error);

    setLoginError(
      isEnglish
        ? "Invalid email or password."
        : "Email atau kata sandi salah."
    );
  }
};

  // =========================
  // HALAMAN PILIHAN BAHASA
  // =========================
  if (page === "language") {
    return (
      <div className="language-page">
        <div className="language-card">

          <img
            src="/splashscreen.png"
            alt="SIRANTING"
            className="siranting-logo"
          />

          <h1>
            {isEnglish
              ? "Welcome to SIRANTING"
              : "Selamat Datang di SIRANTING"}
          </h1>

          <p className="subtitle">
            {isEnglish
              ? "Stunting Risk Screening System"
              : "Sistem Skrining Risiko Stunting"}
          </p>

          <h2>
            {isEnglish
              ? "Select Language"
              : "Pilih Bahasa"}
          </h2>

          <div className="language-buttons">

            <button
              className="language-button"
              onClick={() => {
                setLanguage("id");
                setPage("info");
              }}
            >
              <span className="language-code">ID</span>
              <span>Bahasa Indonesia</span>
            </button>

            <button
              className="language-button"
              onClick={() => {
                setLanguage("en");
                setPage("info");
              }}
            >
              <span className="language-code">ENG</span>
              <span>English</span>
            </button>

          </div>

        </div>
      </div>
    );
  }

  // =========================
  // HALAMAN PENJELASAN
  // =========================
  if (page === "info") {
    return (
      <div className="info-page">

        <div className="info-container">

          <img
            src="/onboarding.png"
            alt="SIRANTING"
            className="info-logo"
          />

          <button
            className="back-button"
            onClick={() => setPage("language")}
          >
            ← {isEnglish ? "Back" : "Kembali"}
          </button>

          <h1 className="info-title">
            SIRANTING
          </h1>

          <p className="info-description">
            {isEnglish
              ? "Stunting Risk Screening System for Mothers with Babies Aged 0–24 Months"
              : "Sistem Skrining Risiko Stunting untuk Ibu dengan Bayi Usia 0–24 Bulan"}
          </p>

          <div className="info-cards">

            <div className="info-card">

              <h2>
                {isEnglish ? "Benefits" : "Manfaat Aplikasi"}
              </h2>

              <div className="benefit-item">
                ✓{" "}
                {isEnglish
                  ? "Helps identify stunting risk early"
                  : "Membantu mengidentifikasi risiko stunting secara dini"}
              </div>

              <div className="benefit-item">
                ✓{" "}
                {isEnglish
                  ? "Supports monitoring of baby growth and health"
                  : "Mendukung pemantauan pertumbuhan dan kesehatan bayi"}
              </div>

              <div className="benefit-item">
                ✓{" "}
                {isEnglish
                  ? "Provides screening results quickly and easily"
                  : "Memberikan hasil skrining secara cepat dan mudah"}
              </div>

            </div>

            <div className="info-card">

              <h2>
                {isEnglish ? "How to Use" : "Cara Penggunaan"}
              </h2>

              <div className="step-item">
                1.{" "}
                {isEnglish
                  ? "Select the baby screening service"
                  : "Pilih layanan skrining bayi"}
              </div>

              <div className="step-item">
                2.{" "}
                {isEnglish
                  ? "Fill in the form according to the baby's condition"
                  : "Isi formulir sesuai kondisi bayi"}
              </div>

              <div className="step-item">
                3.{" "}
                {isEnglish
                  ? "Review the entered information"
                  : "Periksa kembali data yang telah diisi"}
              </div>

              <div className="step-item">
                4.{" "}
                {isEnglish
                  ? "View the screening risk result"
                  : "Lihat hasil analisis risiko skrining"}
              </div>

            </div>

          </div>

          <button
            className="start-button"
            onClick={() => setPage("home")}
          >
            {isEnglish ? "START NOW" : "MULAI SEKARANG"}
          </button>

        </div>
      </div>
    );
  }

// =========================
// SKRINING BALITA
// =========================
if (page === "screening") {
  return (
    <BalitaScreening
      language={language}
      onBack={() => setPage("home")}
    />
  );
}

// =========================
// DATA SKRINING
// =========================
if (page === "data-skrining") {
  return (
    <DataSkrining
      language={language}
      onBack={() => setPage("admin-dashboard")}
    />
  );
}

// =========================
// RINGKASAN SKRINING
// =========================
if (page === "ringkasan-skrining") {
  return (
    <RingkasanSkrining
      language={language}
      onBack={() => setPage("admin-dashboard")}
    />
  );
}

// =========================
// EDUKASI
// =========================
if (page === "education") {
  return (
    <Education
      language={language}
      onBack={() => setPage("home")}
    />
  );
}

// =========================
// DASHBOARD ADMIN
// =========================
if (page === "admin-dashboard") {
  return (
    <div className="admin-dashboard-page">

      <header className="admin-dashboard-header">
        <div>
          <h1>SIRANTING</h1>
          <p>
            {isEnglish
              ? "Admin Dashboard"
              : "Dashboard Admin"}
          </p>
        </div>

        <button
          className="admin-logout-button"
          onClick={() => {
            setPage("admin");
            setAdminEmail("");
            setAdminPassword("");
          }}
        >
          {isEnglish ? "Logout" : "Keluar"}
        </button>
      </header>

      <main className="admin-dashboard-content">

        <h2>
          {isEnglish
            ? "Welcome, Admin"
            : "Selamat Datang, Admin"}
        </h2>

        <p className="admin-dashboard-description">
          {isEnglish
            ? "Manage and view SIRANTING screening data."
            : "Kelola dan lihat data hasil skrining SIRANTING."}
        </p>

        <div className="admin-menu-grid">

          <div className="admin-menu-card">
            <div className="admin-menu-icon">📋</div>

            <h3>
              {isEnglish
                ? "Screening Data"
                : "Data Skrining"}
            </h3>

            <p>
              {isEnglish
                ? "View screening data submitted by users."
                : "Melihat data skrining yang telah diisi pengguna."}
            </p>

            <button
              onClick={() => setPage("data-skrining")}
            >
              {isEnglish
                ? "View Data"
                : "Lihat Data"}
            </button>
          </div>

          <div className="admin-menu-card">
            <div className="admin-menu-icon">📊</div>

            <h3>
              {isEnglish
                ? "Screening Summary"
                : "Ringkasan Skrining"}
            </h3>

            <p>
              {isEnglish
                ? "View the screening results summary."
                : "Melihat ringkasan hasil skrining."}
            </p>

            <button
              onClick={() => setPage("ringkasan-skrining")}
            >
              {isEnglish
                ? "View Summary"
                : "Lihat Ringkasan"}
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}

// =========================
// LOGIN ADMIN
// =========================
if (page === "admin") {
  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <img
          src="/splashscreen.png"
          alt="SIRANTING"
          className="admin-logo"
        />

        <h1>
          {isEnglish ? "Admin Login" : "Login Admin"}
        </h1>

        <p className="admin-subtitle">
          {isEnglish
            ? "Sign in to access the admin dashboard"
            : "Masuk untuk mengakses dashboard admin"}
        </p>

        <div className="admin-form">

          <label>
            {isEnglish ? "Email" : "Email"}
          </label>

          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            placeholder={
              isEnglish
                ? "Enter admin email"
                : "Masukkan email admin"
            }
          />

          <label>
            {isEnglish ? "Password" : "Kata Sandi"}
          </label>

          <div className="password-wrapper">

            <input
              type={showPassword ? "text" : "password"}
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder={
                isEnglish
                  ? "Enter password"
                  : "Masukkan kata sandi"
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          {loginError && (
            <p className="login-error">
              {loginError}
            </p>
          )}

          <button
            className="admin-login-button"
            onClick={handleAdminLogin}
          >
            {isEnglish ? "LOGIN" : "MASUK"}
          </button>

        </div>

        <button
          className="admin-back-button"
          onClick={() => {
            setPage("home");
            setShowPassword(false);
          }}
        >
          ← {isEnglish ? "Back" : "Kembali"}
        </button>

      </div>

    </div>
  );
}

// =========================
// BERANDA
// =========================
if (page === "home") {
  return (
    <div className="home-page">

      {/* Header */}
      <header className="home-header">
        <div className="home-header-content">
          <h1>SIRANTING</h1>

          <span className="language-indicator">
            {language === "id" ? "ID" : "ENG"}
          </span>
        </div>
      </header>

      <main className="home-container">

        {/* Gambar utama */}
        <img
          src="/home.png"
          alt="SIRANTING"
          className="home-image"
        />

        {/* Selamat Datang */}
        <section className="welcome-card">

          <h2>
            {isEnglish
              ? "Welcome 👋"
              : "Selamat Datang 👋"}
          </h2>

          <p>
            {isEnglish
              ? "Choose an available service to perform stunting risk screening and access health education materials."
              : "Pilih layanan yang tersedia untuk melakukan skrining risiko stunting dan mengakses materi edukasi kesehatan."}
          </p>

        </section>

        {/* Skrining Bayi */}
        <button
          className="service-card"
          onClick={() => setPage("screening")}
        >

          <div className="service-icon">
            👶
          </div>

          <div className="service-content">

            <h2>
              {isEnglish
                ? "Baby Screening 0–24 Months"
                : "Skrining Bayi 0–24 Bulan"}
            </h2>

            <p>
              {isEnglish
                ? "Analysis of stunting risk factors in babies aged 0–24 months."
                : "Analisis faktor risiko stunting pada bayi usia 0–24 bulan."}
            </p>

          </div>

        </button>

        {/* Edukasi */}
        <button
          className="service-card"
          onClick={() => setPage("education")}
        >

          <div className="service-icon">
            🎓
          </div>

          <div className="service-content">

            <h2>
              {isEnglish
                ? "Stunting Education"
                : "Edukasi Stunting"}
            </h2>

            <p>
              {isEnglish
                ? "Learning videos and health education materials."
                : "Video pembelajaran dan materi edukasi kesehatan."}
            </p>

          </div>

        </button>

      </main>

      {/* Footer */}
      <footer className="home-footer">

        <h3>
          {isEnglish
            ? "Medical Screening System"
            : "Sistem Skrining Medis"}
        </h3>

        <p>
          SIRANTING v1.0
        </p>

        <button
          className="admin-footer-button"
          onClick={() => setPage("admin")}
        >
          {isEnglish ? "Admin" : "Admin"}
        </button>

      </footer>

    </div>
  );
  }
}

export default App;