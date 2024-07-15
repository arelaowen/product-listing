<template>
<div>
    <v-container>
        <v-card>
            <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            density="comfortable"
            >
            <template v-slot:top>
                <v-toolbar color="secondary" density="compact" flat class="pa-2">
                    <v-toolbar-title>Product Maintenance</v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-text-field
                        v-model="search"
                        density="compact"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        variant="solo-filled"
                        flat
                        hide-details
                        single-line
                        class="mx-2"
                    ></v-text-field>

                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" size="small" icon color="success" variant="elevated" @click="dialog.status = true">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        </template>
                        <span>Add Item</span>
                    </v-tooltip>

                </v-toolbar>
            </template>

       
            <template #[`item.image`]="{ value }">
                <v-img :src="value" aspect-ratio="2">
                </v-img>
            </template>

            <template #[`item.action`]="{ item }">
                <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" size="x-small" color="secondary" variant="elevated" @click="edit(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </template>
                    <span>Edit Item</span>
                </v-tooltip>
            </template>
            </v-data-table>
        </v-card>
    </v-container>

    <v-dialog v-model="dialog.status" persistent width="45%">
        <v-card>
            <v-form validate-on="submit lazy" ref="form" @submit.prevent="save">
            <v-card-title>
                Add New Product
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pb-0 mb-0">

                <v-text-field
                v-model="dialog.title"
                density="compact"
                variant="outlined"
                label="Title"
                :rules="[v => !!v || 'This field is required']"
                class="pa-1"
                ></v-text-field>

                <v-textarea
                v-model="dialog.description"
                variant="outlined"
                label="Description"
                density="compact"
                :rules="[v => !!v || 'This field is required']"
                class="pa-1"
                ></v-textarea>

                <v-select
                v-model="dialog.category"
                :items="category"
                variant="outlined"
                label="Category"
                density="compact"
                :rules="[v => !!v || 'This field is required']"
                class="pa-1"
                ></v-select>

                <v-text-field
                v-model="dialog.image"
                density="compact"
                variant="outlined"
                label="Image Url"
                :rules="[v => !!v || 'This field is required']"
                class="pa-1"
                ></v-text-field>

                <v-text-field
                v-model="dialog.price"
                density="compact"
                variant="outlined"
                label="Price"
                :rules="[v => !!v || 'This field is required']"
                class="pa-1"
                ></v-text-field>


            </v-card-text>
            <v-card-actions class="pt-0 mx-3">
                <v-spacer/>
                <v-btn color="error" @click="dialog.status = false">Cancel</v-btn>
                <v-btn color="primary" type="submit" variant="elevated">Save</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

</div>
</template>


<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue"
export default {
    setup(){
        const headers = ref([
            {title: 'Action',align: 'center',key: 'action',  nowrap: false},
            {title: 'Title',align: 'start',key: 'title',  nowrap: false},
            {title: 'Description',align: 'start',key: 'description', nowrap: false},
            {title: 'Category',align: 'start',key: 'category', nowrap: false},
            {title: 'Image',align: 'start',key: 'image', nowrap: false},
            {title: 'Price',align: 'start',key: 'price', nowrap: false},
        ])

        const items = ref([])

        const search = ref("")

        const category = ref([])

        const dialog = ref({
            status: false,
            id: null,
            title: null,
            description: null,
            category: null,
            image: null,
            price: null
        })

        return {
            headers,
            items,
            search,
            dialog,
            category
        }
    },
    methods: {
        async getProduct(this: any){
            const response = await this.$api.procapi({
                method: "GET",
                url: "products"
            })
            this.items = response.data
        },
        async getOptions(this: any){
            const response = await this.$api.procapi({
                method: "GET",
                url: "products/categories"
            })
            this.category = response.data
        },

        async save(this: any){
            const { id, title, description, category, image, price } = this.dialog
            const { valid } = await this.$refs.form.validate()
            if(valid){
                // create
                if(!this.dialog.id){
                    const response = await this.$api.procapi({
                        method: "POST",
                        url: "products",
                        data: {
                            title,
                            description,
                            category,
                            image,
                            price
                        }
                    })
                    if(typeof response.data == 'object'){
                        this.items.push(response.data);
                        await this.$refs.form.reset();
                        this.dialog.status = false;
                    }
                }else{
                    const response = await this.$api.procapi({
                            method: "PUT",
                            url: `products/${id}`,
                            data: {
                                title,
                                description,
                                category,
                                image,
                                price
                            }
                        })

                        let index = this.items.findIndex((f :any) => f.id == response.data.id);

                        this.items[index] = response.data;

                        await this.$refs.form.reset();
                        this.dialog.status = false;

                    }
            }
            
        },
        async edit(this: any, item: any){
            this.dialog = item
            this.dialog.status = true
        }
    },
    created(this: any){
        this.getOptions();
        this.getProduct();
    }
}

</script>