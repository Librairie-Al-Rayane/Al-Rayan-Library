///* ===== اللغة ===== */
//const translations = {
//  ar: {
//    home: "الـــرئــيـــســـيـــة",
//    facebook: "فــــيــــســـبــــوك",
//    instagram: "إنـــســـتـــغــــرام",
//    whatsapp: "واتـــــــــســــــاب",
//    email: "البـريـد الإلكـتـرونـي",
//    twitter: "تــــويــــــتـــــــــر",
//    location: "الـــــمــــــوقـــــــع",
//    youtube: "يـــــوتــــــيــــــــوب",
//    about: "مـــــن نـــــــحـــــــن",
//    ar: "العربية",
//    fr: "الفرنسية",
//    en: "الانجليزية",
//    category: "الفئات",
//    srch: "ابحث عن كتاب...",
//    all: "الكل",
//    cat_ar_novels: "روايات عربية",
//    cat_fr_novels: "روايات فرنسية",
//    cat_en_novels: "روايات إنجليزية",
//    cat_kids_3: "قصص +3 سنوات",
//    cat_kids_6: "قصص 3-6 سنوات",
//    cat_kids_10: "قصص 6-10 سنوات",
//    cat_quran: "القرآن المثمن",
//    cat_religious: "الكتب الدينية",
//    cat_dev: "كتب تنمية ذاتية",
//    cat_dict: "معاجم",
//    cancel: "إلغاء",
//    apply: "تطبيق",
//    noResults: "لم نجد نتائج تطابق بحثك 🔍"
//  },
//  fr: {
//    home: "Accueil",
//    facebook: "Facebook",
//    instagram: "Instagram",
//    whatsapp: "WhatsApp",
//    email: "Email",
//    twitter: "Twitter",
//    location: "Localisation",
//    youtube: "YouTube",
//    about: "À propos",
//    ar: "Arabe",
//    fr: "Français",
//    en: "Anglais",
//    category: "Les categories",
//    srch: "Rechercher un livre...",
//    all: "Tout",
//    cat_ar_novels: "Romans arabes",
//    cat_fr_novels: "Romans français",
//    cat_en_novels: "Romans anglais",
//    cat_kids_3: "Histoires +3 ans",
//    cat_kids_6: "Histoires 3-6 ans",
//    cat_kids_10: "Histoires 6-10 ans",
//    cat_quran: "Coran",
//    cat_religious: "Livres religieux",
//    cat_dev: "Développement personnel",
//    cat_dict: "Dictionnaires",
//    cancel: "Annuler",
//    apply: "Appliquer",
//    noResults: "Aucun résultat ne correspond à votre recherche 🔍"
//  },
//  en: {
//    home: "Home",
//    facebook: "Facebook",
//    instagram: "Instagram",
//    whatsapp: "WhatsApp",
//    email: "Email",
//    twitter: "Twitter",
//    location: "Location",
//    youtube: "YouTube",
//    about: "About us",
//    ar: "Arabic",
//    fr: "French",
//    en: "English",
//    category: "Categories",
//    srch: "Search for a book...",
//    all: "All",
//    cat_ar_novels: "Arabic novels",
//    cat_fr_novels: "French novels",
//    cat_en_novels: "English novels",
//    cat_kids_3: "Stories +3 years",
//    cat_kids_6: "Stories 3-6 years",
//    cat_kids_10: "Stories 6-10 years",
//    cat_quran: "Quran",
//    cat_religious: "Religious books",
//    cat_dev: "Self development",
//    cat_dict: "Dictionaries",
//    cancel: "Cancel",
//    apply: "Apply",
//    noResults: "No results match your search 🔍"
//  }
//};
//
///* ===== تغيير اللغة ===== */
//function setLanguage(lang){
//  localStorage.setItem("lang", lang);
//  location.reload();
//}
//
///* ===== البيانات ===== */
//let cards = JSON.parse(localStorage.getItem("cards")) || [];
//
///* ===== normalize ===== */
//function normalizeText(text){
//  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
//}
//
///* ===== عرض بطاقة واحدة ===== */
//function addCardToPage(card, index){
//  const container = document.getElementById("cardContainer");
//  const col = document.createElement("div");
//  col.className = "col-auto";
//  col.dataset.index = index;
//
//  const cardEl = document.createElement("div");
//  cardEl.className = "card";
//  Object.assign(cardEl.style,{ width:"235px", height:"350px", border:"2px solid #d4a564", cursor:"pointer" });
//
//  const img = document.createElement("img");
//  img.src = card.image;
//  img.style.height="270px";
//
//  const body = document.createElement("div");
//  body.className="card-body text-center";
//
//  const title = document.createElement("h6");
//  title.className="card-title";
//  title.textContent = card.title;
//
//  body.appendChild(title);
//  cardEl.append(img, body);
//  col.appendChild(cardEl);
//  container.appendChild(col);
//
//  cardEl.onclick = () => {
//    document.getElementById("cardDetailModalLabel").textContent = card.title;
//    document.getElementById("detailImage").src = card.image;
//    document.getElementById("detailCategory").textContent = card.category || "";
//    document.getElementById("detailTitle").textContent = card.title;
//    document.getElementById("detailPrice").textContent = `الثمن: ${card.price || ""} د.م`;
//    document.getElementById("detailDescription").textContent = card.description || "";
//    new bootstrap.Modal(document.getElementById("cardDetailModal")).show();
//  };
//}
//
///* ===== تحميل جميع البطاقات ===== */
//function loadCards(){
//  const container = document.getElementById("cardContainer");
//  container.innerHTML = "";
//  [...cards].reverse().forEach((c,i) => addCardToPage(c, cards.length-1-i));
//}
//
///* ===== البحث + highlight ===== */
//function highlightText(cardTitle, input){
//  const normTitle = normalizeText(cardTitle);
//  const normInput = normalizeText(input);
//  if(!input) return cardTitle;
//  let result = "", i = 0;
//  while(i < cardTitle.length){
//    const part = normTitle.substr(i, normInput.length);
//    if(part === normInput){
//      result += `<span class="highlight">${cardTitle.substr(i, normInput.length)}</span>`;
//      i += normInput.length;
//    } else {
//      result += cardTitle[i];
//      i++;
//    }
//  }
//  return result;
//}
//
///* ===== فلترة عامة ===== */
//let selectedCategories = [];
//let tempCategories = [];
//let lastAppliedCategories = [];
//
//function filterCards(inputVal){
//
//  let visibleCount = 0;
//
//  document.querySelectorAll("#cardContainer .col-auto").forEach(col => {
//    const card = cards[col.dataset.index];
//    const titleEl = col.querySelector(".card-title");
//    titleEl.innerHTML = highlightText(card.title, input);
//
//    const matchSearch = normalizeText(card.title).includes(normalizeText(input));
//    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(card.category);
//
//    col.style.display = (matchSearch && matchCategory) ? "" : "none";
//    if(col.style.display !== "none") visibleCount++;
//  });
//
//  document.getElementById("noResultsMessage").style.display = visibleCount === 0 ? "block" : "none";
//}
//
//function filterCardsTemp(inputVal){
//
//  let visibleCount = 0;
//
//  document.querySelectorAll("#cardContainer .col-auto").forEach(col => {
//    const card = cards[col.dataset.index];
//    const titleEl = col.querySelector(".card-title");
//    titleEl.innerHTML = highlightText(card.title, input);
//
//    const matchSearch = normalizeText(card.title).includes(normalizeText(input));
//    const matchCategory = tempCategories.length === 0 || tempCategories.includes(card.category);
//
//    col.style.display = (matchSearch && matchCategory) ? "" : "none";
//    if(col.style.display !== "none") visibleCount++;
//  });
//
//  document.getElementById("noResultsMessage").style.display = visibleCount === 0 ? "block" : "none";
//}
//
///* ===== عناصر الفئات ===== */
//const checkboxes = document.querySelectorAll(".categoryCheck");
//const selectAll = document.getElementById("selectAll");
//
///* ===== البحث ===== */
//document.getElementById("srch")?.addEventListener("input", ()=>filterCards());
//
///* ===== Dropdown الفئات ===== */
//document.getElementById("categoryDropdown")?.addEventListener("show.bs.dropdown", () => {
//  tempCategories = [...lastAppliedCategories];
//  checkboxes.forEach(cb => cb.checked = tempCategories.includes(cb.value));
//  selectAll.checked = Array.from(checkboxes).every(cb => cb.checked);
//  filterCardsTemp();
//});
//
///* ===== تعديل أي checkbox ===== */
//checkboxes.forEach(cb => {
//  cb.addEventListener("change", () => {
//    tempCategories = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
//    selectAll.checked = tempCategories.length === checkboxes.length;
//    filterCardsTemp();
//  });
//});
//
///* ===== زر تطبيق ===== */
//document.getElementById("applyFilter")?.addEventListener("click", () => {
//  lastAppliedCategories = [...tempCategories];
//  selectedCategories = [...tempCategories];
//  filterCards();
//});
//
///* ===== زر إلغاء ===== */
//document.getElementById("cancelFilter")?.addEventListener("click", () => {
//  tempCategories = [...lastAppliedCategories];
//  checkboxes.forEach(cb => cb.checked = tempCategories.includes(cb.value));
//  selectAll.checked = checkboxes.length === tempCategories.length || tempCategories.length === 0;
//  filterCards();
//});
//
///* ===== زر الكل ===== */
//selectAll?.addEventListener("change", () => {
//  const checked = selectAll.checked;
//  checkboxes.forEach(cb => cb.checked = checked);
//  tempCategories = checked ? [] : [];
//  filterCardsTemp();
//});
//
///* ===== تحميل الصفحة ===== */
//window.onload = () => {
//  const lang = localStorage.getItem("lang") || "ar";
//  document.documentElement.dir = lang==="ar" ? "rtl" : "ltr";
//  const input = document.getElementById("srch");
//  if(input) input.placeholder = translations[lang].srch;
//
//  loadCards();
//  filterCards();
//};



























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
    about: "مـــــن نـــــــحـــــــن",
    ar: "العربية",
    fr: "الفرنسية",
    en: "الانجليزية",
    category: "الفئات",
    srch: "ابحث عن كتاب...",
    all: "الكل",
    cat_ar_novels: "روايات عربية",
    cat_fr_novels: "روايات فرنسية",
    cat_en_novels: "روايات إنجليزية",
    cat_kids_3: "قصص +3 سنوات",
    cat_kids_6: "قصص 3-6 سنوات",
    cat_kids_10: "قصص 6-10 سنوات",
    cat_quran: "القرآن المثمن",
    cat_religious: "الكتب الدينية",
    cat_dev: "كتب تنمية ذاتية",
    cat_dict: "معاجم",
    cancel: "إلغاء",
    apply: "تطبيق",
    noResults: "لم نجد نتائج تطابق بحثك 🔍"
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
    en: "Anglais",
    category: "Les categories",
    srch: "Rechercher un livre...",
    all: "Tout",
    cat_ar_novels: "Romans arabes",
    cat_fr_novels: "Romans français",
    cat_en_novels: "Romans anglais",
    cat_kids_3: "Histoires +3 ans",
    cat_kids_6: "Histoires 3-6 ans",
    cat_kids_10: "Histoires 6-10 ans",
    cat_quran: "Coran",
    cat_religious: "Livres religieux",
    cat_dev: "Développement personnel",
    cat_dict: "Dictionnaires",
    cancel: "Annuler",
    apply: "Appliquer",
    noResults: "Aucun résultat ne correspond à votre recherche 🔍"
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
    en: "English",
    category: "Categories",
    srch: "Search for a book...",
    all: "All",
    cat_ar_novels: "Arabic novels",
    cat_fr_novels: "French novels",
    cat_en_novels: "English novels",
    cat_kids_3: "Stories +3 years",
    cat_kids_6: "Stories 3-6 years",
    cat_kids_10: "Stories 6-10 years",
    cat_quran: "Quran",
    cat_religious: "Religious books",
    cat_dev: "Self development",
    cat_dict: "Dictionaries",
    cancel: "Cancel",
    apply: "Apply",
    noResults: "No results match your search 🔍"
  }
};

