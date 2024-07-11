<template>
  <div>
    <v-toolbar color="primary" extended>
      <v-toolbar-title class="font-weight-bold">
        Shop Lyft
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn size="small">
          <v-icon class="mr-1">mdi-account-plus</v-icon>
          Sign Up
        </v-btn>
        <v-btn size="small">
          <v-icon class="mr-1">mdi-account</v-icon>
          Login
        </v-btn>
    </v-toolbar>
    <v-card
      variant="flat"
      class="mx-auto"
      max-width="80%"
      style="margin-top: -64px;"
    >
      <v-toolbar color="primary">
        <v-text-field
        append-inner-icon="mdi-magnify"
        rounded="pill"
        variant="outlined"
        density="compact"
        hide-details
        placeholder="Search what you are looking for"
        class="mx-1"
        ></v-text-field>
        <v-btn :ripple="false" icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-sort-ascending</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>


    <v-container fluid>
      {{products}}
    </v-container>

  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
    setup(){
      const title = ref("Asd")
      return {
        title
      }
    }
}
</script>
