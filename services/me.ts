import { $axios } from '~/utils/api';

export const meService = {
    getProfile() {
        return $axios.$get('/api/v1/me');
    },

    uploadAvatar(data: any) {
        return $axios.$post('/api/v1/me/avatar', data);
    },

    updateProfile(data: any) {
        return $axios.$post('/api/v1/me', data);
    }
};
