import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { COLORS, GLOBAL, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

// ─── Datos mock ───────────────────────────────────────────────
const USUARIO = {
  nombre: 'Roberto Sánchez',
  ciudad: 'Ciudad de México',
  donaciones: 3,
  kgRecuperados: 5.5,
};

const IMPACTO = [
  { icono: '↓', label: 'Desperdicio evitado',       valor: '5.5 kg' },
  { icono: '◎', label: 'Organizaciones apoyadas',   valor: '3'      },
  { icono: '◇', label: 'Productos donados',          valor: '3'      },
];

const MENU = [
  { icono: '⚙', label: 'Configuración' },
  { icono: '⌖', label: 'Ubicación'     },
  { icono: '?', label: 'Ayuda y soporte' },
];

const HISTORIAL = [
  {
    id: 1,
    nombre: 'Frutas frescas',
    fecha: '2 Mar 2026',
    estado: 'Completada',
    receptor: 'Servidores del Servidor',
    cantidad: '5 kg',
  },
  {
    id: 2,
    nombre: 'Productos carnicos',
    fecha: '28 Feb 2026',
    estado: 'Completada',
    receptor: 'Banco de Alimentos CDMX',
    cantidad: '2 kg',
  },
  {
    id: 3,
    nombre: 'Verduras frescas',
    fecha: '25 Feb 2026',
    estado: 'Completada',
    receptor: 'Comedor Comunitario San Juan',
    cantidad: '3 kg',
  },
];

// ─── Pantalla ─────────────────────────────────────────────────
export default function PerfilScreen({ navigation }) {
  return (
    <View style={GLOBAL.screen}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={GLOBAL.header}>
        <Text style={TYPOGRAPHY.h1}>Mi Perfil</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Tarjeta de usuario ── */}
        <View style={[GLOBAL.card, { marginBottom: SPACING.md }]}>

          {/* Avatar + nombre */}
          <View style={[GLOBAL.row, { gap: SPACING.md, marginBottom: SPACING.md }]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>
                {USUARIO.nombre.charAt(0)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={TYPOGRAPHY.h2}>{USUARIO.nombre}</Text>
              <View style={[GLOBAL.row, { gap: 4, marginTop: 4 }]}>
                <Text style={{ color: COLORS.textHint, fontSize: 13 }}>⌖</Text>
                <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
                  {USUARIO.ciudad}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={[GLOBAL.row, { gap: SPACING.sm }]}>
            <StatBox valor={USUARIO.donaciones}     label="Donaciones realizadas" />
            <StatBox valor={`${USUARIO.kgRecuperados} kg`} label="Alimentos recuperados" />
          </View>
        </View>

        {/* ── Impacto generado ── */}
        <View style={[GLOBAL.card, { marginBottom: SPACING.md }]}>
          <Text style={[TYPOGRAPHY.h3, { marginBottom: SPACING.md }]}>
            Impacto generado
          </Text>
          {IMPACTO.map(({ icono, label, valor }) => (
            <View
              key={label}
              style={[GLOBAL.spaceBetween, {
                paddingVertical: SPACING.sm,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.border,
              }]}
            >
              <View style={[GLOBAL.row, { gap: SPACING.sm }]}>
                <Text style={styles.impactoIcono}>{icono}</Text>
                <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
                  {label}
                </Text>
              </View>
              <Text style={[TYPOGRAPHY.small, { fontWeight: '700', color: COLORS.text ?? '#1A1A1A' }]}>
                {valor}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Menú de opciones ── */}
        <View style={{ marginHorizontal: SPACING.lg, marginBottom: SPACING.md, gap: SPACING.sm }}>
          {MENU.map(({ icono, label }) => (
            <TouchableOpacity
              key={label}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <View style={[GLOBAL.row, { gap: SPACING.md }]}>
                <Text style={styles.menuIcono}>{icono}</Text>
                <Text style={[TYPOGRAPHY.h3, { fontWeight: '500' }]}>{label}</Text>
              </View>
              <Text style={{ color: COLORS.textHint, fontSize: 18 }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Historial de donaciones ── */}
        <View style={{ marginHorizontal: SPACING.lg, marginBottom: SPACING.md }}>
          <Text style={[TYPOGRAPHY.h2, { marginBottom: SPACING.md }]}>
            Historial de donaciones
          </Text>
          {HISTORIAL.map(item => (
            <HistorialCard key={item.id} item={item} />
          ))}
        </View>

        {/* ── Cerrar sesión ── */}
        <TouchableOpacity style={styles.btnLogout} activeOpacity={0.8}>
          <Text style={styles.btnLogoutIcono}>⏻</Text>
          <Text style={styles.btnLogoutTexto}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// ─── Subcomponentes ───────────────────────────────────────────
function StatBox({ valor, label }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValor}>{valor}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function HistorialCard({ item }) {
  const { nombre, fecha, estado, receptor, cantidad } = item;
  return (
    <View style={[GLOBAL.card, { marginBottom: SPACING.sm }]}>
      {/* Nombre + estado */}
      <View style={[GLOBAL.spaceBetween, { marginBottom: SPACING.xs }]}>
        <Text style={TYPOGRAPHY.h3}>{nombre}</Text>
        <View style={styles.estadoBadge}>
          <Text style={styles.estadoBadgeTexto}>{estado}</Text>
        </View>
      </View>

      {/* Cantidad */}
      <Text style={[TYPOGRAPHY.small, { marginBottom: SPACING.xs }]}>
        {cantidad}
      </Text>

      {/* Organización */}
      <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
        Organización:{' '}
        <Text style={{ color: COLORS.textSecondary ?? '#555', fontWeight: '600' }}>
          {receptor}
        </Text>
      </Text>

      {/* Fecha */}
      <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginTop: 4 }]}>
        {fecha}
      </Text>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Avatar
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.textSecondary ?? '#555',
  },

  // Stats
  statBox: {
    flex: 1,
    padding: SPACING.sm + 2,
    backgroundColor: COLORS.surface ?? '#F8F8F8',
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  statValor: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text ?? '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textHint,
    textAlign: 'center',
  },

  // Impacto
  impactoIcono: {
    fontSize: 14,
    color: COLORS.textHint,
    width: 18,
    textAlign: 'center',
  },

  // Menú
  menuItem: {
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  menuIcono: {
    fontSize: 16,
    color: COLORS.textSecondary ?? '#555',
    width: 22,
    textAlign: 'center',
  },

  // Historial badge
  estadoBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.pill ?? 99,
  },
  estadoBadgeTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary ?? '#555',
  },

  // Logout
  btnLogout: {
    marginHorizontal: SPACING.lg,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  btnLogoutIcono: {
    fontSize: 16,
    color: COLORS.textHint,
  },
  btnLogoutTexto: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textHint,
  },
});