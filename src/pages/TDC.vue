<template>
  <q-layout view="hHr lpR lFr">

<q-header class="bg-secondary text-white">
  <q-toolbar>
    <q-toolbar-title>
      <q-avatar>
        <img src="https://media.istockphoto.com/vectors/vegetables-on-shopping-cart-trolley-grocery-logo-icon-design-vector-vector-id1205419959?k=20&m=1205419959&s=612x612&w=0&h=F4gyp5wuFkCaZr00OQS8KPCSE1_4pHmFiOIM2TQlOPI=">
      </q-avatar>
      Store Inventory
    </q-toolbar-title>
  </q-toolbar>
</q-header>

<q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
  <div class="column q-gutter- q-ma-sm">
  <q-input filled
  class="col"
   :modelValue="task" 
   @keyup.enter="add"
  @update:modelValue="updateTaskText"  label="Task" />
  <q-btn @click="add2" icon="add" label="add"/>
  </div>
  
</q-drawer>
<q-page-container>
  <q-list bordered separator>
    <q-item clickable v-ripple v-for="(todo,i ) in filteredTodos" :key="todo.id">
      <q-item-section avatar>
        <q-checkbox :modelValue="todo.isDone" @click="updateStatus(i,todo.isDone)"/>
      </q-item-section>
      <q-item-section 
      :class="{'text-grey strike-through':todo.isDone}"
      >
      {{i}}
      <q-input v-if="editing===i" v-model = "todo.desc" @keyup.esc="editing=-1" @blur="editing=-1"/>
      <span v-else @dblclick="editing= i">{{todo.desc}}</span>
    </q-item-section>
      <q-item-section side>
        <q-btn @click="removeTodo(i)" round size="sm" flat icon="delete" color="red"/>
      </q-item-section>
    </q-item>
  </q-list>
  <div id = "forPrint" class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit v-model="props.row.calories" title="Update calories" buttons v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            <div class="text-pre-wrap">{{ props.row.fat }}</div>
            <q-popup-edit v-model="props.row.fat" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
            <q-popup-edit v-model="props.row.carbs" title="Update carbs" buttons persistent v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
        </q-tr>
        <q-btn @click="removeTodo(i)" round size="sm" flat icon="delete" color="red"/>
      </template>
    </q-table>
  </div>
  
</q-page-container>
</q-layout>

  <q-toolbar class="bg-primary text-white">
    <q-avatar>
      <img src="https://logopond.com/logos/4ef3906c9667cbcc660bc76c407c29f1.png">
    </q-avatar>
    <q-toolbar-title>Inventory{{ task }}</q-toolbar-title>
  </q-toolbar>
 

  <AddComponent :num1 ="123" :num2="123" :answer="answer" @getAnswer="(val)=>answer=val"/>
  <pie-chart :donut="true" :data="[['active', itemsLeft.length], ['completed', data.todos.length-itemsLeft.length]]"></pie-chart>
  
  <div>
    <q-btn round icon="import_contacts" @click="generatePDF('open')"/>
   <q-btn round icon="download" @click="generatePDF('download')"/>
    <q-btn round icon="print" @click="generatePDF('print')"/>
    <q-btn round icon="water_drop" @click="ink"/>
  </div>
  <!-- {{foods}}
  <mjfood :list="foods" name ="Trin" @ate="logAteFood"/> -->
  
</template>



<script setup>

import { ref,reactive,computed,inject } from 'vue';
// import mjfood from 'src/components/mjfood.vue'; 
import AddComponent from 'src/components/AddComponent.vue';
import print from 'ink-html'

const invntry = inject('inventory')
invntry.on('dataChange',(rows)=>{
})
invntry.init()
const answer= ref('unknown')
const foods = ref([
  'sinigang',
  'adobo',
  'mongo',
  'ice cream'

])
const view = ref('all')

function logAteFood(val){
  console.log('MJ ate',val)
  for (const food of foods.value) {
    console.log('forof',food)
  }
  // for (const index in foods.value) {
  //   console.log('forin',index)
  //   if(foods.value[index]===val){
  //     foods.value.splice(index,1)
  //     return
  //   }
      
  //   }
  const index = foods.value.findIndex(food=>food===val)
  foods.value.splice(index,1)
  }

const editing = ref(-1)

  let task =ref('Trin')

  const todos = [
    {
      id: 'asgasdfagaasda',
      isDone: true,
      desc:'create a function',
    },
    {
      id: 'asgasdfagaassa',
      isDone: true,
      desc:'create add button',
    },
    {
      id: 'asg22sa',
      isDone: true,
      desc:'discuss reactive',
    }
  ]
  const data = reactive({
    todos
  })
  invntry.on('dataChange',(inventory)=>{
data.inventory =[...inventory]
})

  const itemsLeft= computed(() =>{
    return data.todos.filter(t => !t.isDone)
  })
  const filteredTodos= computed(() =>{
   switch(view.value){
    case 'active':
      return itemsLeft.value
      case 'completed':
      return data.todos.filter(t => t.isDone)
    default:
      return data.todos
   }
  })
  const updateTaskText = (val) =>task.value = val
function add(){
  data.todos.unshift({
    id:  Date.now(),
    isDone:false,
    desc:task.value,
  })
  console.log('new Todos ',todos)
  task.value=''
}
const removeTodo=(i)=> data.todos.splice(i,1)
const updateStatus = (i,status)=>{
  data.todos[i].isDone=!status
}
function ink(){
  print(document.querySelector('#forPrint'))
}


</script>
<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true, style: 'width: 10px' },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]

export default {
  setup () {
      {
      columns,
      rows: ref(rows)

    }
  }
}




   
  

</script>
<style>

  .strike-through{
    text-decoration:line-through;
  }
.title {
  color: pink;
  background-color: orange;
}
#title {
  color: red
}
h6 {
  color: blue
}
</style>