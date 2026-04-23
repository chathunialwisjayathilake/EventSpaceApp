import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import theme from '../../theme';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { fetchUsers, deleteUser as deleteUserApi } from '../../api/userService';

export default function AdminUsersScreen() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [apiError, setApiError] = useState('');

  const load = useCallback(async () => {
    try {
      setRefreshing(true);
      setApiError('');
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setApiError(err.message || 'Failed to load users.');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onDelete = (target) => {
    if (target.role === 'admin') return;
    if (String(target._id) === String(currentUser?._id)) return;

    Alert.alert(
      'Delete user',
      `Remove ${target.name} (${target.email})? Their bookings and reviews will be deleted. This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUserApi(target._id);
              setUsers((list) => list.filter((u) => u._id !== target._id));
            } catch (err) {
              setApiError(err.message || 'Failed to delete user.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const isSelf = String(item._id) === String(currentUser?._id);
    const isAdmin = item.role === 'admin';
    const canDelete = !isAdmin && !isSelf;

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            {item.phone ? <Text style={styles.phone}>{item.phone}</Text> : null}
          </View>
          {canDelete ? (
            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item)}>
              <Ionicons name="trash-outline" size={18} color={theme.colors.danger} />
            </TouchableOpacity>
          ) : (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {isSelf ? 'You' : isAdmin ? 'Admin' : ''}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.meta}>
          Role: <Text style={styles.metaStrong}>{item.role}</Text>
          {item.createdAt ? (
            <>
              {' · '}
              Joined{' '}
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </>
          ) : null}
        </Text>
      </View>
    );
  };

  const listPadBottom = theme.spacing.lg + theme.spacing.md;

  return (
    <ScreenContainer>
      <FlatList
        style={styles.list}
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, { paddingBottom: listPadBottom }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
        ListHeaderComponent={
          apiError ? (
            <View style={styles.errorBanner}>
              <Ionicons name="close-circle" size={16} color="#fff" />
              <Text style={styles.bannerText}>{apiError}</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="people-outline" size={48} color={theme.colors.border} />
            <Text style={styles.empty}>No users found.</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  listContent: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userName: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  userEmail: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    marginTop: 2,
  },
  phone: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    marginTop: 2,
  },
  deleteBtn: {
    padding: 6,
    borderRadius: theme.radius.sm,
    backgroundColor: `${theme.colors.danger}12`,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.border + '44',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.muted,
    textTransform: 'uppercase',
  },
  meta: {
    ...theme.typography.caption,
    color: theme.colors.muted,
  },
  metaStrong: {
    color: theme.colors.text,
    fontWeight: '600',
  },
  emptyWrap: {
    alignItems: 'center',
    marginTop: 80,
  },
  empty: {
    textAlign: 'center',
    color: theme.colors.muted,
    marginTop: theme.spacing.sm,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.danger,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  bannerText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
    flex: 1,
  },
});
