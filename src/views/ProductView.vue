<template>
    <div>
        <v-container class="mt-5">
            <v-row>
                <v-col md="4">
                    <v-img width="500" height="350" :src="product.image" aspect-ratio="2"></v-img>
                </v-col>
                <v-col md="6">
                    <span class="d-block text-h6 text-uppercase">{{product.title}}</span>
                    <span class="d-block text-subtitle-2 pt-2">{{product.description}}</span>
                    <template v-if="product.rating != undefined">
                    <span class="d-block pt-3">
                        <v-rating
                            :model-value="product.rating.rate"
                            color="yellow-darken-3"
                            size="small"
                            density="compact"
                            readonly
                        ></v-rating>
                    </span>
                    <span class="d-block text-subtitle-2 text-primary ml-1">{{product.rating.count}} Ratings</span>
                    </template>
                    <span class="d-block text-overline pt-3">
                        Category:
                        <v-chip label size="x-small" color="error">{{product.category}}</v-chip> 
                    </span>
                    <span class="text-overline font-weight-bold text-primary pt-3" style="font-size: 24px !important">
                        <v-icon size="small">mdi-currency-php</v-icon>
                        {{product.price}}
                    </span>
                    
                    <v-col md="4">
                        <v-text-field
                        v-model="qty"
                        variant="outlined"
                        density="compact"
                        hide-details
                        >
                        <template #prepend>
                            <v-btn icon size="25" color="error" class="" @click="qty > 1 ? qty-- : ''">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <template #append>
                            <v-btn icon size="25" color="success" class="" @click="qty++">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        </v-text-field>
                    </v-col>
                    
                    <div class="d-flex pt-5">
                        <v-btn color="orange darken-3" class="mr-2 text-white" @click="addToCart">
                            <v-icon>mdi-cart-variant</v-icon>
                            ADD TO CART
                        </v-btn>
                        <v-btn color="primary" @click.stop>BUY NOW</v-btn>
                    </div>

                </v-col>
            </v-row>
        </v-container>
        <Login :status="loginStatus" @close="loginStatus = false" />
    </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue"
import { useCart } from '@/store/cart'

export default {
    setup(){
        const product = ref({})
        const qty = ref(1)
        const loginStatus = ref(false)

        const cart = useCart();
        const { pushToCart } = cart


        return {
            qty,
            product,
            loginStatus,
            pushToCart
        }
    },
    methods: {
        async getDetail(this: any){
            const response = await this.$api.procapi({
                method: "GET",
                url: `products/${this.$route.params.id}`
            })
            this.product = response.data
        },
        async addToCart(this: any){
            if(this.$storage.getStorageSync("authKey") == undefined){
                this.loginStatus = true
            }else{
                this.product.qty = this.qty
                this.pushToCart(this.product)
            }
        }
    },
    created(this: any){
        this.getDetail();
    }
}

</script>

<style scoped>
:deep(.v-text-field .v-field--active input) {
    text-align: center
}
</style>