const $ = (sel) => document.querySelector(sel);

const projects = [
  {
    id: "editorial-portfolio",
    title: "\u7f16\u8f91\u5f0f\u4f5c\u54c1\u96c6\u7f51\u7ad9\uff08\u6a21\u677f\uff09",
    year: "2026",
    role: "\u89c6\u89c9 / \u7248\u5f0f / \u524d\u7aef\u843d\u5730",
    summary:
      "\u7528\u7f51\u683c\u3001\u7559\u767d\u4e0e\u6bb5\u843d\u8282\u594f\uff0c\u8ba9\u4f5c\u54c1\u9875\u53d8\u5f97\u201c\u53ef\u9605\u8bfb\u201d\u3002",
    tags: ["\u4f5c\u54c1\u96c6", "\u7248\u5f0f", "\u7cfb\u7edf"],
    highlights: [
      "\u4fe1\u606f\u7ed3\u6784\uff1a\u76ee\u6807-\u7ea6\u675f-\u8fc7\u7a0b-\u7ed3\u679c",
      "\u5c55\u793a\u65b9\u5f0f\uff1a\u5217\u8868 + \u5f39\u7a97\u8be6\u60c5",
      "\u7ef4\u62a4\u65b9\u5f0f\uff1a\u76f4\u63a5\u7f16\u8f91 script.js \u9876\u90e8\u6570\u636e",
    ],
  },
  {
    id: "brand-system",
    title: "\u54c1\u724c\u8bc6\u522b\u4e0e\u5ef6\u5c55\u7cfb\u7edf",
    year: "2025",
    role: "\u54c1\u724c\u89c6\u89c9 / \u89c4\u8303",
    summary:
      "\u4ece\u6838\u5fc3\u7b26\u53f7\u51fa\u53d1\uff0c\u5efa\u7acb\u53ef\u590d\u7528\u7684\u89c6\u89c9\u8bed\u6cd5\u4e0e\u843d\u5730\u89c4\u8303\u3002",
    tags: ["\u54c1\u724c", "VI", "\u89c4\u8303"],
    highlights: [
      "\u56fe\u5f62\u8bed\u6cd5\u4e0e\u7f51\u683c\u89c4\u5219",
      "\u5e94\u7528\uff1a\u6d77\u62a5/\u793e\u5a92/\u7269\u6599",
      "\u4ea4\u4ed8\uff1a\u89c4\u8303\u6587\u6863\u4e0e\u53ef\u7f16\u8f91\u8d44\u4ea7",
    ],
  },
  {
    id: "product-ui",
    title: "\u4ea7\u54c1 UI \u91cd\u6784\u4e0e\u8bbe\u8ba1\u7cfb\u7edf",
    year: "2024",
    role: "UI / \u7ec4\u4ef6 / \u4ea4\u4e92",
    summary:
      "\u6574\u7406\u4fe1\u606f\u5c42\u7ea7\uff0c\u51cf\u5c11\u566a\u97f3\uff0c\u628a\u6838\u5fc3\u8def\u5f84\u505a\u5f97\u66f4\u77ed\u3002",
    tags: ["UI", "\u7ec4\u4ef6", "\u4f53\u9a8c"],
    highlights: [
      "\u7ec4\u4ef6\u4f53\u7cfb\uff1a\u6309\u94ae/\u8868\u5355/\u63d0\u793a",
      "\u9875\u9762\u6a21\u677f\uff1a\u5217\u8868/\u8be6\u60c5/\u7f16\u8f91\u6d41",
      "\u53ef\u7528\u6027\u63d0\u5347\uff08\u793a\u4f8b\uff09",
    ],
  },
];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return ch;
    }
  });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
}

function initTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  } catch {
    // ignore
  }
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  setTheme(current === "dark" ? "light" : "dark");
}

function renderCards() {
  const grid = $("#workGrid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((p) => {
      const tags = (p.tags ?? []).slice(0, 4);
      return `
        <article class="work-card" role="button" tabindex="0" data-id="${escapeHtml(
          p.id
        )}" aria-label="${escapeHtml("\u67e5\u770b " + p.title + " \u8be6\u60c5")}">
          <div class="work-eyebrow">
            <span>${escapeHtml(p.year ?? "")}</span>
            <span class="mono">${escapeHtml(p.role ?? "")}</span>
          </div>
          <h3 class="work-title">${escapeHtml(p.title)}</h3>
          <p class="work-summary">${escapeHtml(p.summary ?? "")}</p>
          <div class="work-tags">
            ${tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");

  const statCount = $("#statCount");
  if (statCount) statCount.textContent = `${projects.length}+`;

  const statYear = $("#statYear");
  if (statYear) statYear.textContent = String(new Date().getFullYear());
}

function openDialog(projectId) {
  const p = projects.find((x) => x.id === projectId);
  const dialog = $("#workDialog");
  const body = $("#dialogBody");
  if (!p || !dialog || !body) return;

  const items = (p.highlights ?? []).map((h) => `<li>${escapeHtml(h)}</li>`).join("");

  body.innerHTML = `
    <div class="work-eyebrow">
      <span>${escapeHtml(p.year ?? "")}</span>
      <span class="mono">${escapeHtml(p.role ?? "")}</span>
    </div>
    <h3>${escapeHtml(p.title)}</h3>
    <p>${escapeHtml(p.summary ?? "")}</p>
    ${
      items
        ? `<div class="about-card" style="margin-top: 12px">
            <h3>${escapeHtml("\u4eae\u70b9")}</h3>
            <ul>${items}</ul>
          </div>`
        : ""
    }
    <div style="margin-top: 14px; display:flex; gap:10px; flex-wrap:wrap">
      <a class="btn" href="#contact">${escapeHtml("\u8054\u7cfb\u6211")}</a>
      <button class="btn btn-ghost" type="button" id="dialogClose2">${escapeHtml(
        "\u5173\u95ed"
      )}</button>
    </div>
  `;

  dialog.showModal();
  $("#dialogClose2")?.addEventListener("click", () => dialog.close(), { once: true });
}

function initDialog() {
  const grid = $("#workGrid");
  const dialog = $("#workDialog");
  if (!grid || !dialog) return;

  const handleOpen = (el) => {
    const id = el?.getAttribute?.("data-id");
    if (id) openDialog(id);
  };

  grid.addEventListener("click", (e) => {
    const card = e.target.closest?.(".work-card");
    handleOpen(card);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest?.(".work-card");
    if (!card) return;
    e.preventDefault();
    handleOpen(card);
  });

  $("#dialogClose")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
}

function initFooter() {
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function initContactForm() {
  const form = $("#contactForm");
  const note = $("#formNote");
  if (!form || !note) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();

    const prefix = "\u6536\u5230\u5566";
    const suffix = "\u3002\u8fd9\u662f\u6f14\u793a\u9875\u9762\uff0c\u8bf7\u6539\u6210\u4f60\u7684\u8868\u5355\u670d\u52a1\u6216\u90ae\u4ef6\u3002";
    note.textContent = name ? `${prefix}\uff0c${name}${suffix}` : `${prefix}${suffix}`;

    form.reset();
  });
}

initTheme();
renderCards();
initDialog();
initFooter();
initContactForm();

$("#themeToggle")?.addEventListener("click", toggleTheme);
