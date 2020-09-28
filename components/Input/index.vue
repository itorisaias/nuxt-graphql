<template>
  <div class="mb-2">
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      :value="value"
      :class="classes"
      :type="type"
      :placeholder="placeholder"
      class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      @input="
        (e) =>
          type === 'file'
            ? $emit('input', e.target.files)
            : $emit('input', e.target.value)
      "
    />

    <p v-if="hasError" class="text-red-500 text-xs italic">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: undefined,
    },
    id: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },
    error: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    hasError() {
      return this.error !== undefined && this.error !== null
    },
    classes() {
      return {
        'border border-red-500': this.hasError,
      }
    },
  },
}
</script>
