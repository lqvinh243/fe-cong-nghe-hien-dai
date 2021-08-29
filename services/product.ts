import { $axios } from '~/utils/api';

export const productService = {

    getTop5productNearEnd() {
        return $axios.$get('/api/v1/products?sortType=expired_asc&limit=5');
    },

    getTop5productAuctionMost() {
        return $axios.$get('/api/v1/products?sortType=auctions_desc&limit=5');
    },

    getTop5productHighPrice() {
        return $axios.$get('/api/v1/products?sortType=price_desc&limit=5');
    },

    findProduct(query: string = '') {
        return $axios.$get(`/api/v1/products?${query}`);
    }
};
