(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const KEY = "theme";
  const buttons = Array.from(document.querySelectorAll("[data-theme]"));

  function apply(theme) {
    // theme: "light" | "dark" | "auto"
    if (theme === "auto") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }

    buttons.forEach((b) => {
      b.classList.toggle("is-active", b.dataset.theme === theme);
    });
  }

  const saved = localStorage.getItem(KEY) || "auto";
  apply(saved);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      localStorage.setItem(KEY, theme);
      apply(theme);
    });
  });

  // If user chose Auto, reflect OS changes live
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener?.("change", () => {
    const current = localStorage.getItem(KEY) || "auto";
    if (current === "auto") apply("auto");
  });
})();
