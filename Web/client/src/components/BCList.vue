<template>
  <div class="list-group mb-2">
    <BC-textfield v-if="search"
      placeholder="Search..."
      v-model="search"
    ></BC-textfield>

    <BC-list-item v-for="(item, i) in orderedItems" :key="i"
      :shortcutActions="item.shortcutActions"
      :persistentActions="true"
    >
      <template slot="media">
        <slot name="media" :item="item" :index="i"/>
      </template>

      <template slot="body">
        <slot name="body" :item="item" :index="i"/>
      </template>

      <h4>{{item.secondary}}</h4>
      <div>{{item.tertiary}}</div>

      <!-- <template slot="action">
        <slot name="action" :item="item" :index="i"/>
      </template> -->

    </BC-list-item>

  <BC-pagination v-if="pageable"
    :totalItems="items.length"
    :itemsPerPage="itemsPerPage"
    :itemsPerPageOptions="itemsPerPageOptions"
    :page.sync="page"
    @update:itemsPerPage="setItemsPerPage"
  ></BC-pagination>
  </div>
</template>

<script>
import * as Fuse from 'fuse.js'
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    itemsPerPageOptions: {
      type: Array,
      default: () => [10, 25, 50, 100, 500]
    },
    sortable: Boolean,
    selectable: Boolean,
    pageable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sortBy: 'Id',
      sortDirection: 'asc',
      page: 1,
      itemsPerPage: 10,
      search: ''
    }
  },
  computed: {
    orderedItems: function () {
      // var keys2 = Object.keys(this.items[0])
      // console.log(this.itemsPerPage)
      var options = {
        shouldSort: true,
        threshold: 0.0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1// ,
        // keys: keys2
      }
      var fuse = new Fuse(this.items, options)
      var SearchedItems
      if (this.search !== '') {
        SearchedItems = fuse.search(this.search)
      } else {
        SearchedItems = this.items
      }
      var OrderItems = this._.orderBy(SearchedItems, [this.sortBy, 'Id'], this.sortDirection)
      if (this.pageable) {
        var offset = (this.page - 1) * this.itemsPerPage
        return this._.drop(OrderItems, offset).slice(0, this.itemsPerPage)
      } else {
        offset = 0
        return this._.drop(OrderItems, offset).slice(0, this.items.length)
      }
    }
  },
  methods: {
    setSortBy (heading, direction) {
      this.sortDirection = direction
      this.sortBy = heading
    },
    setItemsPerPage (itemsPerPage) {
      // console.log(itemsPerPage)
      this.itemsPerPage = itemsPerPage
    }
  }
}
</script>

<style>

</style>
