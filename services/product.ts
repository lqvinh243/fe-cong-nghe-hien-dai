import { $axios } from '~/utils/api';

export const productService = {
    findProduct(query: string = '') {
        return $axios.$get(`/api/v1/products?${query}`);
    },

    getProductDetailById(query: string = '') {
        return $axios.$get(`/api/v1/products/${query}`);
    },

    favouriteProduct(id: string) {
        return $axios.$post(`/api/v1/products/${id}/favourite`);
    }
};