/* ===== تغيير اللغة ===== */
function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  window.location.reload();
}

/* ===== البيانات ===== */
let cards = JSON.parse(localStorage.getItem("cards")) || [];
const bc = new BroadcastChannel("cards_channel");

/* استقبال من admin */
bc.onmessage = (event) => {
  cards = event.data;
  localStorage.setItem("cards", JSON.stringify(cards));
  loadCards();
};

/* ===== عرض البطاقات ===== */
function addCardToPage(card, index) {
  const container = document.getElementById("cardContainer");

  const col = document.createElement("div");
  col.className = "col-auto";
  col.dataset.index = index;

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

/* ===== تحميل ===== */
function loadCards() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  [...cards].reverse().forEach((card, revIndex) => {
    const index = cards.length - 1 - revIndex;
    addCardToPage(card, index);
  });
}

/* ===== الفلترة ===== */
let selectedCategories = [];

function filterCards() {
  const input = document.getElementById("srch").value.toLowerCase();
  let count = 0;

  document.querySelectorAll("#cardContainer .col-auto").forEach(col => {
    const index = col.dataset.index;
    const card = cards[index];
    const titleEl = col.querySelector(".card-title");

    // highlight
    if (!input) {
      titleEl.innerHTML = card.title;
    } else {
      const regex = new RegExp(`(${escapeRegExp(input)})`, "gi");
      titleEl.innerHTML = card.title.replace(regex, `<span class="highlight">$1</span>`);
    }

    const matchSearch = card.title.toLowerCase().includes(input);

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(card.category);

    col.style.display = (matchSearch && matchCategory) ? "" : "none";
    if (col.style.display !== "none") count++;
  });

  document.getElementById("noResultsMessage").style.display =
    count === 0 ? "block" : "none";
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ===== البحث ===== */
document.getElementById("srch")?.addEventListener("input", filterCards);

/* ===== اختيار الكل ===== */
const selectAll = document.getElementById("selectAll");
const checkboxes = document.querySelectorAll(".categoryCheck");

selectAll?.addEventListener("change", () => {
  checkboxes.forEach(cb => cb.checked = selectAll.checked);
});

/* ===== تزامن checkbox ===== */
checkboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    const allChecked = Array.from(checkboxes).every(el => el.checked);
    selectAll.checked = allChecked;
  });
});

