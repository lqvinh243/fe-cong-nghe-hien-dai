<template>
    <div grid-list-lg fluid class="container-fluid ml-4 mt-5">
        <v-layout row>
            <v-flex>
                <h1>{{ title }}</h1>
            </v-flex>
            <!-- <v-flex md1>
                <i v-if="showFavouriteIcon" style="font-size: 2rem; cursor: pointer" :class="isFavourite ? 'el-icon-star-on icon-like-product' :'el-icon-star-off'" @click="handleFavourite" />
            </v-flex> -->
        </v-layout>
        <v-divider />
        <v-layout row wrap>
            <v-flex md5 mt-5>
                <v-layout>
                    <div id="preview">
                        <div class="box-thumbnail-avatar mt-3">
                            <div v-if="item.imageUrl" class="image-mapper">
                                <img v-if="item.imageUrl" mt-4 :src="item.imageUrl" class="image-upload">
                                <div class="btn-default" @click="uploadImageMain">
                                    EDIT
                                </div>
                            </div>
                            <div v-else class="upload-image">
                                <button id="addMedia" class="btn-add" @click="uploadImageMain">
                                    <span>+</span>
                                </button>
                                <div class="btn-default">
                                    UPLOAD A PHOTO
                                </div>
                            </div>
                            <input id="file" ref="inputFileMain" type="file" style="display: none;" @change="onChange($event)">
                        </div>
                    </div>
                </v-layout>
                <v-layout row mt-5>
                    <h3>Upload Hình phụ Sản phẩm</h3>
                </v-layout>
                <v-layout row wrap mt-4>
                    <div class="box-thumbnail-avatar list-image-sub mr-4">
                        <div class="upload-image">
                            <button id="addMedia" class="btn-add" @click="uploadImageSub">
                                <span>+</span>
                            </button>
                            <div class="btn-default">
                                UPLOAD A PHOTO
                            </div>
                        </div>
                        <input id="file" ref="inputFileSub" type="file" style="display: none;" @change="onChangeImageSub($event)">
                        <div v-for="(image, index) in listImage" :key="image.id" class="image-mapper mr-4 mb-4">
                            <img :src="image.url" class="image-upload">
                            <div class="btn-default" @click="deleteImageSub(image.id, index)">
                                DELETE
                            </div>
                        </div>
                    </div>
                </v-layout>
                <v-divider mt-4 />
                <v-layout>
                    <h3>Mô tả sản phẩm</h3>
                </v-layout>
                <v-layout v-for="(editorItem, index) in listProductDescription" :key="editorItem.id" mt-4>
                    <v-flex md-6>
                        <p v-html="editorItem.content" />
                    </v-flex>
                    <v-flex md-6>
                        <el-button type="danger" circle icon="el-icon-delete" style="color:white" @click="removeProductDesc(editorItem.id, index)" />
                    </v-flex>
                </v-layout>
                <v-layout mt-3>
                    <el-button type="primary" style="color:white" @click="handleShowPopupDescription">
                        Thêm Mô tả
                    </el-button>
                </v-layout>
            </v-flex>
            <v-flex md1 />
            <v-flex md5 mt-4>
                <v-card
                    elevation="24"
                    max-width="444"
                    class="mx-auto"
                />
                <v-layout md12 mt-1>
                    <span class="color-primary-header" />
                </v-layout>
                <v-card
                    style="padding: 0 auto"
                    class="mx-auto"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content style="margin-right:0 !important">
                            <div class="text-overline">
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <h3 class="pt-3">
                                            Thông tin Đấu giá
                                        </h3>
                                    </el-col>
                                </el-row>

                                <v-divider />
                            </div>
                            <v-list-item three-line>
                                <v-list-item-content style="margin-right:0 !important">
                                    <div class="text-overline">
                                        <h3>Thông tin Sản phẩm</h3>
                                        <v-divider />
                                    </div>
                                    <v-list-item-title class="text-h5 mb-1">
                                        <v-text-field
                                            v-model="productName"
                                            label="Tên Sản phẩm"
                                        />
                                        <el-select
                                            v-model="selectCategory"
                                            class="w-100 my-4"
                                            placeholder="Danh muc!"
                                            filterable
                                            remote
                                            reserve-keyword
                                            @change="handleSelectCategory"
                                        >
                                            <el-option
                                                v-for="option in categories"
                                                :key="option.id"
                                                :label="option.name"
                                                :value="option.id"
                                            />
                                        </el-select>
                                        <v-layout md12 mt-1>
                                            <v-text-field
                                                v-model="startPrice"
                                                label="Giá Khởi điểm"
                                                prefix="$"
                                                type="number"
                                            />
                                        </v-layout>
                                        <v-text-field
                                            v-model="step"
                                            label="Bước giá"
                                            type="number"
                                        />
                                        <v-text-field
                                            v-model="bidPrice"
                                            label="Giá Mua ngay"
                                            prefix="$"
                                            type="number"
                                        />
                                        <v-layout md12 mt-1>
                                            <v-flex md4 mt-2>
                                                Ngày Gia hạn
                                            </v-flex>
                                            <v-flex md2>
                                                <el-date-picker
                                                    v-model="expiredAt"
                                                    type="date"
                                                    placeholder=""
                                                    :picker-options="pickerOptions"
                                                />
                                            </v-flex>
                                        </v-layout>
                                        <v-checkbox
                                            v-model="isExtension"
                                            class="check-box-product"
                                            :label="`Gia hạn Sản phẩm`"
                                        />
                                    </v-list-item-title>
                                    <div>
                                        <el-button type="primary" style="color:white" @click="handlePublicProduct">
                                            Public Sản phẩm
                                        </el-button>
                                        <el-button type="primary" style="color:white" @click="handleUpdateProduct">
                                            Cập nhật Sản phẩm
                                        </el-button>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                            <v-card-actions />
                        </v-list-item-content>
                    </v-list-item>
                    <p v-if="!isAuthenticated" class="text-center" style="font-size:1rem">
                        Please <nuxt-link to="/login">
                            login
                        </nuxt-link>
                        or <nuxt-link to="/register">
                            register
                        </nuxt-link> to bidding!
                    </p>
                </v-card>
                <div class="text-center">
                    <v-dialog
                        v-model="dialogCkeditor"
                        width="500"
                    >
                        <v-card>
                            <v-card-title class="text-h5 grey lighten-2">
                                Mô tả Sản phẩm
                            </v-card-title>
                            <v-card-text>
                                <client-only>
                                    <ckeditor v-model="editorData" :config="editorConfig" value="Hello, World!" />
                                </client-only>
                            </v-card-text>
                            <v-divider />
                            <v-card-actions>
                                <v-spacer />
                                <el-button type="primary" style="color: white" @click="handleCloseProductDescription(true)">
                                    Lưu
                                </el-button>
                                <el-button
                                    type="primary"
                                    style="color: white"
                                    text
                                    @click="handleCloseProductDescription(false)"
                                >
                                    Hủy
                                </el-button>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-flex>
        </v-layout>
        <DialogBidPrice :product-id="id" :price-now="priceCurrent" :price="priceCurrent + stepPrice" :dialog-visible="dialogBidVisible" @handelCloseBid="closeBidDialog" />
        <BidPriceAutoDialog :product-id="id" :price-now="priceCurrent" :price="priceCurrent + stepPrice" :dialog-visible-auto="dialogBidAutoVisible" @handelCloseBid="closeBidDialog" />
        <ConfirmBuyNowDialog :product-id="id" :price-now="priceCurrent" :dialog-buy-now-visible="dialogBuyNowVisible" @handelCloseBid="closeBidDialog" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import momment from 'moment';
