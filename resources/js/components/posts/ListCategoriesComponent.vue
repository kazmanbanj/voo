<template>
    <div class="py-3">
        <div class="cat-width justify-content-center">
            <ul class="list-group">
                <li class="list-group-item list-group-item-dark" v-for="category in categories" :key="category.id">{{ category.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.cat-width {
    width: 400px;
}
</style>

<script>
export default {
    data() {
        return {
            categories: {},
        }
    },
    mounted() {
        axios.get('/api/categories')
            .then(response => {
                this.categories = response.data.data;
            });
    },
};
</script>
