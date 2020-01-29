<template>
  <div class="container">
    <h1> A MEVN App</h1>
    <hr/>
    <form @submit="addTodo">
      <input type ='text' v-model="title" placeholder="Enter a task">
      <button v-if="this.isEdit == false"  type="submit" id="btn">Submit</button>
      <button v-else type="button" @click="updateTodo" id="btn">Update</button>
    </form>
    <br>
    <div>{{ error }} </div>
    <table class="todoList"
           v-for="todo in todos"
           v-bind:title="todo.title"
           v-bind:key="todo.id"
           v-bind:item="todo"
    >
      <tr>
        <td><h3>{{ todo.title }}</h3></td>
        <td><i class="fa fa-edit" style="color:green" @click="editTodo(todo.title, todo.id)"></i></td>
        <td><i class="fa fa-trash" style="color:red" @click="deleteTodo( todo.id )"></i></td>
      </tr>
    </table>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'TodoList',
        data(){
            return{
                todos: [],
                id:"",
                title:'',
                error:"",
                isEdit: false
            }
        },
        created(){
            this.getTodos()

        },
        methods:{

            getTodos(){
                let url = 'todos/'
                axios.get(url)
                    .then(result =>{
                        this.todos = result.data
                    })
                    .catch(error=> this.error = error
                    )
            },
            addTodo(e){
                e.preventDefault()
                let url = 'todos/'
                let newTodo ={
                    title: this.title,
                    completed:false
                }
                axios.post(url,newTodo)
                    .then( () =>{
                        this.todo = "";
                        this.getTodos()
                    })
                    .catch( error => this.error = error
                    )

            },
            deleteTodo(id){
                let url = 'todos/'
                axios.delete(`${url}${id}`)
                    .then(()=>{
                        this.getTodos()
                    })
                    .catch( error => this.error = error
                    )
            },
            editTodo(title,id){
                this.title=title;
                this.id = id;
                this.isEdit = true
            },
            updateTodo(){
                let url = 'todos/'
                axios.put(`${url}${this.id}`,{
                    title:this.title
                })
                    .then(()=>{
                        this.title='';
                        this.isEdit=false;
                        this.getTodos()
                    })
                    .catch(
                        error=>this.error=error
                    )

            }
        }
    }
</script>

<style scoped>
  .container{
    text-align: center;
  }
  h1{
    color: forestgreen;
  }
  form{
    margin: 0 auto;
    padding: 10px;
  }
  input[type=text]{
    border:none;
    border-bottom: 2px solid crimson
  }
  #btn{
    margin-left:5px;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
    border-radius: 5px;
  }
  .todoList{
    display:flex;
    justify-content: center
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  h3{
    color: #666666;
  }

</style>
