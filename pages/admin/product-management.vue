<template>
    <div style="max-width: 80%; margin: 0 auto">
        <el-select
            v-model="selectKey"
            class="w-25 my-4"
            placeholder="Please select role!"
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
            <el-table-column fixed label="Created Date">
                <template slot-scope="scope">
                    <span>{{ formatDate(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed label="Expired Date">
                <template slot-scope="scope">
                    <span>{{ formatDate(scope.row.expiredAt) }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed prop="name" label="Product Name" />

            <el-table-column fixed prop="status" label="Status" />

            <el-table-column fixed="right" label="Operations">
                <template slot-scope="scope">
                    <b-button-group size="sm">
                        <b-button squared variant="info" style="font-weight: bold; color:white" @click="handleClick">
                            Detail
                        </b-button>
                        <b-button squared variant="success" style="font-weight: bold; color:white" @click.native.prevent="editRow(scope.row.id)">
                            Edit
                        </b-button>
                        <b-button squared variant="danger" style="font-weight: bold; color:white" @click="handleClick">
                            Remove
                        </b-button>
                    </b-button-group>
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
        <el-dialog
            title="Update category"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <el-input placeholder="Please input" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button
                    type="primary"
                    @click="dialogVisible = false"
                >Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import momment from 'moment';
import { productService } from '~/services/product';
export default {
    middleware: ['authentication'],
    data() {
        return {
            tableData: [],
            options: [
                { key: 'mobile', name: 'Điện thoại di động' }, // test
                { key: 'laptop', name: 'Máy tính xách tay' }, // test
                { key: 3, name: 'Upgrage request' },
            ],
            selectKey: '' as any,
            page: 1,
            total: 10,
            perPage: 10,
            loadingRemote: false
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
            const query = `roleId=${key}&skip=${(this.page - 1) * this.perPage}`;
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
    },
};
</script>
