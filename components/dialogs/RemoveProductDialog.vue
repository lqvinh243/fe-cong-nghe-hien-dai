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
            :rules="rules"
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
            default: () => null,
        },
        productName: {
            type: String,
            default: null,
        },
        dialogVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            formName: 'removeProductForm',
            removeProductForm: {
                productId: this.productId,
            },
            submitForm(formName: string) {
                this.$refs[formName].validate(async (valid: boolean) => {
                    if (valid) {
                        const result = await productService
                            .bidProduct(this.removeProductForm)
                            .catch((error) => {
                                this.$notify.error({
                                    title: 'Error',
                                    message: error.message || 'Cannot remove product!',
                                });
                            });
                        if (result) {
                            this.$notify.success({
                                title: 'Success',
                                message: 'Remove product successfully!',
                            });
                            this.$emit('handelCloseRemove', formName);
                        }
                    }
                });
            },
            resetForm(formName: string) {
                this.$refs[formName].resetFields();
                this.$emit('handelCloseRemove', formName);
            },
        };
    },
    watch: {
        productId(val: string) {
            this.removeProductForm.productId = val;
        },
    },
    mounted() {},
    methods: {},
});
</script>
