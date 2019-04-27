<template>
  <span :class="[inline ? 'form-inline' : 'form-group']">
  <label for="name" class="float-left col-form-label pt-0" v-if="label">{{label}}</label>
  <select
    :name="name"
    :value="value"
    class="form-control"
    :class="{ 'input-danger': error }"
    :disabled="disabled"
    @change="onChange"
    >
    <template v-if="options">
       <option value="" disabled selected v-if="placeholder">{{placeholder}}</option>
        <template v-for="option in options">
            <option
                v-if="typeof option != 'string'"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled">
                {{ option.label }}
            </option>
        </template>
    </template>
  </select>
  <p v-if="helpText" class="help-block">{{helpText}}</p>
  <p v-if="error">Required<span class="glyphicon glyphicon-warning-sign form-control-feedback has-error has-feedback"></span></p>
  </span>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'selected'
  },
  data () {
    return {
      arrowUpDown: 1
    }
  },

  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    groups: {
      type: Array,
      default () {
        return []
      }
    },
    label: String,
    // labelAction: Object,
    // labelHidden: Boolean,
    helpText: String,
    id: String,
    name: String,
    error: String,
    disabled: Boolean,
    value: [String, Number],
    placeholder: String,
    inline: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onChange (e) {
      this.$emit('update:selected', e.currentTarget.value)
      this.$emit('selected', e.currentTarget.value)
    }
  }
}
</script>

<style>

</style>
