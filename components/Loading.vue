<template>
    <v-overlay :value="overlay"><v-progress-circular
    :size="70"
    :width="10"
    color="green"
    indeterminate>
    </v-progress-circular></v-overlay>
</template>
<script>
export default {
props:{
    overlay: {
        type : Boolean,
        default: true
    },
},
data(){
    return {
        
    }
}
}
</script>