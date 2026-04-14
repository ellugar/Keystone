import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('usuario');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const { login, register, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async () => {
    try {
      if (!formData.email || !formData.password) {
        setError('Email y contraseña son requeridos');
        return;
      }

      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.name) {
          setError('El nombre es requerido');
          return;
        }

        await register(
          {
            name: formData.name,
            email: formData.email,
            type: userType,
            phone: formData.phone,
            address: formData.address,
          },
          formData.password
        );
      }
    } catch (err) {
      setError(err.message || 'Error en la operación');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Keystone</Text>
        <Text style={styles.subtitle}>
          {isLogin ? 'Inicia sesión' : 'Crea tu cuenta'}
        </Text>
      </View>

      {!isLogin && (
        <View style={styles.typeSelector}>
          <Text style={styles.label}>Tipo de cuenta:</Text>
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                userType === 'usuario' && styles.typeButtonActive,
              ]}
              onPress={() => setUserType('usuario')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  userType === 'usuario' && styles.typeButtonTextActive,
                ]}
              >
                Usuario
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                userType === 'organizacion' && styles.typeButtonActive,
              ]}
              onPress={() => setUserType('organizacion')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  userType === 'organizacion' && styles.typeButtonTextActive,
                ]}
              >
                Organización
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.form}>
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={COLORS.gray}
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.gray}
          keyboardType="email-address"
          value={formData.email}
          onChangeText={value => handleInputChange('email', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={COLORS.gray}
          secureTextEntry
          value={formData.password}
          onChangeText={value => handleInputChange('password', value)}
        />

        {!isLogin && userType === 'organizacion' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor={COLORS.gray}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={value => handleInputChange('phone', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              placeholderTextColor={COLORS.gray}
              value={formData.address}
              onChangeText={value => handleInputChange('address', value)}
            />
          </>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>
              {isLogin ? 'Iniciar sesión' : 'Registrarse'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        </Text>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.footerLink}>
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgCard || COLORS.white,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl + 20,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary || COLORS.gray,
  },
  typeSelector: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary || COLORS.black,
    marginBottom: SPACING.sm,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.gray,
    alignItems: 'center',
  },
  typeButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
  typeButtonTextActive: {
    color: COLORS.white,
  },
  form: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border || COLORS.gray,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: 14,
    color: COLORS.textPrimary || COLORS.black,
  },
  error: {
    color: COLORS.danger,
    fontSize: 12,
    marginBottom: SPACING.md,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary || COLORS.gray,
    marginBottom: SPACING.sm,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
