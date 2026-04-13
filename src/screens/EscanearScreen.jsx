// src/screens/EscanearScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, ActivityIndicator, Alert,
} from 'react-native';
import { COLORS, GLOBAL, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

// 👇 Importar desde el archivo de mocks
import { MOCK_ITEMS_ESCANER, VIDA_UTIL_ESCANER, OCR_CONFIG } from '../mocks/escaneo';


export default function EscanearScreen({ navigation }) {
  const [paso, setPaso] = useState('inicio');
  const [items, setItems] = useState(MOCK_ITEMS_ESCANER);  // 👈 Usar import
  const [imagenUri, setImagenUri] = useState(null);

  function simularCaptura() {
    setPaso('procesando');
    setTimeout(() => {
      setImagenUri(OCR_CONFIG.mockImageUri);  // 👈 Usar config
      setPaso('revision');
    }, OCR_CONFIG.processingTime);  // 👈 Usar config
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
    Alert.alert(
      '¡Listo!',
      `${seleccionados.length} producto${seleccionados.length > 1 ? 's' : ''} agregado${seleccionados.length > 1 ? 's' : ''} al inventario.`,
      [{ text: 'Ver inventario', onPress: () => navigation?.navigate('Inventario') }]
    );
  }

  // El resto del componente permanece igual...
  return (
    <View style={GLOBAL.screen}>
      <StatusBar barStyle="dark-content" />

      <View style={GLOBAL.header}>
        <Text style={TYPOGRAPHY.h1}>Escanear Recibo</Text>
        <Text style={[TYPOGRAPHY.small, { marginTop: 2 }]}>
          Agrega productos a tu inventario desde una foto
        </Text>
      </View>

      {paso === 'procesando' && (
        <View style={GLOBAL.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[TYPOGRAPHY.small, { marginTop: SPACING.md }]}>
            Analizando recibo con OCR…
          </Text>
        </View>
      )}

      {paso === 'inicio' && (
        <ScrollView showsVerticalScrollIndicator={false}>
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

          <TouchableOpacity
            style={styles.camaraBtn}
            onPress={simularCaptura}
            activeOpacity={0.8}
          >
            <Text style={styles.camaraBtnIcon}>📷</Text>
            <Text style={styles.camaraBtnTitle}>Tomar foto del recibo</Text>
            <Text style={[TYPOGRAPHY.small, { color: COLORS.textHint }]}>
              Usa la cámara de tu dispositivo
            </Text>
          </TouchableOpacity>

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

      {paso === 'revision' && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.exitoBanner}>
            <Text style={styles.exitoIcon}>✓</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.exitoTitulo}>Recibo procesado</Text>
              <Text style={styles.exitoSub}>
                Se detectaron {items.length} productos
              </Text>
            </View>
          </View>

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

          <View style={styles.vidaUtilBox}>
            <Text style={[TYPOGRAPHY.h3, { marginBottom: SPACING.sm }]}>
              Estimación de vida útil
            </Text>
            {VIDA_UTIL_ESCANER.map(({ categoria, dias }) => (  // 👈 Usar import
              <View key={categoria} style={styles.tipRow}>
                <View style={[styles.tipBullet, { backgroundColor: COLORS.primary }]} />
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

          <View style={{ marginHorizontal: SPACING.lg, gap: SPACING.sm, paddingBottom: 40 }}>
            <TouchableOpacity
              style={GLOBAL.btnPrimary}
              onPress={agregarAlInventario}
              activeOpacity={0.85}
            >
              <Text style={GLOBAL.btnPrimaryText}>
                Agregar {items.filter(i => i.seleccionado).length} productos al inventario →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={GLOBAL.btnSecondary}
              onPress={() => { setPaso('inicio'); setItems(MOCK_ITEMS_ESCANER); }}  // 👈 Usar import
              activeOpacity={0.8}
            >
              <Text style={GLOBAL.btnSecondaryText}>Escanear otro recibo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

// El componente ItemCard y los estilos permanecen igual...
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
      <View style={[styles.checkbox, seleccionado && esAlimentario && styles.checkboxActivo]}>
        {seleccionado && esAlimentario && (
          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>✓</Text>
        )}
      </View>

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

      {!esAlimentario && (
        <Text style={{ color: COLORS.textHint, fontSize: 18 }}>✕</Text>
      )}
    </TouchableOpacity>
  );
}

// Los estilos permanecen exactamente igual...
const styles = StyleSheet.create({
  instruccionesBox: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
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
  camaraBtn: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    height: 160,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.primaryBorder,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.primaryLight,
  },
  camaraBtnIcon: { fontSize: 40 },
  camaraBtnTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
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
    backgroundColor: COLORS.bgCard,
  },
  galeriaBtnIcon: { fontSize: 28 },
  previewBox: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard,
  },
  previewPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.bgInput,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitoBanner: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  exitoIcon: { fontSize: 22, color: '#fff' },
  exitoTitulo: { color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 2 },
  exitoSub: { color: 'rgba(255,255,255,0.80)', fontSize: 12 },
  vidaUtilBox: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.secondaryBorder,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.secondaryLight,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.sm + 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard,
    marginBottom: SPACING.sm,
  },
  itemCardSeleccionado: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  itemCardDeshabilitado: {
    opacity: 0.45,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bgCard,
  },
  checkboxActivo: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
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
    backgroundColor: COLORS.bgChip,
    borderRadius: RADIUS.sm,
  },
  categoriaBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});