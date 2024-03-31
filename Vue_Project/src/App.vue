<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-input
          v-model="searchQuery"
          placeholder="Поиск..."
        />
        
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
        :posts="sortedAndSearchedPosts"
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
import MyInput from "@/components/Ul/MyInput"
export default {
    components: {
        PostList, PostForm, MyButton, MySelect, MyInput
    },
    data() {
        return{
            posts: [],
            dialogVisivle: false,
            isPostsLoading: false,
            selectedSort: "",
            searchQuery: "",
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
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1,post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch:{
        
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