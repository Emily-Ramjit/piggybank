<template>
  <div class="list-group-item list-group-item-action" @mouseover="hover = true" @mouseleave="hover = false">
    <b-row>
      <!-- <b-col :cols="2" class="align-self-center mr-0" v-if="selectable">
        <b-form-checkbox></b-form-checkbox>
      </b-col> -->
      <div class="text-center col-sm-24 col-md-3 col-lg-2 col-xl-3 pl-1" v-if="$slots.media">
       <slot name="media"/>
      </div>
      <div class="col-sm-24 col-md-15 col-lg-18 col-xl-17" v-if="$slots.action">
        <slot name="body"/>
      </div>

      <div class="col-sm-24 col-md-15 col-lg-18 col-xl-17" v-if="!$slots.action">
        <slot name="body"/>
      </div>

      <div class="col-sm-24 col-md-6 col-lg-4 col-xl-4" v-if="$slots.action">
        <slot name="action"/>
      </div>
      <div class="col-sm-4 col-lg-3 col-xl-1" v-if="shortcutActions !== null">
        <BC-button v-if="persistentActions || hover" variant="light" size="sm" :url="shortcutActions.href" :plain="persistentActions">{{shortcutActions.content}}</BC-button>
      </div>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    url: String,
    shortcutActions: {
      type: Object,
      default () {
        return null
      }
    },
    persistentActions: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      hover: false
    }
  }
}
</script>

<style>

</style>
