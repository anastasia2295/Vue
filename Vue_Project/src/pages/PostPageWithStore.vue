<template>
    <div >
        <h1>Страница с постами</h1>
        <my-input
        v-focus
          :model-value="searchQuery"
          @update:model-value="setSearchQuery"
          placeholder="Поиск..."
        />
        <div class="app__btns">
          <my-button 
          @click="showDialog">
          Создать пост
        </my-button>  
        <my-select 
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
        />
        </div>
        
        <my-dialog v-model:show="dialogVisivle">
          <post-form
        @create="createPost"
        />  
        </my-dialog>
        <post-list 
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import MyButton from "@/components/Ul/MyButton.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import MySelect from "@/components/Ul/MySelect"
import MyInput from "@/components/Ul/MyInput"
export default {
    components: {
        PostList, PostForm, MyButton, MySelect, MyInput
    },
    data() {
        return{
            dialogVisivle: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost(post) {
            this.posts.push(post)
        },
        removePost(post) {
            this.posts = this.posts.filter(p=>p.id !== post.id)
        },
        showDialog() {
            this.dialogVisivle= true
        },
        
      },
        mounted() {
          this.fetchPosts()
    },
    computed: {
        ...mapState({
            posts: state=>state.post.posts,
            isPostsLoading: state=>state.post.isPostsLoading,
            selectedSort: state=>state.post.selectedSort ,
            searchQuery: state=>state.post.searchQuery,
            page: state=>state.post.page,
            limit: state=>state.post.limit ,
            totalPages: state=>state.post.totalPages,
            sortOptions: state=>state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchPosts'
        })
    },
    watch:{
        // page() {
        //     this.fetchPosts()
        // }
    }
}
</script>

<style scoped>

.app__btns{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
.page__wrapper{
    display: flex;
    margin-top: 15px;
}
.page{
    border: 1px solid black;
    padding: 10px;
}
.current-page{
    border: 2px solid green;
}
.observer{
    height: 30px;
}
</style>