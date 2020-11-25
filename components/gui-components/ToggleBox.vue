<template>
  <div class="flex flex-row mt-2">
    <div class="flex items-center">
      <label class="switch" @mousedown="onMouseDown" @click.prevent>
        <input
          ref="input"
          :type="name ? 'radio' : 'checkbox'"
          :name="name"
          :checked="checked"
        >
        <span class="slider round" :class="{'inverted' : inverted}"></span>
      </label>
    </div>

    <div class="flex items-center ml-2 text-center">{{ title }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: false
    }
  },
  props: {
    title: {
      type: String
    },
    inverted: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onMouseDown($event) {
      $event.preventDefault();
      this.$refs.input.checked = !this.$refs.input.checked;
      this.$emit("update:checked", this.$refs.input.checked)
    }
  }
}
</script>

<style lang="scss" scoped>

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f32121;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider.inverted {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #20880a;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #20880a;
}

input:checked + .slider.inverted {
  background-color: #f32121;
}

//input:focus + .slider {
//  box-shadow: 0 0 1px #f32121;
//}

input:checked + .slider:before {
  -webkit-transform: translateX(19px);
  -ms-transform: translateX(19px);
  transform: translateX(19px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
