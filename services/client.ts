import { $axios } from '~/utils/api';

export const clientService = {
    getClients(query: string) {
        return $axios.$get(`/api/v1/clients?${query}`);
    },

};
