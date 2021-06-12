<template>
    <div class="container">
         <div class="row justify-content-center mt-2">
            <div class="col-md-10">
                <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
                    <router-link class="navbar-brand" exact to="/">Home</router-link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                        <li class="nav-item active">
                            <router-link exact :to="{ name: 'createPost' }" class="nav-link">Create New Post</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link exact :to="{ name: 'categories' }" class="nav-link">Categories</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Menu
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <router-link exact :to="{ name: 'createPost' }" class="nav-link">Create New Post</router-link>
                                <router-link exact :to="{ name: 'categories' }" class="nav-link">Categories</router-link>
                            </div>
                        </li>
                        </ul>
                    </div>
                </nav>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>