/* ===== تطبيق ===== */


document.getElementById("applyFilter")?.addEventListener("click", () => {
  selectedCategories = Array.from(document.querySelectorAll(".categoryCheck:checked"))
    .map(el => el.value);

  filterCards();

  // 🔥 سد dropdown
  const dropdown = bootstrap.Dropdown.getInstance(dropdownBtn);
  dropdown?.hide();
});




/* ===== تأثير الزر ===== */
const dropdownBtn = document.getElementById("categoryDropdown");

const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownMenu?.addEventListener("click", (e) => {
  e.stopPropagation();
});

dropdownBtn?.addEventListener("show.bs.dropdown", () => {
  dropdownBtn.classList.add("active-red");
});

dropdownBtn?.addEventListener("hide.bs.dropdown", () => {
  dropdownBtn.classList.remove("active-red");
});

// عند فتح dropdown، نحفظ الحالة الحالية
dropdownBtn?.addEventListener("show.bs.dropdown", () => {
  tempCategories = [...selectedCategories]; // حفظ الحالة الحالية
});

// عند تغيير أي checkbox، نفلتر مباشرة بدون حفظ
checkboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    // الفلترة مباشرة حسب الاختيارات الحالية في الـ dropdown
    const currentTemp = Array.from(checkboxes)
      .filter(el => el.checked)
      .map(el => el.value);

    // فلترة مباشرة بدون حفظ
    document.querySelectorAll("#cardContainer .col-auto").forEach(col => {
      const card = cards[col.dataset.index];
      const matchCategory =
        currentTemp.length === 0 || currentTemp.includes(card.category);

      const matchSearch = document.getElementById("srch").value
        ? card.title.toLowerCase().includes(document.getElementById("srch").value.toLowerCase())
        : true;

      col.style.display = (matchCategory && matchSearch) ? "" : "none";
    });

    // تحديث اختيار الكل
    const allChecked = Array.from(checkboxes).every(el => el.checked);
    selectAll.checked = allChecked;
  });
});

