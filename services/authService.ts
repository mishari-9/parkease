// ============================================
// Authentication Service
// ============================================

import apiClient from './api';
import { Endpoints } from '../constants/api';
import { AuthResponse, User } from '../types';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '../store/authStore';

export const authService = {
  /**
   * Register new user
   */
  register: async (fullName: string, email: string, phone: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post(Endpoints.AUTH_REGISTER, {
        fullName,
        email,
        phone,
        password,
      });

      const { user, accessToken, refreshToken } = response.data;

      // Save tokens
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);

      // Update store
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setTokens(accessToken, refreshToken);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login user
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post(Endpoints.AUTH_LOGIN, {
        email,
        password,
      });

      const { user, accessToken, refreshToken } = response.data;

      // Save tokens
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);

      // Update store
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setTokens(accessToken, refreshToken);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post(Endpoints.AUTH_LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens and auth state
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      useAuthStore.getState().clearAuth();
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get(Endpoints.USERS_ME);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Refresh tokens
   */
  refreshTokens: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
    try {
      const response = await apiClient.post(Endpoints.AUTH_REFRESH, {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
