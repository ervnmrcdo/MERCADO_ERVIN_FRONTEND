<template>
    <div class="todo-container">
        <h1>Task Counter</h1>
        <div>
            <input type="text" v-model="newTaskName"  placeholder="Name" />
            <button type="button" class="counter" @click="() => {addTask(newTaskName)}">
            Add Task
            </button>
        </div>
         <span>Total Tasks: {{ totalTasks }} | Done: {{ totalFinishedTasks }} | Ongoing: {{ totalOngoingTasks }} </span>

        <div class="tasks-container" v-for="task in tasks">
            <div class="tasks-wrapper">
                <input type="checkbox" value="task.isDone" :checked="task.isDone" @click="modifyStatus(task)"/>
                <p>{{ task.name }}</p>
                <button @click="deleteTask(task.name)">X</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, computed, watch} from "vue"

const newTaskName = ref("")
const tasks = ref([]);
const filter = ref("all")
const totalTasks = computed(() => {return tasks.value.length})
const totalFinishedTasks = computed(() => {return tasks.value.filter((task) => task.isDone).length})
const totalOngoingTasks = computed(() => {return tasks.value.filter((task) => !task.isDone).length})


    function addTask(taskName){
        tasks.value.push({name: taskName, isDone: false})
        newTaskName.value = ""
    }
    
    function deleteTask(taskName){
        tasks.value = tasks.value.filter((task) => {task.name !== taskName})
    }

    function modifyStatus(task) {
        task.isDone = !task.isDone
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