// زر "تطبيق" لحفظ الاختيارات
document.getElementById("applyFilter")?.addEventListener("click", () => {
  selectedCategories = Array.from(checkboxes)
    .filter(el => el.checked)
    .map(el => el.value);
  
  // 🔥 سد dropdown
  const dropdown = bootstrap.Dropdown.getInstance(dropdownBtn);
  dropdown?.hide();
});

// زر "إلغاء" لاسترجاع الحالة السابقة بدون حفظ
document.getElementById("resetFilter")?.addEventListener("click", () => {
  checkboxes.forEach(cb => cb.checked = tempCategories.includes(cb.value));

  // تحديث اختيار الكل
  const allChecked = Array.from(checkboxes).every(el => el.checked);
  selectAll.checked = allChecked;

  // إعادة الفلترة حسب الحالة القديمة
  document.querySelectorAll("#cardContainer .col-auto").forEach(col => {
    const card = cards[col.dataset.index];
    const matchCategory =
      tempCategories.length === 0 || tempCategories.includes(card.category);

    const matchSearch = document.getElementById("srch").value
      ? card.title.toLowerCase().includes(document.getElementById("srch").value.toLowerCase())
      : true;

    col.style.display = (matchCategory && matchSearch) ? "" : "none";
  });

  // 🔥 سد dropdown
  const dropdown = bootstrap.Dropdown.getInstance(dropdownBtn);
  dropdown?.hide();
});

