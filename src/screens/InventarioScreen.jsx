import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TextInput,
  TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator
} from 'react-native';
import { COLORS, GLOBAL, RISK, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { getInventario } from '../services/api';

const CATEGORIAS = ['Todos', 'Alto riesgo', 'Frutas', 'Carnes', 'Verduras'];

export default function InventarioScreen() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando]   = useState(true);
  const [busqueda, setBusqueda]   = useState('');
  const [filtro, setFiltro]       = useState('Todos');

  useEffect(() => { cargarInventario(); }, []);

  async function cargarInventario() {
    try {
      const data = await getInventario();
      setProductos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setCargando(false);
    }
  }

  const filtrados = productos.filter(p => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFiltro =
      filtro === 'Todos'       ? true :
      filtro === 'Alto riesgo' ? p.nivel === 'alto' :
      p.categoria === filtro;
    return coincideBusqueda && coincideFiltro;
  });

  const porNivel   = nivel => filtrados.filter(p => p.nivel === nivel);
  const totalAlto  = productos.filter(p => p.nivel === 'alto').length;

  if (cargando) {
    return (
      <View style={GLOBAL.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={GLOBAL.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={GLOBAL.header}>
          <Text style={TYPOGRAPHY.h1}>Mi Inventario</Text>
        </View>

        {/* Banner de alerta — amarillo, no rojo */}
        {totalAlto > 0 && (
          <View style={styles.alertBanner}>
            <View style={styles.alertDot} />
            <Text style={styles.alertTexto}>
              {totalAlto} producto{totalAlto > 1 ? 's' : ''} en riesgo alto — actúa pronto
            </Text>
          </View>
        )}

        {/* Buscador */}
        <View style={GLOBAL.searchBar}>
          <Text style={{ fontSize: 16, color: COLORS.textHint }}>⌕</Text>
          <TextInput
            style={GLOBAL.input}
            placeholder="Buscar en inventario..."
            placeholderTextColor={COLORS.textHint}
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>

        {/* Filtros */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtros}
        >
          {CATEGORIAS.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setFiltro(cat)}
              style={[GLOBAL.chip, filtro === cat && GLOBAL.chipActivo]}
            >
              <Text style={[GLOBAL.chipTexto, filtro === cat && GLOBAL.chipTextoActivo]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Secciones por nivel de riesgo */}
        {['alto', 'moderado', 'bajo'].map(nivel => {
          const grupo = porNivel(nivel);
          if (!grupo.length) return null;
          const tituloSeccion =
            nivel === 'alto'     ? 'Alto riesgo' :
            nivel === 'moderado' ? 'Riesgo moderado' :
            nivel === 'bajo'     ? 'Bajo riesgo' : '';
          return (
            <View key={nivel} style={{ marginBottom: SPACING.sm }}>
              <Text style={GLOBAL.sectionLabel}>{tituloSeccion}</Text>
              {grupo.map(p => <ProductoCard key={p.id} producto={p} />)}
            </View>
          );
        })}

        {/* Estado vacío */}
        {filtrados.length === 0 && (
          <View style={GLOBAL.emptyState}>
            <Text style={GLOBAL.emptyText}>No hay productos que coincidan</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// ─── Tarjeta de producto ──────────────────────────────────────
function ProductoCard({ producto }) {
  const { nombre, categoria, cantidad, riesgo, diasRestantes, compradoEl, nivel } = producto;
  const c = RISK[nivel];

  return (
    <TouchableOpacity
      style={[GLOBAL.card, { borderLeftWidth: 3, borderLeftColor: c.color }]}
      activeOpacity={0.7}
    >
      {/* Nombre + badge */}
      <View style={[GLOBAL.spaceBetween, { marginBottom: SPACING.sm }]}>
        <View style={{ flex: 1, marginRight: SPACING.sm }}>
          <Text style={TYPOGRAPHY.h3}>{nombre}</Text>
          <Text style={[TYPOGRAPHY.small, { marginTop: 2 }]}>{categoria} · {cantidad}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: c.bg, borderColor: c.border }]}>
          <Text style={[styles.badgeTexto, { color: c.text }]}>{c.label}</Text>
        </View>
      </View>

      {/* Barra de riesgo */}
      <View style={[GLOBAL.row, { gap: SPACING.sm }]}>
        <View style={styles.riskBarBg}>
          <View style={[styles.riskBar, { width: `${riesgo}%`, backgroundColor: c.color }]} />
        </View>
        <Text style={[TYPOGRAPHY.mono, { color: c.color, minWidth: 34, textAlign: 'right' }]}>
          {riesgo}%
        </Text>
      </View>

      {/* Footer */}
      <View style={[GLOBAL.spaceBetween, {
        marginTop: SPACING.sm,
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
      }]}>
        <Text style={TYPOGRAPHY.small}>
          Comprado{' '}
          <Text style={{ color: COLORS.textSecondary, fontWeight: '600' }}>{compradoEl}</Text>
        </Text>
        <Text style={TYPOGRAPHY.small}>
          ⏱{' '}
          <Text style={{ color: COLORS.textSecondary, fontWeight: '600' }}>
            {diasRestantes}d restantes
          </Text>
        </Text>
        {nivel !== 'bajo' && (
          <TouchableOpacity style={GLOBAL.btnDonate}>
            <Text style={GLOBAL.btnDonateText}>Donar →</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─── Estilos únicos de esta pantalla ─────────────────────────
const styles = StyleSheet.create({
  alertBanner: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.sm + 4,
    backgroundColor: COLORS.secondaryLight,
    borderWidth: 1,
    borderColor: COLORS.secondaryBorder,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
  alertTexto: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.secondaryText,
    flex: 1,
  },
  filtros: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  badgeTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
  riskBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  riskBar: {
    height: 4,
    borderRadius: 4,
  },
});