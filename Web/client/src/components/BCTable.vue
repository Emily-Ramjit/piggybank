<template>
  <div>

    <div :class="{'overflow': overflow}" style="width: 100%;">
      <table
        class="table table-hover"
        :class="[{'table-bordered': bordered, 'table-small': small}]"
      >
        <thead>
          <tr class="pre-header" v-if="$slots.titleheader !== null">
            <slot name="beforeHeader"/>
          </tr>
          <tr>
            <th v-if="selectable" class="table-view-pf-select" aria-label="Select all rows">
              <label>
                <span class="sr-only">Select all rows</span>
                <b-form-checkbox class="mt-1"></b-form-checkbox>
              </label>
            </th>
            <th
              v-for="(heading, i) in headings"
              aria-colindex="1"
              :class="{
          'text-sm-right': (headingTypes[i] == 'numeric'),
          sorting: sortable && heading != sortBy,
          sorting_asc: sortable && heading == sortBy && sortDirection == 'asc',
          sorting_desc: sortable && heading == sortBy && sortDirection == 'desc',
        }"
              :style="headingStyles[i]"
              :key="i"
              @click="setSortBy(heading, heading != sortBy ? sortDirection : sortDirection == 'desc' ? 'asc': 'desc')"
            >
              <i
                class="fas fa-caret-down"
                v-if="sortable && heading == sortBy && sortDirection == 'desc'"
              ></i>
              <i
                class="fas fa-caret-up"
                v-if="sortable && heading == sortBy && sortDirection == 'asc'"
              ></i>
              {{heading}}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="$slots.firstRow !== null">
            <slot name="firstRow"/>
          </tr>
          <tr v-for="(item, i) in rows" :key="i">
            <td v-if="selectable">
              <label>
                <span class="sr-only">Select row {{i}}</span>
                <b-form-checkbox class="mt-1"></b-form-checkbox>
              </label>
            </td>
            <td
              v-for="(heading, i ) in headings"
              :key="i"
              :class="[{'text-sm-right': (headingTypes[i] == 'numeric')}]"
            >
              <slot :name="heading" :item="item"/>
            </td>
          </tr>
          <tr v-if="$slots.lastRow !== null">
            <slot name="lastRow"/>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "bleau-table",
  props: {
    page: Number,
    headings: {
      type: Array
    },
    headingTypes: {
      type: Array
    },
    headingStyles: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
    totalItems: {
      type: Number,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    itemsPerPageOptions: {
      type: Array,
      default: () => [10, 25, 50, 100, 500]
    },
    bordered: {
      type: Boolean,
      default: false
    },
    sortBy: String,
    sortDirection: String,
    sortable: Boolean,
    searchable: Boolean,
    pageable: {
      type: Boolean,
      default: false
    },
    overflow: {
      type: Boolean,
      default: false
    },
    selectable: Boolean,
    small: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    setSortBy(heading, direction, office) {
      this.$emit("update:sortBy", heading);
      this.$emit("update:sortDirection", direction);
    }
  }
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
}
.pagination li {
  display: block;
}

label {
  margin-bottom: 0px;
}
.sorting_asc {
  border-top: 3px solid #144161;
  color: #5c6ac4;
}

.sorting_desc {
  border-top: 3px solid #144161;
  color: #5c6ac4;
}
.sorting {
  cursor: pointer;
}
.sorting:hover {
  color: #5c6ac4;
}
th {
  font-weight: 600;
  background-color: #f4f6f8;
}
.pre-header {
  border: none;
}
.pre-header > td {
  border: none;
}
.overflow {
  overflow-x: scroll;
}
.table-small {
  font-size: 0.85em;
}
</style>
