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
          Wallet - ${{this.userBalance}}
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
            Wallet Balance - ${{this.userBalance}}
          </b-col>

          <b-col>
             Item Price - ${{this.itemPrice}}
          </b-col>
          <hr/>
          <b-col>
            New Balance - ${{this.userNewBalance}}
          </b-col>
          </p>

          <div class="pt-2">
          <BC-button class="float-right" @click.native="CreateTransaction()"> Confirm </BC-button>   
          </div>

        </BC-card>
        </div>

      </BC-layout-section>
        <div class="transaction">
         <BC-card style="min-width: 130%;">
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
               <tr v-for="item in transactionTable.rows">
                  <td v-for="(value, key) in item">
                {{value}}

              </td>
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

import api from '@/api/api'

export default {

  mounted () {
    this.fetch()
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
        rows: []
      },
      rows: [],
      search: {
        businessSelect: {
          placeholder: 'Select a Business..',
          options: [{ label: 'testbusiness1', value: 'testbusiness1' }],
          value: null,
          disabled: false,
          error: null
        },
        itemSelect: {
          placeholder: 'Select a Item..',
          options: [{ label: 'testitem1', value: 'testitem1' }],
          value: null,
          disabled: false,
          error: null
        }
      },
      date: new Date().toLocaleDateString(),
      userBalance: 0,
      userFirstName: '',
      userId: 0,
      userLastName: '',
      userNewBalance: 0,
      items: [],
      itemPrice: 0,
    }
  },
  methods: {
    fetch () {
      this.rows = []
        var userId = 1
        api.getUserInfo(userId)
          .then(res => {
           console.log(res)
           this.userBalance = res.data[0].balance
           this.userFirstName = res.data[0].first_name
           this.userId = 1
           this.userLastName = res.data[0].last_name
        })
        api.getUserTransactions (userId) 
          .then(res => {
             console.log(res.data)
              this.transactionTable.rows = res.data.map((transaction) => {
              return {
                    Id: transaction.t_id,
                    TransactionDate: transaction.transaction_date_time,
                    Business: transaction.business_name,
                    Item: transaction.item_name,
                    Amount: transaction.price,
              }
          })
          })

        api.getBusinesses()
        .then(res => {  
          console.log(res)
          this.search.businessSelect.options = res.data.map((business) => {
              return {
                label: business.business_name,
                value: business.b_id
              }
          })
        })
        api.getPreviousHash()
        .then(res => {
          this.previous_hash = res.data[0].previous_block_hash
          console.log(this.previous_hash)
        })
    },
    handleBusinessSelect () {
      // set items
       var businessId = this.search.businessSelect.value
        api.getItems(businessId)
        .then(res => {  
          console.log(res)
          this.items = res.data
          this.search.itemSelect.options = res.data.map((item) => {
              return {
                label: item.item_name,
                value: item.item_id
              }
          })
        })
    },  
    handleItemSelect () {
      // set new balance
      this.items.forEach(item => {
        if (item.item_id == this.search.itemSelect.value)
        this.itemPrice = item.price
      })
      this.userNewBalance = this.userBalance - this.itemPrice
    },
    CreateTransaction () {
      var TransactionHash = 'randomvalue'
      var BlockId = 'randomBlockValue'
      var date = Date()

      var params = {
        itemId: this.search.itemSelect.value, 
        userId: this.userId,
        user_first_name: this.userFirstName,
        user_last_name: this.userLastName,
        user_balance: this.userBalance,
        previous_block_hash: this.previous_hash,
        businessId: this.search.businessSelect.value, 
        transactionDateTime: date,
        newBalance: this.userNewBalance,
        previousHash: this.previous_hash
      }
      console.log(params)
      api.addTransaction(params) 
        .then(res => {
          this.fetch()
        })
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
