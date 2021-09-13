<template>
    <div class="text-center">
        <el-row :gutter="20" class="mx-auto mt-4" style="max-width:80%">
            <el-col v-for="item in productWin" :key="item.id" :span="6">
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
import { productService } from '~/services/product';
export default Vue.extend({
    data: () => ({
        productWin: [] as any,
        pagination: {
            total: 0,
            skip: 0,
            limit: 0
        }
    }),
    async mounted() {
        await this.findProductByWinner();
    },
    methods: {
        async findProductByWinner() {
            const result = await productService.findProductByWinner().catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot get list favourite product!'
                });
            });
            this.productWin = result.data;
            this.pagination = result.pagination;
        }
    }
});
</script>
