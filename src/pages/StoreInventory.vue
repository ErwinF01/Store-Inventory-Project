<template>
<q-layout view="hHr lpR fFf">
  
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
  
  <q-drawer show-if-above  side="left" behavior="desktop" bordered>
    
    <div class="column q-gutter- q-ma-sm">
   
    <q-btn color="black" icon="print" label="Print table" @click="ink"/>
    </div>
    <div class="q-pa-md q-gutter-sm">
    <q-btn label="Add Item" color="primary" @click="alert = true" />
    
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Item</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
      <div class="column q-gutter- q-ma-sm">
      <q-input filled
      class="col"
       :modelValue="Id" 
       
      @update:modelValue="updateIdText"  label="id" />
      </div>
      <div class="column q-gutter- q-ma-sm">
      <q-input filled
      class="col"
       :modelValue="Price" 
      @update:modelValue="updatePriceText"  label="price" />
      </div>
      <div class="column q-gutter- q-ma-sm">
      <q-input filled
      class="col"
       :modelValue="ItemName" 
      @update:modelValue="updateItemText"  label="item" />
      </div>
      <div class="column q-gutter- q-ma-sm">
      <q-input filled
      class="col"
       :modelValue="Quantity" 
      @update:modelValue="updateQuantityText" 
      @keyup.enter="addItem"  
       label="quantity" />
      <q-btn @click="addItem"  icon="add" label="" v-close-popup />
      </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  </q-drawer>

<q-page-container>
  <div id = "forPrint" class="q-pa-md">
  
   <q-table
      :rows="rows"
      :columns="columns"
      title="Store Inventory"
      :rows-per-page-options="[]"
      row-key="name"
      :filter="filter"
      :data="data"
     
    >
    <!-- <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>  -->
   
      <template v-slot:body="props"  >
     
          <q-tr  :props="props" v-for="(row,k) in data.rows" :key="row.k" >
          <q-td key="Id" :props="props" >
            {{ row.Id }}
            <q-popup-edit v-model ="row.Id" title="Edit the Name"  >
              <q-input v-model="rows.Id" dense autofocus counter @keyup.enter="updateId(row._id,rows.Id)"  v-close-popup/>
            </q-popup-edit>
          </q-td>
          <q-td key="ItemName" :props="props" >
            {{row.ItemName }}
            <q-popup-edit v-model.number="row.ItemName" >
              <div class="text-italic text-primary">
               Item Name
              </div>
              <q-input v-model.number="rows.ItemName" dense autofocus @keyup.enter="updateItemName(row._id,rows.ItemName)"  v-close-popup />
            </q-popup-edit>
          </q-td>
         <q-td key="Quantity" :props="props">
            {{ row.Quantity }}
            <q-popup-edit v-model.number="rows.Quantity" >
              <div class="text-italic text-primary">
               Insert Quantity
              </div>
              <q-input type="number" v-model.number="rows.Quantity" dense autofocus @keyup.enter="updateQuantity(row._id,rows.Quantity)"  v-close-popup />
            </q-popup-edit>
          </q-td>
          <q-td key="Price" :props="props">
            {{'Php '}} {{ row.Price}}
            <q-popup-edit v-model="rows.Price" >
              <div class="text-italic text-primary">
               Insert Price
              </div>
              <q-input v-model="rows.Price" dense autofocus @keyup.enter="updatePrice(row._id,rows.Price)"  v-close-popup />
            </q-popup-edit>
          </q-td>    
          <q-td> <q-btn @click="removeItem(row._id)" round size="sm" flat icon="delete" color="red"/> </q-td>
        </q-tr>
      </template>
    </q-table>
</div>
</q-page-container>
<q-footer class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://media.istockphoto.com/vectors/vegetables-on-shopping-cart-trolley-grocery-logo-icon-design-vector-vector-id1205419959?k=20&m=1205419959&s=612x612&w=0&h=F4gyp5wuFkCaZr00OQS8KPCSE1_4pHmFiOIM2TQlOPI=">
          </q-avatar>
          <div>Batch 43 ZyberLabs</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

</q-layout>
 
</template>


<script setup>

import { ref,reactive,computed,inject } from 'vue'; 
  import print from 'ink-html'

  
  let Id = ref('')
  let ItemName = ref('')
  let Price = ref('')
  let Quantity = ref('')


    const updateIdText = (val) =>Id.value = val
    const updateItemText = (val) =>ItemName.value = val
    const updatePriceText = (val) =>Price.value = val
    const updateQuantityText = (val) =>Quantity.value = val


  async function addItem(){
  
    await inventoryService.create({
      Id:Id.value,
      ItemName:ItemName.value,
      Quantity:Quantity.value,
      Price:Price.value,
       
    })
    console.log('new items ',rows)
    Price.value=''
    Id.value=''
    ItemName.value=''
    Quantity.value=''
   
  }
// const find = async () => {
  
//   const searchResult = await inventoryService.find({
//     query: {
//       ItemName: ItemName.value 
//   }
// })
// console.log('searchResult',searchResult)
// }
// find()
  

  const removeItem=(k)=>inventoryService.remove(k)

const updateId =(k,newId)=>(
  inventoryService.patch(k,{
Id: newId
  })
)
  const updateItemName =(k,newItemName)=>(
  inventoryService.patch(k,{
ItemName: newItemName
  })
)
const updateQuantity =(k,newQuantity)=>(
  inventoryService.patch(k,{
Quantity: newQuantity
  })
)
const updatePrice =(k,newPrice)=>(
  inventoryService.patch(k,{
Price: newPrice
  })
)

  // data.rows.splice(k,1)
  
  
  function ink(){
    print(document.querySelector('#forPrint'))
  }

const columns = [

  
  { name: 'Id', align: 'center', label: 'Id', field: 'Id', sortable:  true ,field: row => row.name,
    format: val => `${val}`,},
  { name: 'ItemName', label: 'Item Name', field: 'ItemName', sortable: true },
  { name: 'Quantity', label: 'Quantity', field: 'Quantity', sortable: true },
  { name: 'Price', label: 'Price', field: 'Price', sortable: true },
]

const rows = [
  {
    name: 'markip ',
    Id:'123',
    ItemName:'markip1',
    Quantity:'2',
    Price:'10',
    id: '1234567'
    
  }

 
]
const data = reactive({
    rows
  }) 
  const inventoryService =inject('inventoryS')
  inventoryService.on('dataChange', (rows)=>{
    data.rows= [...rows]
  })
  inventoryService.init()

//  const dataFilter = computed(()=> {
// return data.rows.length 
// })

  console.log(rows)


  const    alert =  ref(false)
 const  filter = ref('')
  
 
 
   


</script>
