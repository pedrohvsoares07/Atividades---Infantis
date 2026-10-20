export type Subject = {
  id: string;
  name: string;
  shortName: string;
  summary: string;
  tags: string[];
  tone: string;
  preview: string | null;
};

// Substitua cada null por um caminho em /public depois de conferir a licença e o arquivo.
// Nenhum material pago pode ser colocado em /public.
export const media = {
  heroFamily: null as string | null,
  secondFamily: null as string | null,
  bannerFamily: null as string | null,
  essentialCover: null as string | null,
  completeCover: null as string | null,
  freeSamplePdf: null as string | null,
};

export const subjects: Subject[] = [
  {
    id: "portugues",
    name: "Língua Portuguesa",
    shortName: "Português",
    summary:
      "Uma das cinco áreas contempladas nos materiais. A prévia real desta matéria será adicionada quando as imagens forem fornecidas.",
    tags: ["Linguagem", "PDF para imprimir"],
    tone: "coral",
    preview: null,
  },
  {
    id: "matematica",
    name: "Matemática",
    shortName: "Matemática",
    summary:
      "Uma das cinco áreas contempladas nos materiais. A prévia real desta matéria será adicionada quando as imagens forem fornecidas.",
    tags: ["Números", "PDF para imprimir"],
    tone: "blue",
    preview: null,
  },
  {
    id: "ciencias",
    name: "Ciências",
    shortName: "Ciências",
    summary:
      "Uma das cinco áreas contempladas nos materiais. A prévia real desta matéria será adicionada quando as imagens forem fornecidas.",
    tags: ["Exploração", "PDF para imprimir"],
    tone: "green",
    preview: null,
  },
  {
    id: "historia-geografia",
    name: "História e Geografia",
    shortName: "História / Geografia",
    summary:
      "Uma das cinco áreas contempladas nos materiais. A prévia real desta matéria será adicionada quando as imagens forem fornecidas.",
    tags: ["Mundo", "PDF para imprimir"],
    tone: "yellow",
    preview: null,
  },
  {
    id: "logica-arte",
    name: "Lógica e Arte",
    shortName: "Lógica / Arte",
    summary:
      "Uma das cinco áreas contempladas nos materiais. A prévia real desta matéria será adicionada quando as imagens forem fornecidas.",
    tags: ["Criatividade", "PDF para imprimir"],
    tone: "lavender",
    preview: null,
  },
];

export const plans = [
  {
    id: "essencial",
    name: "Kit Essencial",
    quantity: 100,
    price: "R$ 14,90",
    description:
      "Uma seleção de atividades para começar com variedade e praticidade.",
    cover: media.essentialCover,
    highlight: false,
  },
  {
    id: "completo",
    name: "Kit Completo",
    quantity: 300,
    price: "R$ 29,90",
    description: "Inclui as 100 atividades do Essencial e mais 200 atividades.",
    cover: media.completeCover,
    highlight: true,
  },
] as const;
