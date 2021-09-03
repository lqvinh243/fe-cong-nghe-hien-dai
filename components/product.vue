<template>
    <v-card
        :key="product.id"
        :loading="loading"
        class="mx-auto my-12 md3"
        @click="showProductDetail(product.id)"
    >
        <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            />
        </template>

        <v-img
            height="250"
            :src="product.url"
        />

        <v-card-title>
            <div class="text-name-product">
                {{ product.name }}
            </div>
        </v-card-title>

        <v-card-text>
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

            <div align="left" class="my-4 text-subtitle-1">
                $ • Price current: {{ product.bidPrice }}
            </div>

            <div align="left">
                • Time expried: {{ product.expiredAt }}
            </div>

            <div align="left">
                Category: {{ product.category.name }}
            </div>
        </v-card-text>

        <v-divider class="mx-4" />
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
// import { mapActions } from 'vuex';

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
        loading: false
    }),
    methods: {
        showProductDetail(idProduct: Object) {
            this.$router.push(`product/${idProduct}`);
        }
    }
});
</script>

<style>
.text-name-product {
    line-height: 1.5em;
    height: 3em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}
</style>
