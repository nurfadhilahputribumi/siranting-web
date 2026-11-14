import { useState } from "react";

import {
  calculateBalitaScore,
} from "../../util/screeningCalculator";

import { saveBalitaScreening } from "../../screeningService";

function BalitaScreening({ language, onBack }) {
  const isEnglish = language === "en";

  const [step, setStep] = useState(1);

  const [result, setResult] = useState(null);

const [form, setForm] = useState({
  // =========================
  // KARAKTERISTIK IBU
  // TIDAK DISKOR
  // =========================
  namaIbu: "",
  usiaIbu: "",
  tinggiIbu: "",
  pendidikanIbu: null,
  pekerjaanIbu: "",

  // =========================
  // KARAKTERISTIK ANAK
  // TIDAK DISKOR
  // =========================
  namaAnak: "",
  usiaBayi: "",
  childGender: null,
  anakKe: "",
  kelahiran: null,

  // =========================
  // FAKTOR IBU
  // =========================
  usiaIbuHamil: null,
  tinggiIbuRisk: null,
  pendidikanRisk: null,
  jumlahAnakRisk: null,
  jarakKelahiran: null,
  kek: null,
  anemiaIbu: null,
  feTablet: null,

  // =========================
  // FAKTOR ANAK
  // =========================
  kelahiranKembar: null,
  prematur: null,
  birthWeightRisk: null,
  shortBirthLength: null,

  imd: null,
  exclusiveBreastfeeding: null,
  immunization: null,
  kenaikanberat: null,
  timbangbalita: null,
  ukurpanjang: null,

  tinggiBadan: null,
  beratBadan: null,

  vitaminA: null,
  anemiaAnak: null,
  ispa: null,
  pneumonia: null,
  diarrhea: null,
  parasit: null,
  sleepHabit: null,
  karbohidrat: null,
  proteinHewani: null,

  // =========================
  // FAKTOR KELUARGA
  // =========================
  jumlahBalitaRumah: null,
  income: null,
  kiaBook: null,
  jkn: null,

  toilet: null,
  cleanWater: null,
  homeEnvironment: null,
  drinkingWater: null,

  handwashing: null,
});

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const OptionButton = ({
    selected,
    value,
    onClick,
    children,
  }) => {
    return (
      <button
        type="button"
        className={`screening-option ${
          selected === value ? "selected" : ""
        }`}
        onClick={onClick}
      >
        <span className="screening-radio">
          {selected === value ? "●" : "○"}
        </span>

        <span>{children}</span>
      </button>
    );
  };

  return (
    <div className="screening-page">

      {/* HEADER */}
      <header className="screening-header">

        <div>
          <h1>SIRANTING</h1>

          <p>
            {isEnglish
              ? "Stunting Risk Screening"
              : "Skrining Risiko Stunting"}
          </p>
        </div>

        <span className="screening-language">
          {isEnglish ? "ENG" : "ID"}
        </span>

      </header>


      {/* CONTENT */}
      <main className="screening-container">

        {/* BACK */}
        <button
          className="screening-back"
          onClick={onBack}
        >
          ← {isEnglish ? "Back" : "Kembali"}
        </button>


        {/* TITLE */}
        <section className="screening-title-card">

          <h2>
            {isEnglish
              ? "Baby Screening 0–24 Months"
              : "Skrining Bayi 0–24 Bulan"}
          </h2>

          <p>
            {isEnglish
              ? "Complete the following form according to the mother's and baby's condition."
              : "Isi formulir berikut sesuai dengan kondisi ibu dan bayi."}
          </p>

        </section>


        {/* PROGRESS */}
        <section className="screening-progress-card">

          <div className="progress-steps">

            <div
              className={`progress-step ${
                step >= 1 ? "active" : ""
              }`}
            >
              <span>1</span>

              <p>
                {isEnglish
                  ? "Mother & Baby Data"
                  : "Data Ibu & Anak"}
              </p>
            </div>


            <div className="progress-line" />


            <div
              className={`progress-step ${
                step >= 2 ? "active" : ""
              }`}
            >
              <span>2</span>

              <p>
                {isEnglish
                  ? "Risk Factors"
                  : "Faktor Risiko"}
              </p>
            </div>

          </div>

        </section>


        {/* ========================= */}
        {/* STEP 1 */}
        {/* ========================= */}

        {step === 1 && (
  <div className="screening-form">

    {/* ========================= */}
    {/* KARAKTERISTIK IBU */}
    {/* ========================= */}

    <section className="screening-section">

      <h3>
        {isEnglish
          ? "Mother's Characteristics"
          : "Karakteristik Ibu"}
      </h3>

      <div className="screening-question">
        <label>
          1. {isEnglish ? "Mother's name" : "Nama ibu"}
        </label>

        <input
          type="text"
          value={form.namaIbu}
          onChange={(e) =>
            updateForm("namaIbu", e.target.value)
          }
          placeholder={
            isEnglish
              ? "Enter mother's name"
              : "Masukkan nama ibu"
          }
        />
      </div>

      <div className="screening-question">
        <label>
          2. {isEnglish ? "Mother's age" : "Usia ibu"}
        </label>

        <input
          type="number"
          min="0"
          value={form.usiaIbu}
          onChange={(e) =>
            updateForm(
              "usiaIbu",
              e.target.value
                ? Number(e.target.value)
                : ""
            )
          }
          placeholder={
            isEnglish
              ? "Enter mother's age"
              : "Masukkan usia ibu"
          }
        />
      </div>

      <div className="screening-question">
        <label>
          3. {isEnglish
            ? "Mother's height (cm)"
            : "Tinggi badan ibu (cm)"}
        </label>

        <input
          type="number"
          step="0.1"
          min="0"
          value={form.tinggiIbu}
          onChange={(e) =>
            updateForm(
              "tinggiIbu",
              e.target.value
                ? Number(e.target.value)
                : ""
            )
          }
          placeholder={
            isEnglish
              ? "Enter mother's height"
              : "Masukkan tinggi badan ibu"
          }
        />
      </div>

      <div className="screening-question">
        <label>
          4. {isEnglish
            ? "Highest education"
            : "Pendidikan terakhir"}
        </label>

        <OptionButton
          selected={form.pendidikanIbu}
          value={0}
          onClick={() =>
            updateForm("pendidikanIbu", 0)
          }
        >
          {isEnglish
            ? "Higher education"
            : "Pendidikan tinggi"}
        </OptionButton>

        <OptionButton
          selected={form.pendidikanIbu}
          value={1}
          onClick={() =>
            updateForm("pendidikanIbu", 1)
          }
        >
          {isEnglish
            ? "Elementary to high school"
            : "SD–SMA"}
        </OptionButton>

        <OptionButton
          selected={form.pendidikanIbu}
          value={2}
          onClick={() =>
            updateForm("pendidikanIbu", 2)
          }
        >
          {isEnglish
            ? "Did not complete elementary school"
            : "Tidak tamat SD"}
        </OptionButton>
      </div>

      <div className="screening-question">
        <label>
          5. {isEnglish ? "Occupation" : "Pekerjaan ibu"}
        </label>

        <input
          type="text"
          value={form.pekerjaanIbu}
          onChange={(e) =>
            updateForm("pekerjaanIbu", e.target.value)
          }
          placeholder={
            isEnglish
              ? "Enter occupation"
              : "Masukkan pekerjaan"
          }
        />
      </div>

    </section>


    {/* ========================= */}
    {/* KARAKTERISTIK ANAK */}
    {/* ========================= */}

    <section className="screening-section">

      <h3>
        {isEnglish
          ? "Child's Characteristics"
          : "Karakteristik Bayi"}
      </h3>

      <div className="screening-question">
        <label>
          1. {isEnglish ? "Child's name" : "Nama anak"}
        </label>

        <input
          type="text"
          value={form.namaAnak}
          onChange={(e) =>
            updateForm("namaAnak", e.target.value)
          }
          placeholder={
            isEnglish
              ? "Enter child's name"
              : "Masukkan nama anak"
          }
        />
      </div>

      <div className="screening-question">
        <label>
          2. {isEnglish ? "Child's age (months)" : "Usia anak (bulan)"}
        </label>

        <input
          type="number"
          min="0"
          max="24"
          value={form.usiaBayi}
          onChange={(e) =>
            updateForm(
              "usiaBayi",
              e.target.value
                ? Number(e.target.value)
                : ""
            )
          }
          placeholder={
            isEnglish
              ? "0–24 months"
              : "0–24 bulan"
          }
        />
      </div>

      <div className="screening-question">
        <label>
          3. {isEnglish ? "Child's gender" : "Jenis kelamin"}
        </label>

        <OptionButton
          selected={form.childGender}
          value={0}
          onClick={() =>
            updateForm("childGender", 0)
          }
        >
          {isEnglish ? "Female" : "Perempuan"}
        </OptionButton>

        <OptionButton
          selected={form.childGender}
          value={1}
          onClick={() =>
            updateForm("childGender", 1)
          }
        >
          {isEnglish ? "Male" : "Laki-laki"}
        </OptionButton>
      </div>

      <div className="screening-question">
        <label>
          4. {isEnglish ? "Birth order" : "Anak ke-"}
        </label>

        <input
          type="number"
          min="1"
          value={form.anakKe}
          onChange={(e) =>
            updateForm(
              "anakKe",
              e.target.value
                ? Number(e.target.value)
                : ""
            )
          }
          placeholder={
            isEnglish
              ? "Enter birth order"
              : "Masukkan anak ke-"
          }
        />
      </div>

      <div className="screening-question">
        <label>
          5.{" "}
          {isEnglish
            ? "Birth type"
            : "Kelahiran"}
        </label>

        <OptionButton
          selected={form.kelahiran}
          value={1}
          onClick={() =>
            updateForm("kelahiran", 1)
          }
        >
          {isEnglish ? "Twin / multiple birth" : "Kelahiran kembar"}
        </OptionButton>

        <OptionButton
          selected={form.kelahiran}
          value={0}
          onClick={() =>
            updateForm("kelahiran", 0)
          }
        >
          {isEnglish ? "Single birth" : "Kelahiran tunggal"}
        </OptionButton>
      </div>

    </section>


    {/* ========================= */}
    {/* BUTTON */}
    {/* ========================= */}

    <div className="screening-action-row">

      <button
        className="screening-secondary-button"
        onClick={onBack}
      >
        ← {isEnglish ? "BACK" : "KEMBALI"}
      </button>

      <button
        className="screening-primary-button"
        onClick={() => setStep(2)}
      >
        {isEnglish ? "CONTINUE" : "LANJUT"}
      </button>

    </div>

  </div>
)}


       {step === 2 && (
  <div className="screening-form">

    {/* ========================= */}
    {/* FAKTOR IBU */}
    {/* ========================= */}

    <section className="screening-section">

      <h3>
        {isEnglish
          ? "Mother Risk Factors"
          : "Faktor Risiko Ibu"}
      </h3>


      {/* 1. USIA IBU SAAT HAMIL */}

      <div className="screening-question">
        <label>
          1.{" "}
          {isEnglish
            ? "Mother's age during pregnancy"
            : "Usia ibu saat hamil"}
        </label>

        <OptionButton
          selected={form.usiaIbuHamil}
          value={0}
          onClick={() =>
            updateForm("usiaIbuHamil", 0)
          }
        >
          20–35 tahun
        </OptionButton>

        <OptionButton
          selected={form.usiaIbuHamil}
          value={1}
          onClick={() =>
            updateForm("usiaIbuHamil", 1)
          }
        >
          {"< 20 tahun atau > 35 tahun"}
        </OptionButton>
      </div>


      {/* 2. TINGGI IBU */}

      <div className="screening-question">
        <label>
          2.{" "}
          {isEnglish
            ? "Mother's height"
            : "Tinggi badan ibu"}
        </label>

        <OptionButton
          selected={form.tinggiIbuRisk}
          value={0}
          onClick={() =>
            updateForm("tinggiIbuRisk", 0)
          }
        >
          ≥ 150 cm
        </OptionButton>

        <OptionButton
          selected={form.tinggiIbuRisk}
          value={1}
          onClick={() =>
            updateForm("tinggiIbuRisk", 1)
          }
        >
          {"< 150 cm"}
        </OptionButton>
      </div>


      {/* 3. PENDIDIKAN */}

      <div className="screening-question">
        <label>
          3.{" "}
          {isEnglish
            ? "Mother's education"
            : "Pendidikan ibu"}
        </label>

        <OptionButton
          selected={form.pendidikanRisk}
          value={0}
          onClick={() =>
            updateForm("pendidikanRisk", 0)
          }
        >
          {isEnglish
            ? "Higher education"
            : "Ibu dengan pendidikan tinggi"}
        </OptionButton>

        <OptionButton
          selected={form.pendidikanRisk}
          value={1}
          onClick={() =>
            updateForm("pendidikanRisk", 1)
          }
        >
          {isEnglish
            ? "Elementary–high school"
            : "Ibu lulusan SD–SMA"}
        </OptionButton>

        <OptionButton
          selected={form.pendidikanRisk}
          value={2}
          onClick={() =>
            updateForm("pendidikanRisk", 2)
          }
        >
          {isEnglish
            ? "Did not complete elementary school"
            : "Ibu tidak tamat SD"}
        </OptionButton>
      </div>


      {/* 4. JUMLAH ANAK */}

      <div className="screening-question">
        <label>
          4.{" "}
          {isEnglish
            ? "Number of children the mother has given birth to, including this child"
            : "Jumlah anak yang telah Ibu lahirkan termasuk anak ini"}
        </label>

        <OptionButton
          selected={form.jumlahAnakRisk}
          value={0}
          onClick={() =>
            updateForm("jumlahAnakRisk", 0)
          }
        >
          {"< 4 anak"}
        </OptionButton>

        <OptionButton
          selected={form.jumlahAnakRisk}
          value={1}
          onClick={() =>
            updateForm("jumlahAnakRisk", 1)
          }
        >
          ≥ 4 anak
        </OptionButton>
      </div>


      {/* 5. JARAK KELAHIRAN */}

      <div className="screening-question">
        <label>
          5.{" "}
          {isEnglish
            ? "Birth interval between the previous child and this child"
            : "Jarak antara kelahiran anak sebelumnya dengan anak ini"}
        </label>

        <OptionButton
          selected={form.jarakKelahiran}
          value={1}
          onClick={() =>
            updateForm("jarakKelahiran", 1)
          }
        >
          {"< 24 bulan"}
        </OptionButton>

        <OptionButton
          selected={form.jarakKelahiran}
          value={0}
          onClick={() =>
            updateForm("jarakKelahiran", 0)
          }
        >
          ≥ 24 bulan
        </OptionButton>

        <OptionButton
          selected={form.jarakKelahiran}
          value={0}
          onClick={() =>
            updateForm("jarakKelahiran", 0)
          }
        >
          {isEnglish ? "First child" : "Anak pertama"}
        </OptionButton>
      </div>


      {/* 6. KEK */}

      <div className="screening-question">
        <label>
          6.{" "}
          {isEnglish
            ? "During this pregnancy, did you ever experience Chronic Energy Malnutrition (CEM) based on your Mid-Upper Arm Circumference (MUAC) measurement results?"
            : "Selama kehamilan anak ini, apakah Ibu pernah mengalami Kekurangan Energi Kronis (KEK) berdasarkan hasil pengukuran Lingkar Lengan Atas (LILA)??"}
        </label>

        <OptionButton
          selected={form.kek}
          value={1}
          onClick={() =>
            updateForm("kek", 1)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.kek}
          value={0}
          onClick={() =>
            updateForm("kek", 0)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


 {/* 7. ANEMIA IBU */}

<div className="screening-question">
  <label>
    7.{" "}
    {isEnglish
      ? "Was the mother diagnosed with anemia (low blood count / low iron) by a health worker during pregnancy?"
      : "Selama kehamilan anak ini, apakah Ibu pernah didiagnosis mengalami anemia (kurang darah) oleh tenaga kesehatan?"}
  </label>

  <OptionButton
    selected={form.anemiaIbu}
    value={1}
    onClick={() =>
      updateForm("anemiaIbu", 1)
    }
  >
    {isEnglish ? "Yes" : "Ya"}
  </OptionButton>

  <OptionButton
    selected={form.anemiaIbu}
    value={0}
    onClick={() =>
      updateForm("anemiaIbu", 0)
    }
  >
    {isEnglish ? "No" : "Tidak"}
  </OptionButton>
</div>

      {/* 8. TABLET FE */}

      <div className="screening-question">
        <label>
          8.{" "}
          {isEnglish
            ? "Did the mother take iron tablets according to health worker recommendations during pregnancy?"
            : "Selama kehamilan anak ini, apakah Ibu mengonsumsi tablet Fe (zat besi) sesuai anjuran tenaga kesehatan?"}
        </label>

        <OptionButton
          selected={form.feTablet}
          value={0}
          onClick={() =>
            updateForm("feTablet", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.feTablet}
          value={1}
          onClick={() =>
            updateForm("feTablet", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>

    </section>


    {/* ========================= */}
    {/* FAKTOR ANAK */}
    {/* ========================= */}

    <section className="screening-section">

      <h3>
        {isEnglish
          ? "Child Risk Factors"
          : "Faktor Risiko Anak"}
      </h3>


      {/* 1 KEMBAR */}

      <div className="screening-question">
        <label>
          1. {isEnglish ? "Birth history" : "Riwayat kelahiran"}

        </label>

        <OptionButton
          selected={form.kelahiranKembar}
          value={1}
          onClick={() =>
            updateForm("kelahiranKembar", 1)
          }
        >
          {isEnglish ? "Twin / multiple birth" : "Kelahiran kembar"}
        </OptionButton>

        <OptionButton
          selected={form.kelahiranKembar}
          value={0}
          onClick={() =>
            updateForm("kelahiranKembar", 0)
          }
        >
          {isEnglish ? "Single birth" : "Kelahiran tunggal"}
        </OptionButton>
      </div>


      {/* 2 PREMATUR */}

      <div className="screening-question">
        <label>
          2.{" "}
          {isEnglish
            ? "Was the baby born at term (≥37 weeks)?"
            : "Bayi lahir cukup umur (≥37 minggu)"}
        </label>

        <OptionButton
          selected={form.prematur}
          value={0}
          onClick={() =>
            updateForm("prematur", 0)
          }
        >
          {isEnglish ? "Term birth (≥37 weeks)" : "Cukup umur (≥37 minggu)"}
        </OptionButton>

        <OptionButton
          selected={form.prematur}
          value={1}
          onClick={() =>
            updateForm("prematur", 1)
          }
        >
          {isEnglish ? "Premature (<37 weeks)" : "Prematur (<37 minggu)"}
        </OptionButton>
      </div>


      {/* 3 BBLR */}

      <div className="screening-question">
        <label>
          3.{" "}
          {isEnglish
            ? "The child's birth weight is < 2,500 grams"
            : "Berat badan (BB) anak saat lahir adalah < 2500 gram"}
        </label>

        <OptionButton
          selected={form.birthWeightRisk}
          value={1}
          onClick={() =>
            updateForm("birthWeightRisk", 1)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.birthWeightRisk}
          value={0}
          onClick={() =>
            updateForm("birthWeightRisk", 0)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 4 PANJANG LAHIR */}

      <div className="screening-question">
        <label>
          4.{" "}
          {isEnglish
            ? "Was the child's birth length ≤ 48 cm?"
            : "Panjang badan anak saat lahir ≤ 48 cm?"}
        </label>

        <OptionButton
          selected={form.shortBirthLength}
          value={1}
          onClick={() =>
            updateForm("shortBirthLength", 1)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.shortBirthLength}
          value={0}
          onClick={() =>
            updateForm("shortBirthLength", 0)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 5 GENDER */}

      <div className="screening-question">
        <label>
          5. {isEnglish ? "Child's gender" : "Jenis kelamin anak"}
        </label>

        <OptionButton
          selected={form.childGender}
          value={0}
          onClick={() =>
            updateForm("childGender", 0)
          }
        >
          {isEnglish ? "Female" : "Perempuan"}
        </OptionButton>

        <OptionButton
          selected={form.childGender}
          value={1}
          onClick={() =>
            updateForm("childGender", 1)
          }
        >
          {isEnglish ? "Male" : "Laki-laki"}
        </OptionButton>
      </div>


      {/* 6 IMD */}

      <div className="screening-question">
        <label>
          6.{" "}
          {isEnglish
            ? "Did the child start breastfeeding within the first hour after birth?"
            : "Anak mulai menyusu dalam satu jam pertama setelah lahir?"}
        </label>

        <OptionButton
          selected={form.imd}
          value={0}
          onClick={() =>
            updateForm("imd", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.imd}
          value={1}
          onClick={() =>
            updateForm("imd", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 7 ASI EKSKLUSIF */}

      <div className="screening-question">
        <label>
          7.{" "}
          {isEnglish
            ? "Did the child receive exclusive breastfeeding for the first 6 months?"
            : "Anak mendapatkan ASI eksklusif selama 6 bulan pertama kehidupan?"}
        </label>

        <OptionButton
          selected={form.exclusiveBreastfeeding}
          value={0}
          onClick={() =>
            updateForm("exclusiveBreastfeeding", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.exclusiveBreastfeeding}
          value={2}
          onClick={() =>
            updateForm("exclusiveBreastfeeding", 2)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 8 IMUNISASI */}

      <div className="screening-question">
        <label>
          8.{" "}
          {isEnglish
            ? "Does the child receive complete basic immunization according to age?"
            : "Anak menerima imunisasi dasar lengkap (sesuai umur)"}
        </label>

        <OptionButton
          selected={form.immunization}
          value={0}
          onClick={() =>
            updateForm("immunization", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.immunization}
          value={1}
          onClick={() =>
            updateForm("immunization", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 9 KENAIKAN BB */}

      <div className="screening-question">
        <label>
          9.{" "}
          {isEnglish
            ? "Does the child gain weight every month?"
            : "Anak mengalami kenaikan Berat Badan (BB) per bulan"}
        </label>

        <OptionButton
          selected={form.kenaikanberat}
          value={0}
          onClick={() =>
            updateForm("kenaikanberat", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.kenaikanberat}
          value={1}
          onClick={() =>
            updateForm("kenaikanberat", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 10 TIMBANG */}

      <div className="screening-question">
        <label>
          10.{" "}
          {isEnglish
            ? "Is the child weighed at least 8 times a year or routinely every month?"
            : "Anak ditimbang ≥ 8 kali setahun atau rutin setiap bulan"}
        </label>

        <OptionButton
          selected={form.timbangbalita}
          value={0}
          onClick={() =>
            updateForm("timbangbalita", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.timbangbalita}
          value={1}
          onClick={() =>
            updateForm("timbangbalita", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 11 UKUR */}

      <div className="screening-question">
        <label>
          11.{" "}
          {isEnglish
            ? "Is the child measured for length/height at least 8 times a year or routinely every month?"
            : "Anak diukur panjang/TB ≥ 8 kali setahun atau rutin setiap bulan"}
        </label>

        <OptionButton
          selected={form.ukurpanjang}
          value={0}
          onClick={() =>
            updateForm("ukurpanjang", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.ukurpanjang}
          value={1}
          onClick={() =>
            updateForm("ukurpanjang", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 12 TINGGI/PANJANG */}

      <div className="screening-question">

        <label>
          12.{" "}
          {isEnglish
            ? "Child's current length/height (cm)"
            : "Panjang/Tinggi badan anak saat ini (cm)"}
        </label>

        <input
          type="number"
          step="0.1"
          min="0"
          value={form.tinggiBadan ?? ""}
          onChange={(e) =>
            updateForm(
              "tinggiBadan",
              e.target.value
                ? Number(e.target.value)
                : null
            )
          }
          placeholder={
            isEnglish
              ? "Enter current length/height"
              : "Masukkan panjang/tinggi badan"
          }
        />

        <p className="screening-info">
          {isEnglish
            ? "The application will automatically calculate the length/height-for-age Z-score (LAZ/HAZ) and classify the growth status."
            : "Aplikasi akan secara otomatis menghitung Z-score Panjang/Tinggi Badan menurut Umur (PB/U atau TB/U) dan mengklasifikasikan status gizi."}
        </p>

      </div>


      {/* 13 BERAT BADAN */}

      <div className="screening-question">

        <label>
          13.{" "}
          {isEnglish
            ? "Child's current weight (kg)"
            : "Berat badan anak saat ini (kg)"}
        </label>

        <input
          type="number"
          step="0.1"
          min="0"
          value={form.beratBadan ?? ""}
          onChange={(e) =>
            updateForm(
              "beratBadan",
              e.target.value
                ? Number(e.target.value)
                : null
            )
          }
          placeholder={
            isEnglish
              ? "Enter current weight"
              : "Masukkan berat badan"
          }
        />

        <p className="screening-info">
          {isEnglish
            ? "The application will automatically calculate the weight-for-age Z-score (WAZ) and classify the growth status."
            : "Aplikasi akan secara otomatis menghitung Z-score Berat Badan menurut Umur (BB/U atau WAZ) dan mengklasifikasikan status gizi."}
        </p>

      </div>


 {/* 14 VITAMIN A */}

<div className="screening-question">
  <label>
    14.{" "}
    {isEnglish
      ? "Does the child receive vitamin A according to age?"
      : "Apakah anak menerima vitamin A sesuai umur?"}
  </label>

  <OptionButton
    selected={form.vitaminA}
    value={0}
    onClick={() =>
      updateForm("vitaminA", 0)
    }
  >
    {isEnglish ? "Yes" : "Ya"}
  </OptionButton>

  <OptionButton
    selected={form.vitaminA}
    value={1}
    onClick={() =>
      updateForm("vitaminA", 1)
    }
  >
    {isEnglish ? "No" : "Tidak"}
  </OptionButton>

  <OptionButton
    selected={form.vitaminA}
    value={0}
    onClick={() =>
      updateForm("vitaminA", 0)
    }
  >
    {isEnglish
      ? "Child is younger than 6 months"
      : "Bayi baru berusia < 6 bulan"}
  </OptionButton>

  <p className="screening-note">
    <strong>
      {isEnglish ? "Note:" : "Catatan:"}
    </strong>
    <br />

    {isEnglish
      ? "For children aged 6–11 months, 1 dose is expected. For children aged 12–24 months, ideally 2 doses per year."
      : "Untuk anak usia 6–11 bulan, yang diharapkan adalah 1 kali pemberian. Untuk usia 12–24 bulan, idealnya 2 kali dalam setahun."}
  </p>
</div>


      {/* 15 ANEMIA ANAK */}

      <div className="screening-question">
        <label>
          15.{" "}
          {isEnglish
            ? "Has the child ever been diagnosed with anemia by a health worker?"
            : "Apakah anak pernah didiagnosis mengalami anemia oleh tenaga kesehatan?"}
        </label>

        <OptionButton
          selected={form.anemiaAnak}
          value={1}
          onClick={() =>
            updateForm("anemiaAnak", 1)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.anemiaAnak}
          value={0}
          onClick={() =>
            updateForm("anemiaAnak", 0)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>




      {/* 17 PNEUMONIA */}

      <div className="screening-question">
        <label>
          17.{" "}
          {isEnglish
            ? "In the past 3 months, has your child ever been diagnosed with pneumonia by a doctor or other healthcare professional?"
            : "Dalam 3 bulan terakhir, apakah anak pernah didiagnosis menderita pneumonia oleh dokter atau tenaga kesehatan lainnya?"}
        </label>

        <OptionButton
          selected={form.pneumonia}
          value={2}
          onClick={() =>
            updateForm("pneumonia", 2)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.pneumonia}
          value={0}
          onClick={() =>
            updateForm("pneumonia", 0)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 18 DIARE */}

      <div className="screening-question">
        <label>
          18.{" "}
          {isEnglish
            ? "In the past 3 months, has your child had diarrhea (loose or watery stools and more frequent bowel movements than usual)?"
            : "Dalam 3 bulan terakhir, apakah anak mengalami diare (buang air besar dengan tinja yang lebih encer atau berair dan lebih sering dari biasanya)?"}
        </label>

        <OptionButton
          selected={form.diarrhea}
          value={2}
          onClick={() =>
            updateForm("diarrhea", 2)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.diarrhea}
          value={0}
          onClick={() =>
            updateForm("diarrhea", 0)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 19 PARASIT */}

      <div className="screening-question">
        <label>
          19.{" "}
          {isEnglish
            ? "Has the child ever been diagnosed with intestinal parasites/worms?"
            : "Apakah anak pernah didiagnosis mengalami infeksi parasit/cacing pada saluran pencernaan?"}
        </label>

        <OptionButton
          selected={form.parasit}
          value={1}
          onClick={() =>
            updateForm("parasit", 1)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.parasit}
          value={0}
          onClick={() =>
            updateForm("parasit", 0)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 20 TIDUR */}

      <div className="screening-question">
        <label>
          20.{" "}
          {isEnglish
            ? "Does the child often sleep late after 21:00?"
            : "Apakah anak sering tidur larut malam (setelah pukul 21.00)?"}
        </label>

        <OptionButton
          selected={form.sleepHabit}
          value={1}
          onClick={() =>
            updateForm("sleepHabit", 1)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.sleepHabit}
          value={0}
          onClick={() =>
            updateForm("sleepHabit", 0)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 21 KARBOHIDRAT */}

      <div className="screening-question">
        <label>
          21.{" "}
          {isEnglish
            ? "Does your child eat foods rich in carbohydrates (such as rice, potatoes, sweet potatoes, or bread) every day?"
            : "Apakah anak mengonsumsi makanan yang kaya akan karbohidrat (misalnya nasi, kentang, ubi jalar, atau roti) setiap hari?"}
        </label>

        <OptionButton
          selected={form.karbohidrat}
          value={0}
          onClick={() =>
            updateForm("karbohidrat", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.karbohidrat}
          value={1}
          onClick={() =>
            updateForm("karbohidrat", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* 22 PROTEIN HEWANI */}

      <div className="screening-question">
        <label>
          22.{" "}
          {isEnglish
            ? "Does the child eat one or more types of animal-based foods (such as fish, eggs, meat, or chicken) every day?"
            : "Apakah anak mengonsumsi satu atau lebih jenis makanan yang bersumber dari hewan (misalnya ikan, telur, daging, atau ayam) setiap hari?"}
        </label>

        <OptionButton
          selected={form.proteinHewani}
          value={0}
          onClick={() =>
            updateForm("proteinHewani", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.proteinHewani}
          value={1}
          onClick={() =>
            updateForm("proteinHewani", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>

    </section>


    {/* ========================= */}
    {/* KELUARGA & SOSIAL EKONOMI */}
    {/* ========================= */}

    <section className="screening-section">

      <h3>
        {isEnglish
          ? "Family and Socioeconomic Factors"
          : "Faktor Keluarga dan Sosial Ekonomi"}
      </h3>


      {/* JUMLAH BALITA */}

      <div className="screening-question">
        <label>
          1.{" "}
          {isEnglish
            ? "How many children under the age of 5 live in the household?"
            : "Berapa jumlah anak usia di bawah 5 tahun yang tinggal dalam rumah tangga?"}
        </label>

        <OptionButton
          selected={form.jumlahBalitaRumah}
          value={0}
          onClick={() =>
            updateForm("jumlahBalitaRumah", 0)
          }
        >
          1 anak
        </OptionButton>

        <OptionButton
          selected={form.jumlahBalitaRumah}
          value={1}
          onClick={() =>
            updateForm("jumlahBalitaRumah", 1)
          }
        >
          ≥2 anak
        </OptionButton>
      </div>


      {/* PENDAPATAN */}

      <div className="screening-question">
        <label>
          2.{" "}
          {isEnglish
            ? "What is the estimated monthly household income?"
            : "Berapakah perkiraan pendapatan keluarga per bulan?"}
        </label>

        <OptionButton
          selected={form.income}
          value={0}
          onClick={() =>
            updateForm("income", 0)
          }
        >
          {isEnglish
            ? "Above UMK (≥ Rp 3,268,000)"
            : "Di atas UMK (≥ Rp. 3.268.000)"}
        </OptionButton>

        <OptionButton
          selected={form.income}
          value={1}
          onClick={() =>
            updateForm("income", 1)
          }
        >
          {isEnglish
            ? "Below UMK (< Rp 3,268,000)"
            : "Di bawah UMK (< Rp. 3.268.000)"}
        </OptionButton>
      </div>


      {/* BUKU KIA */}

      <div className="screening-question">
        <label>
          3. {isEnglish ? "KIA Book ownership" : "Kepemilikan Buku KIA"}
        </label>

        <OptionButton
          selected={form.kiaBook}
          value={0}
          onClick={() =>
            updateForm("kiaBook", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.kiaBook}
          value={1}
          onClick={() =>
            updateForm("kiaBook", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


      {/* JKN */}

      <div className="screening-question">
        <label>
          4. {isEnglish
            ? "JKN / JAMHESDA / BPJS ownership"
            : "Kepemilikan JKN / JAMHESDA / BPJS"}
        </label>

        <OptionButton
          selected={form.jkn}
          value={0}
          onClick={() =>
            updateForm("jkn", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.jkn}
          value={1}
          onClick={() =>
            updateForm("jkn", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>


{/* ========================= */}
{/* 5. SANITASI RUMAH TANGGA */}
{/* ========================= */}

<div className="screening-question">

  <label>
    5.{" "}
    {isEnglish
      ? "Household Sanitation and Environmental Hygiene"
      : "Sanitasi Rumah Tangga dan Kebersihan Lingkungan"}
  </label>

  {/* 1. Toilet/Jamban */}
  <div className="question-subitem">
    <div className="question-title">
      1) {isEnglish ? "Toilet / Latrine" : "Toilet/Jamban"}
    </div>

    <div className="question-text">
      {isEnglish
        ? "Does your household have a private toilet/latrine used for daily sanitation needs?"
        : "Apakah rumah tangga Anda memiliki toilet/jamban pribadi yang digunakan untuk kebutuhan sanitasi sehari-hari?"}
    </div>

    <OptionButton
      selected={form.toilet}
      value={0}
      onClick={() => updateForm("toilet", 0)}
    >
      {isEnglish ? "Yes" : "Ya"}
    </OptionButton>

    <OptionButton
      selected={form.toilet}
      value={0.5}
      onClick={() => updateForm("toilet", 0.5)}
    >
      {isEnglish ? "No" : "Tidak"}
    </OptionButton>
  </div>


  {/* 2. Air bersih */}
  <div className="question-subitem">
    <div className="question-title">
      2) {isEnglish ? "Clean water" : "Air bersih"}
    </div>

    <div className="question-text">
      {isEnglish
        ? "Does your household have enough clean water for drinking, cooking, and bathing every day?"
        : "Apakah rumah tangga Anda memiliki air bersih yang cukup untuk minum, memasak, dan mandi setiap hari?"}
    </div>

    <OptionButton
      selected={form.cleanWater}
      value={0}
      onClick={() => updateForm("cleanWater", 0)}
    >
      {isEnglish ? "Yes" : "Ya"}
    </OptionButton>

    <OptionButton
      selected={form.cleanWater}
      value={0.5}
      onClick={() => updateForm("cleanWater", 0.5)}
    >
      {isEnglish ? "No" : "Tidak"}
    </OptionButton>
  </div>


  {/* 3. Lingkungan rumah */}
  <div className="question-subitem">
    <div className="question-title">
      3) {isEnglish ? "Home environment" : "Lingkungan rumah"}
    </div>

    <div className="question-text">
      {isEnglish
        ? "Is the area around your home clean and free from unpleasant odors?"
        : "Apakah lingkungan sekitar rumah Anda bersih dan bebas dari bau yang tidak sedap?"}
    </div>

    <OptionButton
      selected={form.homeEnvironment}
      value={0}
      onClick={() => updateForm("homeEnvironment", 0)}
    >
      {isEnglish ? "Yes" : "Ya"}
    </OptionButton>

    <OptionButton
      selected={form.homeEnvironment}
      value={0.5}
      onClick={() => updateForm("homeEnvironment", 0.5)}
    >
      {isEnglish ? "No" : "Tidak"}
    </OptionButton>
  </div>


  {/* 4. Air minum */}
  <div className="question-subitem">
    <div className="question-title">
      4) {isEnglish ? "Drinking water" : "Air minum"}
    </div>

    <div className="question-text">
      {isEnglish
        ? "Does your household use safe drinking water (boiled water, refill drinking water, or bottled drinking water)?"
        : "Apakah rumah tangga Anda menggunakan air minum yang aman (air yang direbus, air minum isi ulang, atau air minum dalam kemasan)?"}
    </div>

    <OptionButton
      selected={form.drinkingWater}
      value={0}
      onClick={() => updateForm("drinkingWater", 0)}
    >
      {isEnglish ? "Yes" : "Ya"}
    </OptionButton>

    <OptionButton
      selected={form.drinkingWater}
      value={0.5}
      onClick={() => updateForm("drinkingWater", 0.5)}
    >
      {isEnglish ? "No" : "Tidak"}
    </OptionButton>
  </div>

</div>


      {/* CUCI TANGAN */}

      <div className="screening-question">
        <label>
          6.{" "}
          {isEnglish
            ? "Does the mother/family member wash hands with soap at important times?"
            : "Apakah Ibu/anggota keluarga mencuci tangan menggunakan sabun pada waktu-waktu penting?"}
        </label>

        <OptionButton
          selected={form.handwashing}
          value={0}
          onClick={() =>
            updateForm("handwashing", 0)
          }
        >
          {isEnglish ? "Yes" : "Ya"}
        </OptionButton>

        <OptionButton
          selected={form.handwashing}
          value={1}
          onClick={() =>
            updateForm("handwashing", 1)
          }
        >
          {isEnglish ? "No" : "Tidak"}
        </OptionButton>
      </div>

    </section>


    {/* ========================= */}
    {/* BUTTON */}
    {/* ========================= */}

    <div className="screening-action-row">

      <button
        className="screening-secondary-button"
        onClick={() => setStep(1)}
      >
        ← {isEnglish ? "BACK" : "KEMBALI"}
      </button>

<button
  className="screening-primary-button"
  onClick={async () => {
    const calculatedResult =
      calculateBalitaScore(form);

    setResult(calculatedResult);

    await saveBalitaScreening({
      form,
      result: calculatedResult,
    });
  }}
>
  {isEnglish
    ? "CALCULATE RISK"
    : "HITUNG RISIKO"}
</button>

    </div>

{result && (
  <section className="screening-result">

    {/* ========================= */}
    {/* HASIL SKRINING */}
    {/* ========================= */}

    <div className="result-header-card">

      <h2>
        {isEnglish
          ? "Screening Result"
          : "Hasil Skrining"}
      </h2>

      <div className="result-score-large">
        {result.score}
      </div>

      <div className="result-category-badge">
        {result.category}
      </div>

    </div>


    {/* ========================= */}
    {/* INTERPRETASI */}
    {/* ========================= */}

    <div className="result-interpretation-card">

      <h3>
        {isEnglish
          ? "Clinical Interpretation"
          : "Interpretasi Klinis"}
      </h3>

      <p>
        {result.category === "Risiko Rendah"
          ? (
              isEnglish
                ? "The child is in the low-risk category. Continue maintaining a balanced nutritious diet, monitor growth regularly, and provide adequate stimulation to support optimal growth and development."
                : "Balita berada dalam kategori risiko rendah. Tetap jaga pola makan bergizi seimbang, pantau pertumbuhan secara rutin, dan berikan stimulasi yang cukup untuk mendukung tumbuh kembang yang optimal."
            )
          : result.category === "Risiko Sedang"
            ? (
                isEnglish
                  ? "The child is in the moderate-risk category. Regular growth monitoring and preventive interventions are recommended to reduce the risk of stunting."
                  : "Balita berada dalam kategori risiko sedang. Diperlukan pemantauan pertumbuhan secara rutin dan intervensi preventif untuk mengurangi risiko stunting."
              )
            : (
                isEnglish
                  ? "The child is in the high-risk category. Intensive nutritional intervention and routine health monitoring are recommended."
                  : "Balita berada dalam kategori risiko tinggi. Diperlukan intervensi gizi secara intensif dan pemantauan kesehatan secara rutin."
              )}
      </p>

    </div>


    {/* ========================= */}
    {/* REKOMENDASI EDUKASI */}
    {/* ========================= */}

    <div className="result-education-card">

      <h3>
        {isEnglish
          ? "Educational Recommendations"
          : "Rekomendasi Edukasi"}
      </h3>


      <div className="result-video-list">

        {/* RISIKO RENDAH */}
        {result.category === "Risiko Rendah" && (
          <div className="result-video-card">

            <img
              src="/education/video_risiko_rendah.png"
              alt={
                isEnglish
                  ? "Low Risk Health Guide"
                  : "Panduan Kesehatan Risiko Rendah"
              }
              className="result-video-thumbnail"
            />

            <div className="result-video-content">

              <h4>
                {isEnglish
                  ? "Low-Risk Health Guide"
                  : "Panduan Kesehatan Risiko Rendah"}
              </h4>

              <p>
                {isEnglish
                  ? "This video explains stunting prevention steps for mothers and toddlers in the low-risk category. Maintain a balanced nutritious diet, monitor growth regularly at the health center (Posyandu), and provide adequate stimulation to support the child's optimal growth and development."
                  : "Video ini menjelaskan langkah-langkah pencegahan stunting bagi Ibu dan Balita dengan kategori risiko rendah. Tetap jaga pola makan bergizi seimbang, rutin memantau pertumbuhan di Posyandu, dan berikan stimulasi yang cukup untuk mendukung tumbuh kembang optimal anak."}
              </p>

              <button
                className="result-watch-button"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1Syz9xUqitcoTfT83Sfp0DLELTGA22gIo/view?usp=drive_link",
                    "_blank"
                  )
                }
              >
                {isEnglish
                  ? "WATCH NOW"
                  : "TONTON SEKARANG"}
              </button>

            </div>

          </div>
        )}


        {/* RISIKO SEDANG */}
        {result.category === "Risiko Sedang" && (
          <div className="result-video-card">

            <img
              src="/education/balita_sedang.png"
              alt={
                isEnglish
                  ? "Education Video for Mothers with Toddlers"
                  : "Video Ibu dengan Balita Risiko Sedang Stunting"
              }
              className="result-video-thumbnail"
            />

            <div className="result-video-content">

              <h4>
                {isEnglish
                  ? "SIRANTING Application Education Video for Mothers with Toddlers"
                  : "Video Ibu dengan Balita Risiko Sedang Stunting"}
              </h4>

              <p>
                {isEnglish
                  ? "Together Prevent Stunting, Ensure Healthy and Optimal Child Growth"
                  : "Bersama Cegah Stunting, Wujudkan Anak Sehat dan Tumbuh Optimal"}
              </p>

              <button
                className="result-watch-button"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/12xXWMF8Z-vUy3mZHlCNgVu4b6Xjvd4K-/view?usp=sharing",
                    "_blank"
                  )
                }
              >
                {isEnglish
                  ? "WATCH NOW"
                  : "TONTON SEKARANG"}
              </button>

            </div>

          </div>
        )}


        {/* RISIKO TINGGI */}
        {result.category === "Risiko Tinggi" && (
          <div className="result-video-card">

            <img
              src="/education/ibu_balita_tinggi.png"
              alt={
                isEnglish
                  ? "High Risk Toddler Education Video"
                  : "Video Ibu dengan Balita Risiko Tinggi Stunting"
              }
              className="result-video-thumbnail"
            />

            <div className="result-video-content">

              <h4>
                {isEnglish
                  ? "High Risk Toddler Education Video"
                  : "Video Ibu dengan Balita Risiko Tinggi Stunting"}
              </h4>

              <p>
                {isEnglish
                  ? "An intensive guide for mothers to improve the growth and development of toddlers at high risk of stunting through nutritional improvement and routine medical monitoring."
                  : "Panduan intensif bagi ibu untuk memperbaiki tumbuh kembang balita dengan risiko tinggi stunting melalui perbaikan gizi dan pemantauan medis secara rutin."}
              </p>

              <button
                className="result-watch-button"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1BMTGWBN2U44mVYZmdVIopIxV93cerz-P/view?usp=drive_link",
                    "_blank"
                  )
                }
              >
                {isEnglish
                  ? "WATCH NOW"
                  : "TONTON SEKARANG"}
              </button>

            </div>

          </div>
        )}

      </div>

    </div>


    {/* ========================= */}
    {/* SELESAI */}
    {/* ========================= */}

    <button
    className="result-finish-button"
    onClick={onBack}
    >
    {isEnglish
        ? "FINISH"
        : "SELESAI"}
    </button>

  </section>
)}

        </div>
        )}

      </main>

    </div>
  );
}

export default BalitaScreening;