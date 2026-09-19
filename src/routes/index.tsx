import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import lilacAsset from "../assets/20220720_192707.jpg.asset.json";
import pinkAsset from "../assets/20220720_192755.jpg.asset.json";
import blueAsset from "../assets/20220726_192208.jpg.asset.json";
import tableAsset from "../assets/20221013_202255.jpg.asset.json";

const WHATSAPP_URL = "https://contate.me/drikasforminhas";
const INSTAGRAM_URL = "https://www.instagram.com/drikasforminhas/";
const ASSET_ORIGIN = "https://id-preview--4c5e5def-a6c3-45c1-9898-63d4b6ed38ec.lovable.app";

const productionImageUrl = (path: string) => `${ASSET_ORIGIN}${path}`;

const navigation = [
  ["Início", "inicio"],
  ["Sobre", "sobre"],
  ["Galeria", "galeria"],
  ["Cores e materiais", "cores"],
  ["Como pedir", "como-pedir"],
  ["Contato", "contato"],
] as const;

const gallery = [
  {
    src: productionImageUrl(tableAsset.url),
    alt: "Mesa de celebração decorada com forminhas artesanais em tons de coral, vinho e creme",
    label: "Uma celebração em cada detalhe",
  },
  {
    src: productionImageUrl(lilacAsset.url),
    alt: "Forminhas artesanais lilás dispostas como flores em uma bandeja redonda",
    label: "Delicadeza em lilás",
  },
  {
    src: productionImageUrl(pinkAsset.url),
    alt: "Forminhas artesanais rosa intenso com doces de chocolate",
    label: "Flores em rosa intenso",
  },
  {
    src: productionImageUrl(blueAsset.url),
    alt: "Forminhas artesanais azuis em uma composição de mesa de festa",
    label: "Composição em azul",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Drika's Forminhas | Delicadeza para celebrar" },
      {
        name: "description",
        content:
          "Forminhas artesanais para doces, feitas com cuidado para casamentos, festas de 15 anos e celebrações infantis.",
      },
      { property: "og:title", content: "Drika's Forminhas | Delicadeza para celebrar" },
      {
        property: "og:description",
        content: "Conheça o trabalho artesanal da Drika's Forminhas e solicite seu orçamento pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function FloralMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand brand-compact" : "brand"} aria-label="Drika's Forminhas">
      <svg className="brand-flower" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M31.8 48.5C30 37.2 30.6 27.4 32 18" />
        <path d="M32 23C23 21 18 14 20 6c8 1 13 7 12 17Z" />
        <path d="M32 25c9-2 14-9 12-17-8 1-13 7-12 17Z" />
        <path d="M31 38c-8-1-13-5-16-11 8-1 14 2 16 11Z" />
      </svg>
      <span>
        <strong>Drika's</strong>
        <small>FORMINHAS</small>
      </span>
    </div>
  );
}

