<template>
    <div>
        <v-container>
            <v-card>
                <v-card-title class="text-h4">
                    My Cart
                </v-card-title>
                <v-divider/>
                <v-card-text class="pb-0 mb-0">
                    <v-list lines="three" v-if="cartList.length > 0">
                        <template v-for="item in cartList" :key="item.id">
                            <v-list-item v-if="getProductDetail(item) != undefined">
                                <template v-slot:prepend>
                                    <v-checkbox class="pa-0 ma-0"></v-checkbox>
                                    <v-avatar size="50" rounded="0">
                                        <v-img :src="getProductDetail(item)['image']"></v-img>
                                    </v-avatar>
                                </template>
                                <v-list-item-title class="text-h6">
                                    {{getProductDetail(item)['title']}} <span class="text-subtitle-1">({{moment(item.date).format("L")}})</span>
                                </v-list-item-title>
                                <v-list-item-subtitle class="text-h6 pt-1">
                                    <v-icon size="x-small">mdi-currency-php</v-icon>
                                    {{getProductDetail(item)['price']}}
                                </v-list-item-subtitle>
                                <template v-slot:append>
                                    <v-text-field
                                        :model-value="item.products[0].quantity"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        >
                                        <template #prepend>
                                            <v-btn icon size="25" color="error" class="" @click="item.products[0].quantity > 1 ? item.products[0].quantity-- : ''">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                        </template>
                                        <template #append>
                                            <v-btn icon size="25" color="success" class="" @click="item.products[0].quantity++">
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-text-field>
                                </template>
                            </v-list-item>
                        </template>
                    </v-list>

                    <div class="text-center pb-2 text-h6 text-error" v-else>
                        No items available.
                    </div>
                </v-card-text>
                <v-card-actions class="mr-2 mb-2" v-if="cartList.length > 0">
                    <v-spacer/>
                    <v-btn variant="elevated" color="primary">Proceed Checkout</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue"
import { useCart } from '@/store/cart'
import { storeToRefs } from 'pinia'
import moment from "moment"

export default {
    setup(){
        const cart = useCart();
        const { cartList } = storeToRefs(cart)
        const products = ref([])
        return {
            cartList,
            products,
            moment
        }
    },
    methods: {
        async getItems(this: any){
            const response = await this.$api.procapi({
                method: "GET",
                url: "products"
            })

            if(response.data.length > 0){
                this.products = response.data
            }
        },
        getProductDetail(this: any,item : any){
            return this.products.find((f:any) => f.id == item.products[0].productId)
        }
    },
    created(this: any){
        this.getItems()
    }
}
</script>



<style scoped>
:deep(.v-text-field .v-field--active input) {
    text-align: center
}
</style>