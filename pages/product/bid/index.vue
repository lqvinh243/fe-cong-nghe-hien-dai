<template>
    <div class="text-center">
        <el-row :gutter="20" class="mx-auto mt-4" type="flex" style="max-width:90%">
            <el-col v-for="item in productBidding" :key="item.id" :span="6">
                <product :product="item" />
            </el-col>
        </el-row>
        <el-button v-if="showLoadMore" type="primary" style="width:10%" @click="loadMore">
            Load more
        </el-button>
        <h1 v-if="!productBidding.length">
            Không có sản phẩm nào
        </h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { productService } from '~/services/product';
export default Vue.extend({
    data: () => ({
        productBidding: [] as any,
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
        await this.getProductBidding();
    },
    methods: {
        async getProductBidding() {
            const result = await productService.findProductBid(this.pagination).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot get list favourite product!'
                });
            });
            this.productBidding = this.productBidding.concat(result.data);
            this.pagination = result.pagination;
        },

        async loadMore() {
            this.pagination.skip += this.pagination.limit;
            await this.getProductBidding();
        }
    }
});
</script>