function Petal({ className }: { className: string }) {
  return <span className={`petal ${className}`} aria-hidden="true" />;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((selected + 1) % gallery.length);
      if (event.key === "ArrowLeft") setSelected((selected - 1 + gallery.length) % gallery.length);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const moveGallery = (direction: number) => {
    if (selected === null) return;
    setSelected((selected + direction + gallery.length) % gallery.length);
  };

  const selectedImage = selected === null ? undefined : gallery[selected];

  return (
    <main>
      <header className="site-header">
        <a href="#inicio" className="header-brand" aria-label="Drika's Forminhas — início">
          <FloralMark compact />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navegação para celular">
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <section id="inicio" className="hero section-anchor">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Feitas à mão, feitas para encantar</p>
          <FloralMark />
          <h1>Delicadeza em cada detalhe para deixar sua celebração ainda mais especial.</h1>
          <p className="hero-description">
            Forminhas artesanais que transformam a mesa de doces em parte da memória da sua festa.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Pedir um orçamento
            </a>
            <a className="button button-secondary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" /> Ver no Instagram
            </a>
          </div>
          <a className="scroll-cue" href="#sobre">
            Conheça nosso trabalho <ArrowDown aria-hidden="true" />
          </a>
        </div>
        <div className="hero-visual" aria-label="Seleção de trabalhos artesanais da Drika's Forminhas">
          <div className="hero-photo hero-photo-main">
             <img src={productionImageUrl(tableAsset.url)} alt="Mesa de festa decorada com forminhas artesanais coloridas" />
          </div>
          <div className="hero-photo hero-photo-detail">
             <img src={productionImageUrl(pinkAsset.url)} alt="Detalhe de forminhas artesanais rosa com doces" />
          </div>
          <div className="handmade-seal"><Heart aria-hidden="true" /><span>feito com<br /><strong>carinho</strong></span></div>
          <Petal className="petal-one" />
          <Petal className="petal-two" />
          <Petal className="petal-three" />
        </div>
      </section>

      <section id="sobre" className="about section-anchor">
        <div className="section-intro">
          <p className="eyebrow"><span /> Nossa história</p>
          <h2>Uma história feita<br />à mão, em família.</h2>
        </div>
        <div className="about-copy">
          <p className="lead">Há cerca de quatro anos, a Drika's Forminhas nasceu do cuidado com os pequenos detalhes que tornam uma celebração inesquecível.</p>
          <p>Somos um pequeno negócio familiar dedicado à criação artesanal de forminhas para doces. Cada peça recebe atenção em seu acabamento e em sua composição na mesa.</p>
          <p>Atendemos clientes locais, casas de festas e pessoas que preparam casamentos, festas de 15 anos e celebrações infantis.</p>
          <div className="signature"><span>Drika</span><small>feito em família</small></div>
        </div>
        <div className="about-flower" aria-hidden="true"><Petal className="petal-four" /><Petal className="petal-five" /></div>
      </section>

      <section id="galeria" className="gallery-section section-anchor">
        <div className="section-heading centered">
          <p className="eyebrow"><span /> Nosso trabalho</p>
          <h2>Detalhes que florescem<br />em cada celebração.</h2>
          <p>Uma seleção de composições criadas para tornar mesas de doces ainda mais especiais.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <button
              type="button"
              className={`gallery-item gallery-item-${index + 1}`}
              key={image.src}
              onClick={() => setSelected(index)}
              aria-label={`Ampliar foto: ${image.label}`}
            >
              <img src={image.src} alt={image.alt} loading={index > 1 ? "lazy" : "eager"} />
              <span>{image.label}<ArrowRight aria-hidden="true" /></span>
            </button>
          ))}
        </div>
        <p className="gallery-note"><Sparkles aria-hidden="true" /> Cada encomenda ganha uma composição única, combinada diretamente com você.</p>
      </section>

      <section id="cores" className="materials section-anchor">
        <div className="materials-image">
           <img src={productionImageUrl(blueAsset.url)} alt="Forminhas artesanais azuis mostrando variedade de cores e acabamentos" loading="lazy" />
          <div className="materials-swatch" aria-hidden="true"><i /><i /><i /></div>
        </div>
        <div className="materials-copy">
          <p className="eyebrow"><span /> Cores e materiais</p>
          <h2>A harmonia certa para a sua mesa.</h2>
          <p>As possibilidades de cores e materiais variam conforme o modelo e a disponibilidade de produção. A escolha é conversada com cuidado para acompanhar a proposta da sua celebração.</p>
          <p className="materials-callout">Fale com a Drika para conhecer as opções disponíveis para o seu evento.</p>
        </div>
      </section>

      <section id="como-pedir" className="order section-anchor">
        <div className="section-heading centered">
          <p className="eyebrow light"><span /> Como pedir</p>
          <h2>Seu pedido começa<br />com uma conversa.</h2>
          <p>O atendimento é pessoal e acontece diretamente pelo WhatsApp.</p>
        </div>
        <div className="order-steps">
          <article><span>01</span><h3>Conte sobre a festa</h3><p>Compartilhe a data, o tipo de celebração e a quantidade desejada.</p></article>
          <article><span>02</span><h3>Escolha os detalhes</h3><p>Converse sobre o modelo, as cores e as possibilidades de produção.</p></article>
          <article><span>03</span><h3>Receba seu orçamento</h3><p>O valor considera o modelo, a quantidade e o prazo de produção.</p></article>
        </div>
        <div className="order-notice">
          <Heart aria-hidden="true" />
          <p>Não há preços fixos ou pagamentos pelo site. Pedidos e orçamentos são combinados diretamente pelo WhatsApp.</p>
        </div>
      </section>

      <section id="contato" className="contact section-anchor">
        <Petal className="petal-contact-one" />
        <Petal className="petal-contact-two" />
        <div className="contact-inner">
          <p className="eyebrow"><span /> Vamos conversar?</p>
          <h2>Será um carinho fazer parte da sua celebração.</h2>
          <p>Para conhecer as opções, tirar dúvidas ou pedir um orçamento, escolha seu canal preferido.</p>
          <div className="contact-actions">
            <a className="contact-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /><span><small>Atendimento e orçamentos</small>WhatsApp</span><ArrowRight aria-hidden="true" />
            </a>
            <a className="contact-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" /><span><small>Acompanhe nosso trabalho</small>Instagram</span><ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer>
        <FloralMark compact />
        <p>Forminhas artesanais para momentos especiais.</p>
        <div className="footer-links">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp"><MessageCircle aria-hidden="true" /></a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Ver Drika's Forminhas no Instagram"><Instagram aria-hidden="true" /></a>
          <a className="footer-top" href="#inicio" aria-label="Voltar ao início">Voltar ao topo <ArrowDown className="footer-arrow" aria-hidden="true" /></a>
        </div>
      </footer>

      {selectedImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.label} onClick={() => setSelected(null)}>
          <button className="lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Fechar foto"><X /></button>
          <button className="lightbox-arrow previous" type="button" onClick={(event) => { event.stopPropagation(); moveGallery(-1); }} aria-label="Foto anterior"><ChevronLeft /></button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <figcaption>{selectedImage.label} <span>{gallery.indexOf(selectedImage) + 1} / {gallery.length}</span></figcaption>
          </figure>
          <button className="lightbox-arrow next" type="button" onClick={(event) => { event.stopPropagation(); moveGallery(1); }} aria-label="Próxima foto"><ChevronRight /></button>
        </div>
      )}
    </main>
  );
}
