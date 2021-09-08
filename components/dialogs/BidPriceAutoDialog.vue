<template>
    <el-dialog
        title="Bid Price Auto"
        :visible.sync="dialogVisibleAuto"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
        class="text-center"
        :close-on-press-escape="false"
    >
        <el-form
            :ref="formName"
            :model="bidPriceAutoForm"
            status-icon
            :rules="rules"
            label-width="120px"
        >
            <h1 class="my-4">
                Price now: {{ priceNow }}$
            </h1>
            <el-form-item label-width="auto" prop="maxPrice">
                <el-input-number v-model="bidPriceAutoForm.maxPrice" :min="price" />
            </el-form-item>

            <el-form-item label-width="auto">
                <el-button type="primary" @click="submitForm(formName)">
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
import { productService } from '~/services/product';

export default Vue.extend({
    layout: 'blank',
    middleware: ['non-authentication'],
    props: {
        productId: {
            type: String,
            default: () => null
        },
        price: {
            type: Number,
            default: 0
        },
        priceNow: {
            type: Number,
            default: 0
        },
        dialogVisibleAuto: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formName: 'bidPriceAutoForm',
            bidPriceAutoForm: {
                productId: this.productId,
                maxPrice: this.price
            },
            rules: {
                maxPrice: [
                    { required: true, message: 'Please input price!', trigger: 'blur' },
                ]
            },
            submitForm(formName: string) {
                this.$refs[formName].validate(async (valid:boolean) => {
                    if (valid) {
                        const result = await productService.bidProductAuto(this.bidPriceAutoForm).catch(error => {
                            this.$notify.error({
                                title: 'Error',
                                message: error.message || 'Cannot bid product auto!'
                            });
                        });
                        if (result) {
                            this.$notify.success({
                                title: 'Success',
                                message: 'Bid product auto successfully!'
                            });
                            this.$emit('handelCloseBid', formName);
                        }
                    }
                });
            },
            resetForm(formName: string) {
                this.$refs[formName].resetFields();
                console.log('abc');
                this.$emit('handelCloseBid', formName);
            }
        };
    },
    watch: {
        productId(val: string) {
            this.bidPriceAutoForm.productId = val;
        },
        price(val:number) {
            this.bidPriceAutoForm.maxPrice = val;
        }
    },
    mounted() {
    },
    methods: {
    },
});
</script>
