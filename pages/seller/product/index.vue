<template>
    <div style="max-width: 80%; margin: 0 auto">
        <el-select
            v-model="selectKey"
            class="w-25 my-4"
            placeholder="Lọc theo trạng thái..."
            filterable
            remote
            reserve-keyword
            :loading="loadingRemote"
            @change="handleSelect"
        >
            <el-option
                v-for="option in options"
                :key="option.key"
                :label="option.name"
                :value="option.key"
            />
        </el-select>
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

                <el-table-column fixed label="Trạng Thái">
                    <template slot-scope="scope">
                        {{ mapStatusProduct(scope.row.status) }}
                    </template>
                </el-table-column>

                <el-table-column fixed label="Người thắng">
                    <template slot-scope="scope">
                        {{ getWinnerName(scope.row.winner) }}
                    </template>
                </el-table-column>

                <el-table-column width="240" fixed label="Hành Động" class="text-center">
                    <template slot-scope="scope">
                        <el-button
                            v-if="!['draft','process'].includes(scope.row.status)"
                            :disabled="scope.row.status !== 'end' || scope.row.isReadyCancel"
                            round
                            style="color: white"
                            type="primary"
                            :loading="loading"
                            title="Hủy bỏ giao dịch"
                            @click="handleCancelProduct(scope.row.id)"
                        >
                            <v-icon class="format-icon">
                                {{ 'mdi mdi-account-cancel' }}
                            </v-icon>
                        </el-button>
                        <el-button
                            :disabled="!['end','cancel'].includes(scope.row.status)"
                            round
                            style="color: white"
                            type="primary"
                            :loading="loading"
                            title="Đánh giá người thắng"
                            @click="handleFeedback(scope.row)"
                        >
                            <v-icon class="format-icon">
                                {{ 'mdi mdi-comment-processing-outline' }}
                            </v-icon>
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
                        <nuxt-link :to="`/seller/bid/${scope.row.id}`">
                            <el-button
                                v-if="!['draft','end','cancel'].includes(scope.row.status)"
                                round
                                style="color: white"
                                type="danger"
                                :loading="loading"
                                title="Danh sách ngươi đấu giá"
                            >
                                <v-icon class="format-icon">
                                    {{ 'mdi mdi-hammer' }}
                                </v-icon>
                            </el-button>
                        </nuxt-link>
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
        <FeedbackProductDialog :product="product" :dialog-visible="dialogVisible" @handelCloseFeedback="handleCloseDialog" />
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
            limit: 0
        },
        loading: false,
        loadingRemote: false,
        page: 1,
        total: 10,
        perPage: 10,
        options: [
            { key: 'draft', name: 'Chưa tiến hành' },
            { key: 'process', name: 'Đang diễn ra' },
            { key: 'end', name: 'Đã kết thúc' },
            { key: 'cancel', name: 'Đã huỷ bỏ' },
        ],
        selectKey: '',
        dialogVisible: false,
        product: null as any
    }),
    async mounted() {
        await this.findProductBySeller();
    },
    methods: {
        async findProductBySeller(key: string = '') {
            let query = '';
            if (key)
                query += `statuses=${key}`;

            const result = await productService.findProductBySeller(query).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot get list favourite product!'
                });
            });
            this.products = result.data;
            this.pagination = result.pagination;
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

        handleSelect() {
            this.$nuxt.$loading.start();
            this.findProductBySeller(this.selectKey);
            this.$nuxt.$loading.finish();
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

        showProductDetail(id: any) {
            this.$router.push('/create-product/' + id);
        },

        handleFeedback(product: any) {
            if (['end', 'cancel'].includes(product.status)) {
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

        async  handleCancelProduct(id: string) {
            await this.$confirm('Việc hủy bỏ sản phẩm sẽ đánh giá xấu người mua với nội dung "Người thắng không thanh toán"?', 'Cảnh báo', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy bỏ',
                type: 'warning'
            }).then(async () => {
                this.$nuxt.$loading.start();
                const result = await productService.cancelProduct(id).catch(error => {
                    this.$notify.error({
                        title: 'Lỗi',
                        message: error.message || 'Không thể hủy bỏ sản phẩm'
                    });
                });
                if (result && result.data) {
                    this.$notify.success({
                        title: 'Thành công',
                        message: 'Hủy bỏ sản phẩm thành công'
                    });
                }
            }).catch(() => {
            }); ;

            this.$nuxt.$loading.finish();
        },

        getWinnerName(winner: any) {
            return winner != null ? winner.lastName + ' ' + winner.firstName : null;
        }
    }
});
</script>
<style>
.format-icon{
    width: 15px;
    height: 15px;
}

.center{
    display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
</style>
