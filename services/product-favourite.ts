import { $axios } from '~/utils/api';

export const productFavouriteService = {
    find() {
        return $axios.$get('/api/v1/products/favourite');
    },

    getByProductIds(data: any) {
        return $axios.$post('/api/v1/products/favourite/by-ids', data);
    },

    getByBidder(productId: string) {
        return $axios.$get(`/api/v1/product-favourites/productId/${productId}/bidder`);
    },
};
