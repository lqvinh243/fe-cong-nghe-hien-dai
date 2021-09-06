import { $axios } from '~/utils/api';

export const productFavouriteService = {
    find() {
        return $axios.$get('/api/v1/products/favourite');
    },
    getByBidder(productId: string) {
        return $axios.$get(`/api/v1/product-favourites/productId/${productId}/bidder`);
    },
};
