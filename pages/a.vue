<template>
    <div class="container">
        <h1 class="title">
            Secret
        </h1>
        <client-only>
            <ckeditor v-model="editorData" :config="editorConfig" value="Hello, World!" @change="handleChange" />
        </client-only>
        <el-button @click="show">
            abc
        </el-button>
        <p v-html="editorData" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data: () => ({
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
            // The configuration of the editor.
        }

    }),
    methods: {
        handleChange() {
            console.log(this.editorData);
        },
        show() {
            console.log(this.editorData);
        }
    }

});
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}
</style>
