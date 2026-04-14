import { StyleSheet } from 'react-native';

// ─── Paleta de colores ────────────────────────────────────────
// Verde principal → naturaleza, sostenibilidad, navegación, botones
// Amarillo secundario → información importante, notificaciones
// Naranja terciario → donación, alertas moderadas
// Rojo mínimo → advertencias críticas, alimentos próximos a vencer

export const COLORS = {

  // ── Fondos ──────────────────────────────────────────────────
  bg:           '#FAFAF7',   // blanco cálido, no frío
  bgCard:       '#FFFFFF',
  bgInput:      '#F4F5F0',
  bgChip:       '#EEF0EA',

  // ── Texto ───────────────────────────────────────────────────
  textPrimary:  '#1C2018',   // casi negro con tono cálido
  textSecondary:'#5C6355',   // gris verdoso
  textHint:     '#9EA896',   // gris suave

  // ── Bordes ──────────────────────────────────────────────────
  border:       '#E2E5DA',
  borderCard:   '#EAECE4',

  // ── Verde — color principal ─────────────────────────────────
  // Botones primarios, navegación, acciones principales
  primary:        '#2E7D32',   // verde bosque
  primaryMid:     '#43A047',   // verde medio (hover/pressed)
  primaryLight:   '#E8F5E9',   // fondo suave verde
  primaryBorder:  '#A5D6A7',   // borde verde suave
  primaryText:    '#1B5E20',   // texto sobre fondo verde claro

  // ── Amarillo — color secundario ─────────────────────────────
  // Notificaciones, información importante, badges informativos
  secondary:      '#F9A825',   // amarillo cálido
  secondaryMid:   '#FBC02D',
  secondaryLight: '#FFFDE7',   // fondo suave amarillo
  secondaryBorder:'#FFE082',
  secondaryText:  '#E65100',   // texto legible sobre amarillo

  // ── Naranja — terciario ─────────────────────────────────────
  // Donación, alertas moderadas, acciones secundarias urgentes
  tertiary:       '#e69e19',   // naranja profundo
  tertiaryMid:    '#FF5722',
  tertiaryLight:  '#FBE9E7',   // fondo suave naranja
  tertiaryBorder: '#FFAB91',
  tertiaryText:   '#E65100',   // texto sobre fondo naranja claro

  // ── Rojo — uso mínimo ───────────────────────────────────────
  // Solo advertencias críticas, vencimiento inminente
  danger:         '#C62828',   // rojo oscuro, sobrio
  dangerLight:    '#FFEBEE',
  dangerBorder:   '#EF9A9A',
  dangerText:     '#B71C1C',

  // ── Superficie de navegación ────────────────────────────────
  navBg:          '#FFFFFF',
  navBorder:      '#E2E5DA',
  navActive:      '#2E7D32',   // verde en ítem activo
  navInactive:    '#9EA896',

  // ── Colores adicionales para UI general ──────────────────────
  white:          '#FFFFFF',
  black:          '#000000',
  gray:           '#9EA896',
  grayLight:      '#E2E5DA',
  success:        '#43A047',   // verde exitoso
  warning:        '#F9A825',   // amarillo advertencia
};


// ─── Mapa de niveles de riesgo ────────────────────────────────
// alto     → rojo   (vencimiento inminente)
// moderado → naranja (alerta moderada)
// bajo     → verde  (estable)
// info     → amarillo (notificación general)

export const RISK = {
  alto: {
    label:  'Alto riesgo',
    color:  COLORS.danger,
    bg:     COLORS.dangerLight,
    border: COLORS.dangerBorder,
    text:   COLORS.dangerText,
  },
  moderado: {
    label:  'Moderado',
    color:  COLORS.tertiary,
    bg:     COLORS.tertiaryLight,
    border: COLORS.tertiaryBorder,
    text:   COLORS.tertiaryText,
  },
  bajo: {
    label:  'Estable',
    color:  COLORS.primary,
    bg:     COLORS.primaryLight,
    border: COLORS.primaryBorder,
    text:   COLORS.primaryText,
  },
  info: {
    label:  'Información',
    color:  COLORS.secondary,
    bg:     COLORS.secondaryLight,
    border: COLORS.secondaryBorder,
    text:   COLORS.secondaryText,
  },
};

// ─── Tipografía ───────────────────────────────────────────────
export const TYPOGRAPHY = {
  h1:    { fontSize: 26, fontWeight: '700', color: COLORS.textPrimary, letterSpacing: -0.4 },
  h2:    { fontSize: 20, fontWeight: '600', color: COLORS.textPrimary, letterSpacing: -0.3 },
  h3:    { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, letterSpacing: -0.2 },
  body:  { fontSize: 14, fontWeight: '400', color: COLORS.textPrimary, lineHeight: 21 },
  small: { fontSize: 12, fontWeight: '400', color: COLORS.textSecondary, lineHeight: 18 },
  label: { fontSize: 11, fontWeight: '600', color: COLORS.textHint, letterSpacing: 1.1,
           textTransform: 'uppercase' },
  mono:  { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
};

// ─── Espaciado ────────────────────────────────────────────────
export const SPACING = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

// ─── Radios de borde ──────────────────────────────────────────
export const RADIUS = {
  sm:   6,
  md:   10,
  lg:   16,
  xl:   24,
  pill: 99,
};

// ─── Sombras ──────────────────────────────────────────────────
export const SHADOW = {
  sm: {
    shadowColor: '#1C2018',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#1C2018',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 4,
  },
};

// ─── Estilos globales reutilizables ───────────────────────────
export const GLOBAL = StyleSheet.create({

  // Pantalla base
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Helpers de layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Header de pantalla
  header: {
    paddingTop: 52,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.bg,
  },

  // Cards
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm + 2,
    shadowColor: '#1C2018',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  // Input de búsqueda
  searchBar: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  // ── Botón primario verde ─────────────────────────────────────
  btnPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm + 6,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Botón secundario (contorno verde) ───────────────────────
  btnSecondary: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.primaryBorder,
    paddingVertical: SPACING.sm + 6,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  btnSecondaryText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Botón de donación naranja ────────────────────────────────
  btnDonate: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xs,
  },
  btnDonateText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Chips de filtro ──────────────────────────────────────────
  chip: {
    paddingVertical: 7,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bgChip,
  },
  chipActivo: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipTexto: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  chipTextoActivo: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Etiqueta de sección
  sectionLabel: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
    paddingTop: SPACING.xs,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.1,
    color: COLORS.textHint,
    textTransform: 'uppercase',
  },

  // Divisor
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
  },

  // Estado vacío
  emptyState: {
    padding: SPACING.xxl,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  emptyText: {
    color: COLORS.textHint,
    fontSize: 14,
    textAlign: 'center',
  },

  // Badge genérico
  badge: {
    paddingVertical: 3,
    paddingHorizontal: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});