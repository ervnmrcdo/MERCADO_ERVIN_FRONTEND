<template>
    <div class="todo-container">
        <h1>Task Counter</h1>
        <div>
            <input type="text" v-model="newTaskName"  placeholder="Name" />
            <button type="button" class="counter" @click="addTask" @keyup.enter="addTask">
            Add Task
            </button>
        </div>
         <span>Total Tasks: {{ totalCount }} | Done: {{ doneCount }} | Ongoing: {{ pendingCount }} </span>

        <div class="">
            <button type="button" class="" @click="setFilter('all')">
                All
            </button>
            <button type="button" class="" @click="setFilter('done')">
                Done
            </button>
            <button type="button" class="" @click="setFilter('pending')">
                Pending
            </button>

        </div>
        
        <div class="">
            <button type="button" class="counter" @click="addTask">
            Clear All Done
            </button>
        </div>


        <div v-if="totalCount === 0" class="tasks-container">
            <div class="tasks-wrapper">
                <p class="empty">No tasks yet. Add one above!</p>
            </div>
        </div>

        <div v-else="totalCount > 0" class="tasks-container" v-for="task in tasks" :key="task.id">
            <div class="tasks-wrapper">
                <input type="checkbox" v-model="task.isDone" :checked="task.isDone" @click="toggleTask(task)"/>
                <p>{{ task.name }}</p>
                <button @click="removeTask(task.id)">X</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import {ref, reactive, computed, watch} from "vue"

const newTaskName = ref("")
const tasks = ref([]);
const filteredTasks = ref([]);
const filter = ref("all") // all | done | pending
const taskId = ref(1)


const totalCount = computed(() => {return tasks.value.length})
const doneCount = computed(() => {return tasks.value.filter((task) => task.isDone).length})
const pendingCount = computed(() => {return tasks.value.filter((task) => !task.isDone).length})


    function addTask(){
        if (newTaskName === "") return;

        tasks.value.push({id: taskId.value, name: newTaskName.value, isDone: false})
        taskId.value = taskId.value + 1;
        newTaskName.value = ""
    }
    
    function removeTask (id){
        tasks.value = tasks.value.filter((task) => {return task.id !== id})
    }

    function toggleTask(task) {
        task.isDone = !task.isDone
    }

    function setFilter(newFilterValue){
        filter.value = newFilterValue

    }

    function clearAllDone(){ 

    }


</script>

<style lang="scss" scoped>

.todo-container{
    display: block;
}

.tasks-container{
    justify-items: center;
    margin-top: 10px;
}
.tasks-wrapper{
    justify-items: center;
    display: flex;
    flex-direction: row;
    gap: 5px;
    border-style: solid;
    padding: 5px;
    border-width: 1px;
}
</style>