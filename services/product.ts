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
    },

    buyProduct(id: string) {
        return $axios.$post(`/api/v1/products/${id}/buy`);
    },

    bidProduct(data: any) {
        return $axios.$post('/api/v1/bidder-products', data);
    },

    bidProductAuto(data: any) {
        return $axios.$post('/api/v1/bidder-product-autos', data);
    },

    getBiggestBidByProductIds(productIds: string[]) {
        return $axios.$post('/api/v1/bidder-products/biggest/productIds', { productIds });
    }
};
