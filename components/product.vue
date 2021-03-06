<template>
    <v-card
        :key="product.id"
        :loading="loading"
        class="mx-auto my-12 md3 ml-2 text-center"
    >
        <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            />
        </template>
        <v-layout>
            <v-flex md11 />
            <v-flex md1>
                <i v-if="showFavouriteIcon" class="mr-1" style="float:right; font-size: 1.5rem; cursor: pointer" :class="product.isFavourite ? 'el-icon-star-on icon-like-product' :'el-icon-star-off'" @click="handleFavourite(product)" />
            </v-flex>
        </v-layout>
        <v-layout>
            <img
                height="170"
                class="mx-auto"
                :src="logoUrl"
                @error="replaceByDefault"
            >
        </v-layout>

        <v-card-title>
            <div class="text-name-product">
                {{ product.name }}
            </div>
        </v-card-title>

        <v-card-text class="pl-3">
            <v-row
                align="center"
                class="mx-0"
            >
                <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                />

                <div class="grey--text ms-4">
                    4.5 (413)
                </div>
            </v-row>

            <div ml-2 mr-2>
                <div align="left" class="my-3 text-subtitle-1">
                    Giá hiện tại: {{ product.priceNow }}$
                </div>

                <div align="left" class="text-subtitle-1">
                    Giá mua ngay: {{ product.bidPrice ? `${product.bidPrice}$` : '_' }}
                </div>

                <div v-if="product.status === 'process'" align="left" class="my-3 text-subtitle-1">
                    Người giữ giá: {{ maskName(displayNameBidder) }}
                </div>

                <div v-if="['end','cancel'].includes(product.status)" align="left" class="my-3 text-subtitle-1">
                    Người chiến thắng: {{ maskName(displayNameWinner) }}
                </div>

                <div align="left" class="my-3 text-subtitle-1">
                    Số lượt ra giá hiện tại: {{ (product.productStatistic && product.productStatistic.auctions) || 0 }}
                </div>

                <!--<div align="left">
                    Trạng thái {{ displayStatus() }}
                </div>-->
                <div align="left">
                    Ngày đăng sản phẩm: {{ formatDate(product.createdAt) }}
                </div>

                <div align="left">
                    Thời gian hết hạn: {{ displayFormatExpriedAt }}
                </div>

                <div align="left">
                    Danh mục: {{ product.category.name }}
                </div>

                <div>
                    <el-button round style="width: 80%;margin-top:1rem; font-weight: bold; color:white" type="primary" :loading="loading" @click="showProductDetail(product.id)">
                        Chi tiết
                    </el-button>
                </div>
            </div>
        </v-card-text>
        <v-divider class="mx-4" />
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import momment from 'moment';
import { ROLE_ID } from '~/commom/enum';
import { productService } from '~/services/product';

export default Vue.extend({
    props: {
        product: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data: () => ({
        selection: null,
        loading: false,
        timeExpire: null
    }),
    computed: {
        ...mapGetters('auth', ['profile']),
        showFavouriteIcon():boolean {
            return this.$auth.isRoles(ROLE_ID.BIDDER, ROLE_ID.SELLER);
        },
        logoUrl(): string {
            if (!this.product.productImages)
                return this.product.url;
            else {
                const imagePrimary = this.product.productImages.find((item :any) => item.isPrimary === true);
                // if (imagePrimary)
                //     return `https://storage.webtest.engineer/node-core/${imagePrimary.url}`;
                if (imagePrimary)
                    return imagePrimary.url;
            }
            return '';
        },

        displayNameBidder(): string {
            return this.product && this.product.bidder ? `${this.product.bidder.firstName} ${this.product.bidder.lastName ?? ''}`.trim() : 'Không có thông tin';
        },

        displayNameWinner(): string {
            return this.product && this.product.winner ? `${this.product.winner.firstName} ${this.product.winner.lastName ?? ''}`.trim() : 'Không có thông tin';
        },

        displayFormatExpriedAt(): string {
            const timeNow = momment(new Date());
            switch (this.product.status) {
            case 'process':
                return timeNow.from(this.product.expiredAt, true);
            default:
                return '_';
            }
        }
    },

    created() {
        momment.locale('vi');
    },

    mounted() {
    },

    methods: {
        showProductDetail(idProduct: Object) {
            this.$router.push(`/product/${idProduct}`);
        },

        replaceByDefault(e:any) {
            e.target.src = require('~/assets/images/logo-default.png');
        },

        async handleFavourite(product: any) {
            this.handleAuthenticated();

            const result = await productService.favouriteProduct(product.id).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot favourite product!'
                });
            });
            if (result) {
                this.$notify.success({
                    title: 'Success',
                    message: !product.isFavourite ? 'Favourite product successfully!' : 'Unfavourite product successfully!'
                });
                product.isFavourite = !product.isFavourite;
            }
        },

        handleAuthenticated() {
            if (!this.$auth.isAuthenticated())
                return this.$router.push('/login?redirect=' + this.$router.currentRoute.path);
        },

        displayStatus() {
            switch (this.product.status) {
            case 'draft': return 'Bản nháp';
            case 'process': return 'Đang diễn ra';
            case 'end': return 'Đã kết thúc';
            case 'cancel': return 'Đã hủy';
            }
        },

        formatDate(date:any) {
            return momment(date).format('k:mm D-M-Y');
        },

        maskName(name: String) {
            const mapDisplayName = this.$auth.isAuthenticated() ? `${this.profile.firstName} ${this.profile.lastName ?? ''}`.trim() : 'Guest';
            if (name === '_' || name === 'Không có thông tin' || name === mapDisplayName)
                return name;
            else {
                const firstName = name.split(' ')[0];
                let lastName = name.split(' ')[1];
                for (let i = 0; i < lastName.length; i++)
                    lastName = lastName.replace(lastName.charAt(i), '*');

                return firstName + ' ' + lastName;
            }
        }
    },

});
</script>

<style>
.text-name-product {
    line-height: 1.5em;
    height: 1.4em;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    width: 100%;
}

.icon-like-product {
    font-size: 2rem;
    cursor: pointer;
    color: red;
}

</style>
