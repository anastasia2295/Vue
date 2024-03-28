<template>
    <div>
        <button @click="addLike">like</button>
        <button @click="addDislike">dislike</button>
    </div>Количество лайков: {{ likes }}<div>
    </div>Количество дислайков: {{ dislikes }}<div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            likes: 0,
            dislikes: 5,
        }
    },
    methods: {
        addLike() {
            this.likes += 1
        },
        addDislike() {
            this.dislikes -=1
        }
    }
}
</script>