import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Image, ActivityIndicator,
  Alert,
} from 'react-native';
import { COLORS, GLOBAL, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

// ─── Mock: productos detectados por OCR ──────────────────────
const MOCK_ITEMS = [
  { id: 1, nombre: 'Manzanas Fuji',       categoria: 'Frutas',         cantidad: '1.5 kg', precio: '$45.00', seleccionado: true  },
  { id: 2, nombre: 'Leche Entera',        categoria: 'Lácteos',        cantidad: '2 L',    precio: '$52.00', seleccionado: true  },
  { id: 3, nombre: 'Pan Integral',        categoria: 'Panadería',      cantidad: '1 pza',  precio: '$38.00', seleccionado: true  },
  { id: 4, nombre: 'Lechuga Romana',      categoria: 'Verduras',       cantidad: '1 pza',  precio: '$22.00', seleccionado: true  },
  { id: 5, nombre: 'Papel higiénico',     categoria: 'No alimentario', cantidad: '4 rls',  precio: '$65.00', seleccionado: false },
];

const VIDA_UTIL = [
  { categoria: 'Frutas',    dias: '5–7 días' },
  { categoria: 'Verduras',  dias: '3–5 días' },
  { categoria: 'Lácteos',   dias: '7–10 días' },
  { categoria: 'Panadería', dias: '3–5 días' },
];

// ─── Pantalla principal ───────────────────────────────────────
export default function EscanearScreen({ navigation }) {
  const [paso, setPaso]         = useState('inicio');   // 'inicio' | 'procesando' | 'revision'
  const [items, setItems]       = useState(MOCK_ITEMS);
  const [imagenUri, setImagenUri] = useState(null);

  // Simula captura / selección de imagen
  function simularCaptura() {
    setPaso('procesando');
    setTimeout(() => {
      setImagenUri('mock');
      setPaso('revision');
    }, 1800);
  }

  function toggleItem(id) {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, seleccionado: !i.seleccionado } : i)
    );
  }

  function agregarAlInventario() {
    const seleccionados = items.filter(i => i.seleccionado);
    if (!seleccionados.length) {
      Alert.alert('Sin selección', 'Selecciona al menos un producto para agregar.');
      return;
    }
    // Aquí llamarías a tu servicio real
    Alert.alert(
      '¡Listo!',
      `${seleccionados.length} producto${seleccionados.length > 1 ? 's' : ''} agregado${seleccionados.length > 1 ? 's' : ''} al inventario.`,
      [{ text: 'Ver inventario', onPress: () => navigation?.navigate('Inventario') }]
    );
  }

  return (
    <View style={GLOBAL.screen}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={GLOBAL.header}>
        <Text style={TYPOGRAPHY.h1}>Escanear Recibo</Text>
        <Text style={[TYPOGRAPHY.small, { marginTop: 2 }]}>
          Agrega productos a tu inventario desde una foto
        </Text>
      </View>

      {/* ── PASO: procesando ── */}
      {paso === 'procesando' && (
        <View style={GLOBAL.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[TYPOGRAPHY.small, { marginTop: SPACING.md }]}>
            Procesando imagen…
          </Text>
        </View>
      )}

      {/* ── PASO: inicio ── */}
      {paso === 'inicio' && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Instrucciones */}
          <View style={styles.instruccionesBox}>
            <Text style={[TYPOGRAPHY.h3, { marginBottom: SPACING.sm }]}>
              Instrucciones
            </Text>
            {[
              'El recibo debe estar bien iluminado',
              'Captura todo el recibo en una sola imagen',
              'Evita sombras y reflejos',
              'El texto debe ser claramente legible',
            ].map((tip, i) => (
              <View key={i} style={styles.tipRow}>
                <View style={styles.tipBullet} />
                <Text style={TYPOGRAPHY.small}>{tip}</Text>
              </View>
            ))}
          </View>

          {/* Botón: cámara */}
          <TouchableOpacity
            style={styles.cameroBtn}
            onPress={simularCaptura}
            activeOpacity={0.8}
          >
            <Text style={styles.camaraBtnIcon}>📷</Text>
            <Text style={styles.camaraBtnTitle}>Tomar foto del recibo</Text>
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
              Usa la cámara de tu dispositivo
            </Text>
          </TouchableOpacity>

          {/* Botón: galería */}
          <TouchableOpacity
            style={styles.galeriaBtn}
            onPress={simularCaptura}
            activeOpacity={0.8}
          >
            <Text style={styles.galeriaBtnIcon}>🖼️</Text>
            <View>
              <Text style={[TYPOGRAPHY.h3, { marginBottom: 2 }]}>
                Subir desde galería
              </Text>
              <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
                Selecciona una imagen guardada
              </Text>
            </View>
          </TouchableOpacity>

          {/* Vista previa vacía */}
          <View style={styles.previewBox}>
            <Text style={[TYPOGRAPHY.small, { marginBottom: SPACING.sm, color: COLORS.textHint }]}>
              Vista previa
            </Text>
            <View style={styles.previewPlaceholder}>
              <Text style={{ color: COLORS.textHint, fontSize: 13 }}>
                Sin imagen seleccionada
              </Text>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* ── PASO: revisión ── */}
      {paso === 'revision' && (
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Banner éxito */}
          <View style={styles.exitoBanner}>
            <Text style={styles.exitoIcon}>✓</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.exitoTitulo}>Recibo procesado</Text>
              <Text style={styles.exitoSub}>
                Se detectaron {items.length} productos
              </Text>
            </View>
          </View>

          {/* Miniatura del recibo */}
          <View style={styles.previewBox}>
            <Text style={[TYPOGRAPHY.small, { marginBottom: SPACING.sm, color: COLORS.textHint }]}>
              Imagen del recibo
            </Text>
            <View style={[styles.previewPlaceholder, { height: 120 }]}>
              <Text style={{ color: COLORS.textHint, fontSize: 13, letterSpacing: 2 }}>
                RECIBO CAPTURADO
              </Text>
            </View>
          </View>

          {/* Lista de productos */}
          <View style={{ marginHorizontal: SPACING.lg, marginBottom: SPACING.md }}>
            <Text style={[TYPOGRAPHY.h3, { marginBottom: SPACING.xs }]}>
              Productos detectados
            </Text>
            <Text style={[TYPOGRAPHY.small, { marginBottom: SPACING.md, color: COLORS.textHint }]}>
              Selecciona los productos alimentarios para agregar al inventario
            </Text>

            {items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </View>

          {/* Estimación de vida útil */}
          <View style={styles.vidaUtilBox}>
            <Text style={[TYPOGRAPHY.h3, { marginBottom: SPACING.sm }]}>
              Estimación de vida útil
            </Text>
            {VIDA_UTIL.map(({ categoria, dias }) => (
              <View key={categoria} style={styles.tipRow}>
                <View style={styles.tipBullet} />
                <Text style={TYPOGRAPHY.small}>
                  {categoria}:{' '}
                  <Text style={{ color: COLORS.textSecondary, fontWeight: '600' }}>
                    {dias} promedio
                  </Text>
                </Text>
              </View>
            ))}
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint, marginTop: SPACING.sm }]}>
              * El riesgo de deterioro se calculará con márgenes de variabilidad
            </Text>
          </View>

          {/* Acciones */}
          <View style={{ marginHorizontal: SPACING.lg, gap: SPACING.sm, paddingBottom: 40 }}>
            <TouchableOpacity
              style={styles.btnPrimario}
              onPress={agregarAlInventario}
              activeOpacity={0.85}
            >
              <Text style={styles.btnPrimarioText}>
                Agregar {items.filter(i => i.seleccionado).length} productos al inventario →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnSecundario}
              onPress={() => { setPaso('inicio'); setItems(MOCK_ITEMS); }}
              activeOpacity={0.8}
            >
              <Text style={styles.btnSecundarioText}>Escanear otro recibo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

