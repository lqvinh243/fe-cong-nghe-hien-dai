<template>
    <div style="max-width:80%;margin:0 auto">
        <el-select
            v-model="selectKey"
            class="w-25 my-4"
            placeholder="Please select role!"
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
        <el-table
            :data="tableData"
            :lazy="true"
            style="width: 100%"
        >
            <el-table-column
                fixed
                label="Date created"
            >
                <template slot-scope="scope">
                    <span>{{ formatDate(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed
                prop="email"
                label="Email"
            />
            <el-table-column
                fixed
                prop="firstName"
                label="First Name"
            />
            <el-table-column
                fixed
                prop="lastName"
                label="Last Name"
            />
            <el-table-column
                fixed
                prop="address"
                label="Address"
            />
            <el-table-column
                fixed="right"
                label="Operations"
            >
                <template slot-scope="scope">
                    <!-- <el-button v-if="selectKey == 3" type="text">
                        Accept
                    </el-button>
                    <el-button type="text" @click="handleClick">
                        Detail
                    </el-button>
                    <el-button type="text" @click.native.prevent="deleteRow(scope.$index, tableData)">
                        Edit
                    </el-button> -->
                    <el-button
                        round
                        style="color:white"
                        type="danger"
                        title="Xoá sản phẩm"
                        @click="handleShowRemoveUser(scope.row)"
                    >
                        Xóa
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="text-center">
            <v-dialog
                v-model="dialog"
                width="500"
            >
                <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                        Xác nhận
                    </v-card-title>
                    <v-card-text>
                        <h3>Bạn có muốn xóa user <span style="color:red; font-weight: bold;"> {{ labelShowDeleteName }} </span> ?</h3>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                        <v-spacer />
                        <el-button type="primary" style="color: white" @click="handleClosePopupRemoveUser(true)">
                            Xóa
                        </el-button>
                        <el-button
                            type="primary"
                            style="color: white"
                            text
                            @click="handleClosePopupRemoveUser(false)"
                        >
                            Hủy
                        </el-button>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <div class="text-center mt-4">
            <el-pagination
                class="mx-auto mt-2"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="perPage"
                :current-page.sync="page"
                @current-change="handleChangePage()"
            />
        </div>
    </div>
</template>

<script lang="ts">
import momment from 'moment';
import { clientService } from '~/services/client';
import { meService } from '~/services/me';

export default {
    middleware: ['authentication'],
    data() {
        return {
            tableData: [],
            options: [
                { key: '476c11d2-31cf-4a20-8392-514225ae54b2', name: 'Seller' },
                { key: '476c11d2-31cf-5a20-8392-614225ae54b3', name: 'Bidder' }
            ],
            selectKey: '' as any,
            page: 1,
            total: 10,
            perPage: 4,
            loadingRemote: false,
            dialog: false,
            dataUserInfoDelete: null,
            labelShowDeleteName: null
        };
    },
    mounted() {
        this.$nextTick(async () => {
            this.$nuxt.$loading.start();
            await this.getClients();
            this.$nuxt.$loading.finish();
        });
    },
    methods: {
        handleClick() {
            console.log('click');
        },
        handleSelect() {
            this.$nuxt.$loading.start();
            this.getClients(this.selectKey);
            this.$nuxt.$loading.finish();
        },
        async handleChangePage() {
            this.$nuxt.$loading.start();
            await this.getClients();
            this.$nuxt.$loading.finish();
        },
        deleteRow(index:number, rows:any) {
            rows.splice(index, 1);
        },
        async getClients(key: string = '') {
            const query = `roleId=${key}&skip=${(this.page - 1) * this.perPage}&limit=${this.perPage}`;
            const result = await clientService.getClients(query).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot get client!'
                });
            });
            if (result) {
                this.total = result.pagination.total;
                this.tableData = result.data;
            }
        },

        async handleClosePopupRemoveUser(isSave: Boolean) {
            this.dialog = false;
            if (isSave) {
                const result = await meService.deleteUserOperation(this.dataUserInfoDelete.id)
                    .catch(error => {
                        this.$notify.error({
                            title: 'Error',
                            message: error.message || 'Cannot delete user!'
                        });
                    });
                if (result && result.data) {
                    this.$notify.success({
                        title: 'Thành công',
                        message: 'Xóa danh hình ảnh thành công'
                    });
                    this.getClients();
                }
            }
        },

        handleShowRemoveUser(info: Object) {
            this.dataUserInfoDelete = info;
            this.labelShowDeleteName = `${this.dataUserInfoDelete.firstName} ${this.dataUserInfoDelete.lastName}`;
            this.dialog = true;
        },

        formatDate(date:any) {
            return momment(date).format('k:mm D-M-Y');
        }
    }
};
</script>
