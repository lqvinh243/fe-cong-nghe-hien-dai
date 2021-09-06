<template>
    <div class="text-center">
        <el-row :gutter="20" class="mx-auto mt-4" style="max-width:80%">
            <el-col v-for="item in productFavourites" :key="item.id" :span="6">
                <product :product="item" />
            </el-col>
        </el-row>
        <el-button type="primary" style="width:10%">
            Load more
        </el-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { productFavouriteService } from '~/services/product-favourite';
export default Vue.extend({
    data: () => ({
        productFavourites: [] as any,
        pagination: {
            total: 0,
            skip: 0,
            limit: 0
        }
    }),
    async mounted() {
        await this.getProductFavourite();
    },
    methods: {
        async getProductFavourite() {
            const result = await productFavouriteService.find().catch(error => {
                this.$notify.success({
                    title: 'Success',
                    message: error.message || 'Cannot get list favourite product!'
                });
            });
            this.productFavourites = result.data;
            this.pagination = result.pagination;
        }
    }
});
</script>
