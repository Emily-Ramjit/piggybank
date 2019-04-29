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
             Item Price - ${{this.search.itemSelect.value}}
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
               <tr v-for="item in rows">
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
      userNewBalance: 0
    }
  },
  methods: {
    fetch () {
      this.rows = [ {
          Id: '1',
          TransactionDate: '3/30/2019',
          Business: 'testBusiness',
          Item: 'testItem',
          Amount: '$5.00'
        },
        {
          Id: '1',
          TransactionDate: '3/30/2019',
          Business: 'testBusiness2',
          Item: 'testItem2',
          Amount: '$5.00',
        }]
        var userId = 1
        api.getUserInfo(userId)
          .then(res => {
           console.log(res)
           this.userBalance = res.data[0].balance
        })
        api.getUserTransactions (userId) 
          .then(res => {
             // this.transactionTable.rows = res.data
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
    },
    handleBusinessSelect () {
      // set items
       var businessId = this.search.businessSelect.value
        api.getItems(businessId)
        .then(res => {  
          console.log(res)
          this.search.itemSelect.options = res.data.map((item) => {
              return {
                label: item.item_name,
                value: item.price
              }
          })
        })
    },  
    handleItemSelect () {
      // set new balance
      this.userNewBalance = this.userBalance - this.search.itemSelect.value
    },
    CreateTransaction () {
      var TransactionHash = 'randomvalue'
      var BlockId = 'randomBlockValue'
      var date = Date()

      var params = {
        itemId: this.item.id, 
        userId: this.user.id,
        businessId: this.businessSelect.value, 
        transactionHash: TransactionHash,
        hashVersion: TransactionHash,
        blockId: BlockId,
        transactionDateTime: date,
        newBalance: this.userNewBalance
      }
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
