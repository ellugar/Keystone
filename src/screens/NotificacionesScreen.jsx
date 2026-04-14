import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme';

export default function NotificacionesScreen() {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      title: 'Nueva solicitud de donación',
      description: 'Un usuario solicitó donaciones de alimentos frescos',
      date: '2026-04-13',
      time: '14:30',
      read: false,
      type: 'solicitud',
    },
    {
      id: 2,
      title: 'Donación completada',
      description: 'Se completó una donación de 25 kg de alimentos',
      date: '2026-04-12',
      time: '10:15',
      read: true,
      type: 'completada',
    },
    {
      id: 3,
      title: 'Nuevo beneficiario',
      description: 'Se registró un nuevo usuario en el sistema',
      date: '2026-04-11',
      time: '09:45',
      read: true,
      type: 'beneficiario',
    },
  ]);

  const markAsRead = (id) => {
    setNotificaciones(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotificaciones(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'solicitud':
        return 'help-outline';
      case 'completada':
        return 'check-circle';
      case 'beneficiario':
        return 'person-add';
      default:
        return 'notifications';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'solicitud':
        return COLORS.warning || COLORS.secondary;
      case 'completada':
        return COLORS.success || COLORS.primary;
      case 'beneficiario':
        return COLORS.primary;
      default:
        return COLORS.gray;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgCard || '#fff'} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={styles.headerStats}>
          <Text style={styles.unreadCount}>
            {notificaciones.filter(n => !n.read).length} nuevas
          </Text>
        </View>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {notificaciones.length > 0 ? (
          notificaciones.map(notif => (
            <View
              key={notif.id}
              style={[styles.card, !notif.read && styles.cardUnread]}
            >
              <View style={styles.cardContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: getTypeColor(notif.type) + '20' },
                  ]}
                >
                  <MaterialIcons
                    name={getIcon(notif.type)}
                    size={24}
                    color={getTypeColor(notif.type)}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.title,
                      !notif.read && styles.titleUnread,
                    ]}
                  >
                    {notif.title}
                  </Text>
                  <Text style={styles.description}>{notif.description}</Text>
                  <Text style={styles.dateTime}>
                    {notif.date} - {notif.time}
                  </Text>
                </View>
              </View>

              <View style={styles.actions}>
                {!notif.read && (
                  <TouchableOpacity onPress={() => markAsRead(notif.id)}>
                    <MaterialIcons
                      name="done"
                      size={20}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => deleteNotification(notif.id)}>
                  <MaterialIcons
                    name="close"
                    size={20}
                    color={COLORS.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="notifications-off"
              size={64}
              color={COLORS.gray}
            />
            <Text style={styles.emptyText}>No hay notificaciones</Text>
          </View>
        )}
      </ScrollView>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary || COLORS.black,
  },
  headerStats: {
    backgroundColor: (COLORS.primary || '#2E7D32') + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  list: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.bgCard || COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border || COLORS.gray + '30',
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardUnread: {
    backgroundColor: (COLORS.primary || '#2E7D32') + '05',
    borderColor: (COLORS.primary || '#2E7D32') + '30',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.md,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary || COLORS.black,
    marginBottom: SPACING.xs,
  },
  titleUnread: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary || COLORS.gray,
    marginBottom: SPACING.xs,
  },
  dateTime: {
    fontSize: 11,
    color: COLORS.textHint || COLORS.gray,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.md,
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
});
