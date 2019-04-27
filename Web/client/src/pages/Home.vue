<template>
  <BC-page fullWidth>
    <BC-page-header
      :title="'Welcome To PiggyBank!'"
    >
    </BC-page-header>
    
    <hr/>
    <BC-layout>
      <BC-layout-section>
        <BC-card style="min-width: 200%;">
          <div class="balances">
          YOUR BALANCE
               </div>
          <p>
           As of {{date}} </p>
          <hr/>

          <p>
           Wallet - $10.00
            </p>
          </div>
        </BC-card>

        <div class="pt-3">
         <BC-card style="min-width: 200%;">
          <div class="createTransaction">
          CREATE TRANSACTION
          </div>
          <hr/>
          <BC-select
                :placeholder="search.businessSelect.placeholder"
                :options="search.businessSelect.options"
                :selected.sync="search.businessSelect.value"
                :error="search.businessSelect.error"
                v-model="search.businessSelect.value"
                @selected="handleBusinessSelect"
                >
          </BC-select>
          <div class="pt-2">
         <BC-select
                :placeholder="search.itemSelect.placeholder"
                :options="search.itemSelect.options"
                :selected.sync="search.itemSelect.value"
                :error="search.itemSelect.error"
                v-model="search.itemSelect.value"
                @selected="handleItemSelect"
                >
          </BC-select>
          </div>

          <hr/>

          <h3> </h3>
          Transaction Information
          <hr/>
          <p>
          <b-col>
              Wallet Balance - $5.00
          </b-col>

          <b-col>
              Item Price - $2.00
          </b-col>
          <hr/>
          <b-col>
              New Balance - $3.00
          </b-col>
          </p>

          <div class="pt-2">
          <BC-button class="float-right"> Confirm </BC-button>   
          </div>

        </BC-card>
        </div>

      </BC-layout-section>
        <div class="transaction">
         <BC-card style="min-width: 260%;">
          <div class="transactions">
          RECENT TRANSACTIONS
          <hr/>
          </div>
          <table style="width:100%">
              <tr>
                <th>Id</th>
                 <th> Transaction Date </th>
                <th>Organization</th>
                 <th>Item</th>
                <th >Amount</th>
              </tr>
              <tr>
                <td>0</td>
                <td>4/26/2019</td>
                <td>Business1</td>
                <td>Item1</td>
                <td>$5.00</td>
              </tr>
             <tr>
                <td>1</td>
                <td>4/23/2019</td>
                <td>Business2</td>
                <td>Item3</td>
                <td>$10.00</td>
              </tr>
              <tr>
                <td>2</td>
                <td>4/21/2019</td>
                <td>Business3</td>
                <td>Item3</td>
                <td>$3.00</td>
              </tr>
            </table>


          <!-- <BC-table :rows='transactionTable.rows'
                    :headings='transactionTable.headings'
                    >
          </BC-table> -->

        </BC-card>
        </div>

       <BC-layout-section>

       </BC-layout-section>

    </BC-layout>
  </BC-page>
</template>

<script>

// import api from '@/api/PiggyBank'

export default {

  mounted () {

  },

  data () {
    return {
      page: {
        header: {
          title: 'PiggyBank'
        },
        isLoaded: false
      },
      transactionTable: {
        headings: [
          { heading: 'Id', type: 'text', style: null },
          { heading: 'Business', type: 'text', style: null },
          { heading: 'Item', type: 'text', style: null },
          { heading: 'Amount', type: 'text', style: null },
          { heading: 'Transaction Date', type: 'text', style: null }
        ],
        sortBy: 'Total',
        sortDirection: 'desc',
        rows: [ {
          Id: '1',
          Business: 'test',
          Item: 'test Item',
          Amount: '$5.00',
          TransactionDate: '3/30/2019'
        },
        {
          Id: '1',
          Business: 'test',
          Item: 'test Item',
          Amount: '$5.00',
          TransactionDate: '3/30/2019'
        }]
      },
      search: {
        businessSelect: {
          placeholder: 'Select a Business..',
          options: [{ label: 'testbusiness1', value: 'testbusiness1' }],
          value: null,
          disabled: false,
          error: null
        },
        itemSelect: {
          placeholder: 'Select a Business..',
          options: [{ label: 'testitem1', value: 'testitem1' }],
          value: null,
          disabled: false,
          error: null
        },
      },
      fields: {
        Category: {
          key: 'Category',
          label: 'Category',
          sortable: true
        },
        Description: {
          key: 'Description',
          label: 'Description',
          sortable: true
        },
        Date: {
          key: 'Date',
          label: 'Incident Date',
          sortable: true
        }
      },
      items: [
        { Category: 'Rape', Number_of_Occurences: 3, Date: '3/20/2019' },
        { Category: 'Assault', Number_of_Occurences: 5, Date: '3/20/2019' },
        { Category: 'Murder', Number_of_Occurences: 1, Date: '3/20/2019' },
        { Category: 'Robbery', Number_of_Occurences: 3, Date: '3/20/2019' }
      ],

      date: new Date().toLocaleDateString()
    }
  },
  methods: {
    fetch () {
      this.rows = [ {
          Id: '1',
          Business: 'test',
          Item: 'test Item',
          Amount: '$5.00',
          TransactionDate: '3/30/2019'
        },
        {
          Id: '1',
          Business: 'test',
          Item: 'test Item',
          Amount: '$5.00',
          TransactionDate: '3/30/2019'
        }]
      // get Businesses 
      // set Businesses

      // get Items
      // set Items

      // get User Balance
      // set User Balance

      // get User Transactions
      // set User Transactions 
    },
    handleBusinessSelect (){
      // set items
    },  
    handleItemSelect () {
      // set new balance
    }
  }
  
}

</script>

<style>
.nav-tabs .nav-item {
  margin-bottom: -2px;
  z-index: 5;
}
.table td.text {
  max-width: 177px;
}
.text-overflo {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
}
.balances {
  color:#6f76da;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 1px;
}

.transactions{
  color:#6f76da;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 1px;
}

.createTransaction{
  color:#6f76da;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 1px;
}
.transaction{
  padding-left:20%;
}

</style>
