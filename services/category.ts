import { $axios } from '~/utils/api';

export const categoryService = {
    findCategory(query: string = '') {
        return $axios.$get(`/api/v1/categories?${query}`);
    },

    update(id: string, data: any) {
        return $axios.$put(`/api/v1/categories/${id}`, data);
    },

    delete(id: string) {
        return $axios.$delete(`/api/v1/categories/${id}`);
    }
};
