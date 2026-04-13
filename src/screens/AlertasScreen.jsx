// src/screens/AlertasScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { COLORS, GLOBAL, RISK, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
// 👇 Importar desde el archivo de datos
import { ALERTAS_MOCK, FILTROS } from '../mocks/alertas';

export default function AlertasScreen({ navigation }) {
  const [alertas, setAlertas] = useState(ALERTAS_MOCK);
  const [filtro, setFiltro] = useState('Todas');

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

// El resto del componente AlertaRow y estilos permanecen igual...
function AlertaRow({ alerta, ultimaRow, onPress }) {
  const { tipo, titulo, item, categoria, riesgo, diasRestantes,
          cantidad, tiempo, noLeida, mensaje } = alerta;

  // Color del icono según tipo
  const iconoBg =
    tipo === 'alto'      ? COLORS.danger ?? '#C62828' :  // 🔴 Rojo
    tipo === 'moderado'  ? COLORS.tertiary ?? '#E69E19' : // 🟠 Naranja
    COLORS.border;

  const iconoEmoji =
    tipo === 'alto'      ? '⚠' :
    tipo === 'moderado'  ? '↑' :
    '◇';

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
      <View style={[styles.iconoCirculo, { backgroundColor: iconoBg }]}>
        <Text style={[styles.iconoEmoji,
          { color: tipo === 'sugerencia' ? COLORS.textHint : '#fff' }
        ]}>
          {iconoEmoji}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={[GLOBAL.spaceBetween, { marginBottom: 4 }]}>
          <Text style={[TYPOGRAPHY.h3, { flex: 1, marginRight: SPACING.sm }]}>
            {titulo}
          </Text>
          {noLeida && <View style={styles.puntito} />}
        </View>

        {tipo !== 'sugerencia' ? (
          <>
            <Text style={[TYPOGRAPHY.h3, { fontSize: 16, marginBottom: SPACING.xs }]}>
              {item}
            </Text>

            <View style={[GLOBAL.row, { gap: SPACING.xs, marginBottom: SPACING.sm }]}>
              <View style={styles.categoriaBadge}>
                <Text style={styles.categoriaBadgeText}>{categoria}</Text>
              </View>
              <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>·</Text>
              <Text style={TYPOGRAPHY.small}>{cantidad}</Text>
            </View>

            <View style={styles.riskBarBg}>
              <View style={[styles.riskBarFill, {
                width: `${riesgo}%`,
                backgroundColor: riskColor,
              }]} />
            </View>
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginTop: 4, marginBottom: SPACING.sm }]}>
              Riesgo: {riesgo}% · {diasRestantes} {diasRestantes === 1 ? 'día' : 'días'} restante{diasRestantes !== 1 ? 's' : ''}
            </Text>

            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginBottom: 4 }]}>
              🕐 {tiempo}
            </Text>

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

// Los estilos permanecen exactamente igual...
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
  puntito: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary ?? '#1A1A1A',
    marginTop: 4,
  },
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