export const ALERTAS_MOCK = [
  {
    id: 1,
    tipo: 'alto',
    titulo: 'Riesgo alto de deterioro',
    item: 'Leche entera',
    categoria: 'Lácteos',
    riesgo: 92,
    diasRestantes: 1,
    cantidad: '2 litros',
    tiempo: 'Hace 10 min',
    noLeida: true,
  },
  {
    id: 2,
    tipo: 'alto',
    titulo: 'Riesgo alto de deterioro',
    item: 'Manzanas',
    categoria: 'Frutas',
    riesgo: 85,
    diasRestantes: 2,
    cantidad: '1.5 kg',
    tiempo: 'Hace 1 hora',
    noLeida: true,
  },
  {
    id: 3,
    tipo: 'moderado',
    titulo: 'Riesgo moderado de deterioro',
    item: 'Lechuga',
    categoria: 'Verduras',
    riesgo: 65,
    diasRestantes: 3,
    cantidad: '1 unidad',
    tiempo: 'Hace 2 horas',
    noLeida: false,
  },
  {
    id: 4,
    tipo: 'sugerencia',
    titulo: 'Organización cercana necesita donaciones',
    mensaje: 'Servidores del Servidor busca frutas y verduras frescas',
    tiempo: 'Hace 3 horas',
    noLeida: false,
  },
];

export const FILTROS = ['Todas', 'Alto riesgo', 'No leídas'];

// También puedes exportar otros mocks si los necesitas
export const MOCK_CONFIG = {
  delay: 500,  // Simular tiempo de carga
  errorRate: 0, // 0 = sin errores, 0.1 = 10% de error
};