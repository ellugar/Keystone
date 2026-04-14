import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme';

export default function DonacionesScreen() {
  const [donaciones, setDonaciones] = useState([
    {
      id: 1,
      title: 'Alimentos frescos',
      description: 'Buscamos frutas y verduras frescas',
      urgency: 'alta',
      quantity: 'Ilimitado',
      date: '2026-04-13',
    },
    {
      id: 2,
      title: 'Productos lácteos',
      description: 'Leche, queso y yogur',
      urgency: 'media',
      quantity: '50 kg',
      date: '2026-04-12',
    },
    {
      id: 3,
      title: 'Alimentos no perecederos',
      description: 'Arroz, pasta, enlatados',
      urgency: 'baja',
      quantity: '100 kg',
      date: '2026-04-10',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    urgency: 'media',
    quantity: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      alert('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newDonacion = {
        id: donaciones.length + 1,
        title: formData.title,
        description: formData.description,
        urgency: formData.urgency,
        quantity: formData.quantity,
        date: new Date().toISOString().split('T')[0],
      };

      setDonaciones(prev => [newDonacion, ...prev]);
      setFormData({ title: '', description: '', urgency: 'media', quantity: '' });
      setModalVisible(false);
    } catch (error) {
      alert('Error al crear la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'alta':
        return COLORS.danger;
      case 'media':
        return COLORS.warning || COLORS.secondary;
      case 'baja':
        return COLORS.success || COLORS.primary;
      default:
        return COLORS.gray;
    }
  };

  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'alta':
        return 'URGENTE';
      case 'media':
        return 'NORMAL';
      case 'baja':
        return 'PLANIFICADO';
      default:
        return 'SIN URGENCIA';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgCard || '#fff'} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Solicitudes de Donaciones</Text>
          <Text style={styles.headerSubtitle}>
            {donaciones.length} solicitudes activas
          </Text>
        </View>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {donaciones.length > 0 ? (
          donaciones.map(donacion => (
            <View key={donacion.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{donacion.title}</Text>
                <View
                  style={[
                    styles.urgencyBadge,
                    { backgroundColor: getUrgencyColor(donacion.urgency) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.urgencyText,
                      { color: getUrgencyColor(donacion.urgency) },
                    ]}
                  >
                    {getUrgencyLabel(donacion.urgency)}
                  </Text>
                </View>
              </View>

              <Text style={styles.cardDescription}>{donacion.description}</Text>

              <View style={styles.cardDetails}>
                <View style={styles.detailItem}>
                  <MaterialIcons
                    name="inventory-2"
                    size={16}
                    color={COLORS.textHint || COLORS.gray}
                  />
                  <Text style={styles.detailText}>
                    Cantidad: {donacion.quantity}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="calendar-today" size={16} color={COLORS.textHint || COLORS.gray} />
                  <Text style={styles.detailText}>{donacion.date}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>Ver detalles</Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={16}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="request-quote"
              size={64}
              color={COLORS.gray}
            />
            <Text style={styles.emptyText}>
              No hay solicitudes de donaciones
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nueva Solicitud</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={COLORS.textPrimary || COLORS.black} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <Text style={styles.label}>Tipo de alimento</Text>
              <TextInput
                style={styles.input}
                placeholder="ej. Alimentos frescos"
                placeholderTextColor={COLORS.gray}
                value={formData.title}
                onChangeText={value => handleInputChange('title', value)}
              />

              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe qué alimentos necesitas"
                placeholderTextColor={COLORS.gray}
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={value =>
                  handleInputChange('description', value)
                }
              />

              <Text style={styles.label}>Cantidad estimada</Text>
              <TextInput
                style={styles.input}
                placeholder="ej. 50 kg"
                placeholderTextColor={COLORS.gray}
                value={formData.quantity}
                onChangeText={value => handleInputChange('quantity', value)}
              />

              <Text style={styles.label}>Nivel de urgencia</Text>
              <View style={styles.urgencyButtons}>
                {['baja', 'media', 'alta'].map(level => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.urgencyButton,
                      formData.urgency === level &&
                        styles.urgencyButtonActive,
                    ]}
                    onPress={() => handleInputChange('urgency', level)}
                  >
                    <Text
                      style={[
                        styles.urgencyButtonText,
                        formData.urgency === level &&
                          styles.urgencyButtonTextActive,
                      ]}
                    >
                      {getUrgencyLabel(level)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.submitButtonText}>Crear solicitud</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgCard || COLORS.white,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary || COLORS.black,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary || COLORS.gray,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.bgCard || COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border || COLORS.gray + '30',
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary || COLORS.black,
    flex: 1,
  },
  urgencyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  urgencyText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardDescription: {
    fontSize: 13,
    color: COLORS.textSecondary || COLORS.gray,
    marginBottom: SPACING.md,
    lineHeight: 18,
  },
  cardDetails: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  detailText: {
    fontSize: 12,
    color: COLORS.textHint || COLORS.gray,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary || COLORS.gray,
    marginTop: SPACING.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.bgCard || COLORS.white,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingTop: SPACING.lg,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border || COLORS.gray + '20',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary || COLORS.black,
  },
  modalForm: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary || COLORS.black,
    marginBottom: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border || COLORS.gray + '30',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
    fontSize: 14,
    color: COLORS.textPrimary || COLORS.black,
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: SPACING.md,
  },
  urgencyButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  urgencyButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border || COLORS.gray + '30',
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  urgencyButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  urgencyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary || COLORS.gray,
  },
  urgencyButtonTextActive: {
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
