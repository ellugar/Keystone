import axios from 'axios';
import { mockInventario } from '../mocks/inventario';

const USE_MOCKS = true; // cambia a false cuando el backend esté listo
const BASE_URL = 'http://localhost:3000/api';

export async function getInventario() {
  if (USE_MOCKS) return mockInventario;
  const { data } = await axios.get(`${BASE_URL}/inventario`);
  return data;
}

export async function escanearRecibo(imagenBase64) {
  if (USE_MOCKS) {
    // simula el delay del OCR
    await new Promise(r => setTimeout(r, 1500));
    return mockInventario.slice(0, 3);
  }
  const { data } = await axios.post(`${BASE_URL}/escanear`, { imagen: imagenBase64 });
  return data;
}