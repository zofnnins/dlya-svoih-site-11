(() => {
  "use strict";


  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-main-nav]");

  if (menuButton && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
      const willOpen = !navigation.classList.contains("is-open");
      navigation.classList.toggle("is-open", willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1080) closeMenu();
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll(".faq-list").forEach((list) => {
    list.addEventListener("toggle", (event) => {
      const opened = event.target;
      if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;
      list.querySelectorAll("details[open]").forEach((item) => {
        if (item !== opened) item.open = false;
      });
    }, true);
  });
})();
