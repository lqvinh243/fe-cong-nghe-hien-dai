<template>
    <div style="max-width: 80%; margin: 0 auto">
        <div class="text-center">
            <el-table :data="products" style="width: 100%">
                <el-table-column fixed label="Ngày Đăng">
                    <template slot-scope="scope">
                        <span>{{ formatDate(scope.row.createdAt) }}</span>
                    </template>
                </el-table-column>

                <el-table-column fixed label="Ngày Kết Thúc">
                    <template slot-scope="scope">
                        <span>{{ formatDate(scope.row.expiredAt) }}</span>
                    </template>
                </el-table-column>

                <el-table-column width="300" fixed prop="name" label="Tên Sản Phẩm" />

                <!-- <el-table-column fixed label="Trạng Thái">
                    <template slot-scope="scope">
                        {{ mapStatusProduct(scope.row.status) }}
                    </template>
                </el-table-column> -->

                <el-table-column fixed label="Giá Mua">
                    <template slot-scope="scope">
                        {{ scope.row.bidPrice }}$
                    </template>
                </el-table-column>

                <el-table-column fixed label="Hành Động" class="text-center">
                    <template slot-scope="scope">
                        <el-button
                            :disabled="scope.row.status !== 'end'"
                            round
                            style="color: white"
                            type="primary"
                            :loading="loading"
                            title="Đánh giá người bán"
                            @click="handleFeedback(scope.row)"
                        >
                            <v-icon class="format-icon">
                                {{ 'mdi mdi-comment-processing-outline' }}
                            </v-icon>
                            <!-- <img src="~/assets/images/eye-solid.svg" class="format-icon" alt=""> -->
                        </el-button>
                        <el-button
                            round
                            style="color: white"
                            type="primary"
                            :loading="loading"
                            title="Xem chi tiết"
                            @click="showProductDetail(scope.row.id)"
                        >
                            <v-icon class="format-icon">
                                {{ 'mdi mdi-eye' }}
                            </v-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="text-center mt-4">
            <el-pagination
                class="mx-auto"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="perPage"
                :current-page.sync="page"
                @current-change="handleChangePage()"
            />
        </div>
        <FeedbackProductDialog :is-feedback-seller="true" :product="product" :dialog-visible="dialogVisible" @handelCloseFeedback="handleCloseDialog" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import momment from 'moment';
import FeedbackProductDialog from '~/components/dialogs/FeedbackProductDialog.vue';
import { productService } from '~/services/product';

export default Vue.extend({
    components: { FeedbackProductDialog },
    data: () => ({
        products: [] as any,
        pagination: {
            total: 0,
            skip: 0,
            limit: 0,
        },
        dialogVisible: false,
        loading: false,
        page: 1,
        total: 10,
        perPage: 10,
        product: null as any

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
            this.products = result.data;
            this.pagination = result.pagination;
        },
        handleFeedback(product: any) {
            if (product.status === 'end') {
                this.product = product;
                this.dialogVisible = true;
            }
        },

        handleCloseDialog(formName: string) {
            switch (formName) {
            case 'feedbackForm':
                this.dialogVisible = false;
            }
        },

        mapStatusProduct(status: string) {
            switch (status) {
            case 'process':
                return 'Đang diễn ra';
            case 'end':
                return 'Đã kết thúc';
            case 'cancel':
                return 'Đã huỷ bỏ';
            default:
                return 'Chưa tiến hành';
            }
        },

        formatDate(date: any) {
            return momment(date).format('k:mm D-M-Y');
        },

        formatDateExpired(row:any) {
            const timeNow = momment(new Date());
            switch (row.status) {
            case 'process':
                return timeNow.from(row.expiredAt, true);
            default:
                return '_';
            }
        },
    }
});
</script>
