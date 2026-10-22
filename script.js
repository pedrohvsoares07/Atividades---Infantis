/* Aprender & Descobrir | Interações do site */

const subjects = {
    portugues: { idx: '01 / 05', tag: 'Língua Portuguesa', title: 'Uma historinha, muitas descobertas.', desc: 'Leituras curtas e perguntas que convidam a criança a interpretar, escrever e pensar.', chips: ['Leitura', 'Escrita', 'Interpretação'], image: 'assets/images/imagem-02.webp', alt: 'Ficha real de Língua Portuguesa' },
    matematica: { idx: '02 / 05', tag: 'Matemática', title: 'Números para investigar e brincar.', desc: 'Contas, problemas e desafios para praticar o raciocínio matemático de forma variada.', chips: ['Números', 'Operações', 'Raciocínio'], image: 'assets/images/imagem-03.webp', alt: 'Ficha real de Matemática' },
    ciencias: { idx: '03 / 05', tag: 'Ciências', title: 'Curiosidade sobre o que nos cerca.', desc: 'Atividades para observar a natureza, fazer perguntas e descobrir como o mundo funciona.', chips: ['Natureza', 'Observação', 'Perguntas'], image: 'assets/images/imagem-04.webp', alt: 'Ficha real de Ciências' },
    historia: { idx: '04 / 05', tag: 'História e Geografia', title: 'Histórias, lugares e pessoas.', desc: 'Propostas para conhecer o próprio cotidiano, os lugares e as relações com a comunidade.', chips: ['Lugares', 'Comunidade', 'História'], image: 'assets/images/imagem-05.webp', alt: 'Ficha real de História e Geografia' },
    logica: { idx: '05 / 05', tag: 'Lógica e Arte', title: 'Pequenos desafios, grandes ideias.', desc: 'Sequências, labirintos e atividades criativas para experimentar diferentes maneiras de pensar.', chips: ['Lógica', 'Criatividade', 'Atenção'], image: 'assets/images/imagem-06.webp', alt: 'Ficha real de Lógica e Arte' }
};
const find = (selector) => { const el = document.querySelector(selector); if (!el)
    throw new Error(`Elemento ausente: ${selector}`); return el; };
const all = (selector) => Array.from(document.querySelectorAll(selector));
function setSubject(id, scroll = false) {
    const subject = subjects[id];
    find('#previewImg').src = subject.image;
    find('#previewImg').alt = subject.alt;
    find('#previewCount').textContent = subject.idx;
    find('#previewTag').textContent = subject.tag;
    find('#previewHeading').textContent = subject.title;
    find('#previewText').textContent = subject.desc;
    find('#previewChips').replaceChildren(...subject.chips.map(c => { const span = document.createElement('span'); span.textContent = c; return span; }));
    all('[data-tab]').forEach(btn => { const active = btn.dataset.tab === id; btn.classList.toggle('active', active); btn.setAttribute('aria-selected', String(active)); });
    if (scroll)
        find('#explorar').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
all('[data-tab]').forEach(btn => btn.addEventListener('click', () => setSubject(btn.dataset.tab)));
all('[data-subject]').forEach(btn => btn.addEventListener('click', () => setSubject(btn.dataset.subject, true)));
const menu = find('#menuToggle');
const nav = find('#navigation');
menu.addEventListener('click', () => { const visible = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(visible)); });
all('#navigation a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
let beforeModal = null;
function showModal(el) { beforeModal = document.activeElement instanceof HTMLElement ? document.activeElement : null; el.hidden = false; document.body.classList.add('locked'); const focus = el.querySelector('.modal-close'); focus?.focus(); }
function hideModal(el) { el.hidden = true; if (all('.overlay').every(m => m.hidden))
    document.body.classList.remove('locked'); beforeModal?.focus(); }
find('#zoomPreview').addEventListener('click', () => { const prev = find('#previewImg'), modal = find('#modalImage'); modal.src = prev.src; modal.alt = prev.alt; showModal(find('#previewModal')); });
all('.btn-plan').forEach(b => b.addEventListener('click', () => { find('#planModalTitle').textContent = `Kit ${b.dataset.plan}: compra ainda indisponível`; showModal(find('#planModal')); }));
all('[data-close]').forEach(b => b.addEventListener('click', () => hideModal(find(b.dataset.close === 'preview' ? '#previewModal' : '#planModal'))));
document.addEventListener('keydown', e => { if (e.key === 'Escape')
    all('.overlay').filter(m => !m.hidden).forEach(hideModal); });
