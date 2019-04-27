<template>
  <div>
    <label class="float-left col-form-label pt-0" :class="{heading: heading}">{{label}}</label>
    <textarea v-if="multiline"
      class="form-control" :class="{ 'input-danger': error }"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :rows="(typeof multiline === 'number') ? multiline : 4"
      @keyup="handleChange"
    >
    </textarea>
    <input v-else
      class="form-control" :class="[{subdued: subdued, 'input-danger': error }]"
      :name="name"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      @keyup="handleChange"
      >
      <p v-if="error" class="help-block">Required<span class="glyphicon glyphicon-warning-sign form-control-feedback"></span></p>
      <p v-if="helpText" class="form-text text-muted">{{helpText}}</p>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: String,
    labelAction: Object,
    labelHidden: Boolean,
    helpText: String,
    id: String,
    name: String,
    error: [Boolean, String],
    disabled: Boolean,
    value: String | Array,
    placeholder: String,
    subdued: Boolean,
    heading: Boolean,
    multiline: {
      type: [Boolean, Number],
      default: false
    },
    type: String
  },
  methods: {
    handleChange (e) {
      var target = e.target || e.srcElement
      this.$emit('change', target.value)
      this.$emit('update:input', target.value)
    }
  }
}
</script>

<style>
.subdued {
  background-color: rgb(248, 249, 250);
}
.input-danger {
    background-color: #dc354557 !important;
}
</style>
