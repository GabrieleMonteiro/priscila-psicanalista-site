// =========================================
// CONFIGURAÇÕES DO SITE
// =========================================

const SITE_CONFIG = {
  whatsapp: "5511983122680",
  whatsappMessage: "Olá, gostaria de marcar uma consulta!",
  instagram: "https://www.instagram.com/psique.autoconhecimento?exln=N3JmcGExbGZvZ2Uw",
  address: "Alameda Prof. Lucas Nogueira Garcez, 2630 - Jardim Paulista, Atibaia - SP, 12947-000",
  googleReviewsUrl: "https://share.google/Ed6hcndH3ZEnP3c6x",

  // Para mostrar avaliações dentro do site, configure aqui
  // uma URL de incorporação fornecida por um widget ou integração.
  // O link share.google não é uma URL de incorporação.
  googleReviewsEmbedUrl: ""
};

// =========================================
// TRADUÇÕES
// =========================================

const translations = {
  en: {
    "Início": "Home",
    "Sobre mim": "About me",
    "A psicanálise": "Psychoanalysis",
    "Atendimento": "Appointments",
    "Agendar conversa": "Schedule a conversation",
    "Prazer, sou a Priscila": "Nice to meet you, I'm Priscila",
    "Por trás de cada história,": "Behind every story,",
    "existe alguém que pode ajudar você a encontrar novos caminhos.": "there is someone who can help you find new paths.",
    "Quem sou eu?": "Who am I?",
    "Um ambiente pensado": "A space designed",
    "para acolher.": "to welcome you.",
    "Conhecer a si também": "Knowing yourself is also",
    "é uma forma de cuidado.": "a form of self-care.",
    "Sobre mim": "About me",
    "Onde me localizar": "Where to find me",
    "Especialidade": "Specialty",
    "Como funciona": "How it works",
    "Um encontro começa": "A session begins",
    "com uma conversa.": "with a conversation.",
    "Atendimento online": "Online sessions",
    "O cuidado pode chegar até você.": "Care can reach you.",
    "Entre em contato": "Get in touch",
    "Combine seu horário": "Schedule your appointment",
    "Chegue como você está": "Come as you are",
    "Nossa sessão": "Our session",
    "Conversar sobre um atendimento": "Talk about an appointment",
    "Cuidar de si é importante": "Taking care of yourself matters",
    "Você também merece": "You also deserve",
    "ser prioridade.": "to be a priority.",
    "Experiências e confiança": "Experiences and trust",
    "O que estão falando": "What people are saying",
    "sobre mim?": "about me?",
    "PERFIL NO GOOGLE MAPS": "GOOGLE MAPS PROFILE",
    "As avaliações de quem já conhece meu trabalho.": "Reviews from people who know my work.",
    "As opiniões são publicadas diretamente no Google. Você pode conferir os comentários e avaliações no perfil profissional.": "Reviews are published directly on Google. You can read the comments and ratings on the professional profile.",
    "Ver avaliações no Google": "See Google reviews",
    "Seu primeiro passo": "Your first step",
    "Que tal reservar": "How about making",
    "um tempo para": "some time for",
    "você?": "yourself?",
    "Falar pelo WhatsApp": "Contact via WhatsApp",
    "Como chegar": "How to get here",
    "Um espaço para": "A space to",
    "se sentir à vontade.": "feel comfortable.",
    "Abrir rota no Google Maps": "Open route in Google Maps",
    "Voltar ao início": "Back to top",
    "Navegar pela página": "Navigate the page",
    "Pular para o conteúdo": "Skip to content",
    "Início": "Home",
    "Localização": "Location",
    "Avaliações": "Reviews",
    "Explore": "Explore",
    "Vamos conversar?": "Shall we talk?",
    "Site desenvolvido por Gabriele R. Monteiro.": "Website developed by Gabriele R. Monteiro."
  }
};

