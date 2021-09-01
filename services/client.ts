import { $axios } from '~/utils/api';

export const clientService = {
    getClients(query: string) {
        return $axios.$get(`/api/v1/clients?${query}`);
    },
    register(data: any) {
        return $axios.$post('/api/v1/clients/register', data);
    }
};
