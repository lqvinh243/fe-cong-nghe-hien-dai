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
                <v-layout row>
                    <h3>Upload Hình chính Sản phẩm</h3>
                </v-layout>
                <v-layout row wrap mt-5>
                    <v-file-input
                        label="File input"
                        filled
                        prepend-icon="mdi-camera"
                    />
                </v-layout>

                <v-layout row>
                    <h3>Upload Hình phụ Sản phẩm</h3>
                </v-layout>
                <v-layout row wrap mt-4>
                    <v-file-input
                        label="File input"
                        filled
                        prepend-icon="mdi-camera"
                    />
                </v-layout>
            </v-flex>
            <v-flex md1 />
            <v-flex md5>
                <v-card
                    style="padding: 0 auto"
                    class="mx-auto mt-4"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content style="margin-right:0 !important">
                            <div class="text-overline">
                                <h3>Thông tin Sản phẩm</h3>
                                <v-divider />
                            </div>

                            <v-list-item-title class="text-h5 mb-1">
                                <v-layout md12 mt-1>
                                    <v-text-field
                                        label="Giá Khởi điểm"
                                    />
                                </v-layout>
                                <v-text-field
                                    label="Bước giá"
                                />
                                <v-text-field
                                    label="Giá Mua ngay"
                                />
                                <v-checkbox
                                    v-model="isExtension"
                                    class="check-box-product"
                                    :label="`Gia hạn Sản phẩm`"
                                />
                            </v-list-item-title>
                            <!-- <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor> -->
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions />
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import { mapActions } from 'vuex';
// import ClassicEditor  from '@ckeditor/ckeditor5-vue';

export default Vue.extend({
    data: () => ({
        selection: null,
        loading: false,
        // editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
            // The configuration of the editor.
        },
        isExtension: false
    }),
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
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
</style>

