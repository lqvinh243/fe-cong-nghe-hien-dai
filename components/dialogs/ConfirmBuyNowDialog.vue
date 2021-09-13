<template>
    <el-dialog
        title="Bạn có chắc chắn mua ngay sản phẩm này!"
        :visible.sync="dialogBuyNowVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
        class="text-center"
        :close-on-press-escape="false"
    >
        <el-form>
            <h1 class="my-4">
                Giá hiện tại: {{ priceNow }}$
            </h1>
            <el-form-item label-width="auto">
                <el-button type="primary" @click="submitForm(formName)">
                    Chắn chắn
                </el-button>
                <el-button @click="resetForm(formName)">
                    Hủy
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
        priceNow: {
            type: Number,
            default: 0
        },
        dialogBuyNowVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formName: 'buyNowForm',
            bidPriceForm: {
                productId: this.productId,
            },
            async submitForm() {
                const result = await productService.buyProduct(this.productId).catch(_error => {
                    this.$notify.error({
                        title: 'Lỗi',
                        message: 'Bạn không thể mua sản phẩm này!'
                    });
                });
                if (result) {
                    this.$notify.success({
                        title: 'Thành công',
                        message: 'Chúc mừng bạn, kết quả sẽ được thông báo qua email!!'
                    });
                }
            },
            resetForm(formName: string) {
                this.$emit('handelCloseBid', formName);
            }
        };
    },
    watch: {
        productId(val: string) {
            this.bidPriceForm.productId = val;
        },
    },
    mounted() {
    },
    methods: {
    },
});
</script>
