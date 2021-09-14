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
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed label="Ngày Lên Sàn">
                <template slot-scope="scope">
                    <span>{{ formatDate(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed label="Ngày Hết Hạn">
                <template slot-scope="scope">
                    <span>{{ formatDate(scope.row.expiredAt) }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed prop="name" label="Tên Sản Phẩm" />

            <el-table-column fixed label="Trạng Thái">
                <template slot-scope="scope">
                    {{ mapStatusProduct(scope.row.status) }}
                </template>
            </el-table-column>
            <el-table-column fixed label="Hành Động">
                <template slot-scope="scope">
                    <el-button
                        round
                        style="color: white"
                        type="primary"
                        :loading="loading"
                        title="Xem chi tiết"
                        @click="showProductDetail(scope.row.id)"
                    >
                        <img src="~/assets/images/eye-solid.svg" class="format-icon" alt="">
                    </el-button>
                    <el-button
                        round
                        style="color: white"
                        type="danger"
                        :loading="loading"
                        title="Xoá sản phẩm"
                        @click="handleRemoveProduct(scope.row.id, scope.row.name, scope.row.url)"
                    >
                        <img src="~/assets/images/trash-alt-solid.svg" class="format-icon" alt="">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
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
        <DialogBidPrice
            :product-id="productId"
            :product-info="productInfo"
            :dialog-visible="dialogRemoveVisible"
            @handelCloseRemove="closeRemoveDialog"
            @handleRefreshData="refreshData"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import momment from 'moment';
import DialogBidPrice from '~/components/dialogs/RemoveProductDialog.vue';
import { productService } from '~/services/product';

export default Vue.extend({
    components: { DialogBidPrice },
    middleware: ['authentication'],
    data() {
        return {
            tableData: [],
            options: [
                { key: 'draft', name: 'Chưa tiến hành' },
                { key: 'process', name: 'Đang diễn ra' },
                { key: 'end', name: 'Đã kết thúc' },
                { key: 'cancel', name: 'Đã huỷ bỏ' },
            ],
            selectKey: '' as any,
            page: 1,
            total: 10,
            perPage: 10,
            loadingRemote: false,
            dialogRemoveVisible: false,
            loading: false,
            productId: null as string | null,
            productInfo: {}
        };
    },
    mounted() {
        this.$nextTick(async () => {
            this.$nuxt.$loading.start();
            await this.getProducts();
            this.$nuxt.$loading.finish();
        });
    },
    methods: {
        handleClick() {
            console.log('click');
        },
        handleSelect() {
            this.$nuxt.$loading.start();
            if (this.selectKey !== 3) this.getProducts(this.selectKey);
            this.$nuxt.$loading.finish();
        },
        remoteMethod(query: string) {
            console.log(query);
        },
        handleChangePage() {
            console.log(this.page);
        },
        deleteRow(index: number, rows: any) {
            rows.splice(index, 1);
        },
        editRow(id: string) {
            console.log(id);
            this.dialogVisible = true;
        },
        async getProducts(key: string = '') {
            const query = `categoryId=${key}&skip=${(this.page - 1) * this.perPage}`;
            const result = await productService.findProduct(query).catch((error) => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot get client!',
                });
            });
            if (result) {
                this.total = result.pagination.total;
                this.tableData = result.data;
            }
        },
        formatDate(date: any) {
            return momment(date).format('k:mm D-M-Y');
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
        showProductDetail(idProduct: Object) {
            this.$router.push(`/admin/product-management/${idProduct}`);
        },
        handleRemoveProduct(idProduct: Object, nameProduct: String, imgProduct: String) {
            this.productId = idProduct;
            this.productInfo.name = nameProduct;
            this.productInfo.img = imgProduct;
            this.dialogRemoveVisible = true;
        },
        closeRemoveDialog(formName: string) {
            if (formName === 'removeProductForm') this.dialogRemoveVisible = false;
        },
        refreshData(productId: string) {
            this.tableData = this.tableData.filter((data: any) => {
                return data.id !== productId;
            });
        }
    },
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
