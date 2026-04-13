// src/data/mockData.js

// ... tus otros mocks de AlertasScreen ...

// ─── Mocks para EscanearScreen ──────────────────────────────
export const MOCK_ITEMS_ESCANER = [
  { id: 1, nombre: 'Manzanas',        categoria: 'Frutas',         cantidad: '1.5 kg', precio: '$45.00', seleccionado: true  },
  { id: 2, nombre: 'Pollo',           categoria: 'Carnes',         cantidad: '2 kg',    precio: '$52.00', seleccionado: true  },
  { id: 3, nombre: 'Duraznos',        categoria: 'Frutas',         cantidad: '1.5 kg', precio: '$45.00', seleccionado: true  },
  { id: 4, nombre: 'Lechuga',         categoria: 'Verduras',       cantidad: '1 pza',  precio: '$22.00', seleccionado: true  },
  { id: 5, nombre: 'Papel higiénico', categoria: 'No alimentario', cantidad: '4 rls',  precio: '$65.00', seleccionado: false },
];

export const VIDA_UTIL_ESCANER = [
  { categoria: 'Frutas',    dias: '5–7 días' },
  { categoria: 'Verduras',  dias: '3–5 días' },
  { categoria: 'Carnes',    dias: '1–4 días' },
];

// Configuración para simular OCR
export const OCR_CONFIG = {
  processingTime: 1000,  // milisegundos
  mockImageUri: 'mock',
};