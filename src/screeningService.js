import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
  authReady,
} from "./firebase";


// ======================================================
// KONVERSI NILAI FORM MENJADI JAWABAN YANG MUDAH DIBACA
// ======================================================
function getJawaban(form) {
  return {

    // ==================================================
    // KARAKTERISTIK IBU
    // ==================================================

    pendidikanIbu:
      form.pendidikanIbu === 0
        ? "Pendidikan tinggi"
        : form.pendidikanIbu === 1
          ? "SD–SMA"
          : form.pendidikanIbu === 2
            ? "Tidak tamat SD"
            : "-",

    // ==================================================
    // KARAKTERISTIK ANAK
    // ==================================================

    childGender:
      form.childGender === 0
        ? "Perempuan"
        : form.childGender === 1
          ? "Laki-laki"
          : "-",

    kelahiran:
      form.kelahiran === 1
        ? "Kelahiran kembar"
        : form.kelahiran === 0
          ? "Kelahiran tunggal"
          : "-",

    // ==================================================
    // FAKTOR IBU
    // ==================================================

    usiaIbuHamil:
      form.usiaIbuHamil === 0
        ? "20–35 tahun"
        : form.usiaIbuHamil === 1
          ? "< 20 tahun atau > 35 tahun"
          : "-",

    tinggiIbuRisk:
      form.tinggiIbuRisk === 0
        ? "≥ 150 cm"
        : form.tinggiIbuRisk === 1
          ? "< 150 cm"
          : "-",

    pendidikanRisk:
      form.pendidikanRisk === 0
        ? "Ibu dengan pendidikan tinggi"
        : form.pendidikanRisk === 1
          ? "Ibu lulusan SD–SMA"
          : form.pendidikanRisk === 2
            ? "Ibu tidak tamat SD"
            : "-",

    jumlahAnakRisk:
      form.jumlahAnakRisk === 0
        ? "< 4 anak"
        : form.jumlahAnakRisk === 1
          ? "≥ 4 anak"
          : "-",

    jarakKelahiran:
      form.anakKe === 1
        ? "Anak pertama"
        : form.jarakKelahiran === 1
          ? "< 24 bulan"
          : form.jarakKelahiran === 0
            ? "≥ 24 bulan"
            : "-",

    kek:
      form.kek === 1
        ? "Ya"
        : form.kek === 0
          ? "Tidak"
          : "-",

    anemiaIbu:
      form.anemiaIbu === 1
        ? "Ya"
        : form.anemiaIbu === 0
          ? "Tidak"
          : "-",

    feTablet:
      form.feTablet === 0
        ? "Ya"
        : form.feTablet === 1
          ? "Tidak"
          : "-",

    // ==================================================
    // FAKTOR ANAK
    // ==================================================

    kelahiranKembar:
      form.kelahiranKembar === 1
        ? "Kelahiran kembar"
        : form.kelahiranKembar === 0
          ? "Kelahiran tunggal"
          : "-",

    prematur:
      form.prematur === 0
        ? "Cukup umur (≥37 minggu)"
        : form.prematur === 1
          ? "Prematur (<37 minggu)"
          : "-",

    birthWeightRisk:
      form.birthWeightRisk === 1
        ? "Ya"
        : form.birthWeightRisk === 0
          ? "Tidak"
          : "-",

    shortBirthLength:
      form.shortBirthLength === 1
        ? "Ya"
        : form.shortBirthLength === 0
          ? "Tidak"
          : "-",

    imd:
      form.imd === 0
        ? "Ya"
        : form.imd === 1
          ? "Tidak"
          : "-",

    exclusiveBreastfeeding:
      form.exclusiveBreastfeeding === 0
        ? "Ya"
        : form.exclusiveBreastfeeding === 2
          ? "Tidak"
          : "-",

    immunization:
      form.immunization === 0
        ? "Ya"
        : form.immunization === 1
          ? "Tidak"
          : "-",

    kenaikanberat:
      form.kenaikanberat === 0
        ? "Ya"
        : form.kenaikanberat === 1
          ? "Tidak"
          : "-",

    timbangbalita:
      form.timbangbalita === 0
        ? "Ya"
        : form.timbangbalita === 1
          ? "Tidak"
          : "-",

    ukurpanjang:
      form.ukurpanjang === 0
        ? "Ya"
        : form.ukurpanjang === 1
          ? "Tidak"
          : "-",

    vitaminA:
      form.vitaminA === 0
        ? "Ya"
        : form.vitaminA === 1
          ? "Tidak"
          : "-",

    anemiaAnak:
      form.anemiaAnak === 1
        ? "Ya"
        : form.anemiaAnak === 0
          ? "Tidak"
          : "-",

    ispa:
      form.ispa === 3
        ? "Ya"
        : form.ispa === 0
          ? "Tidak"
          : "-",

    pneumonia:
      form.pneumonia === 2
        ? "Ya"
        : form.pneumonia === 0
          ? "Tidak"
          : "-",

    diarrhea:
      form.diarrhea === 2
        ? "Ya"
        : form.diarrhea === 0
          ? "Tidak"
          : "-",

    parasit:
      form.parasit === 1
        ? "Ya"
        : form.parasit === 0
          ? "Tidak"
          : "-",

    sleepHabit:
      form.sleepHabit === 1
        ? "Ya"
        : form.sleepHabit === 0
          ? "Tidak"
          : "-",

    karbohidrat:
      form.karbohidrat === 0
        ? "Ya"
        : form.karbohidrat === 1
          ? "Tidak"
          : "-",

    proteinHewani:
      form.proteinHewani === 0
        ? "Ya"
        : form.proteinHewani === 1
          ? "Tidak"
          : "-",

    // ==================================================
    // FAKTOR KELUARGA
    // ==================================================

    jumlahBalitaRumah:
      form.jumlahBalitaRumah === 0
        ? "1 anak"
        : form.jumlahBalitaRumah === 1
          ? "≥2 anak"
          : "-",

    income:
      form.income === 0
        ? "Di atas UMK (≥ Rp. 3.268.000)"
        : form.income === 1
          ? "Di bawah UMK (< Rp. 3.268.000)"
          : "-",

    kiaBook:
      form.kiaBook === 0
        ? "Ya"
        : form.kiaBook === 1
          ? "Tidak"
          : "-",

    jkn:
      form.jkn === 0
        ? "Ya"
        : form.jkn === 1
          ? "Tidak"
          : "-",

    toilet:
      form.toilet === 0
        ? "Ya"
        : form.toilet === 0.5
          ? "Tidak"
          : "-",

    cleanWater:
      form.cleanWater === 0
        ? "Ya"
        : form.cleanWater === 0.5
          ? "Tidak"
          : "-",

    homeEnvironment:
      form.homeEnvironment === 0
        ? "Ya"
        : form.homeEnvironment === 0.5
          ? "Tidak"
          : "-",

    drinkingWater:
      form.drinkingWater === 0
        ? "Ya"
        : form.drinkingWater === 0.5
          ? "Tidak"
          : "-",

    handwashing:
      form.handwashing === 0
        ? "Ya"
        : form.handwashing === 1
          ? "Tidak"
          : "-",
  };
}


// ======================================================
// SIMPAN HASIL SKRINING BALITA
// ======================================================
export async function saveBalitaScreening({
  form,
  result,
}) {
  await authReady;

  try {

    const docRef = await addDoc(
      collection(db, "screeningBalita"),
      {

        // ==================================================
        // SEMUA DATA FORM ASLI
        // ==================================================
        ...form,


        // ==================================================
        // JAWABAN YANG MUDAH DIBACA ADMIN
        // ==================================================
        jawaban: getJawaban(form),


        // ==================================================
        // HASIL SKRINING
        // ==================================================
        score: result.score,

        category: result.category,

        tbuStatus: result.tbuStatus || "",

        bbuStatus: result.bbuStatus || "",


        // ==================================================
        // WAKTU PENYIMPANAN
        // ==================================================
        createdAt: serverTimestamp(),
      }
    );


    console.log(
      "Hasil skrining berhasil disimpan:",
      docRef.id
    );


    return {
      success: true,
      id: docRef.id,
    };


  } catch (error) {

    console.error(
      "Gagal menyimpan hasil skrining:",
      error
    );


    return {
      success: false,
      error,
    };
  }
}