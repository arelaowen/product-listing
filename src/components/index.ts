/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineAsyncComponent } from 'vue'

export default function(app : any){
    app.component('Login', defineAsyncComponent(() =>
        import("@/components/Login.vue")
    ))
}