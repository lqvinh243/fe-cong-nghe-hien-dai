<template>
    <el-dialog
        :title="isReady === false ? 'Đánh giá' :'Bạn đã đánh giá người dùng này'"
        :visible.sync="dialogVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
        class="text-center"
        :close-on-press-escape="false"
    >
        <el-form
            :ref="formName"
            status-icon
            label-width="120px"
        >
            <h1>
                Giá chiến thắng {{ productData && productData.priceNow }}$
            </h1>

            <h1 v-if="!isFeedbackSeller" class="my-4">
                Người chiến thắng {{ displayWinnerName }}
            </h1>

            <h1 v-else class="my-4">
                Người bán {{ displaySellerName }}
            </h1>

            <el-switch
                v-model="type"
                :disabled="isReady"
                class="my-2"
                active-text="Đánh giá tốt"
                inactive-text="Đánh giá xấu"
            />

            <client-only>
                <ckeditor v-model="formData.content" :config="editorConfig" :disabled="isReady" value="Hello, World!" />
            </client-only>

            <el-form-item label-width="auto" class="pt-4">
                <el-button v-if="!isReady" type="primary" @click="submitForm(formName)">
                    Submit
                </el-button>
                <el-button @click="resetForm(formName)">
                    Cannel
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import { productFeedbackService } from '~/services/product-feedback';

export default Vue.extend({
    middleware: ['authentication'],
    props: {
        product: {
            type: Object,
            default: () => null
        },
        dialogVisible: {
            type: Boolean,
            default: false
        },
        isFeedbackSeller: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            productData: null as any,
            formName: 'feedbackForm',
            editorConfig: {
                toolbar: [['Bold']],
                disableObjectResizing: false,
                resize_enabled: false
            },
            type: true,
            formData: {
                type: true,
                productId: this.product && this.product.id,
                content: ''
            },
            isReady: false
        };
    },
    computed: {
        displayWinnerName(): string {
            return this.productData && this.productData.winner ? `${this.productData.winner.firstName} ${this.productData.winner.lastName ?? ''}`.trim() : '_';
        },

        displaySellerName():string {
            return this.productData && this.productData.seller ? `${this.productData.seller.firstName} ${this.productData.seller.lastName ?? ''}`.trim() : '_';
        }
    },
    watch: {
        async product(val:any) {
            this.productData = val;
            this.formData.productId = val.id;
            await this.checkReadyFeedback();
        },
    },
    async  mounted() {
        await this.checkReadyFeedback();
    },
    methods: {
        async  submitForm(formName: string) {
            this.formData.type = this.type === true ? 'up' : 'down';
            const result = await productFeedbackService.create(this.formData).catch((error:any) => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Không thể đánh giá lúc này!'
                });
            });
            if (result && result.data) {
                this.$notify.success({
                    title: 'Success',
                    message: 'Đánh giá người dùng thành công'
                });
                this.$emit('handelCloseFeedback', formName);
            }
        },
        resetForm(formName: string) {
            // this.$refs[formName].resetFields();
            this.$emit('handelCloseFeedback', formName);
        },

        async checkReadyFeedback() {
            if (this.formData.productId) {
                const result = await productFeedbackService.getByProduct(this.formData.productId).catch((error:any) => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get product feedback!'
                    });
                });
                if (result.data && result.isReady) {
                    this.formData.type = result.data.type === 'up';
                    this.formData.content = result.data.content;
                    this.isReady = true;
                }
                else
                    this.resetFormData();
            }
        },

        resetFormData() {
            this.formData.type = true;
            this.formData.content = '';
            this.isReady = false;
        }
    },
});
</script>
