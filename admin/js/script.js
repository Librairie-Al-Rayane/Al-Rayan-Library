/* ===== البيانات من localStorage ===== */
let cards = JSON.parse(localStorage.getItem("cards")) || [];
let editIndex = null;

/* ===== BroadcastChannel للتواصل مع public ===== */
const bc = new BroadcastChannel("cards_channel");

function broadcastCards() {
  bc.postMessage(cards);
}

/* ===== تحميل الصفحة ===== */
window.addEventListener("load", loadCards);

/* ===== إضافة بطاقة للصفحة ===== */
function addCardToPage(card, index) {
  const container = document.getElementById("cardContainer");

  const col = document.createElement("div");
  col.className = "col-auto position-relative";

  const cardEl = document.createElement("div");
  cardEl.className = "card";
  Object.assign(cardEl.style, {
    width: "235px",
    height: "350px",
    border: "2px solid #d4a564",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    cursor: "pointer",
    position: "relative"
  });

  /* ===== الفئة ===== */
  const categoryBadge = document.createElement("span");
  categoryBadge.className = "category-badge";
  categoryBadge.textContent = card.category || "";
  cardEl.appendChild(categoryBadge);

  /* ===== زر الحذف ===== */
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-single-btn";
  deleteBtn.innerHTML = "&times;";
  deleteBtn.addEventListener("click", e => {
    e.stopPropagation();
    closeAllModes();
    if (confirm("هل أنت متأكد من حذف هذه البطاقة؟")) {
      deleteCard(index);
    }
  });
  cardEl.appendChild(deleteBtn);

  /* ===== زر التعديل ===== */
  const editIcon = document.createElement("i");
  editIcon.className = "bi bi-pencil edit-icon";
  editIcon.addEventListener("click", e => {
    e.stopPropagation();
    closeAllModes();
    openEditModal(index);
  });

  /* ===== التحكم في الحذف و التعديل عند الضغط على الأيقونات ===== */


editIcon.addEventListener("click", e => {
  e.stopPropagation();
  if (document.body.classList.contains("edit-mode")) {
    // إذا كان mode التعديل مفعل، نغلقه
    document.body.classList.remove("edit-mode");
    return;
  }
  closeAllModes();
  openEditModal(index);
});


  
  cardEl.appendChild(editIcon);

  /* ===== الصورة ===== */
  const image = document.createElement("img");
  image.src = card.image;
  image.className = "card-img-top";
  image.style.height = "270px";
  cardEl.appendChild(image);

  /* ===== العنوان ===== */
  const cardBody = document.createElement("div");
  cardBody.className = "card-body text-center";

  const titleEl = document.createElement("h6");
  titleEl.className = "card-title";
  titleEl.style = "margin-top : -5px";
  titleEl.textContent = card.title;

  cardBody.appendChild(titleEl);
  cardEl.appendChild(cardBody);

  /* ===== عرض التفاصيل ===== */
  cardEl.addEventListener("click", () => {
    const modal = document.getElementById("cardDetailModal");

    document.getElementById("cardDetailModalLabel").textContent = card.title;
    document.getElementById("detailImage").src = card.image;
    document.getElementById("detailCategory").innerHTML = `<span class="detail-category">${card.category || ""}</span>`;
    document.getElementById("detailTitle").textContent = card.title;
    document.getElementById("detailPrice").textContent = `الثمن: ${card.price} د.م`;
    document.getElementById("detailDescription").textContent = card.description;

    new bootstrap.Modal(modal).show();
  });

  col.appendChild(cardEl);
  container.appendChild(col);

  col.dataset.index = index;
}

/* ===== تحميل البطاقات ===== */
function loadCards() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  [...cards].reverse().forEach((card, revIndex) => {
    const index = cards.length - 1 - revIndex;
    addCardToPage(card, index);
  });

  updateActionButtons(cards.length > 0);
}

/* ===== حفظ البيانات ===== */
function saveCards() {
  localStorage.setItem("cards", JSON.stringify(cards));
  loadCards();
  broadcastCards(); // نرسل التحديث لصفحة public
}

/* ===== إضافة بطاقة ===== */
document.getElementById("cardForm").addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("cardTitle").value.trim();
  const description = document.getElementById("cardDescription").value.trim();
  const price = document.getElementById("price").value.trim();
  const category = document.getElementById("cardCategory").value;
  const file = document.getElementById("cardImage").files[0];

  if (!title || !description || !price || !category || !file) {
    return alert("يرجى ملء جميع الحقول");
  }

  const reader = new FileReader();
  reader.onload = e2 => {
    cards.push({
      title,
      description,
      price,
      category,
      image: e2.target.result
    });

    const modalEl = document.getElementById("addCardModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    saveCards();
    document.getElementById("cardForm").reset();
  };
  reader.readAsDataURL(file);
});

