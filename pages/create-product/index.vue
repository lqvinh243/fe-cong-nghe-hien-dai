<template>
    <div grid-list-lg fluid class="container-fluid ml-4 mt-5">
        <v-layout row>
            <v-flex>
                <h1>Đăng Sản phẩm Đấu giá</h1>
            </v-flex>
        </v-layout>
        <v-divider />
        <v-layout row mt-5 ml-3>
            <v-flex md5>
                <v-layout row class="mt-5">
                    <h3>Upload Hình chính Sản phẩm</h3>
                </v-layout>
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
                        <div v-for="(image, index) in listImage" :key="index" class="image-mapper mr-4 mb-4">
                            <img :src="image.imageUrl" class="image-upload">
                            <div class="btn-default" @click="deleteImageSub(index)">
                                DELETE
                            </div>
                        </div>
                    </div>
                </v-layout>
                <v-divider mt-4 />
                <v-layout>
                    <h3>Mô tả sản phẩm</h3>
                </v-layout>
                <v-layout>
                    <p v-for="(editorItem, index) in listProductDescription" :key="index" v-html="editorItem" />
                </v-layout>
                <v-layout mt-3>
                    <el-button type="primary" style="color:white" @click="handleShowPopupDescription">
                        Thêm Mô tả
                    </el-button>
                    <!-- <client-only>
                        <ckeditor v-model="editorData" :config="editorConfig" value="Hello, World!" @change="handleChange" />
                    </client-only> -->
                    <!-- <p v-html="editorData" /> -->
                </v-layout>
            </v-flex>
            <v-flex md1 />
            <v-flex md5>
                <v-card
                    style="padding: 0 auto"
                    class="mx-auto"
                    outlined
                >
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
                            <el-button v-if="showBtnCreate" type="primary" style="color:white" @click="handleCreateProduct">
                                Đăng Sản phẩm
                            </el-button>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions />
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
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import momment from 'moment';
import { categoryService } from '~/services/category';
import { productService } from '~/services/product';

export default Vue.extend({
    data: () => ({
        selection: null,
        loading: false,
        isExtension: false,
        url: null,
        item: {
            image: null,
            imageUrl: null
        },
        startPrice: null,
        bidPrice: null,
        listImage: [],
        productName: '',
        step: null,
        selectCategory: '',
        expiredAt: new Date(),
        expiredAtFormat: null,
        pickerOptions: {
            disabledDate(time:Date) {
                return time.getTime() < Date.now();
            }
        },
        categories: [] as any,
        editorData: '',
        editorConfig: {
            // The configuration of the editor.
        },
        dialogCkeditor: false,
        showBtnCreate: true,
        listProductDescription: [],
        isStricten: true
    }),
    created() {
        this.loadData();
    },

    methods: {
        loadData() {
            this.loadCategory();
            this.showBtnCreate = true;
        },

        async loadCategory(id: string = '') {
            let query = '';
            if (id)
                query += `parentId=${id}`;

            const result = await categoryService.findCategory(query).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot get category!'
                });
            });
            if (result && result.data.length)
                this.categories = result.data;
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

        onChange(e: any) {
            const file = e.target.files[0];
            if (file) {
                this.image = file;
                this.item.imageUrl = URL.createObjectURL(file);
            }
        },

        handleShowPopupDescription() {
            this.dialogCkeditor = true;
        },

        handleCloseProductDescription(isSave: Boolean) {
            this.dialogCkeditor = false;
            if (!isSave)
                this.editorData = '';
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

        deleteImageSub(index: number) {
            this.listImage.splice(index, 1);
        },

        validateFormCreateProduct() {
            const isValidate = true;
            if (this.listImage.length < 3) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Vui lòng chọn ít nhất 3 hình ảnh phụ'
                });
                return false;
            }

            if (this.editorData === '' || this.editorData == null) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Vui lòng nhập mô tả sản phẩm'
                });
                return false;
            }

            return isValidate;
        },

        async handleCreateProduct() {
            const isValidate = this.validateFormCreateProduct();
            if (isValidate) {
                this.expiredAtFormat = momment(this.expiredAt).format('YYYY-MM-DD');
                console.log(this.expiredAtFormat);
                const form = new FormData();
                form.append('file', this.image);
                form.append('name', this.productName);
                form.append('categoryId', this.selectCategory);
                form.append('stepPrice', this.step);
                form.append('expiredAt', this.expiredAtFormat);
                form.append('bidPrice', this.bidPrice);
                form.append('startPrice', this.startPrice);
                form.append('isStricten', JSON.stringify(this.isStricten));
                form.append('isExtendedExpired', JSON.stringify(this.isExtension));

                const result = await productService.createProduct(form)
                    .catch(error => {
                        this.$notify.error({
                            title: 'Error',
                            message: error.message || 'Unauthorized!'
                        });
                    });
                console.log(result);
                if (result) {
                    // get id {data: '9099d4a3-da30-4ab2-b15e-1886150285b7'}
                    const id = result.data;

                    // save list image sub
                    await this.handleUploadMultiImageSubProduct(id);

                    // save info ckeditor
                    await this.handleSaveProductDescription(id);
                    await this.getListDescriptionProductDrag(id);
                    // this.editorData = '';
                    // this.showBtnCreate = false;
                    this.$router.push('/create-product/' + id);
                }
            }
        },

        async getListDescriptionProductDrag(id: string) {
            const result = await productService.getProductDetailById(id)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get product desciption!'
                    });
                });
            console.log(result);
            if (result) {
                this.listProductDescription = [];
                if (result.data.productDescription) {
                    result.data.productDescription.forEach((elementDesc:any) => {
                        this.listProductDescription.push(elementDesc.data.data.content);
                    });
                }
            }
        },

        async handleUploadMultiImageSubProduct(id: String) {
            const form = new FormData();
            this.listImage.forEach((objectImage: any) => {
                form.append('files', objectImage.image);
            });
            const result = await productService.uploadMultiImageProduct(id, form)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Unauthorized!'
                    });
                });
            console.log(result);
        },

        async handleSaveProductDescription(id: String) {
            const params = {
                productId: id,
                content: this.editorData
            };

            const result = await productService.saveProductDescription(params)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Unauthorized!'
                    });
                });
            console.log(result);
        }
    }
});

</script>
<style>
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
