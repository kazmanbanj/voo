import Posts from '../components/posts/PostsComponent.vue'
import CreatePost from '../components/posts/CreatePostComponent.vue'
import EditPost from '../components/posts/EditPostComponent.vue'
import Categories from '../components/posts/ListCategoriesComponent.vue'


export default {
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Posts },
        { path: '/create', name: 'createPost', component: CreatePost },
        { path: '/edit/:id', name: 'editPost', component: EditPost },
        { path: '/categories', name: 'categories', component: Categories },
    ]
}

