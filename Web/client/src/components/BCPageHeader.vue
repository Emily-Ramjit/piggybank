<template>
<div>

    <b-row class="mb-1">
      <div class="col-sm-24">
        <h2>{{title}}</h2>
      </div>
    </b-row>

    <div class="row mb-2" :class="{'border-bottom': separator}" v-if="$slots['action-right'] || $slots['action-left']">
      <div class="col-sm-24">
        <div class="float-left">
          <slot name="action-left"/>
        </div>

        <div class="float-right">
          <slot name="action-right"/>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'BC-page-header',

  props: {
    title: { type: String, default: '' },
    separator: Boolean,
    breadcrumbs: {
      type: Array,
      default () {
        return []
      }
    }
    // primaryAction: Object,
    // secondaryActions: {
    //   type: Array,
    //   default () {
    //     return []
    //   }
    // },
    // pagination: Object
  }
}
</script>
