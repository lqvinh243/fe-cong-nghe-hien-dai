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
                <v-layout v-for="(editorItem, index) in listProductDescription" :key="editorItem.id" row wrap mt-4>
                    <v-flex md10>
                        <p v-html="editorItem.content" />
                    </v-flex>
                    <v-flex md2>
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
                                        <v-checkbox
                                            v-model="isStricten"
                                            class="check-box-product mt-0"
                                            :label="`Cho phép bidder mới đấu giá`"
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
import { categoryService } from '~/services/category';
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
        listProductDescription: [],
        isStricten: false
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
        this.loadCategory();
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
                this.isStricten = result.data.isStricten;
                this.description = [];
                this.expiredAt = result.data.expiredAt;
                this.startPrice = result.data.startPrice;
                this.selectCategory = result.data.category.id;
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
                    }
                    else
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

        async handleUpdateProduct() {
            // const form = new FormData();
            // form.append('name', this.productName);
            // form.append('categoryId', this.selectCategory);
            // form.append('stepPrice', this.step);
            // form.append('expiredAt', this.expiredAtFormat);
            // form.append('bidPrice', this.bidPrice);
            // form.append('startPrice', this.startPrice);
            // form.append('isExtendedExpired', JSON.stringify(this.isExtension));
            const formData = {
                name: this.productName,
                categoryId: this.selectCategory,
                stepPrice: this.step,
                expiredAt: this.expiredAtFormat,
                bidPrice: this.bidPrice,
                startPrice: this.startPrice,
                isExtendedExpired: JSON.stringify(this.isExtension),
                isStricten: JSON.stringify(this.isStricten),
            };
            const result = await productService.updateProduct(this.productId, formData)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Unauthorized!'
                    });
                });
            if (result && result.data) {
                this.$notify.success({
                    title: 'Thành công',
                    message: 'Cập nhật sản phẩm thành công'
                });
            }
            console.log(result);
        },

        async loadCategory(_id: string = '') {
            const query = 'isIgnoreParent=true';
            // if (id)
            //     query += `parentId=${id}`;

            const result = await categoryService.findCategory(query).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot get category!'
                });
            });
            if (result && result.data.length)
                this.categories = result.data;
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
                await this.uploadImageProduct(this.image, true);
            }
        },

        async uploadImageProduct(image: any, isImageMain: any) {
            const form = new FormData();
            form.append('file', image);
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
            if (index >= 0)
                this.listImage.splice(index, 1);

            if (id) {
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
            }
        },

        handleShowPopupDescription() {
            this.editorData = '';
            this.dialogCkeditor = true;
        },

        async handleCloseProductDescription(isSave: Boolean) {
            this.dialogCkeditor = false;
            if (isSave) {
                // call api save
                const contents = [];
                contents.push(this.editorData);
                const params = {
                    productId: this.productId,
                    contents
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
                    this.$notify.success({
                        title: 'Thành công',
                        message: 'Thêm mô tả hình ảnh thành công'
                    });
                    const result = await productService.getProductDetailById(this.productId)
                        .catch(error => {
                            this.$notify.error({
                                title: 'Error',
                                message: error.message || 'Cannot get product detail!'
                            });
                        });
                    if (result)
                        this.listProductDescription = result.data.productDescription;
                }
            }
        },

        uploadImageSub() {
            this.$refs.inputFileSub.click();
        },

        async onChangeImageSub(e: any) {
            const file = e.target.files[0];
            if (file) {
                const fileUrl = URL.createObjectURL(file);
                this.listImage.push({
                    image: file,
                    imageUrl: fileUrl
                });
                // save image sub
                await this.uploadImageProduct(file, false);
                // load image to get id image
                await this.loadImageSub();
            }
        },

        async loadImageSub() {
            const result = await productService.getProductDetailById(this.productId)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get product detail!'
                    });
                });
            if (result) {
                // load image
                this.listImage = [];
                result.data.productImages.forEach((element: any) => {
                    if (element.isPrimary === false)
                        this.listImage.push(element);
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

    .text-name-product {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }

    .check-box-product div div label {
        margin-top: 10px;
    }

    h1, h3, v-layout {
        color: #0f0f0f;
        font-weight: bold;
    }

    .image-upload {
        box-shadow: 2px 2px #888888;
        max-width: 400px;
        max-height: 400px;
    }

    .image-mapper {
        height: 250px;
        width: 250px;
        display: block;
        position: relative;
        cursor: pointer;
    }

    .image-mapper img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .image-mapper .btn-default {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .box-thumbnail-avatar .upload-image {
        position: relative;
        height: 250px;
        width: 250px;
    }

    .btn-add {
        background-color: transparent;
        border: 0;
        font-family: "HKGrotesk-Light";
        font-size: 80px;
        color: #d95842;
        outline: none;
    }

    .box-thumbnail-avatar .btn-default {
        background-color: #fff;
        border: 0;
        padding: 7px 18px;
        font-size: 1rem;
        line-height: 1rem;
        letter-spacing: .06rem;
        color: #d95842;
        box-shadow: 0 2px 4px 0 hsl(0deg 0% 84% / 50%);
    }

    .box-thumbnail-avatar .upload-image {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
    }

    .list-image-sub {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }
</style>
