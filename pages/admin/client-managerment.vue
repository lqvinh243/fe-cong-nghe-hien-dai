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
            style="width: 100%"
        >
            <el-table-column
                fixed
                prop="date"
                label="Date"
            />
            <el-table-column
                prop="name"
                label="Name"
            />
            <el-table-column
                prop="state"
                label="State"
            />
            <el-table-column
                prop="city"
                label="City"
            />
            <el-table-column
                prop="address"
                label="Address"
            />
            <el-table-column
                prop="zip"
                label="Zip"
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
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-03',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Home'
            }, {
                date: '2016-05-02',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Office'
            }, {
                date: '2016-05-04',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Home'
            }, {
                date: '2016-05-01',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Office'
            }],
            options: [
                { key: 1, name: 'Seller' },
                { key: 2, name: 'Bidder' },
                { key: 3, name: 'Upgrage request' }
            ],
            selectKey: '' as any,
            page: 1,
            total: 10,
            perPage: 5,
            loadingRemote: false
        };
    },
    methods: {
        handleClick() {
            console.log('click');
        },
        remoteMethod(query: string) {
            console.log(query);
        },
        handleChangePage() {
            console.log(this.page);
        },
        deleteRow(index:number, rows:any) {
            rows.splice(index, 1);
        }
    }
};
</script>
