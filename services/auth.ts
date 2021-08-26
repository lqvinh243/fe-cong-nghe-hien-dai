import { $axios } from '~/utils/api';

export const authService = {
    authenticate(token: string) {
        return $axios.$post('/api/v1/auths', { token });
    },

    login(email: string, password: string) {
        return $axios.$post('/api/v1/auths/login', { email, password });
    }
};
