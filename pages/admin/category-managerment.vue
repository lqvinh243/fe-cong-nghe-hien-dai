<template>
    <b-container>
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
                type="index"
                width="50"
            />
            <el-table-column
                prop="name"
                label="Name"
            />

            <el-table-column
                prop="parentName"
                label="Parent name"
            />

            <el-table-column
                fixed="right"
                label="Operations"
            >
                <template slot-scope="scope">
                    <el-button type="text" @click.native.prevent="editRow(scope.row.id)">
                        Edit
                    </el-button>
                    <el-button type="text" @click.native.prevent="deleteRow(scope.$index, tableData)">
                        Remove
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
        <el-dialog
            title="Update category"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <el-input placeholder="Please input" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
        </el-dialog>
    </b-container>
</template>

<script lang="ts">
export default {
    data() {
        return {
            tableData: [
                {
                    id: '1',
                    name: 'abc',
                    parentName: 'a'
                }
            ],
            options: [
                { key: 1, name: 'Seller' },
                { key: 2, name: 'Bidder' },
                { key: 3, name: 'Upgrage request' }
            ],
            selectKey: '',
            page: 1,
            total: 10,
            perPage: 5,
            loadingRemote: false,
            dialogVisible: false
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
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        editRow(id: string) {
            this.dialogVisible = true;
        }
    }
};
</script>