// ─── Tarjeta de producto detectado ───────────────────────────
function ItemCard({ item, onToggle }) {
  const { nombre, categoria, cantidad, precio, seleccionado } = item;
  const esAlimentario = categoria !== 'No alimentario';

  return (
    <TouchableOpacity
      onPress={esAlimentario ? onToggle : undefined}
      activeOpacity={esAlimentario ? 0.7 : 1}
      style={[
        styles.itemCard,
        seleccionado && esAlimentario && styles.itemCardSeleccionado,
        !esAlimentario && styles.itemCardDeshabilitado,
      ]}
    >
      {/* Checkbox */}
      <View style={[
        styles.checkbox,
        seleccionado && esAlimentario && styles.checkboxActivo,
      ]}>
        {seleccionado && esAlimentario && (
          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>✓</Text>
        )}
      </View>

      {/* Info */}
      <View style={{ flex: 1 }}>
        <Text style={[
          TYPOGRAPHY.h3,
          { marginBottom: 4 },
          !esAlimentario && { color: COLORS.textHint },
        ]}>
          {nombre}
        </Text>
        <View style={styles.itemMeta}>
          <View style={styles.categoriaBadge}>
            <Text style={styles.categoriaBadgeText}>{categoria}</Text>
          </View>
          <Text style={TYPOGRAPHY.small}>{cantidad}</Text>
          <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>·</Text>
          <Text style={TYPOGRAPHY.small}>{precio}</Text>
        </View>
      </View>

      {/* X si no alimentario */}
      {!esAlimentario && (
        <Text style={{ color: COLORS.textHint, fontSize: 18 }}>✕</Text>
      )}
    </TouchableOpacity>
  );
}

// ─── Estilos ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  instruccionesBox: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.surface ?? '#F8F8F8',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: 6,
  },
  tipBullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.textHint,
  },

  // Botón cámara (grande, dashed)
  cameroBtn: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    height: 160,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    backgroundColor: '#fff',
  },
  camaraBtnIcon: { fontSize: 40 },
  camaraBtnTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text ?? '#1A1A1A',
  },

  // Botón galería (compacto)
  galeriaBtn: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    height: 80,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    backgroundColor: '#fff',
  },
  galeriaBtnIcon: { fontSize: 28 },

  // Vista previa
  previewBox: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface ?? '#F8F8F8',
  },
  previewPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Banner éxito
  exitoBanner: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.primary ?? '#1A1A1A',
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  exitoIcon: { fontSize: 22, color: '#fff' },
  exitoTitulo: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  exitoSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
  },

  // Tarjeta de item
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.sm + 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: '#fff',
    marginBottom: SPACING.sm,
  },
  itemCardSeleccionado: {
    borderColor: COLORS.primary ?? '#1A1A1A',
    backgroundColor: COLORS.surface ?? '#F8F8F8',
  },
  itemCardDeshabilitado: {
    opacity: 0.5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxActivo: {
    backgroundColor: COLORS.primary ?? '#1A1A1A',
    borderColor: COLORS.primary ?? '#1A1A1A',
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    flexWrap: 'wrap',
  },
  categoriaBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.sm,
  },
  categoriaBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary ?? '#555',
  },

  // Vida útil
  vidaUtilBox: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface ?? '#F8F8F8',
  },

  // Botones de acción
  btnPrimario: {
    height: 54,
    backgroundColor: COLORS.primary ?? '#1A1A1A',
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimarioText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  btnSecundario: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnSecundarioText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary ?? '#555',
  },
});