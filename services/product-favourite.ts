import { $axios } from '~/utils/api';

export const productFavouriteService = {
    find(data: any = {}) {
        return $axios.$get(`/api/v1/products/favourite?skip=${data.skip}&limit=${data.limit}`);
    },

    getByProductIds(data: any) {
        return $axios.$post('/api/v1/products/favourite/by-ids', data);
    },

    getByBidder(productId: string) {
        return $axios.$get(`/api/v1/product-favourites/productId/${productId}/bidder`);
    },
};
