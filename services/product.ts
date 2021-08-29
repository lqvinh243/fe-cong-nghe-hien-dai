import { $axios } from '~/utils/api';

export const productService = {
    findProduct(query: string = '') {
        return $axios.$get(`/api/v1/products?${query}`);
    }
};
