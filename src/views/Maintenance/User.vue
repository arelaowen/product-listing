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
                <v-toolbar color="secondary" flat class="pa-2" density="compact">
                    <v-toolbar-title>User Maintenance</v-toolbar-title>
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

                    <v-btn size="small" icon color="success" variant="elevated">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>

                </v-toolbar>
            </template>

       
            <template #[`item.fullname`]="{ item }">
                <span class="text-uppercase">
                    {{item.name.firstname}} {{item.name.lastname}}
                </span>
            </template>


            </v-data-table>
        </v-card>
    </v-container>
</div>
</template>


<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue"
export default {
    setup(){
        const headers = ref([
            {title: 'Username',align: 'start',key: 'username',  nowrap: false},
            {title: 'Full Name',align: 'start',key: 'fullname', nowrap: false},
            {title: 'Email',align: 'start',key: 'email', nowrap: false},
            {title: 'Contact No.',align: 'start',key: 'phone', nowrap: false},
        ])

        const items = ref([])

        const search = ref("")

        return {
            headers,
            items,
            search
        }
    },
    methods: {
        async getUsers(this: any){
            const response = await this.$api.procapi({
                method: "GET",
                url: "users"
            })
            this.items = response.data
        }
    },
    created(this: any){
        this.getUsers();
    }
}

</script>