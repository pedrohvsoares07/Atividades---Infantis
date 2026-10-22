import "./style.css";
import { media, plans, subjects } from "./data";
import { mediaMarkup } from "./media";
import { setupMenu } from "./menu";
import { setupGallery } from "./gallery";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Elemento principal não encontrado.");

const benefitItems = [
  ["↗", "Prontos para imprimir", "Materiais digitais em PDF"],
  ["✦", "Para 6 a 10 anos", "Uso complementar em casa ou na escola"],
  ["◒", "Cinco áreas", "Diferentes caminhos para explorar"],
  ["✓", "Com gabaritos", "Incluídos nos dois kits"],
];

const faqItems = [
  [
    "Para qual idade são as atividades?",
    "Os materiais foram pensados para crianças de 6 a 10 anos, como complemento para uso em casa ou na escola.",
  ],
  [
    "Preciso imprimir todas as atividades?",
    "Não. Os arquivos são PDFs para imprimir; você pode escolher as atividades que deseja utilizar.",
  ],
  [
    "Os kits incluem gabaritos?",
    "Sim. Os arquivos dos dois kits incluem gabaritos.",
  ],
  [
    "Qual é a diferença entre os kits?",
    "O Kit Essencial contém 100 atividades. O Kit Completo contém 300: as 100 do Essencial e mais 200.",
  ],
  [
    "O material substitui o ensino escolar?",
    "Não. A proposta é complementar as experiências de aprendizagem em casa ou na escola.",
  ],
  [
    "Como receberei os arquivos após a compra?",
    "A venda e a forma de entrega digital ainda serão definidas. As compras não estão disponíveis nesta versão do site.",
  ],
];