import { ROLE_ID } from '~/commom/enum';
import BidPriceAutoDialog from '~/components/dialogs/BidPriceAutoDialog.vue';
import DialogBidPrice from '~/components/dialogs/BidPriceDialog.vue';
import ConfirmBuyNowDialog from '~/components/dialogs/ConfirmBuyNowDialog.vue';
import { productService } from '~/services/product';
import { productFavouriteService } from '~/services/product-favourite';

export default Vue.extend({
    components: { DialogBidPrice, BidPriceAutoDialog, ConfirmBuyNowDialog },
    data: () => ({
        id: null as string | null,
        selection: null,
        loading: false,
        listProductImage: [],
        title: '' as any,
        priceCurrent: 0,
        status: '' as any,
        priceBid: null as number | null,
        description: '' as any,
        timeExpire: 0,
        seller: '' as any,
        likeProduct: false as boolean,
        stepPrice: 0 as number,
        productId: null,
        categories: [] as any,
        category: '' as string,
        createdAt: null,
        isFavourite: false,
        dialogBidVisible: false,
        dialogBidAutoVisible: false,
        dialogBuyNowVisible: false,
        bidderName: '',
        totalAuc: 0,
        productName: '',
        selectCategory: '',
        startPrice: null,
        bidPrice: null,
        expiredAt: new Date(),
        expiredAtFormat: null,
        pickerOptions: {
            disabledDate(time:Date) {
                return time.getTime() < Date.now();
            }
        },
        isExtension: false,
        step: null,
        item: {
            image: null,
            imageUrl: null,
            id: null
        },
        listImage: [],
        editorData: '',
        editorConfig: {
            // The configuration of the editor.
        },
        dialogCkeditor: false,
        showBtnCreate: true,
        listProductDescription: []
    }),

    computed: {
        showFavouriteIcon():boolean {
            return this.$auth.isRoles(ROLE_ID.BIDDER, ROLE_ID.SELLER);
        },
        showBuyNow():boolean {
            return !!this.priceBid;
        },
        isAuthenticated():boolean {
            return this.$auth.isAuthenticated();
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        if (!this.id)
            return this.$router.push('/404');
        this.loadProductDetail();
        this.checkFavourite();
        momment.locale('vi');
    },

    methods: {
        handleAuthenticated() {
            if (!this.$auth.isAuthenticated())
                return this.$router.push('/login?redirect=' + this.$router.currentRoute.path);
        },

        async loadProductDetail() {
            const result = await productService.getProductDetailById(this.id)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get product detail!'
                    });
                });
            if (result) {
                console.log(result);
                this.listProductImage = result.data.productImages;
                this.title = result.data.name;
                this.productId = result.data.id;
                this.productName = result.data.name;
                this.priceCurrent = result.data.priceNow;
                this.status = result.data.status;
                this.bidPrice = result.data.bidPrice;
                this.isExtension = result.data.isExtendedExpired;
                this.description = [];
                this.expiredAt = result.data.expiredAt;
                // this.seller = `${result.data.seller.firstName} ${result.data.seller.lastName ?? ''}`;
                this.step = result.data.stepPrice;
                this.category = result.data.category.name;
                this.createdAt = result.data.createdAt;
                this.listProductDescription = result.data.productDescription;

                // load image
                result.data.productImages.forEach((element: any) => {
                    if (element.isPrimary) {
                        this.item.imageUrl = element.url;
                        this.item.id = element.id;
                    } else
                        this.listImage.push(element);
                });
            }
        },

        async removeProductDesc(descId: string, index: any) {
            const result = await productService.deleteProductDescription(descId)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot delete product description!'
                    });
                });
            if (result && result.data) {
                this.listProductDescription.splice(index);
                this.$notify.success({
                    title: 'Success',
                    message: 'Delete product description success!'
                });
            }
        },

        async handlePublicProduct() {
            const result = await productService.publicProduct(this.productId)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot public product!'
                    });
                });
            if (result && result.data) {
                this.$notify.success({
                    title: 'Success',
                    message: 'Public product success!'
                });
            }
        },

        handleUpdateProduct() {

        },

        async handleSelectCategory() {
            const item = this.categories.find((item:any) => item.id === this.selectCategory);
            if (item) {
                if (item.parentId) {
                    this.products = [];
                    const filters = `category.id:${item.id}`;
                    await this.loadData(filters);
                }
                await this.loadCategory(this.selectCategory);
            }
        },

        uploadImageMain() {
            this.$refs.inputFileMain.click();
        },

        async onChange(e: any) {
            const file = e.target.files[0];
            if (file) {
                this.image = file;
                this.item.imageUrl = URL.createObjectURL(file);

                // delete image main
                if (this.item.id)
                    await this.deleteImageSub(this.item.id, null);

                // save image main
                await this.uploadImageProduct(true);
            }
        },

        async uploadImageProduct(isImageMain: any) {
            const form = new FormData();
            form.append('file', this.image);
            form.append('productId', this.productId);
            form.append('isPrimary', isImageMain);
            const result = await productService.addProductImage(form)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot upload product image!'
                    });
                });
            if (result && result.data)
                console.log(result);
        },

        async deleteImageSub(id: string, index: any) {
            if (index)
                this.listImage.splice(index, 1);

            const result = await productService.deleteProductImage(id)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot delete product image!'
                    });
                });
            if (result && result.data) {
                this.$notify.success({
                    title: 'Thành công',
                    message: 'Xóa danh hình ảnh thành công'
                });
            }
        },

        handleShowPopupDescription() {
            this.dialogCkeditor = true;
        },

        async handleCloseProductDescription(isSave: Boolean) {
            this.dialogCkeditor = false;
            if (isSave) {
                // call api save
                const content = [];
                content.push(this.editorData);
                const params = {
                    productId: this.productId,
                    content
                };
                const result = await productService.addProductDescription(params)
                    .catch(error => {
                        this.$notify.error({
                            title: 'Error',
                            message: error.message || 'Cannot add product description!'
                        });
                    });
                console.log(result);
                if (result && result.data) {
                    // this.$notify.success({
                    //     title: 'Thành công',
                    //     message: 'Xóa danh hình ảnh thành công'
                    // });
                }
            }
        },

        uploadImageSub() {
            this.$refs.inputFileSub.click();
        },

        onChangeImageSub(e: any) {
            const file = e.target.files[0];
            if (file) {
                const fileUrl = URL.createObjectURL(file);
                this.listImage.push({
                    image: file,
                    imageUrl: fileUrl
                });
            }
        },

        formatPrice(value: any) {
            const val = (value / 1).toFixed(0).replace(',', '.');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        formatDate(date:any) {
            return momment(date).format('k:mm D-M-Y');
        },

        async checkFavourite() {
            if (this.$auth.isRoles(ROLE_ID.BIDDER, ROLE_ID.SELLER)) {
                const result = await productFavouriteService.getByBidder(this.id).catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot check favourite product'
                    });
                });
                this.isFavourite = result.data;
            }
        },

        closeBidDialog(formName: string) {
            if (formName === 'bidPriceForm')
                this.dialogBidVisible = false;
            else if (formName === 'bidPriceAutoForm')
                this.dialogBidAutoVisible = false;
            else if (formName === 'buyNowForm')
                this.dialogBuyNowVisible = false;
        },

        mapStatusProduct(status: string) {
            switch (status) {
            case 'process':
                return 'Dang dien ra';
            case 'end':
            case 'cancel':
                return 'Da ket thuc';
            default:
                return 'Chua tien hanh';
            }
        },

    }
});
</script>
<style>
    .container-fluid {
        margin: 0 auto;
    }

    .color-primary-header {
        font-weight: 700;
        color: #cb1c22;
        margin-right: 10px;
        font-size: 32px;
    }

    .color-primary {
        font-weight: 700;
        color: #cb1c22;
    }

    h1, h3, v-layout {
        color: #0f0f0f;
        font-weight: bold;
    }

    .icon-like-product {
        font-size: 2rem;
        cursor: pointer;
        color: red;
    }

    .text-info-auction {
        font-weight: bold;
    }
</style>
