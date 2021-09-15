<template>
    <el-row type="flex">
        <el-col :span="8">
            <div class="grid-content bg-purple" />
        </el-col>

        <el-col :span="16">
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
                <el-table :data="bidderProducts" style="width: 100%">
                    <el-table-column fixed label="Thời Gian Đấu Giá">
                        <template slot-scope="scope">
                            <span>{{ formatDate(scope.row.updatedAt) }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column fixed label="Số Tiền">
                        <template slot-scope="scope">
                            <span>{{ scope.row.price }}$</span>
                        </template>
                    </el-table-column>

                    <el-table-column fixed label="Tên Người Đấu Giá">
                        <template slot-scope="scope">
                            {{ scope.row.bidder ? `${scope.row.bidder.firstName} ${scope.row.bidder.lastName}`.trim() :'_' }}
                        </template>
                    </el-table-column>

                    <el-table-column fixed label="Trạng Thái">
                        <template slot-scope="scope">
                            {{ scope.row.isBlock ? 'Đã khóa' :'_' }}
                        </template>
                    </el-table-column>
                    <el-table-column fixed label="Hành Động" class="text-center">
                        <template slot-scope="scope">
                            <el-button
                                :disabled="scope.row.isBlock"
                                round
                                style="color: white"
                                type="primary"
                                :loading="loading"
                                title="Đánh giá người thắng"
                                @click="handleBlock(scope.row.id)"
                            >
                                <v-icon class="format-icon">
                                    {{ 'mdi mdi-block-helper' }}
                                </v-icon>
                                <!-- <img src="~/assets/images/eye-solid.svg" class="format-icon" alt=""> -->
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
        </el-col>
    </el-row>
</template>

<script lang="ts">
import Vue from 'vue';
import momment from 'moment';
import { productService } from '~/services/product';

export default Vue.extend({
    data: () => ({
        bidderProducts: [] as any,
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
        productId: null as any
    }),
    async mounted() {
        this.productId = this.$route.params.id;
        await this.findBidderProduct();
    },
    methods: {
        async findBidderProduct(key: boolean | null = null) {
            if (this.productId) {
                let query = `productId=${this.productId}`;
                if (key)
                    query += `&isBlock=${key}`;

                const result = await productService.findBidderProduct(query).catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get list favourite product!'
                    });
                });
                this.bidderProducts = result.data;
                this.pagination = result.pagination;
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

        async handleBlock(id: string) {
            await this.$confirm('Hành động này sẽ không cho phép người dùng này đấu giá sản phẩm của bạn', 'Warning', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy bỏ',
                type: 'warning'
            }).then(async () => {
                const result = await productService.blockBidProduct(id).catch((error:any) => {
                    this.$notify.error({
                        type: 'Error',
                        message: error.message || 'Không thể khóa người dùng này'
                    });
                });
                if (result && result.data) {
                    const item = this.bidderProducts.find((item:any) => item.id === id);
                    if (item)
                        item.isBlock = true;

                    this.$message({
                        type: 'success',
                        message: 'Đã khóa người đấu giá'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Hủy bỏ thao tác'
                });
            });
        },

        handleCloseDialog(formName: string) {
            switch (formName) {
            case 'feedbackForm':
                this.dialogVisible = false;
            }
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
