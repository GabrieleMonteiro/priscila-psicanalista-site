// CONFIGURAÇÕES DO SITE — personalize estes campos antes de publicar.
const SITE_CONFIG = {
  whatsapp: "5511983122680",
  whatsappMessage: "Olá, gostaria de marcar uma consulta!",
  instagram: "https://www.instagram.com/psique.autoconhecimento?exln=N3JmcGExbGZvZ2Uw",
  address: "Alameda Prof. Lucas Nogueira Garcez, 2630 - Jardim Paulista, Atibaia - SP, 12947-000",
  googleReviewsUrl: "https://share.google/Ed6hcndH3ZEnP3c6x"
};

document.addEventListener("DOMContentLoaded", () => {
  // WhatsApp com mensagem inicial pronta.
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`;
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });


  // Avaliações do Google: abre o perfil público informado nas configurações.
  document.querySelectorAll("[data-google-reviews]").forEach(link => {
    if (SITE_CONFIG.googleReviewsUrl && SITE_CONFIG.googleReviewsUrl.trim()) {
      link.href = SITE_CONFIG.googleReviewsUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#avaliacoes";
      link.removeAttribute("target");
    }
  });

  // Instagram: o link só fica ativo depois de preencher o endereço do perfil.
  document.querySelectorAll("[data-instagram]").forEach(link => {
    if (SITE_CONFIG.instagram.trim()) {
      link.href = SITE_CONFIG.instagram;
    } else {
      link.href = "#";
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Adicione o link do Instagram no arquivo js/script.js.");
      });
    }
  });

  // Google Maps: usa o endereço real quando ele for informado.
  const mapsUrl = SITE_CONFIG.address.trim()
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address)}`
    : "";
  document.querySelectorAll("[data-maps]").forEach(link => {
    if (mapsUrl) {
      link.href = mapsUrl;
    } else {
      link.href = "#localizacao";
      link.removeAttribute("target");
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Adicione o endereço do consultório no arquivo js/script.js para ativar o Google Maps.");
      });
    }
  });

  const addressText = document.querySelector("#address-text");
  if (addressText && SITE_CONFIG.address.trim()) addressText.textContent = SITE_CONFIG.address;

  // Mapa incorporado: aparece automaticamente quando o endereço for configurado.
  const mapPlaceholder = document.querySelector(".map-placeholder");
  if (mapPlaceholder && SITE_CONFIG.address.trim()) {
    const mapFrame = document.createElement("iframe");
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.address)}&output=embed`;
    mapFrame.title = `Mapa de localização: ${SITE_CONFIG.address}`;
    mapFrame.loading = "lazy";
    mapFrame.referrerPolicy = "no-referrer-when-downgrade";
    mapFrame.style.width = "100%";
    mapFrame.style.height = "340px";
    mapFrame.style.border = "0";
    mapPlaceholder.replaceWith(mapFrame);
  }

  // Menu responsivo.
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  // Slider de apresentação: sobre, localização e especialidade.
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const track = slider.querySelector("[data-track]");
    const cards = [...track.children];
    const dots = [...slider.querySelectorAll(".dot")];
    let current = 0;

    const showSlide = index => {
      current = (index + cards.length) % cards.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      cards.forEach((card, i) => card.setAttribute("aria-hidden", String(i !== current)));
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === current);
        if (i === current) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    slider.querySelector("[data-prev]").addEventListener("click", () => showSlide(current - 1));
    slider.querySelector("[data-next]").addEventListener("click", () => showSlide(current + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));
    showSlide(0);
  }

  // Animação discreta ao entrar na área visível.
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

  // Logo: coloque o arquivo logo-priscila.png na pasta assets.
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

  // Voltar ao início real da página, acima do cabeçalho fixo.
  document.querySelectorAll("[data-back-top]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", "#topo");
    });
  });

  // Ano automático no rodapé.
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
});
