import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function DataSkrining({ language, onBack }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const isEnglish = language === "en";

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
            ? "Failed to load screening data."
            : "Gagal mengambil data skrining."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isEnglish]);


  // ==================================================
  // FILTER DATA
  // ==================================================

  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      (item.namaAnak || "")
        .toLowerCase()
        .includes(keyword) ||
      (item.namaIbu || "")
        .toLowerCase()
        .includes(keyword)
    );
  });


  // ==================================================
  // FORMAT TANGGAL
  // ==================================================

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";

    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString(
          isEnglish ? "en-GB" : "id-ID",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );
      }

      return "-";
    } catch {
      return "-";
    }
  };


  // ==================================================
  // KATEGORI RISIKO
  // ==================================================

  const getCategory = (category) => {
    if (!category) return "-";

    if (isEnglish) {
      if (category === "Risiko Rendah") {
        return "Low Risk";
      }

      if (category === "Risiko Sedang") {
        return "Moderate Risk";
      }

      if (category === "Risiko Tinggi") {
        return "High Risk";
      }
    }

    return category;
  };


  // ==================================================
  // AMBIL JAWABAN
  // ==================================================

  const getAnswer = (key) => {
    if (!selectedData) return "-";

    return selectedData.jawaban?.[key] || "-";
  };

  // ==================================================
