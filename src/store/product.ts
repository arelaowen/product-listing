/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

export const useProduct = defineStore('product', () => {
    const productList = ref([]);

    const category = computed(() => Array.from(new Set(productList.value.map((m:any) => m.category))))

    async function fetchProduct(this: any, qry: any = {}) {
        const response = await this.$api.procapi({
                            method: "GET",
                            url: `products${qry.sort != undefined ? '?sort=' + qry.sort : ''}`
                        });

        if(qry.keyword != undefined && qry.keyword){
            productList.value = response.data.map((m:any) => JSON.stringify(m)).filter((f:any) => f.includes(qry.keyword)).map((m:any) => JSON.parse(m))
        }else{
            productList.value = response.data
        }
    }
  
    return { category, productList, fetchProduct }
  })