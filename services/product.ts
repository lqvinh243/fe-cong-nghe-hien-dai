import { $axios } from '~/utils/api';

export const productService = {
    findProduct(query: string = '') {
        return $axios.$get(`/api/v1/products?${query}`);
    },

    findProductBid(data: any = {}) {
        return $axios.$get(`/api/v1/products/bidding?skip=${data.skip}&limit=${data.limit}`);
    },

    findProductByWinner() {
        return $axios.$get('/api/v1/products/win');
    },

    findProductBySeller(query: string) {
        return $axios.$get(`/api/v1/products/by-seller?${query}`);
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

    findBidderProduct(query: string = '') {
        return $axios.$get(`/api/v1/bidder-products?${query}`);
    },

    bidProduct(data: any) {
        return $axios.$post('/api/v1/bidder-products', data);
    },

    bidProductAuto(data: any) {
        return $axios.$post('/api/v1/bidder-product-autos', data);
    },

    getBiggestBidByProductIds(productIds: string[]) {
        return $axios.$post('/api/v1/bidder-products/biggest/productIds', { productIds });
    },

    blockBidProduct(id: string) {
        return $axios.$put(`/api/v1/bidder-products/${id}/block`);
    },

    createProduct(product: FormData) {
        return $axios.$post('/api/v1/products', product);
    },

    deleteProduct(id: String) {
        return $axios.$delete(`/api/v1/products/${id}`);
    },

    cancelProduct(id: string) {
        return $axios.$put(`/api/v1/products/${id}/cancel`);
    },

    uploadMultiImageProduct(productId: String, listImage: FormData) {
        return $axios.$post(`/api/v1/products/${productId}/multiple-image`, listImage);
    },

    saveProductDescription(productInfo: any) {
        return $axios.$post('/api/v1/product-descriptions', productInfo);
    },

    publicProduct(productId: string) {
        return $axios.$put(`/api/v1/products/${productId}/process`);
    },

    deleteProductDescription(id: string) {
        return $axios.$delete(`/api/v1/product-descriptions/${id}`);
    },

    addProductDescription(data: any) {
        return $axios.$post('/api/v1/product-descriptions/multiple', data);
    },

    deleteProductImage(id: string) {
        return $axios.$delete(`/api/v1/product-images/${id}`);
    },

    addProductImage(data: any) {
        return $axios.$post('/api/v1/product-images', data);
    },

    updateProduct(productId: string, data: any) {
        return $axios.$put(`/api/v1/products/${productId}`, data);
    },

    getListProductByCategory(categoryId: string) {
        return $axios.$get(`/api/v1/products?categoryId=${categoryId}&limit=5`);
    }
};
