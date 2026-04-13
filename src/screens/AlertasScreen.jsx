import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { COLORS, GLOBAL, RISK, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

// ─── Mock data ────────────────────────────────────────────────
const ALERTAS_MOCK = [
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

const FILTROS = ['Todas', 'Alto riesgo', 'No leídas'];

// ─── Pantalla ─────────────────────────────────────────────────
export default function AlertasScreen({ navigation }) {
  const [alertas, setAlertas] = useState(ALERTAS_MOCK);
  const [filtro, setFiltro]   = useState('Todas');

  function marcarTodasLeidas() {
    setAlertas(prev => prev.map(a => ({ ...a, noLeida: false })));
  }

  const filtradas = alertas.filter(a => {
    if (filtro === 'Alto riesgo') return a.tipo === 'alto';
    if (filtro === 'No leídas')  return a.noLeida;
    return true;
  });

  const noLeidasCount = alertas.filter(a => a.noLeida).length;

  return (
    <View style={GLOBAL.screen}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={[GLOBAL.spaceBetween, { marginBottom: SPACING.xs }]}>
          <Text style={TYPOGRAPHY.h1}>Alertas</Text>
          {noLeidasCount > 0 && (
            <TouchableOpacity onPress={marcarTodasLeidas}>
              <Text style={styles.marcarLink}>Marcar todas como leídas</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginBottom: SPACING.md }]}>
          Notificaciones preventivas sobre el riesgo de deterioro de tus alimentos
        </Text>

        {/* Filtros */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtrosRow}>
            {FILTROS.map(f => (
              <TouchableOpacity
                key={f}
                onPress={() => setFiltro(f)}
                style={[GLOBAL.chip, filtro === f && GLOBAL.chipActivo]}
              >
                <Text style={[GLOBAL.chipTexto, filtro === f && GLOBAL.chipTextoActivo]}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Lista */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtradas.map((alerta, i) => (
          <AlertaRow
            key={alerta.id}
            alerta={alerta}
            ultimaRow={i === filtradas.length - 1}
            onPress={() => {
              if (alerta.tipo !== 'sugerencia') {
                navigation?.navigate('Inventario');
              }
            }}
          />
        ))}

        {filtradas.length === 0 && (
          <View style={GLOBAL.emptyState}>
            <Text style={GLOBAL.emptyText}>No hay alertas que coincidan</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// ─── Fila de alerta ───────────────────────────────────────────
function AlertaRow({ alerta, ultimaRow, onPress }) {
  const { tipo, titulo, item, categoria, riesgo, diasRestantes,
          cantidad, tiempo, noLeida, mensaje } = alerta;

  // Color del icono según tipo
  const iconoBg =
    tipo === 'alto'      ? COLORS.primary ?? '#1A1A1A' :
    tipo === 'moderado'  ? COLORS.secondary ?? '#E8A000' :
    COLORS.border;

  const iconoEmoji =
    tipo === 'alto'      ? '⚠' :
    tipo === 'moderado'  ? '↑' :
    '◇';

  // Para la barra de riesgo, reutilizamos RISK si existe
  const riskColor =
    tipo === 'alto'     ? (RISK?.alto?.color     ?? '#D94F4F') :
    tipo === 'moderado' ? (RISK?.moderado?.color  ?? '#E8A000') :
    COLORS.textHint;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.row,
        noLeida && styles.rowNoLeida,
        !ultimaRow && styles.rowBorder,
      ]}
    >
      {/* Icono */}
      <View style={[styles.iconoCirculo, { backgroundColor: iconoBg }]}>
        <Text style={[styles.iconoEmoji,
          { color: tipo === 'sugerencia' ? COLORS.textHint : '#fff' }
        ]}>
          {iconoEmoji}
        </Text>
      </View>

      {/* Contenido */}
      <View style={{ flex: 1 }}>
        {/* Título + punto de no leída */}
        <View style={[GLOBAL.spaceBetween, { marginBottom: 4 }]}>
          <Text style={[TYPOGRAPHY.h3, { flex: 1, marginRight: SPACING.sm }]}>
            {titulo}
          </Text>
          {noLeida && <View style={styles.puntito} />}
        </View>

        {tipo !== 'sugerencia' ? (
          <>
            {/* Nombre del producto */}
            <Text style={[TYPOGRAPHY.h3, { fontSize: 16, marginBottom: SPACING.xs }]}>
              {item}
            </Text>

            {/* Categoría + cantidad */}
            <View style={[GLOBAL.row, { gap: SPACING.xs, marginBottom: SPACING.sm }]}>
              <View style={styles.categoriaBadge}>
                <Text style={styles.categoriaBadgeText}>{categoria}</Text>
              </View>
              <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>·</Text>
              <Text style={TYPOGRAPHY.small}>{cantidad}</Text>
            </View>

            {/* Barra de riesgo */}
            <View style={styles.riskBarBg}>
              <View style={[styles.riskBarFill, {
                width: `${riesgo}%`,
                backgroundColor: riskColor,
              }]} />
            </View>
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginTop: 4, marginBottom: SPACING.sm }]}>
              Riesgo: {riesgo}% · {diasRestantes} {diasRestantes === 1 ? 'día' : 'días'} restante{diasRestantes !== 1 ? 's' : ''}
            </Text>

            {/* Tiempo */}
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginBottom: 4 }]}>
              🕐 {tiempo}
            </Text>

            {/* CTA */}
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
              Considera consumir o donar este producto pronto
            </Text>
          </>
        ) : (
          <>
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginBottom: 4 }]}>
              {mensaje}
            </Text>
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
              {tiempo}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─── Estilos ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  marcarLink: {
    fontSize: 13,
    color: COLORS.textHint,
    textDecorationLine: 'underline',
  },
  filtrosRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingBottom: 2,
  },

  // Filas
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: '#fff',
  },
  rowNoLeida: {
    backgroundColor: COLORS.surface ?? '#F8F8F8',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  // Icono circular
  iconoCirculo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  iconoEmoji: {
    fontSize: 16,
    fontWeight: '700',
  },

  // Punto "no leída"
  puntito: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary ?? '#1A1A1A',
    marginTop: 4,
  },

  // Badge de categoría
  categoriaBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.sm,
  },
  categoriaBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary ?? '#555',
  },

  // Barra de riesgo
  riskBarBg: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  riskBarFill: {
    height: 6,
    borderRadius: 4,
  },
});