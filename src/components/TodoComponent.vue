<template>
    <div class="todo-container">
        <h1>Task Counter</h1>
        <div>
            <input type="text" v-model="taskName"  placeholder="Name" />
            <button type="button" class="counter" @click="() => {addTask(taskName)}">
            Add Task
            </button>
        </div>
         <span>current val: {{ taskName }}</span>

        <div class="tasks-container" v-for="task in tasks">
            <div class="tasks-wrapper">
                <input type="checkbox" value="task.isDone"/>
                <p>{{ task.name }}</p>
                <button @click="deleteTask(task.name)">X</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive} from "vue"

const taskName = ref("")
const tasks = ref([]);
const filter = ref("all")

    function addTask(newTaskName){
        tasks.value.push({name: newTaskName, isDone: false})
        taskName.value = ''
    }
    
    function deleteTask(taskToBeDeleted){
        console.log('deleting task')
        tasks.value = tasks.value.filter((task) => {task.name !== taskToBeDeleted})
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