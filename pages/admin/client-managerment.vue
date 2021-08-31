<template>
    <b-container style="min-width:80%">
        <el-select
            v-model="selectKey"
            class="w-25"
            placeholder="Please select role!"
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
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
                    <el-button v-if="selectKey == 3" type="text">
                        Accept
                    </el-button>
                    <el-button type="text" @click="handleClick">
                        Detail
                    </el-button>
                    <el-button type="text" @click.native.prevent="deleteRow(scope.$index, tableData)">
                        Edit
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
    </b-container>
</template>

<script lang="ts">
import momment from 'moment';
import { clientService } from '~/services/client';
export default {
    data() {
        return {
            tableData: [],
            options: [
                { key: '476c11d2-31cf-4a20-8392-514225ae54b2', name: 'Seller' },
                { key: '476c11d2-31cf-5a20-8392-614225ae54b3', name: 'Bidder' },
                { key: 3, name: 'Upgrage request' }
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
            if (this.selectKey !== 3)
                this.getClients(this.selectKey);
            this.$nuxt.$loading.finish();
        },
        remoteMethod(query: string) {
            console.log(query);
        },
        handleChangePage() {
            console.log(this.page);
        },
        deleteRow(index:number, rows:any) {
            rows.splice(index, 1);
        },
        async getClients(key: string = '') {
            const query = `roleId=${key}&skip=${(this.page - 1) * this.perPage}`;
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
        formatDate(date:any) {
            return momment(date).format('k:mm D-M-Y');
        }
    }
};
</script>
