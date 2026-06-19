<!--
=============================================================
  DAY 5 ASSIGNMENT — TodoListView.vue
  Uses useFetch() to load and display todos from JSONPlaceholder
=============================================================
-->
<script setup>
import { ref, computed } from 'vue'
import { useFetch } from "../composables/useFetch.js"

const API_URL = "https://jsonplaceholder.typicode.com/users"


const { data: users, loading, error, refetch } = useFetch(API_URL)

const filter = ref('all') // 'all' | 'done' | 'pending'

// TODO 1: Call useFetch with the JSONPlaceholder todos endpoint
// Rename 'data' to 'todos' using destructuring alias syntax
// const { data: todos, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos')
function setFilter(newFilter) {
    filter.value = newFilter
}

// TODO 2: Create a filteredTodos computed() that:
//  - Returns [] if todos.value is null (still loading)
//  - Filters by filter.value ('all' shows first 20, 'done' shows completed, 'pending' shows incomplete)
// const filteredTodos = computed(() => { ... })
const filteredUsers = computed(() => {
    if (!users.value) return [] // still loading
    if (filter.value === 'all') return users.value.slice(0, 20)
    if (filter.value === 'done') return users.value.filter(user => todo.completed)
    if (filter.value === 'pending') return users.value.filter(user => !todo.completed)
    return []
})

</script>

<template>
    <div class="todo-view">
        <h1>📋 User List</h1>
        <p class="subtitle">Loaded from JSONPlaceholder API</p>

        <!-- TODO 3: Show a loading message/spinner while loading is true -->
        <div v-if="loading">spinner</div>

        <!-- TODO 4: Show an error message if error has a value -->
        <div v-if="error">There was an error fetching the data: {{ error }}</div>

        <!-- TODO 5: Show the content block when NOT loading and NO error -->
        <div v-if="!loading && !error">
            <!-- Filter buttons -->
            <div class="filters">
                <input type="textbox">

            </div>

            <!-- TODO 7: Render filteredTodos using v-for -->
            <ul v-for="user in filteredUsers" class="todo-list">
                <!-- li with checkbox (disabled, reflects todo.completed) and title -->
                <li>
                    <span>{{ user.name }}</span>
                    <span>{{ user.name }}</span>
                </li>
            </ul>

            <!-- TODO 8: Show count of visible items -->
        </div>
    </div>
</template>

<style scoped>
.todo-view {
    max-width: 560px;
    margin: 40px auto;
    padding: 24px;
    font-family: Arial, sans-serif;
}

h1 {
    color: #1B2A4A;
    margin-bottom: 4px;
}

.subtitle {
    color: #9ca3af;
    font-size: 13px;
    margin-bottom: 20px;
}

.loading {
    text-align: center;
    padding: 48px;
    color: #42B883;
    font-size: 16px;
}

.error-box {
    background: #fef2f2;
    border: 1px solid #fca5a5;
    border-radius: 8px;
    padding: 16px;
    color: #dc2626;
}

.filters {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.filters button {
    padding: 6px 16px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    font-size: 13px;
}

.filters button.active {
    background: #42B883;
    color: white;
    border-color: #42B883;
}

.todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.todo-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: white;
    border-radius: 6px;
    margin-bottom: 6px;
    border: 1px solid #eee;
    font-size: 14px;
}

.todo-list li.done-item {
    opacity: 0.6;
}

.todo-list li span {
    flex: 1;
}

.completed-text {
    text-decoration: line-through;
    color: #9ca3af;
}

.count {
    font-size: 13px;
    color: #9ca3af;
    margin-top: 12px;
    text-align: right;
}
</style>
