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
          <!-- {{this.user.balance}} -->
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
             <!-- {{this.user.balance}} -->
              Wallet Balance - $5.00
          </b-col>

          <b-col>
              <!-- {{this.search.itemSelect.value}} -->
              Item Price - $2.00
          </b-col>
          <hr/>
          <b-col>
            <!-- {{this.userNewBalance}} -->
              New Balance - $3.00
          </b-col>
          </p>

          <div class="pt-2">
          <BC-button class="float-right" @click.native="CreateTransaction()"> Confirm </BC-button>   
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
            <!-- <v-for item in transactionTable.rows >
              <tr>
                <td>{{item.id}}</td>
                <td>{{item.date}}</td>
                <td>{{item.business}}</td>
                <td>{{item.item}}</td>
                <td>{{item.amount}}</td>
              </tr> -->
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

import api from '@/api/PiggyBank'

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
          placeholder: 'Select a Item..',
          options: [{ label: 'testitem1', value: 'testitem1' }],
          value: null,
          disabled: false,
          error: null
        }
      },
      date: new Date().toLocaleDateString(),
      userNewBalance: 0
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
        api.getUserInfo (userId)
          .then(res => {
            // this.user = res.data
        })
        api.getUserTransactions (userId) 
          .then(res => {
             // this.transactionTable.rows = res.data
          })

        api.getBusinesses()
        .then(res => {  
          this.search.businessSelect.options = res.data.businesses.map((business) => {
              return {
                label: business.name,
                value: business.id
              }
          })
        })
    },
    handleBusinessSelect (businessId){
      // set items
        api.getItems(businessId)
        .then(res => {  
          this.search.itemSelect.options = res.data.items.map((item) => {
              return {
                label: item.name,
                value: item.price
              }
          })
        })
    },  
    handleItemSelect () {
      // set new balance
      this.userNewBalance = this.userBalance - this.itemPrice
    },
    CreateTransaction () {
      // var params = {
      //   userId = this.user.id
      // }
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