// =========================================
// INICIALIZAÇÃO
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  // WhatsApp
  const whatsappUrl =
    `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`;

  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // Google Reviews
  document.querySelectorAll("[data-google-reviews]").forEach(link => {
    if (SITE_CONFIG.googleReviewsUrl.trim()) {
      link.href = SITE_CONFIG.googleReviewsUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#avaliacoes";
    }
  });

  // Incorporação opcional das avaliações
  const reviewsEmbed = document.querySelector("#google-reviews-embed");

  if (reviewsEmbed && SITE_CONFIG.googleReviewsEmbedUrl.trim()) {
    const frame = document.createElement("iframe");

    frame.src = SITE_CONFIG.googleReviewsEmbedUrl;
    frame.title = "Avaliações do perfil profissional no Google";
    frame.loading = "lazy";
    frame.referrerPolicy = "no-referrer-when-downgrade";

    reviewsEmbed.replaceChildren(frame);
    reviewsEmbed.style.display = "block";
  }

  // Instagram
  document.querySelectorAll("[data-instagram]").forEach(link => {
    if (SITE_CONFIG.instagram.trim()) {
      link.href = SITE_CONFIG.instagram;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#";
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Adicione o link do Instagram no arquivo js/script.js.");
      });
    }
  });

  // Google Maps
  const mapsUrl = SITE_CONFIG.address.trim()
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address)}`
    : "";

  document.querySelectorAll("[data-maps]").forEach(link => {
    if (mapsUrl) {
      link.href = mapsUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#localizacao";
    }
  });

  const addressText = document.querySelector("#address-text");

  if (addressText && SITE_CONFIG.address.trim()) {
    addressText.textContent = SITE_CONFIG.address;
  }

  // Mapa incorporado
  const mapPlaceholder = document.querySelector(".map-placeholder");

  if (mapPlaceholder && SITE_CONFIG.address.trim()) {
    const mapFrame = document.createElement("iframe");

    mapFrame.src =
      `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.address)}&output=embed`;

    mapFrame.title = `Mapa de localização: ${SITE_CONFIG.address}`;
    mapFrame.loading = "lazy";
    mapFrame.referrerPolicy = "no-referrer-when-downgrade";
    mapFrame.style.width = "100%";
    mapFrame.style.height = "340px";
    mapFrame.style.border = "0";

    mapPlaceholder.replaceWith(mapFrame);
  }

  // =========================================
  // MENU RESPONSIVO
  // =========================================

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  // =========================================
  // NAVEGAÇÃO POR SEÇÕES
  // =========================================

  const sectionSelect = document.querySelector("#section-select");

  if (sectionSelect) {
    sectionSelect.addEventListener("change", () => {
      const target = sectionSelect.value;

      if (target) {
        document.querySelector(target)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        sectionSelect.value = "";
      }
    });
  }

  // =========================================
  // MODO ESCURO
  // =========================================

  const themeToggle = document.querySelector("#theme-toggle");
  const savedTheme = localStorage.getItem("site-theme") || "light";

  document.body.dataset.theme = savedTheme;

  const updateThemeButton = () => {
    if (!themeToggle) return;

    const darkMode = document.body.dataset.theme === "dark";

    themeToggle.innerHTML = darkMode
      ? '<span aria-hidden="true">☀</span>'
      : '<span aria-hidden="true">☾</span>';

    themeToggle.setAttribute(
      "aria-label",
      darkMode ? "Ativar modo claro" : "Ativar modo escuro"
    );
  };

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme =
        document.body.dataset.theme === "dark" ? "light" : "dark";

      document.body.dataset.theme = nextTheme;
      localStorage.setItem("site-theme", nextTheme);

      updateThemeButton();
    });
  }

  // =========================================
  // TRADUÇÃO PORTUGUÊS / INGLÊS
  // =========================================

  const languageToggle = document.querySelector("#language-toggle");

  let currentLanguage =
    localStorage.getItem("site-language") || "pt";

  const originalTexts = new Map();

  const textElements = [...document.querySelectorAll(
    ".main-nav a, .section-heading .eyebrow, .section-heading h2, " +
    ".story-content h3, .story-content .eyebrow, " +
    ".care-copy h2, .care-copy .eyebrow, " +
    ".how-it-works h3, .how-it-works .eyebrow, " +
    ".reviews-content h3, .reviews-platform-label, " +
    ".reviews-content p, .appointment-copy h2, " +
    ".appointment-copy p, .location-copy h2, " +
    ".footer-links strong, .footer-contact strong, " +
    ".site-author"
  )];

  textElements.forEach((element, index) => {
    originalTexts.set(element, element.innerHTML);
  });

  const translatePage = language => {
    currentLanguage = language;

    document.documentElement.lang =
      language === "en" ? "en" : "pt-BR";

    textElements.forEach(element => {
      const portuguese = originalTexts.get(element);

      if (language === "pt") {
        element.innerHTML = portuguese;
        return;
      }

      const plainText = element.textContent.trim();
      const translated = translations.en[plainText];

      if (translated) {
        element.textContent = translated;
      } else {
        element.innerHTML = portuguese;
      }
    });

    if (languageToggle) {
      languageToggle.textContent =
        language === "en" ? "PT" : "EN";

      languageToggle.setAttribute(
        "aria-label",
        language === "en"
          ? "Mudar para português"
          : "Change language to English"
      );
    }

    localStorage.setItem("site-language", language);
  };

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      translatePage(currentLanguage === "pt" ? "en" : "pt");
    });
  }

  translatePage(currentLanguage);

  // =========================================
  // SLIDER DE APRESENTAÇÃO
  // =========================================

  const slider = document.querySelector("[data-slider]");

  if (slider) {
    const track = slider.querySelector("[data-track]");
    const cards = [...track.children];
    const dots = [...slider.querySelectorAll(".dot")];

    let current = 0;

    const showSlide = index => {
      current = (index + cards.length) % cards.length;

      track.style.transform = `translateX(-${current * 100}%)`;

      cards.forEach((card, i) => {
        card.setAttribute("aria-hidden", String(i !== current));
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === current);

        if (i === current) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    slider.querySelector("[data-prev]").addEventListener(
      "click",
      () => showSlide(current - 1)
    );

    slider.querySelector("[data-next]").addEventListener(
      "click",
      () => showSlide(current + 1)
    );

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => showSlide(i));
    });

    showSlide(0);
  }

  // =========================================
  // ANIMAÇÃO AO ROLAR A PÁGINA
  // =========================================

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // =========================================
  // CARREGAMENTO DA LOGO
  // =========================================

  document.querySelectorAll(".brand-logo").forEach(mark => {
    const logo = mark.querySelector(".logo-image");
    const fallback = mark.querySelector(".logo-fallback");

    if (!logo) return;

    logo.addEventListener("load", () => {
      logo.hidden = false;

      if (fallback) fallback.hidden = true;
    });

    logo.addEventListener("error", () => {
      logo.hidden = true;

      if (fallback) fallback.hidden = false;
    });

    if (logo.complete && logo.naturalWidth > 0) {
      logo.hidden = false;

      if (fallback) fallback.hidden = true;
    }
  });

  // =========================================
  // VOLTAR AO TOPO
  // =========================================

  document.querySelectorAll("[data-back-top]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      history.replaceState(null, "", "#topo");
    });
  });

  // =========================================
  // ANO AUTOMÁTICO
  // =========================================

  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});