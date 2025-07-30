import { api } from '@/modules/shared/services/api';
import { UserResponse, UpdateUserRequest, UpdateAddressRequest } from '../types/user.types';

export const userService = {
  async getMyProfile(): Promise<UserResponse> {
    const { data } = await api.get<UserResponse>('/users/profile/complete');
    return data;
  },

  async updateProfile(userData: UpdateUserRequest): Promise<UserResponse> {
    const { data } = await api.put<UserResponse>('/users/profile', userData);
    return data;
  },

  async updateAddress(addressData: UpdateAddressRequest): Promise<UserResponse> {
    const { data } = await api.put<UserResponse>('/users/address', addressData);
    return data;
  }
};