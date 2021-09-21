<template>
    <div class="text-center">
        <el-row :gutter="20" class="mx-auto mt-4" style="max-width:80%">
            <el-col v-for="item in productFavourites" :key="item.id" :span="6">
                <product :product="item" />
            </el-col>
        </el-row>
        <el-button v-if="showLoadMore" type="primary" style="width:10%" @click="loadMore">
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
            limit: 1
        }
    }),
    computed: {
        showLoadMore() {
            return this.pagination.total > this.pagination.skip + this.pagination.limit;
        }
    },
    async mounted() {
        await this.getProductFavourite();
    },
    methods: {
        async getProductFavourite() {
            const result = await productFavouriteService.find(this.pagination).catch(error => {
                this.$notify.success({
                    title: 'Success',
                    message: error.message || 'Cannot get list favourite product!'
                });
            });
            this.productFavourites = this.productFavourites.concat(result.data);
            this.pagination = result.pagination;
        },

        async loadMore() {
            this.pagination.skip += this.pagination.limit;
            await this.getProductFavourite();
        }
    }
});
</script>