// DOWNLOAD DATA CSV
// ==================================================
const downloadCSV = () => {
  if (data.length === 0) {
    alert(
      isEnglish
        ? "No screening data available."
        : "Tidak ada data skrining."
    );
    return;
  }

  const headers = [
    "Nama Ibu",
    "Usia Ibu",
    "Tinggi Ibu",
    "Pendidikan Ibu",
    "Pekerjaan Ibu",

    "Nama Anak",
    "Usia Anak",
    "Jenis Kelamin",
    "Anak Ke",
    "Riwayat Kelahiran",

    "Usia Ibu Saat Hamil",
    "Tinggi Ibu",
    "Pendidikan",
    "Jumlah Anak",
    "Jarak Kelahiran",
    "KEK",
    "Anemia Ibu",
    "Tablet Fe",

    "Kelahiran Kembar",
    "Prematur",
    "Berat Lahir Rendah",
    "Panjang Lahir Pendek",
    "IMD",
    "ASI Eksklusif",
    "Imunisasi",
    "Kenaikan Berat Badan",
    "Penimbangan Balita",
    "Pengukuran Panjang",
    "Vitamin A",
    "Anemia Anak",
    "ISPA",
    "Pneumonia",
    "Diare",
    "Parasit",
    "Kebiasaan Tidur",
    "Konsumsi Karbohidrat",
    "Protein Hewani",

    "Tinggi / Panjang Badan",
    "Berat Badan",

    "Jumlah Balita di Rumah",
    "Pendapatan Keluarga",
    "Buku KIA",
    "JKN",
    "Jamban",
    "Air Bersih",
    "Lingkungan Rumah",
    "Air Minum",
    "Cuci Tangan",

    "Skor",
    "Kategori Risiko",
    "TB/PB",
    "BB/U",
    "Tanggal",
  ];

  const rows = data.map((item) => {
    const answer = item.jawaban || {};

    return [
      item.namaIbu || "",
      item.usiaIbu || "",
      item.tinggiIbu || "",
      answer.pendidikanIbu || "",
      item.pekerjaanIbu || "",

      item.namaAnak || "",
      item.usiaBayi || "",
      answer.childGender || "",
      item.anakKe || "",
      answer.kelahiran || "",

      answer.usiaIbuHamil || "",
      answer.tinggiIbuRisk || "",
      answer.pendidikanRisk || "",
      answer.jumlahAnakRisk || "",
      answer.jarakKelahiran || "",
      answer.kek || "",
      answer.anemiaIbu || "",
      answer.feTablet || "",

      answer.kelahiranKembar || "",
      answer.prematur || "",
      answer.birthWeightRisk || "",
      answer.shortBirthLength || "",
      answer.imd || "",
      answer.exclusiveBreastfeeding || "",
      answer.immunization || "",
      answer.kenaikanberat || "",
      answer.timbangbalita || "",
      answer.ukurpanjang || "",
      answer.vitaminA || "",
      answer.anemiaAnak || "",
      answer.ispa || "",
      answer.pneumonia || "",
      answer.diarrhea || "",
      answer.parasit || "",
      answer.sleepHabit || "",
      answer.karbohidrat || "",
      answer.proteinHewani || "",

      item.tinggiBadan ?? "",
      item.beratBadan ?? "",

      answer.jumlahBalitaRumah || "",
      answer.income || "",
      answer.kiaBook || "",
      answer.jkn || "",
      answer.toilet || "",
      answer.cleanWater || "",
      answer.homeEnvironment || "",
      answer.drinkingWater || "",
      answer.handwashing || "",

      item.score ?? "",
      getCategory(item.category),
      item.tbuStatus || "",
      item.bbuStatus || "",
      formatDate(item.createdAt),
    ];
  });

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) => {
          const text = String(value ?? "");
          return `"${text.replace(/"/g, '""')}"`;
        })
        .join(",")
    )
    .join("\n");

  const blob = new Blob(
    ["\uFEFF" + csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `data-skrining-balita-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};


  // ==================================================
  // DETAIL DATA
  // ==================================================

  if (selectedData) {
    return (
      <div className="screening-data-page">

        {/* HEADER */}
        <header className="screening-data-header">

          <div>
            <h1>SIRANTING</h1>

            <p>
              {isEnglish
                ? "Screening Data Detail"
                : "Detail Data Skrining"}
            </p>
          </div>

          <button
            className="screening-back-button"
            onClick={() => setSelectedData(null)}
          >
            ← {isEnglish ? "Back" : "Kembali"}
          </button>

        </header>


        {/* CONTENT */}
        <main className="screening-data-container">

          <h2>
            {isEnglish
              ? "Screening Data Detail"
              : "Detail Data Skrining"}
          </h2>

          <p className="screening-data-description">
            {isEnglish
              ? "Complete screening data submitted by the user."
              : "Data lengkap hasil skrining yang telah diisi oleh pengguna."}
          </p>


          {/* ==================================================
              DATA IBU
          ================================================== */}

          <section className="screening-detail-card">

            <h3>
              {isEnglish
                ? "Mother's Data"
                : "Data Ibu"}
            </h3>

            <p>
              <strong>
                {isEnglish ? "Mother's Name" : "Nama Ibu"}:
              </strong>{" "}
              {selectedData.namaIbu || "-"}
            </p>

            <p>
              <strong>
                {isEnglish ? "Mother's Age" : "Usia Ibu"}:
              </strong>{" "}
              {selectedData.usiaIbu || "-"}
            </p>

            <p>
              <strong>
                {isEnglish ? "Mother's Height" : "Tinggi Ibu"}:
              </strong>{" "}
              {selectedData.tinggiIbu || "-"}
            </p>

            <p>
              <strong>
                {isEnglish ? "Education" : "Pendidikan"}:
              </strong>{" "}
              {getAnswer("pendidikanIbu")}
            </p>

            <p>
              <strong>
                {isEnglish ? "Occupation" : "Pekerjaan"}:
              </strong>{" "}
              {selectedData.pekerjaanIbu || "-"}
            </p>

          </section>


          {/* ==================================================
              DATA ANAK
          ================================================== */}

          <section className="screening-detail-card">

            <h3>
              {isEnglish
                ? "Baby Data"
                : "Data Anak"}
            </h3>

            <p>
              <strong>
                {isEnglish ? "Baby's Name" : "Nama Anak"}:
              </strong>{" "}
              {selectedData.namaAnak || "-"}
            </p>

            <p>
              <strong>
                {isEnglish ? "Age" : "Usia"}:
              </strong>{" "}
              {selectedData.usiaBayi || "-"}{" "}
              {selectedData.usiaBayi
                ? isEnglish
                  ? "months"
                  : "bulan"
                : ""}
            </p>

            <p>
              <strong>
                {isEnglish ? "Gender" : "Jenis Kelamin"}:
              </strong>{" "}
              {getAnswer("childGender")}
            </p>

            <p>
              <strong>
                {isEnglish ? "Child Order" : "Anak Ke-"}:
              </strong>{" "}
              {selectedData.anakKe || "-"}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Birth History"
                  : "Riwayat Kelahiran"}:
              </strong>{" "}
              {getAnswer("kelahiran")}
            </p>

          </section>


          {/* ==================================================
              FAKTOR IBU
          ================================================== */}

          <section className="screening-detail-card">

            <h3>
              {isEnglish
                ? "Mother Risk Factors"
                : "Faktor Risiko Ibu"}
            </h3>

            <p>
              <strong>
                {isEnglish
                  ? "Mother's Age During Pregnancy"
                  : "Usia Ibu Saat Hamil"}:
              </strong>{" "}
              {getAnswer("usiaIbuHamil")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Mother's Height Risk"
                  : "Risiko Tinggi Ibu"}:
              </strong>{" "}
              {getAnswer("tinggiIbuRisk")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Education Risk"
                  : "Risiko Pendidikan"}:
              </strong>{" "}
              {getAnswer("pendidikanRisk")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Number of Children"
                  : "Jumlah Anak"}:
              </strong>{" "}
              {getAnswer("jumlahAnakRisk")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Birth Spacing"
                  : "Jarak Kelahiran"}:
              </strong>{" "}
              {getAnswer("jarakKelahiran")}
            </p>

            <p>
              <strong>KEK:</strong>{" "}
              {getAnswer("kek")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Mother Anemia"
                  : "Anemia Ibu"}:
              </strong>{" "}
              {getAnswer("anemiaIbu")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Iron Tablets"
                  : "Tablet Fe"}:
              </strong>{" "}
              {getAnswer("feTablet")}
            </p>

          </section>


          {/* ==================================================
              FAKTOR ANAK
          ================================================== */}

          <section className="screening-detail-card">

            <h3>
              {isEnglish
                ? "Child Risk Factors"
                : "Faktor Risiko Anak"}
            </h3>

            <p>
              <strong>
                {isEnglish
                  ? "Multiple Birth"
                  : "Kelahiran Kembar"}:
              </strong>{" "}
              {getAnswer("kelahiranKembar")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Prematurity"
                  : "Prematur"}:
              </strong>{" "}
              {getAnswer("prematur")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Low Birth Weight"
                  : "Berat Lahir Rendah"}:
              </strong>{" "}
              {getAnswer("birthWeightRisk")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Short Birth Length"
                  : "Panjang Lahir Pendek"}:
              </strong>{" "}
              {getAnswer("shortBirthLength")}
            </p>

            <p>
              <strong>IMD:</strong>{" "}
              {getAnswer("imd")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Exclusive Breastfeeding"
                  : "ASI Eksklusif"}:
              </strong>{" "}
              {getAnswer("exclusiveBreastfeeding")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Immunization"
                  : "Imunisasi"}:
              </strong>{" "}
              {getAnswer("immunization")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Weight Gain"
                  : "Kenaikan Berat Badan"}:
              </strong>{" "}
              {getAnswer("kenaikanberat")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Regular Weighing"
                  : "Penimbangan Balita"}:
              </strong>{" "}
              {getAnswer("timbangbalita")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Length Measurement"
                  : "Pengukuran Panjang"}:
              </strong>{" "}
              {getAnswer("ukurpanjang")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Vitamin A"
                  : "Vitamin A"}:
              </strong>{" "}
              {getAnswer("vitaminA")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Child Anemia"
                  : "Anemia Anak"}:
              </strong>{" "}
              {getAnswer("anemiaAnak")}
            </p>

            <p>
              <strong>ISPA:</strong>{" "}
              {getAnswer("ispa")}
            </p>

            <p>
              <strong>Pneumonia:</strong>{" "}
              {getAnswer("pneumonia")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Diarrhea"
                  : "Diare"}:
              </strong>{" "}
              {getAnswer("diarrhea")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Parasitic Infection"
                  : "Parasit"}:
              </strong>{" "}
              {getAnswer("parasit")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Sleep Habit"
                  : "Kebiasaan Tidur"}:
              </strong>{" "}
              {getAnswer("sleepHabit")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Carbohydrate Intake"
                  : "Konsumsi Karbohidrat"}:
              </strong>{" "}
              {getAnswer("karbohidrat")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Animal Protein Intake"
                  : "Protein Hewani"}:
              </strong>{" "}
              {getAnswer("proteinHewani")}
            </p>

          </section>


          {/* ==================================================
              DATA ANTROPOMETRI
          ================================================== */}

          <section className="screening-detail-card">

            <h3>
              {isEnglish
                ? "Anthropometric Data"
                : "Data Antropometri"}
            </h3>

            <p>
              <strong>
                {isEnglish
                  ? "Height / Length"
                  : "Tinggi / Panjang Badan"}:
              </strong>{" "}
              {selectedData.tinggiBadan ?? "-"}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Weight"
                  : "Berat Badan"}:
              </strong>{" "}
              {selectedData.beratBadan ?? "-"}
            </p>

          </section>


          {/* ==================================================
              FAKTOR KELUARGA
          ================================================== */}

          <section className="screening-detail-card">

            <h3>
              {isEnglish
                ? "Family Factors"
                : "Faktor Keluarga"}
            </h3>

            <p>
              <strong>
                {isEnglish
                  ? "Toddlers in Household"
                  : "Jumlah Balita di Rumah"}:
              </strong>{" "}
              {getAnswer("jumlahBalitaRumah")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Family Income"
                  : "Pendapatan Keluarga"}:
              </strong>{" "}
              {getAnswer("income")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "KIA Book"
                  : "Buku KIA"}:
              </strong>{" "}
              {getAnswer("kiaBook")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "JKN"
                  : "JKN"}:
              </strong>{" "}
              {getAnswer("jkn")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Toilet"
                  : "Jamban"}:
              </strong>{" "}
              {getAnswer("toilet")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Clean Water"
                  : "Air Bersih"}:
              </strong>{" "}
              {getAnswer("cleanWater")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Home Environment"
                  : "Lingkungan Rumah"}:
              </strong>{" "}
              {getAnswer("homeEnvironment")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Drinking Water"
                  : "Air Minum"}:
              </strong>{" "}
              {getAnswer("drinkingWater")}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Handwashing"
                  : "Cuci Tangan"}:
              </strong>{" "}
              {getAnswer("handwashing")}
            </p>

          </section>


          {/* ==================================================
              HASIL SKRINING
          ================================================== */}

          <section className="screening-detail-card">

            <h3>
              {isEnglish
                ? "Screening Result"
                : "Hasil Skrining"}
            </h3>

            <p>
              <strong>
                {isEnglish ? "Score" : "Skor"}:
              </strong>{" "}
              {selectedData.score ?? "-"}
            </p>

            <p>
              <strong>
                {isEnglish
                  ? "Risk Category"
                  : "Kategori Risiko"}:
              </strong>{" "}
              {getCategory(selectedData.category)}
            </p>

            <p>
              <strong>TB/PB:</strong>{" "}
              {selectedData.tbuStatus || "-"}
            </p>

            <p>
              <strong>BB/U:</strong>{" "}
              {selectedData.bbuStatus || "-"}
            </p>

            <p>
              <strong>
                {isEnglish ? "Date" : "Tanggal"}:
              </strong>{" "}
              {formatDate(selectedData.createdAt)}
            </p>

          </section>

        </main>

      </div>
    );
  }


  // ==================================================
  // DAFTAR DATA
  // ==================================================

  return (
    <div className="screening-data-page">

      {/* HEADER */}
      <header className="screening-data-header">

        <div>
          <h1>SIRANTING</h1>

          <p>
            {isEnglish
              ? "Screening Data"
              : "Data Skrining"}
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
            ? "Baby Screening Data"
            : "Data Skrining Bayi"}
        </h2>

        <p className="screening-data-description">
          {isEnglish
            ? "Screening data submitted by SIRANTING users."
            : "Data hasil skrining yang telah diisi oleh pengguna SIRANTING."}
        </p>


        {/* SEARCH */}
        <div className="screening-search-container">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isEnglish
                ? "Search by baby's or mother's name..."
                : "Cari berdasarkan nama bayi atau ibu..."
            }
          />

        </div>

        {/* DOWNLOAD */}

        <div className="screening-download-container">

        <button
          className="screening-download-button"
          onClick={downloadCSV}
        >
          {isEnglish
            ? "DOWNLOAD CSV"
            : "UNDUH DATA CSV"}
        </button>

      </div>


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


        {/* TABLE */}
        {!loading && !error && (
          <div className="screening-table-wrapper">

            <table className="screening-table">

              <thead>

                <tr>

                  <th>No</th>

                  <th>
                    {isEnglish
                      ? "Baby Name"
                      : "Nama Anak"}
                  </th>

                  <th>
                    {isEnglish
                      ? "Mother's Name"
                      : "Nama Ibu"}
                  </th>

                  <th>
                    {isEnglish
                      ? "Age"
                      : "Usia"}
                  </th>

                  <th>
                    {isEnglish
                      ? "Score"
                      : "Skor"}
                  </th>

                  <th>
                    {isEnglish
                      ? "Risk Category"
                      : "Kategori Risiko"}
                  </th>

                  <th>
                    {isEnglish
                      ? "Date"
                      : "Tanggal"}
                  </th>

                  <th>
                    {isEnglish
                      ? "Action"
                      : "Aksi"}
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredData.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="empty-data"
                    >
                      {isEnglish
                        ? "No screening data found."
                        : "Tidak ada data skrining."}
                    </td>

                  </tr>

                ) : (

                  filteredData.map((item, index) => (

                    <tr key={item.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {item.namaAnak || "-"}
                      </td>

                      <td>
                        {item.namaIbu || "-"}
                      </td>

                      <td>
                        {item.usiaBayi !== undefined &&
                        item.usiaBayi !== ""
                          ? `${item.usiaBayi} ${
                              isEnglish
                                ? "months"
                                : "bulan"
                            }`
                          : "-"}
                      </td>

                      <td>
                        {item.score ?? "-"}
                      </td>

                      <td>
                        <span className="risk-badge">
                          {getCategory(item.category)}
                        </span>
                      </td>

                      <td>
                        {formatDate(item.createdAt)}
                      </td>

                      <td>

                        <button
                          className="screening-detail-button"
                          onClick={() =>
                            setSelectedData(item)
                          }
                        >
                          {isEnglish
                            ? "View Detail"
                            : "Lihat Detail"}
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>
        )}


        {/* TOTAL DATA */}
        {!loading && !error && (
          <p className="screening-total">

            {isEnglish
              ? `Total data: ${filteredData.length}`
              : `Jumlah data: ${filteredData.length}`}

          </p>
        )}

      </main>

    </div>
  );
}

export default DataSkrining;