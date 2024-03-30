<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <div class="app__btns">
          <my-button 
          @click="showDialog">
          Создать пост
        </my-button>  
        <my-select 
        v-model="selectedSort"
        :options="sortOptions"
        />
        </div>
        
        <my-dialog v-model:show="dialogVisivle">
          <post-form
        @create="createPost"
        />  
        </my-dialog>
        <post-list 
        :posts="posts"
        @remove="removePost"
        v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import MyButton from "./components/Ul/MyButton.vue";
import axios from "axios"
import MySelect from "@/components/Ul/MySelect"
export default {
    components: {
        PostList, PostForm, MyButton, MySelect
    },
    data() {
        return{
            posts: [],
            dialogVisivle: false,
            isPostsLoading: false,
            selectedSort: "",
            sortOptions: [
                {value: "title", name: "По названию"},
                {value: "body", name: "По содержимому"}
            ]
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post)
        },
        removePost(post) {
            this.posts = this.posts.filter(p=>p.id !== post.id)
        },
        showDialog() {
            this.dialogVisivle= true
        },
        async fetchPosts(){
            try{
                this.isPostsLoading = true
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10")
                this.posts = response.data
        }catch(e) {
            alert("Error")
             } finally{
                this.isPostsLoading = false
             }
          }
      },
        mounted() {
            this.fetchPosts()
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app{
    padding: 20px;
}
.app__btns{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}


</style>