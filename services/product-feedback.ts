import { $axios } from '~/utils/api';
export const productFeedbackService = {
    getByProduct(productId: string) {
        return $axios.$get(`/api/v1/product-feedbacks/product/${productId}`);
    },

    create(data: any) {
        return $axios.$post('/api/v1/product-feedbacks', data);
    },

};
