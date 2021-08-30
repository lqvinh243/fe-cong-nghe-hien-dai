import { $axios } from '~/utils/api';

export const categoryService = {
    findCategory(query: string = '') {
        return $axios.$get(`/api/v1/categories?${query}`);
    }
};
