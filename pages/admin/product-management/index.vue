<template>
    <div style="max-width: 80%; margin: 0 auto">
        <el-select
            v-model="selectKey"
            class="w-25 my-4"
            placeholder="Sắp xếp theo loại..."
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loadingRemote"
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

            <el-table-column fixed prop="status" label="Trạng Thái" />

            <el-table-column fixed="right" label="Hành Động">
                <template slot-scope="scope">
                    <el-button
                        round
                        style="color: white"
                        type="primary"
                        :loading="loading"
                        @click="showProductDetail(scope.row.id)"
                    >
                        Xem
                    </el-button>
                    <el-button
                        round
                        style="color: white"
                        type="danger"
                        :loading="loading"
                        @click="handleRemoveProduct(scope.row.id, scope.row.name)"
                    >
                        Xóa
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
            :product-name="productName"
            :dialog-visible="dialogRemoveVisible"
            @handelCloseRemove="closeRemoveDialog"
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
                { key: '48ebda38-8820-45dd-bf2b-968772738735', name: 'Điện tử' },
                { key: 2, name: 'Upgrage request' },
            ],
            selectKey: '' as any,
            page: 1,
            total: 10,
            perPage: 10,
            loadingRemote: false,
            dialogRemoveVisible: false,
            loading: false,
            productId: null as string | null,
            productName: null as string | null,
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
        showProductDetail(idProduct: Object) {
            this.$router.push(`/admin/product-management/${idProduct}`);
        },
        handleRemoveProduct(idProduct: Object, nameProduct: String) {
            console.log('THAT ID: ' + idProduct);
            this.productId = idProduct;
            this.productName = nameProduct;
            this.dialogRemoveVisible = true;
        },
        closeRemoveDialog(formName: string) {
            if (formName === 'removeProductForm') this.dialogRemoveVisible = false;
        },
    },
});
</script>
