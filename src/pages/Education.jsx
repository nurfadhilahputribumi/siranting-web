import React from "react";

function Education({ language, onBack }) {

  const isEnglish = language === "en";

  const videos = [
    {
      title: isEnglish
        ? "SIRANTING Application Education Video for Mothers with Toddlers"
        : "Video Ibu dengan Balita Risiko Sedang Stunting",

      description: isEnglish
        ? "Together Prevent Stunting, Ensure Healthy and Optimal Child Growth"
        : "Bersama Cegah Stunting, Wujudkan Anak Sehat dan Tumbuh Optimal",

      url: "https://drive.google.com/file/d/12xXWMF8Z-vUy3mZHlCNgVu4b6Xjvd4K-/view?usp=sharing",

      thumbnail: "/education/balita_sedang.png",
    },

    {
      title: isEnglish
        ? "Low-Risk Health Guide"
        : "Panduan Kesehatan Risiko Rendah",

      description: isEnglish
        ? "This video explains stunting prevention steps for mothers and toddlers in the low-risk category. Maintain a balanced nutritious diet, monitor growth regularly at the health center (Posyandu), and provide adequate stimulation to support the child's optimal growth and development."
        : "Video ini menjelaskan langkah-langkah pencegahan stunting bagi Ibu dan Balita dengan kategori risiko rendah. Tetap jaga pola makan bergizi seimbang, rutin memantau pertumbuhan di Posyandu, dan berikan stimulasi yang cukup untuk mendukung tumbuh kembang optimal anak.",

      url: "https://drive.google.com/file/d/1Syz9xUqitcoTfT83Sfp0DLELTGA22gIo/view?usp=drive_link",

      thumbnail: "/education/video_risiko_rendah.png",
    },

    {
    title: isEnglish
        ? "SIRANTING Application Education Video for Mothers with Toddlers"
        : "Video Edukasi Aplikasi SIRANTING Ibu dengan Balita",

      description: isEnglish
        ? "Together Prevent Stunting, Ensure Healthy and Optimal Child Growth"
        : "Bersama Cegah Stunting, Wujudkan Anak Sehat dan Tumbuh Optimal",


      url: "https://drive.google.com/file/d/10_hjUlNKGKSI_QSioNdqkSzLBKBZynMr/view?usp=sharing",

      thumbnail: "/education/video_stunting_4.png",
    },

    {
      title: isEnglish
        ? "High Risk Toddler Education Video"
        : "Video Ibu dengan Balita Risiko Tinggi Stunting",

      description: isEnglish
        ? "An intensive guide for mothers to improve the growth and development of toddlers at high risk of stunting through nutritional improvement and routine medical monitoring."
        : "Panduan intensif bagi ibu untuk memperbaiki tumbuh kembang balita dengan risiko tinggi stunting melalui perbaikan gizi dan pemantauan medis secara rutin.",

      url: "https://drive.google.com/file/d/1BMTGWBN2U44mVYZmdVIopIxV93cerz-P/view?usp=drive_link",

      thumbnail: "/education/ibu_balita_tinggi.png",
    },

    {
      title: isEnglish
        ? "What is Stunting?"
        : "Apa Itu Stunting?",

      description: isEnglish
        ? "Understanding definition, causes, impacts, and importance of early stunting prevention"
        : "Memahami pengertian, penyebab, dampak, dan pentingnya pencegahan stunting sejak dini.",

      url: "https://youtu.be/NU_MDQ2iNYE",

      thumbnail: "/education/video_stunting_1.png",
    },

    {
      title: isEnglish
        ? "Stunting Prevention"
        : "Pencegahan Stunting",

      description: isEnglish
        ? "Learn simple steps to prevent stunting through nutrition, sanitation, and proper parenting"
        : "Pelajari langkah sederhana untuk mencegah stunting melalui gizi, sanitasi, dan pola asuh yang tepat.",

      url: "https://youtube.com/shorts/uvttdgsMxz8",

      thumbnail: "/education/video_stunting_2.png",
    },

    {
      title: isEnglish
        ? "Maternal and Child Health"
        : "Kesehatan Ibu dan Balita",

      description: isEnglish
        ? "Education about maternal health and child development for a healthy generation"
        : "Edukasi mengenai kesehatan ibu hamil dan tumbuh kembang balita untuk mendukung generasi sehat.",

      url: "https://youtube.com/shorts/hDxuh3z4n_I",

      thumbnail: "/education/video_stunting_3.png",
    },
  ];

  return (
    <div className="education-page">

      {/* HEADER */}
      <header className="education-header">

        <div>
          <h1>SIRANTING</h1>

          <p>
            {isEnglish
              ? "Stunting Education"
              : "Edukasi Stunting"}
          </p>
        </div>

        <span className="education-language">
          {isEnglish ? "ENG" : "ID"}
        </span>

      </header>


      {/* CONTENT */}
      <main className="education-container">

        {/* INTRO CARD */}
        <section className="education-intro-card">

          <h2>
            {isEnglish
              ? "SIRANTING Education Center"
              : "Pusat Edukasi SIRANTING"}
          </h2>

          <p>
            {isEnglish
              ? "Learn About Stunting Through Health Education Videos."
              : "Pelajari Informasi Mengenai Stunting Melalui Video Edukasi Kesehatan."}
          </p>

        </section>


        {/* VIDEO LIST */}
        <div className="education-list">

          {videos.map((video, index) => (

            <article
              className="education-card"
              key={index}
            >

              <img
                src={video.thumbnail}
                alt={video.title}
                className="education-thumbnail"
              />

              <div className="education-card-content">

                <h3>
                  {video.title}
                </h3>

                <p>
                  {video.description}
                </p>

                <button
                  className="watch-button"
                  onClick={() => {
                    window.open(
                      video.url,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  {isEnglish
                    ? "WATCH NOW"
                    : "TONTON SEKARANG"}
                </button>

              </div>

            </article>

          ))}

        </div>


        {/* BACK */}
        <button
          className="education-back-button"
          onClick={onBack}
        >
          ← {isEnglish ? "Back" : "Kembali"}
        </button>

      </main>

    </div>
  );
}

export default Education;