<template>
    <v-container grid-list-lg row wrap fluid class="home-app-wrapper statistics pt-2">
        <v-layout row wrap>
            <h2>Top 5 sản phẩm gần kết thúc</h2>
        </v-layout>
        <v-layout row wrap>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <h2>Top 5 sản phẩm có nhiều lượt ra giá nhất</h2>
        </v-layout>
        <v-layout row wrap>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <h2>Top 5 sản phẩm có giá cao nhất</h2>
        </v-layout>
        <v-layout row wrap>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3>
                <v-card
                    :loading="loading"
                    class="mx-auto my-12 md3"
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
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    />

                    <v-card-title>Cafe Badilico</v-card-title>

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

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
// import { mapActions } from 'vuex';

export default Vue.extend({
    data: () => ({
        selection: null,
        loading: false
    }),
    methods: {
        // ...mapActions('auth', [
        //     'clearAuthentication'
        // ]),
        // logout() {
        //     this.clearAuthentication();
        //     this.$router.push('/');
        // }
    }
});
</script>