/* ===== المتغيرات ===== */


/* ===== فلترة مباشرة حسب الاختيارات المؤقتة ===== */
function filterTemp() {
  const currentTemp = Array.from(checkboxes)
    .filter(el => el.checked)
    .map(el => el.value);

  const input = document.getElementById("srch")?.value.toLowerCase() || "";

  let visibleCount = 0;

  document.querySelectorAll("#cardContainer .col-auto").forEach(col => {
    const card = cards[col.dataset.index];
    const matchCategory =
      currentTemp.length === 0 || currentTemp.includes(card.category);
    const matchSearch = card.title.toLowerCase().includes(input);
    col.style.display = (matchCategory && matchSearch) ? "" : "none";
    if(col.style.display !== "none") visibleCount++;
  });

  // إظهار/إخفاء رسالة لا توجد نتائج
  document.getElementById("noResultsMessage").style.display =
    visibleCount === 0 ? "block" : "none";
}

/* ===== عند فتح dropdown ===== */
dropdownBtn?.addEventListener("show.bs.dropdown", () => {
  tempCategories = [...selectedCategories]; // حفظ الحالة الحالية
  // تحديث checkboxes على حسب الحالة الحالية
  checkboxes.forEach(cb => cb.checked = tempCategories.includes(cb.value));
  selectAll.checked = Array.from(checkboxes).every(el => el.checked);
});

/* ===== عند تغيير أي checkbox ===== */
checkboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    filterTemp(); // فلترة مباشرة
    selectAll.checked = Array.from(checkboxes).every(el => el.checked);
  });
});

/* ===== زر اختيار الكل ===== */
selectAll?.addEventListener("change", () => {
  checkboxes.forEach(cb => cb.checked = selectAll.checked);
  filterTemp(); // فلترة مباشرة عند اختيار الكل
});

/* ===== زر تطبيق ===== */
document.getElementById("applyFilter")?.addEventListener("click", () => {
  selectedCategories = Array.from(checkboxes)
    .filter(el => el.checked)
    .map(el => el.value);

  // إغلاق dropdown
  const dropdown = bootstrap.Dropdown.getInstance(dropdownBtn);
  dropdown?.hide();
});

/* ===== زر إلغاء ===== */
document.getElementById("resetFilter")?.addEventListener("click", () => {
  // استرجاع الحالة السابقة
  checkboxes.forEach(cb => cb.checked = tempCategories.includes(cb.value));
  selectAll.checked = Array.from(checkboxes).every(el => el.checked);

  filterTemp(); // إعادة الفلترة حسب الحالة السابقة

  // إغلاق dropdown
  const dropdown = bootstrap.Dropdown.getInstance(dropdownBtn);
  dropdown?.hide();
});

/* ===== تحميل الصفحة ===== */
window.onload = () => {

  const savedLang = localStorage.getItem("lang") || "ar";
  const html = document.documentElement;

  html.lang = savedLang;
  html.dir = savedLang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    el.textContent = translations[savedLang][key];
  });

  const input = document.querySelector(".search-input");
  if(input){
    if(savedLang === "ar") input.placeholder = "ابحث عن كتاب أو رواية...";
    if(savedLang === "fr") input.placeholder = "Rechercher un livre...";
    if(savedLang === "en") input.placeholder = "Search for a book...";
  }

  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    if(savedLang === "ar") {
      sidebar.style.right = "0";
    } else {
      sidebar.style.left = "0";
    }
  }

  loadCards();
};







/* ===== إلغاء (حفظ الحالة) ===== */
let tempCategories = [];

dropdownBtn?.addEventListener("show.bs.dropdown", () => {

  // نحفظ الحالة الحالية
  tempCategories = [...selectedCategories];

});

document.getElementById("resetFilter")?.addEventListener("click", () => {

  // رجوع للحالة السابقة
  checkboxes.forEach(cb => {
    cb.checked = tempCategories.includes(cb.value);
  });

  const allChecked = Array.from(checkboxes).every(el => el.checked);
  selectAll.checked = allChecked;

  // 🔥 سد dropdown
  const dropdown = bootstrap.Dropdown.getInstance(dropdownBtn);
  dropdown?.hide();
});

  // تحديث اختيار الكل
  const allChecked = Array.from(checkboxes).every(el => el.checked);
  document.getElementById("selectAll").checked = allChecked;










