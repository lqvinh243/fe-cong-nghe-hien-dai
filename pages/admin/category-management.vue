<template>
    <div style="max-width:80%;margin:0 auto;margin-top:2rem">
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
                label="Tên Danh Mục"
            />

            <el-table-column
                prop="parentName"
                label="Tên Danh Mục Cha"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.parent ?scope.row.parent.name :'_' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="Hành Động"
            >
                <template slot-scope="scope">
                    <el-button type="text" @click.native.prevent="editRow(scope.row)">
                        Chỉnh sửa
                    </el-button>
                    <el-button type="text" @click.native.prevent="deleteRow(scope.row)">
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
        <el-dialog
            title="Update category"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <el-input v-model="category.name" placeholder="Please input" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Hủy bỏ</el-button>
                <el-button type="primary" @click="handleSaveEdit">Xác nhận</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { categoryService } from '~/services/category';
export default {
    middleware: ['authentication'],
    data() {
        return {
            tableData: [
            ],
            selectKey: '',
            page: 1,
            total: 10,
            perPage: 5,
            loadingRemote: false,
            dialogVisible: false,
            category: {
                name: ''
            }
        };
    },
    async mounted() {
        await this.load();
    },
    methods: {
        async load() {
            const query = `isIgnoreParent=true&skip=${(this.page - 1) * this.perPage}&limit=${this.perPage}`;
            const result = await categoryService.findCategory(query).catch(_error => {
                this.$notify.error({ title: 'Lỗi', message: 'Không thể tải danh mục sản phẩm' });
            });
            this.tableData = result.data;
            this.total = result.pagination.total;
        },
        handleClick() {
            console.log('click');
        },
        remoteMethod(query: string) {
            console.log(query);
        },
        async  handleChangePage() {
            await this.load();
        },
        async deleteRow(category:any) {
            const result = await categoryService.delete(category.id).catch((error:any) => {
                console.log(error);
                this.$notify.error({
                    title: 'Lỗi',
                    message: error.message || 'Không thể xóa danh mục sản phẩm'
                });
            });
            if (result && result.data) {
                this.$notify.success({
                    title: 'Thành công',
                    message: 'Xóa danh mục sản phẩm thành công'
                });
                this.tableData = this.tableData.filter((data: any) => {
                    return data.id !== category.id;
                });
            }
        },
        editRow(category: any) {
            this.dialogVisible = true;
            this.category = category;
        },
        async handleSaveEdit() {
            if (this.category) {
                const result = await categoryService.update(this.category.id, { name: this.category.name }).catch(_error => {
                    this.$notify.error({
                        title: 'Lỗi',
                        message: 'Không thể cập nhật danh mục sản phẩm'
                    });
                });
                if (result && result.data) {
                    this.$notify.success({
                        title: 'Thành công',
                        message: 'Cập nhật danh mục sản phẩm thành công'
                    });
                    this.tableData = this.tableData.map((item:any) => {
                        if (item.parentId === this.category.id)
                            item.parent.name = this.category.name;

                        return item;
                    });
                    this.dialogVisible = false;
                }
            }
        }
    }
};
</script>
