import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function RingkasanSkrining({ language, onBack }) {
  const isEnglish = language === "en";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const snapshot = await getDocs(
          collection(db, "screeningBalita")
        );

        const screeningData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(screeningData);

      } catch (err) {
        console.error("Error mengambil data:", err);

        setError(
          isEnglish
            ? "Failed to load screening summary."
            : "Gagal mengambil ringkasan skrining."
        );

      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isEnglish]);


  // ==================================================
  // PERHITUNGAN RINGKASAN
  // ==================================================

  const totalData = data.length;

  const risikoRendah = data.filter(
    (item) => item.category === "Risiko Rendah"
  ).length;

  const risikoSedang = data.filter(
    (item) => item.category === "Risiko Sedang"
  ).length;

  const risikoTinggi = data.filter(
    (item) => item.category === "Risiko Tinggi"
  ).length;


  return (
    <div className="screening-data-page">

      {/* HEADER */}
      <header className="screening-data-header">

        <div>
          <h1>SIRANTING</h1>

          <p>
            {isEnglish
              ? "Screening Summary"
              : "Ringkasan Skrining"}
          </p>
        </div>

        <button
          className="screening-back-button"
          onClick={onBack}
        >
          ← {isEnglish ? "Back" : "Kembali"}
        </button>

      </header>


      {/* CONTENT */}
      <main className="screening-data-container">

        <h2>
          {isEnglish
            ? "Screening Summary"
            : "Ringkasan Hasil Skrining"}
        </h2>

        <p className="screening-data-description">
          {isEnglish
            ? "Summary of screening results submitted by SIRANTING users."
            : "Ringkasan hasil skrining yang telah diisi oleh pengguna SIRANTING."}
        </p>


        {/* LOADING */}
        {loading && (
          <div className="screening-status">
            {isEnglish
              ? "Loading data..."
              : "Memuat data..."}
          </div>
        )}


        {/* ERROR */}
        {error && (
          <div className="screening-error">
            {error}
          </div>
        )}


        {/* SUMMARY */}
        {!loading && !error && (

          <div className="admin-summary-grid">

            {/* TOTAL */}
            <div className="admin-summary-card">

              <div className="admin-summary-icon">
                📋
              </div>

              <h3>
                {isEnglish
                  ? "Total Screening"
                  : "Total Skrining"}
              </h3>

              <div className="admin-summary-number">
                {totalData}
              </div>

            </div>


            {/* RISIKO RENDAH */}
            <div className="admin-summary-card">

              <div className="admin-summary-icon">
                🟢
              </div>

              <h3>
                {isEnglish
                  ? "Low Risk"
                  : "Risiko Rendah"}
              </h3>

              <div className="admin-summary-number">
                {risikoRendah}
              </div>

            </div>


            {/* RISIKO SEDANG */}
            <div className="admin-summary-card">

              <div className="admin-summary-icon">
                🟡
              </div>

              <h3>
                {isEnglish
                  ? "Moderate Risk"
                  : "Risiko Sedang"}
              </h3>

              <div className="admin-summary-number">
                {risikoSedang}
              </div>

            </div>


            {/* RISIKO TINGGI */}
            <div className="admin-summary-card">

              <div className="admin-summary-icon">
                🔴
              </div>

              <h3>
                {isEnglish
                  ? "High Risk"
                  : "Risiko Tinggi"}
              </h3>

              <div className="admin-summary-number">
                {risikoTinggi}
              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default RingkasanSkrining;