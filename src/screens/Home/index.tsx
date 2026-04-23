import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/MainContext';

const Home = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No user logged in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.logoutBtn}>
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
  logoutBtn: {
    marginTop: 30,
  },
});

export default Home;
