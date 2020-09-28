<template>
  <button
    class="text-white font-bold py-2 px-4 rounded"
    :class="classes"
    :type="type"
    @click="handleClick"
  >
    {{ label }}
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      validator: (val) =>
        ['primary', 'secondary', 'warning', 'error', 'success'].includes(val),
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
    to: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    colors() {
      let color = {}

      if (this.outline) return {}

      switch (this.color) {
        case 'secondary':
          color = { 'bg-gray-500 hover:bg-gray-700': true }
          break
        case 'warning':
          color = { 'bg-yellow-500 hover:bg-yellow-700': true }
          break
        case 'error':
          color = { 'bg-red-500 hover:bg-red-700': true }
          break
        case 'success':
          color = { 'bg-green-500 hover:bg-green-700': true }
          break
        default:
          color = { 'bg-blue-500 hover:bg-blue-700': true }
          break
      }

      return color
    },
    classes() {
      return {
        'opacity-50 cursor-not-allowed': this.disabled,
        ...this.colors,
        'bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent': this
          .outline,
      }
    },
  },
  methods: {
    handleClick(e) {
      if (this.to !== undefined && this.to !== null)
        this.$router.push({ path: this.to })

      this.$emit('click', e)
    },
  },
}
</script>
