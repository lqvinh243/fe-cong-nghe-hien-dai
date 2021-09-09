import { $axios } from '~/utils/api';

export const upgradeRequestService = {
    find(query: string) {
        return $axios.$get(`/api/v1/upgrade-requests?${query}`);
    },

    check() {
        return $axios.$get('/api/v1/upgrade-requests/check');
    },

    create() {
        return $axios.$post('/api/v1/upgrade-requests');
    },

    update(id: string, data: any) {
        return $axios.$put(`/api/v1/upgrade-requests/${id}`, data);
    }
};
