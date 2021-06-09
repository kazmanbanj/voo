<template>
    <div>
        <p>categs</p>
        <ul>
            <li v-for="category in categories" :key="category.id">{{ category.name }}</li>
        </ul>
    </div>
</template>

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
