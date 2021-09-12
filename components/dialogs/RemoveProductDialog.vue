<template>
    <el-dialog
        title="Xác nhận xoá sản phẩm"
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
            <h1 class="my-2">
                <b>{{ productInfo.name }}</b>
            </h1>
            <h1 class="my-2">
                <img :src="productInfo.img" class="format-image" alt="product image">
            </h1>
            <el-form-item label-width="auto">
                <el-button type="danger" class="text-white" @click="submitForm(formName)">
                    Xoá
                </el-button>
                <el-button type="success" class="text-white" @click="resetForm(formName)">
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
        productInfo: {
            type: Object,
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
                        const result = await productService.deleteProduct(this.productId).catch(error => {
                            this.$notify.error({
                                title: 'Lỗi',
                                message: `Không thể xoá sản phẩm ${this.productInfo.name}. Vui lòng thử lại!` || error.message
                            });
                        });
                        if (result) {
                            this.$notify.success({
                                title: 'Xoá thành công',
                                message: `Đã xoá sản phẩm ${this.productInfo.name}!`
                            });
                            this.$emit('handelCloseRemove', formName);
                            this.$emit('handleRefreshData', this.productId);
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

<style lang='css'>
.text-white {
    color: white;
    font-weight: bold;
}

.format-image{
    width: 300px;
}
</style>

