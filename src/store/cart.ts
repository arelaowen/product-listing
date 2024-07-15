/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { useStorage } from "vue3-storage";

export const useCart = defineStore('cart', () => {

    const cartList = ref([]);

    const storage = useStorage();

    async function pushToCart(this: any, item: any){
            const response = await this.$api.procapi({
                method: "POST",
                    url: `carts`,
                    data: {
                        userId: storage.getStorageSync("userID"),
                        date: new Date(),
                        products:[
                            {
                                productId: item.id,
                                quantity: item.qty
                            }
                        ]
                }
            })
            if(this.cartList.filter((f:any) => f.id == item.id).length > 0){
                // already in cart
            }else{
                this.cartList.push(response.data)
            }
            
    }

    return { cartList, pushToCart }
  })