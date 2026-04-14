import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS, GLOBAL, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

// ─── Datos mock ───────────────────────────────────────────────
const ORGANIZACION = {
  nombre: 'Banco de Alimentos CDMX',
  ciudad: 'Ciudad de México',
  mision: 'Combatir el hambre y desperdicio de alimentos',
  telefono: '+34 612 345 678',
  email: 'contacto@bancodealgimentos.mx',
  sitio: 'www.bancodealimentos.mx',
  donacionesRecibidas: 127,
  beneficiariosAtendidos: 450,
  kgRecibidos: 2345.5,
};

const IMPACTO = [
  { icono: '📦', label: 'Kg recibidos',       valor: `${ORGANIZACION.kgRecibidos} kg` },
  { icono: '👥', label: 'Beneficiarios',      valor: `${ORGANIZACION.beneficiariosAtendidos}` },
  { icono: '🤝', label: 'Donaciones recibidas', valor: `${ORGANIZACION.donacionesRecibidas}` },
];

const MENU = [
  { icono: '⚙', label: 'Configuración' },
  { icono: '⌖', label: 'Ubicación'     },
  { icono: '?', label: 'Ayuda y soporte' },
];

const DONACIONESRECIBIDAS = [
  {
    id: 1,
    procedencia: 'Frutas frescas',
    fecha: '10 Apr 2026',
    estado: 'Recibida',
    donador: 'Roberto Sánchez',
    cantidad: '5 kg',
  },
  {
    id: 2,
    procedencia: 'Productos lácteos',
    fecha: '8 Apr 2026',
    estado: 'Recibida',
    donador: 'María García',
    cantidad: '10 kg',
  },
  {
    id: 3,
    procedencia: 'Verduras frescas',
    fecha: '5 Apr 2026',
    estado: 'Recibida',
    donador: 'Juan López',
    cantidad: '7.5 kg',
  },
];

// ─── Pantalla ─────────────────────────────────────────────────
export default function OrganizacionPerfilScreen() {
  const { logout } = useAuth();

  return (
    <View style={GLOBAL.screen}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={GLOBAL.header}>
        <Text style={TYPOGRAPHY.h1}>Mi Organización</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Tarjeta de organización ── */}
        <View style={[GLOBAL.card, { marginBottom: SPACING.md }]}>

          {/* Avatar + nombre */}
          <View style={[GLOBAL.row, { gap: SPACING.md, marginBottom: SPACING.md }]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>
                {ORGANIZACION.nombre.charAt(0)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={TYPOGRAPHY.h2}>{ORGANIZACION.nombre}</Text>
              <View style={[GLOBAL.row, { gap: 4, marginTop: 4 }]}>
                <Text style={{ color: COLORS.textHint, fontSize: 13 }}>⌖</Text>
                <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
                  {ORGANIZACION.ciudad}
                </Text>
              </View>
            </View>
          </View>

          {/* Misión */}
          <View style={{ marginBottom: SPACING.md, paddingBottom: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginBottom: 4 }]}>
              Misión
            </Text>
            <Text style={[TYPOGRAPHY.body, { color: COLORS.textPrimary }]}>
              {ORGANIZACION.mision}
            </Text>
          </View>

          {/* Stats */}
          <View style={[GLOBAL.row, { gap: SPACING.sm }]}>
            <StatBox valor={ORGANIZACION.donacionesRecibidas} label="Donaciones recibidas" />
            <StatBox valor={ORGANIZACION.beneficiariosAtendidos} label="Beneficiarios" />
          </View>
        </View>

        {/* ── Información de contacto ── */}
        <View style={[GLOBAL.card, { marginBottom: SPACING.md }]}>
          <Text style={[TYPOGRAPHY.h3, { marginBottom: SPACING.md }]}>
            Información de contacto
          </Text>
          
          <View style={styles.contactItem}>
            <Text style={styles.contactIcono}>📧</Text>
            <View style={{ flex: 1 }}>
              <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginBottom: 2 }]}>
                Email
              </Text>
              <Text style={[TYPOGRAPHY.body, { color: COLORS.textPrimary, fontWeight: '600' }]}>
                {ORGANIZACION.email}
              </Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactIcono}>📱</Text>
            <View style={{ flex: 1 }}>
              <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginBottom: 2 }]}>
                Teléfono
              </Text>
              <Text style={[TYPOGRAPHY.body, { color: COLORS.textPrimary, fontWeight: '600' }]}>
                {ORGANIZACION.telefono}
              </Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactIcono}>🌐</Text>
            <View style={{ flex: 1 }}>
              <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginBottom: 2 }]}>
                Sitio web
              </Text>
              <Text style={[TYPOGRAPHY.body, { color: COLORS.primary, fontWeight: '600' }]}>
                {ORGANIZACION.sitio}
              </Text>
            </View>
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

        {/* ── Historial de donaciones recibidas ── */}
        <View style={{ marginHorizontal: SPACING.lg, marginBottom: SPACING.md }}>
          <Text style={[TYPOGRAPHY.h2, { marginBottom: SPACING.md }]}>
            Donaciones recibidas
          </Text>
          {DONACIONESRECIBIDAS.map(item => (
            <DonacionRecibidaCard key={item.id} item={item} />
          ))}
        </View>

        {/* ── Cerrar sesión ── */}
        <TouchableOpacity 
          style={styles.btnLogout}
          activeOpacity={0.8}
          onPress={logout}
        >
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

function DonacionRecibidaCard({ item }) {
  const { procedencia, fecha, estado, donador, cantidad } = item;
  return (
    <View style={[GLOBAL.card, { marginBottom: SPACING.sm }]}>
      {/* Procedencia + estado */}
      <View style={[GLOBAL.spaceBetween, { marginBottom: SPACING.xs }]}>
        <Text style={TYPOGRAPHY.h3}>{procedencia}</Text>
        <View style={styles.estadoBadge}>
          <Text style={styles.estadoBadgeTexto}>{estado}</Text>
        </View>
      </View>

      {/* Cantidad */}
      <Text style={[TYPOGRAPHY.small, { marginBottom: SPACING.xs }]}>
        {cantidad}
      </Text>

      {/* Donador */}
      <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
        Donador:{' '}
        <Text style={{ color: COLORS.textSecondary ?? '#555', fontWeight: '600' }}>
          {donador}
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
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.primary,
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

  // Contacto
  contactItem: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  contactIcono: {
    fontSize: 20,
    width: 32,
    textAlign: 'center',
  },

  // Impacto
  impactoIcono: {
    fontSize: 14,
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
    backgroundColor: COLORS.primary + '20',
    borderRadius: RADIUS.pill ?? 99,
  },
  estadoBadgeTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Logout
  btnLogout: {
    marginHorizontal: SPACING.lg,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.danger + '10',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  btnLogoutIcono: {
    fontSize: 16,
    color: COLORS.danger,
  },
  btnLogoutTexto: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.danger,
  },
});