app.innerHTML = `
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <div class="announcement">Atividades digitais para descobrir, criar e aprender no próprio ritmo.</div>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#inicio" aria-label="Aprender e Descobrir — início"><span class="brand-mark" aria-hidden="true"><svg class="cute-star" viewBox="0 0 64 64" width="42" height="42" aria-hidden="true"><path d="M32 5 40 22 59 25 45 39 48 58 32 49 16 58 19 39 5 25 24 22Z" fill="#FFCE4F" stroke="#EAA528" stroke-width="3" stroke-linejoin="round"/><circle cx="25" cy="32" r="2.2" fill="#302D57"/><circle cx="39" cy="32" r="2.2" fill="#302D57"/><path d="M27 40q5 5 10 0" fill="none" stroke="#302D57" stroke-width="2.5" stroke-linecap="round"/></svg></span><span class="brand-name">Aprender <em>&</em><br />Descobrir</span></a>
      <button class="menu-toggle" id="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="site-nav" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="site-nav" id="site-nav" aria-label="Navegação principal">
        <a href="#como-funciona">Como funciona</a>
        <a href="#atividades">Atividades</a>
        <a href="#kits">Os kits</a>
        <a href="#perguntas">Perguntas</a>
        <a class="button button-small button-dark" href="#kits">Conhecer os kits <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>

  <main id="conteudo">
    <section class="hero" id="inicio" aria-labelledby="hero-title">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow"><span class="eyebrow-dot"></span> Aprender pode ser uma descoberta diária</span>
          <h1 id="hero-title">Pequenas atividades.<br /><em>Grandes</em> descobertas.</h1>
          <p>Materiais educativos digitais, prontos para imprimir e transformar momentos do dia em oportunidades de explorar juntos.</p>
          <div class="hero-actions"><a class="button button-coral" href="#kits">Conhecer os kits <span aria-hidden="true">↗</span></a><a class="text-link" href="#atividades">Ver atividades <span aria-hidden="true">↓</span></a></div>
          <div class="hero-meta"><span class="meta-line"></span><span>Para crianças de 6 a 10 anos<br />Em casa ou na escola</span></div>
        </div>
        <div class="hero-visual">
          <div class="hero-orbit" aria-hidden="true"></div>
          ${mediaMarkup(media.heroFamily, "Foto de mãe e filha", "Mãe e filha em momento de aprendizagem", "hero-media")}
          <div class="hero-sticker" aria-hidden="true">curiosidade<br /><strong>em cada<br />página</strong><span>✳</span></div>
        </div>
      </div>
      <div class="hero-bottom" aria-hidden="true"><span>Descobrir é crescer</span><span>✳</span><span>Aprender é brincar</span></div>
    </section>

    <section class="benefits" aria-label="Características dos materiais"><div class="container benefits-grid">${benefitItems.map(([icon, title, detail]) => `<div class="benefit"><span class="benefit-icon" aria-hidden="true">${icon}</span><div><strong>${title}</strong><span>${detail}</span></div></div>`).join("")}</div></section>

    <section class="section why-section" id="como-funciona" aria-labelledby="why-title">
      <div class="container why-grid">
        <div class="why-visual"><div class="why-shape" aria-hidden="true"></div>${mediaMarkup(media.secondFamily, "Foto de adulto e criança", "Adulto e criança explorando atividades juntos", "why-media")}<div class="why-caption">Um convite para explorar juntos <span aria-hidden="true">↗</span></div></div>
        <div class="why-copy"><span class="eyebrow">Feito para a vida real</span><h2 id="why-title">Mais possibilidades para <em>aprender juntos.</em></h2><p class="section-lead">Uma coleção digital para quem quer ter atividades à mão e escolher o que faz sentido para cada momento.</p>
          <div class="feature-list"><div class="feature"><span>01</span><div><h3>Praticidade no dia a dia</h3><p>Escolha uma atividade, imprima e use quando desejar.</p></div></div><div class="feature"><span>02</span><div><h3>Variedade para explorar</h3><p>Cinco áreas de aprendizagem em materiais organizados em PDF.</p></div></div><div class="feature"><span>03</span><div><h3>Tempo de qualidade</h3><p>Uma oportunidade de acompanhar as descobertas da criança.</p></div></div></div>
        </div>
      </div>
    </section>

    <section class="section activities-section" id="atividades" aria-labelledby="activities-title"><div class="container">
      <div class="section-heading centered"><span class="eyebrow">Conheça as áreas</span><h2 id="activities-title">Um mundo de assuntos<br />para <em>descobrir.</em></h2><p>Explore as cinco áreas presentes nos kits. Conheça as cinco áreas dos kits. As imagens e a amostra real serão disponibilizadas quando os arquivos aprovados forem adicionados ao repositório.</p></div>
      <div class="subject-tabs" id="subject-tabs" role="tablist" aria-label="Áreas de aprendizagem">${subjects.map((subject, index) => `<button id="tab-${subject.id}" type="button" role="tab" aria-controls="subject-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-index="${index}">${subject.shortName}</button>`).join("")}</div>
      <div class="subject-panel" id="subject-panel" role="tabpanel" tabindex="0"></div>
      <div class="thumbnail-row" id="subject-thumbnails" aria-label="Selecionar prévia por área">${subjects.map((subject, index) => `<button class="thumbnail tone-${subject.tone}" type="button" data-subject="${index}" aria-label="Ver prévia de ${subject.name}" aria-current="${index === 0}"><span class="thumbnail-art" aria-hidden="true"><span></span><span></span><span></span></span><span>${subject.shortName}</span></button>`).join("")}</div>
    </div></section>

    <section class="sample-section" aria-labelledby="sample-title"><div class="container sample-grid"><div><span class="eyebrow">Uma pequena amostra</span><h2 id="sample-title">Veja antes de <em>escolher.</em></h2><p>A prévia gratuita em PDF será disponibilizada aqui quando o arquivo público for fornecido.</p>${media.freeSamplePdf ? `<a class="button button-dark" href="${media.freeSamplePdf}" target="_blank" rel="noopener noreferrer">Abrir amostra gratuita <span aria-hidden="true">↗</span></a>` : '<span class="button button-muted" aria-disabled="true">Amostra em breve</span>'}</div><div class="sample-decoration" aria-hidden="true"><span class="sample-sheet sample-sheet-back"></span><span class="sample-sheet sample-sheet-front"><i></i><i></i><i></i><i></i></span><span class="sample-star">✳</span></div></div></section>

    <section class="section steps-section" aria-labelledby="steps-title"><div class="container"><div class="section-heading centered"><span class="eyebrow">Simples de usar</span><h2 id="steps-title">Do PDF ao momento<br />de <em>descoberta.</em></h2></div><div class="steps-grid"><div class="step"><span class="step-number">01</span><div class="step-icon" aria-hidden="true">▤</div><h3>Escolha um kit</h3><p>Compare as opções e veja qual atende melhor às suas necessidades.</p></div><div class="step"><span class="step-number">02</span><div class="step-icon" aria-hidden="true">↘</div><h3>Receba o material</h3><p>A forma de compra e entrega digital será anunciada futuramente.</p></div><div class="step"><span class="step-number">03</span><div class="step-icon" aria-hidden="true">✳</div><h3>Imprima e explore</h3><p>Selecione as atividades que deseja usar com a criança.</p></div></div></div></section>

    <section class="family-banner" aria-labelledby="family-title"><div class="container family-grid"><div class="family-copy"><span class="eyebrow">Para compartilhar</span><h2 id="family-title">Descobrir o mundo fica melhor <em>lado a lado.</em></h2><p>Atividades para acompanhar a curiosidade de cada criança, em momentos que cabem na rotina da família.</p><a class="text-link" href="#kits">Conheça os kits <span aria-hidden="true">↗</span></a></div>${mediaMarkup(media.bannerFamily, "Foto de família", "Família reunida em momento de aprendizagem", "family-media")}</div></section>

    <section class="section kits-section" id="kits" aria-labelledby="kits-title"><div class="container"><div class="section-heading centered"><span class="eyebrow">Escolha sua coleção</span><h2 id="kits-title">Duas formas de começar<br />a <em>descobrir.</em></h2><p>Materiais digitais para imprimir, com atividades em cinco áreas e gabaritos incluídos.</p></div><div class="plans-grid">${plans.map((plan) => `<article class="plan-card ${plan.highlight ? "plan-featured" : ""}"><div class="plan-cover tone-${plan.highlight ? "green" : "coral"}"><span class="plan-ribbon">${plan.highlight ? "✦ MAIS ATIVIDADES NO KIT" : "✿ PARA COMEÇAR"}</span>${mediaMarkup(plan.cover, `Capa do ${plan.name}`, `Capa do ${plan.name}`, "cover-media")}</div><div class="plan-content"><span class="plan-kicker">${plan.highlight ? "PARA EXPLORAR MAIS" : "PARA COMEÇAR"}</span><h3>${plan.name}</h3><p>${plan.description}</p><div class="plan-quantity"><strong>${plan.quantity}</strong><span>atividades<br />para imprimir</span></div><ul><li>Cinco áreas de aprendizagem</li><li>Gabaritos incluídos</li>${plan.highlight ? "<li>Inclui todo o Kit Essencial</li>" : ""}</ul><div class="plan-bottom"><div class="price-wrap"><span>Valor de referência</span><del>De ${plan.originalPrice}</del><strong>${plan.price}</strong></div><button class="button ${plan.highlight ? "button-coral" : "button-dark"}" type="button" disabled aria-label="Compras do ${plan.name} em breve">Compras em breve</button></div></div></article>`).join("")}</div><p class="pricing-note">Valores demonstrativos. Exibir preços anteriores riscados em uma oferta pública somente se corresponderem a preços reais praticados. Compras e entrega digital ainda não estão disponíveis.</p></div></section>

    <section class="section faq-section" id="perguntas" aria-labelledby="faq-title"><div class="container faq-grid"><div class="faq-intro"><span class="eyebrow">Dúvidas frequentes</span><h2 id="faq-title">Perguntas que<br />ajudam a <em>escolher.</em></h2><p>Informações sobre os materiais e o que está previsto para esta primeira versão.</p></div><div class="faq-list">${faqItems.map(([question, answer]) => `<details><summary>${question}<span aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join("")}</div></div></section>

    <section class="closing-section"><div class="container closing-inner"><span class="closing-star" aria-hidden="true">✳</span><span class="eyebrow">Aprender & Descobrir</span><h2>Todo dia pode trazer<br />uma <em>nova descoberta.</em></h2><p>Conheça os kits de atividades digitais e encontre novas maneiras de explorar juntos.</p><a class="button button-coral" href="#kits">Ver os kits <span aria-hidden="true">↗</span></a></div></section>
  </main>
  <footer class="site-footer"><div class="container footer-main"><a class="brand" href="#inicio" aria-label="Aprender e Descobrir — voltar ao início"><span class="brand-mark" aria-hidden="true"><svg class="cute-star" viewBox="0 0 64 64" width="42" height="42" aria-hidden="true"><path d="M32 5 40 22 59 25 45 39 48 58 32 49 16 58 19 39 5 25 24 22Z" fill="#FFCE4F" stroke="#EAA528" stroke-width="3" stroke-linejoin="round"/><circle cx="25" cy="32" r="2.2" fill="#302D57"/><circle cx="39" cy="32" r="2.2" fill="#302D57"/><path d="M27 40q5 5 10 0" fill="none" stroke="#302D57" stroke-width="2.5" stroke-linecap="round"/></svg></span><span class="brand-name">Aprender <em>&</em><br />Descobrir</span></a><div class="footer-copy"><p>Materiais educativos digitais para crianças de 6 a 10 anos. Uso complementar em casa ou na escola.</p><small>Os produtos são arquivos digitais em PDF para imprimir.</small></div><nav aria-label="Navegação do rodapé"><a href="#como-funciona">Como funciona</a><a href="#atividades">Atividades</a><a href="#kits">Kits</a><a href="#perguntas">Perguntas</a></nav></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Aprender & Descobrir</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
  <dialog class="preview-dialog" id="preview-dialog" aria-labelledby="preview-title"><div class="dialog-inner"><button class="dialog-close" id="preview-close" type="button" aria-label="Fechar prévia">Fechar <span aria-hidden="true">×</span></button><div id="preview-dialog-content"></div></div></dialog>
`;

setupMenu();
setupGallery();
