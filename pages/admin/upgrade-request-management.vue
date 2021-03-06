<template>
    <div style="max-width:80%;margin:0 auto">
        <el-select
            v-model="selectKey"
            class="w-25 my-4"
            placeholder="Please select status!"
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
            align="center"
        >
            <el-table-column
                fixed
                label="Ngày yêu cầu"
            >
                <template slot-scope="scope">
                    <span>{{ formatDate(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed
                label="Địa chỉ Email"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.bidder.email }}</span>
                </template>
            </el-table-column>

            <el-table-column
                fixed
                label="Họ"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.bidder.lastName }}</span>
                </template>
            </el-table-column>

            <el-table-column
                fixed
                label="Tên"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.bidder.firstName }}</span>
                </template>
            </el-table-column>

            <el-table-column
                fixed
                label="Địa Chỉ"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.bidder.address }}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed
                label="Trạng Thái"
            >
                <template slot-scope="scope">
                    <span>{{ mapStatusDisplay(scope.row.status) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="Hành Động"
                align="center"
            >
                <template slot-scope="scope">
                    <el-button :disabled="scope.row.status === 'accepted'" type="primary" @click="handleAccepted(scope.row.id)">
                        Đồng Ý
                    </el-button>
                    <!-- <el-button type="text" @click="handleViewProfile">
                        Detail
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>
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
import { upgradeRequestService } from '~/services/upgrade-request';
export default {
    middleware: ['authentication'],
    data() {
        return {
            tableData: [],
            options: [
                { key: 'pending', name: 'Đang chờ duyệt' },
                { key: 'accepted', name: 'Đã duyệt' },
                { key: 'rejected', name: 'Đã từ chối' }
            ],
            selectKey: '' as any,
            page: 1,
            total: 10,
            perPage: 10,
            loadingRemote: false
        };
    },
    head: {
        title: 'Quản lí nâng cấp'
    },
    mounted() {
        this.$nextTick(async () => {
            this.$nuxt.$loading.start();
            this.selectKey = this.options[0].key;
            await this.getUpgradeRequest(this.selectKey);
            this.$nuxt.$loading.finish();
        });
    },
    methods: {
        handleClick() {
            console.log('click');
        },
        handleSelect() {
            this.$nuxt.$loading.start();
            this.getUpgradeRequest(this.selectKey);
            this.$nuxt.$loading.finish();
        },
        handleChangePage() {
            console.log(this.page);
        },
        async getUpgradeRequest(key: string = '') {
            const query = `statuses=${key}&skip=${(this.page - 1) * this.perPage}&limit=${this.perPage}`;
            const result = await upgradeRequestService.find(query).catch(error => {
                this.$notify.error({
                    title: 'Lỗi',
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
        },
        async  handleAccepted(id: string) {
            const result = await upgradeRequestService.update(id, { status: 'accepted' }).catch(error => {
                this.$notify.error({
                    title: 'Lỗi',
                    message: error.message || 'Không thể nâng cấp người mua thành người bán!'
                });
            });
            if (result && result.data) {
                this.$notify.success({
                    title: 'Thành công',
                    message: 'Nâng cấp người mua thành người bán thành công!'
                });
                const item = this.tableData.find((data:any) => data.id === id);
                if (item)
                    item.status = 'accepted';
            }
        },
        mapStatusDisplay(status: string) {
            switch (status) {
            case 'pending':
                return 'Đang chờ duyệt';
            case 'accepted':
                return 'Đã duyệt';
            case 'rejected':
                return 'Đã từ chối';
            }
        }
    }
};
</script>
