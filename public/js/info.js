/* ===== اللغة ===== */
const translations = {
    ar: {
        home: "الـــرئــيـــســـيـــة",
        facebook: "فــــيــــســـبــــوك",
        instagram: "إنـــســـتـــغــــرام",
        whatsapp: "واتـــــــــســــــاب",
        email: "البـريـد الإلكـتـرونـي",
        twitter: "تــــويــــــتـــــــــر",
        location: "الـــــمــــــوقـــــــع",
        youtube: "يـــــوتــــــيــــــــوب",
        about:   "مـــــن نـــــــحـــــــن",
        ar: "العربية",
        fr: "الفرنسية",
        en: "الانجليزية"
    },

    fr: {
        home: "Accueil",
        facebook: "Facebook",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
        email: "Email",
        twitter: "Twitter",
        location: "Localisation",
        youtube: "YouTube",
        about: "À propos",
        ar: "Arabe",
        fr: "Français",
        en: "Anglais"
    },

    en: {
        home: "Home",
        facebook: "Facebook",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
        email: "Email",
        twitter: "Twitter",
        location: "Location",
        youtube: "YouTube",
        about: "About us",
        ar: "Arabic",
        fr: "French",
        en: "English"
    }
};

function setLanguage(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    el.textContent = translations[lang][key];
  });

  const input = document.querySelector(".search-input");
  if(input){
    if(lang === "ar") input.placeholder = "ابحث عن كتاب أو رواية...";
    if(lang === "fr") input.placeholder = "Rechercher un livre...";
    if(lang === "en") input.placeholder = "Search for a book...";
  }

  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    if(lang === "ar") {
      sidebar.style.right = "0";
      sidebar.style.left = "auto";
    } else {
      sidebar.style.left = "0";
      sidebar.style.right = "auto";
    }
  }

  localStorage.setItem("lang", lang);
}

/* ===== البطاقات ===== */
let cards = JSON.parse(localStorage.getItem("cards")) || [];

/* ===== BroadcastChannel ===== */
const bc = new BroadcastChannel("cards_channel");

/* استقبال التحديث من صفحة الإدارة */
bc.onmessage = (event) => {
  cards = event.data;
  localStorage.setItem("cards", JSON.stringify(cards));
  loadCards();
};

/* ===== عرض البطاقات ===== */
function addCardToPage(card) {
  const container = document.getElementById("cardContainer");

  const col = document.createElement("div");
  col.className = "col-auto";

  const cardEl = document.createElement("div");
  cardEl.className = "card";
  Object.assign(cardEl.style, {
    width: "235px",
    height: "350px",
    border: "2px solid #d4a564",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    cursor: "pointer"
  });

  const image = document.createElement("img");
  image.src = card.image;
  image.className = "card-img-top";
  image.style.height = "270px";

  const body = document.createElement("div");
  body.className = "card-body text-center";

  const title = document.createElement("h6");
  title.className = "card-title";
  title.textContent = card.title;

  body.appendChild(title);
  cardEl.appendChild(image);
  cardEl.appendChild(body);
  col.appendChild(cardEl);
  container.appendChild(col);

  /* ===== عند الضغط: عرض التفاصيل ===== */
  cardEl.addEventListener("click", () => {
    document.getElementById("cardDetailModalLabel").textContent = card.title;
    document.getElementById("detailImage").src = card.image;
    document.getElementById("detailCategory").innerHTML =
      `<span style="background:#793018;color:#fff;padding:5px 10px;border-radius:6px;">${card.category || ""}</span>`;
    document.getElementById("detailTitle").textContent = card.title;
    document.getElementById("detailPrice").textContent = `الثمن: ${card.price} د.م`;
    document.getElementById("detailDescription").textContent = card.description;

    new bootstrap.Modal(document.getElementById("cardDetailModal")).show();
  });
}
/* ===== تحميل البطاقات ===== */
function loadCards() {
  const container = document.getElementById("cardContainer");
  if (!container) return;

  container.innerHTML = "";

  [...cards].reverse().forEach(card => {
    addCardToPage(card);
  });
}

/* ===== البحث ===== */
function filterCards() {
  const input = document.getElementById("srch").value.toLowerCase();

  document.querySelectorAll("#cardContainer .col-auto").forEach((col, i) => {
    const card = cards[i];
    col.style.display = card.title.toLowerCase().includes(input) ? "" : "none";
  });
}

document.getElementById("srch")?.addEventListener("input", filterCards);

/* ===== عند تحميل الصفحة ===== */
window.onload = () => {
  const savedLang = localStorage.getItem("lang") || "ar";
  setLanguage(savedLang);
  loadCards();
};

// نص رسالة لا توجد نتائج حسب اللغة
const noResultsText = {
  ar: "لم نجد نتائج تطابق بحثك 🔍",
  fr: "Aucun résultat ne correspond à votre recherche 🔍",
  en: "No results match your search 🔍"
};

// البحث مع تمييز الحروف المكتوبة
function filterCards() {
  const input = document.getElementById("srch").value.toLowerCase();
  let count = 0;

  document.querySelectorAll("#cardContainer .col-auto").forEach((col, i) => {
    const card = cards[i];
    const titleEl = col.querySelector(".card-title");

    if (!input) {
      titleEl.innerHTML = card.title;
    } else {
      const regex = new RegExp(`(${escapeRegExp(input)})`, "gi");
      titleEl.innerHTML = card.title.replace(regex, `<span class="highlight">$1</span>`);
    }

    col.style.display = card.title.toLowerCase().includes(input) ? "" : "none";
    if(col.style.display !== "none") count++;
  });

  // عرض رسالة لا توجد نتائج حسب اللغة
  const lang = localStorage.getItem("lang") || "ar";
  const noRes = document.getElementById("noResultsMessage");
  noRes.style.display = count === 0 ? "block" : "none";
  noRes.textContent = noResultsText[lang];
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ربط البحث بالمفتاح input
document.getElementById("srch")?.addEventListener("input", filterCards);

// ===== تغيير اللغة مع إعادة تحميل الصفحة =====
function setLanguage(lang) {
  // حفظ اللغة في localStorage
  localStorage.setItem("lang", lang);

  // إعادة تحميل الصفحة لتطبيق اللغة الجديدة
  window.location.reload();
}

// ===== عند تحميل الصفحة =====
window.onload = () => {
  const savedLang = localStorage.getItem("lang") || "ar";

  // تعيين اتجاه الصفحة واللغة
  const html = document.documentElement;
  html.lang = savedLang;
  html.dir = savedLang === "ar" ? "rtl" : "ltr";

  // تحديث النصوص حسب اللغة
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    el.textContent = translations[savedLang][key];
  });

  // تحديث placeholder حقل البحث
  const input = document.querySelector(".search-input");
  if(input){
    if(savedLang === "ar") input.placeholder = "ابحث عن كتاب أو رواية...";
    if(savedLang === "fr") input.placeholder = "Rechercher un livre...";
    if(savedLang === "en") input.placeholder = "Search for a book...";
  }

  // تحديث مكان sidebar حسب اللغة
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    if(savedLang === "ar") {
      sidebar.style.right = "0";
      sidebar.style.left = "auto";
    } else {
      sidebar.style.left = "0";
      sidebar.style.right = "auto";
    }
  }

  // تحميل البطاقات
  loadCards();
};