/* ===== تعديل البطاقة ===== */
function openEditModal(index) {
  editIndex = index;
  const card = cards[index];

  document.getElementById("editCardTitle").value = card.title;
  document.getElementById("editCardDescription").value = card.description;
  document.getElementById("editPrice").value = card.price;
  document.getElementById("editCardCategory").value = card.category;

  // ✅ مهم: مسح الصورة القديمة من input
  document.getElementById("editCardImage").value = "";

  new bootstrap.Modal(document.getElementById("editCardModal")).show();
}

document.getElementById("editCardForm").addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("editCardTitle").value.trim();
  const description = document.getElementById("editCardDescription").value.trim();
  const price = document.getElementById("editPrice").value.trim();
  const category = document.getElementById("editCardCategory").value;
  const file = document.getElementById("editCardImage").files[0];

  if (!title || !description || !price || !category) {
    return alert("يرجى ملء جميع الحقول");
  }

  const apply = img => {
    const card = cards[editIndex];
    card.title = title;
    card.description = description;
    card.price = price;
    card.category = category;
    if (img) card.image = img;

    const modalEl = document.getElementById("editCardModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();

    saveCards();
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = e2 => apply(e2.target.result);
    reader.readAsDataURL(file);
  } else {
    apply();
  }
});

/* ===== حذف بطاقة ===== */
function deleteCard(index) {
  cards.splice(index, 1);
  saveCards();
}

/* ===== البحث ===== */
function filterCards() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  let count = 0;

document.querySelectorAll("#cardContainer .col-auto").forEach(col => {
  const index = col.dataset.index;
  const card = cards[index];
  const titleEl = col.querySelector(".card-title");

  if (!input) {
    titleEl.innerHTML = card.title;
  } else {
    const regex = new RegExp(`(${escapeRegExp(input)})`, "gi");
    titleEl.innerHTML = card.title.replace(regex, `<span class="highlight">$1</span>`);
  }

  col.style.display = card.title.toLowerCase().includes(input) ? "" : "none";
  if (col.style.display !== "none") count++;
});

  document.getElementById("noResultsMessage").style.display = count === 0 ? "block" : "none";
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

document.getElementById("searchInput").addEventListener("input", filterCards);

/* ===== Sidebar & Modals ===== */
const sidebarMenu = document.getElementById("sidebarMenu");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
  sidebarMenu.classList.toggle("active");
  sidebarOverlay.classList.toggle("show");
});

function closeSidebar() {
  sidebarMenu.classList.remove("active");
  sidebarOverlay.classList.remove("show");
}

function closeAllModes() {
  document.body.classList.remove("show-delete-btns", "edit-mode");
  closeSidebar();
}

sidebarOverlay.addEventListener("click", closeAllModes);

document.getElementById("li2").addEventListener("click", () => {
  closeAllModes();

  // ✅ تصفير الفورم
  document.getElementById("cardForm").reset();

  // (اختياري) تأكد أن الصورة مسحات
  document.getElementById("cardImage").value = "";

  new bootstrap.Modal(document.getElementById("addCardModal")).show();
});

document.getElementById("li4").addEventListener("click", () => {
  closeAllModes();
  document.body.classList.add("show-delete-btns");
});

document.getElementById("li5").addEventListener("click", () => {
  closeAllModes();
  document.body.classList.add("edit-mode");
});

/* ===== إزالة الـbackdrop عند إغلاق المودالات ===== */
["addCardModal", "editCardModal"].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("show.bs.modal", closeAllModes);
  el.addEventListener("hidden.bs.modal", () => {
    const b = document.querySelector(".modal-backdrop");
    if (b) b.remove();
  });
});



document.addEventListener("click", e => {
  if (
    !e.target.closest(".card") &&
    !e.target.closest("#sidebarMenu") &&
    !e.target.closest("#menuToggle")
  ) {
    closeAllModes();
  }
});

document.addEventListener("click", e => {
  if (
    !e.target.closest(".card") &&
    !e.target.closest("#sidebarMenu") &&
    !e.target.closest("#menuToggle") &&
    !e.target.closest(".modal")
  ) {
    closeAllModes();
  }
});

const addModal = document.getElementById("addCardModal");

addModal.addEventListener("show.bs.modal", () => {
  document.getElementById("cardForm").reset();
  document.getElementById("cardImage").value = "";
});