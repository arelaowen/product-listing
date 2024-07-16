<template>
    <v-dialog :model-value="status" width="35%" persistent>
        <v-card>
            <v-card-title>
                Login
                <v-icon class="float-right" @click="close">mdi-close</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-form ref="form" validate-on="submit lazy" @submit.prevent="login">
            <v-card-text class="pb-0 mb-0">
                <v-text-field
                v-model="username"
                variant="outlined"
                label="Username"
                density="comfortable"
                prepend-inner-icon="mdi-account"
                :rules="[ v => !!v || 'Username is required']"
                required
                class="pa-1"
                ></v-text-field>
                <v-text-field
                v-model="password"
                variant="outlined"
                label="Password"
                density="comfortable"
                :type="showPassword ? '' : 'password'"
                prepend-inner-icon="mdi-key-variant"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:appendInner="showPassword = !showPassword"
                :rules="[ v => !!v || 'Password is required']"
                class="pa-1"
                ></v-text-field>
                <span class="d-block text-caption text-right mt-n3 text-primary" style="cursor: pointer" @click.stop>Forgot Password?</span>
            </v-card-text>
            <v-card-actions class="mx-4 pb-4 d-block">
                <v-btn block color="primary" variant="elevated" type="submit">Login</v-btn>
                <span class="d-block ma-2 text-center text-subtitle-2">Dont have an account? <span class="text-primary" style="cursor: pointer">Sign up</span></span>
            </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    /* eslint-disable @typescript-eslint/no-explicit-any */
import { ref} from "vue";

export default {
    props: {
        status: {
            type: Boolean,
            default: false
        }
    },
    setup(){
        const username = ref("");
        const password = ref("");
        const showPassword = ref(false);
        const checkInterval = ref(null)
        
        return {
            username,
            password,
            showPassword,
            checkInterval
        }
    },
    methods:{
        close(this : any){
            this.$emit("close")
        },
        async login(this: any){ 
            this.$storage.clearStorageSync();
            const { valid } = await this.$refs.form.validate()
            if(valid){
                try {
                    const response = await this.$api.procapi({
                        method: "POST",
                        url: `auth/login`,
                        data: {
                            username: this.username,
                            password: this.password
                        }
                    })

                    // if authenticated
                    if(response.data.token != undefined){
                        // get user details
                        const user = await this.$api.procapi({
                            method: "GET",
                            url: "users"
                        })
                        let userID = user.data.find((f:any) => f.username == this.username && f.password == this.password).id
                        this.$storage.setStorageSync("userID", userID, 3600000);           
                        this.$storage.setStorageSync("authKey", response.data.token, 3600000);
                        this.close();
                        this.$router.go(0);
                    }
                }catch(err){
                    alert("There is a server problem encountered!")
                }
                
            }
        }
    }
}
</script>