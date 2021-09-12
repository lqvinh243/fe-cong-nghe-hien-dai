<template>
    <el-dialog
        title="Xác Nhận"
        :visible.sync="dialogVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
        class="text-center"
        :close-on-press-escape="false"
    >
        <el-form
            :ref="formName"
            :model="removeProductForm"
            status-icon
            label-width="120px"
        >
            <h1 class="my-4">
                Bạn đang xoá sản phẩm <b>{{ productName }}</b>. Xác nhận xoá?
            </h1>

            <el-form-item label-width="auto">
                <el-button type="primary" @click="submitForm(formName)">
                    Xoá
                </el-button>
                <el-button @click="resetForm(formName)">
                    Huỷ
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import { productService } from '~/services/product';

export default Vue.extend({
    layout: 'blank',
    middleware: ['non-authentication'],
    props: {
        productId: {
            type: String,
            default: () => null
        },
        productName: {
            type: String,
            default: null,
        },
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formName: 'removeProductForm',
            removeProductForm: {
                productId: this.productId
            },
            submitForm(formName: string) {
                this.$refs[formName].validate(async (valid:boolean) => {
                    if (valid) {
                        console.log(`ID: ${this.productId}`);
                        const result = await productService.deleteProduct(this.productId + '1').catch(error => {
                            this.$notify.error({
                                title: 'Lỗi',
                                message: `Không thể xoá sản phẩm ${this.productName}. Vui lòng thử lại!` || error.message
                            });
                        });
                        if (result) {
                            this.$notify.success({
                                title: 'Xoá thành công',
                                message: `Đã xoá sản phẩm ${this.productName}!`
                            });
                            this.$emit('handelCloseRemove', formName);
                        }
                    }
                });
            },
            resetForm(formName: string) {
                this.$refs[formName].resetFields();
                this.$emit('handelCloseRemove', formName);
            }
        };
    },
    watch: {
        productId(val: string) {
            this.removeProductForm.productId = val;
        },
        productName(val:String) {
            this.removeProductForm.price = val;
        }
    },
    mounted() {
    },
    methods: {
    },
});
</script>
