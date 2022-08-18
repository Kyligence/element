<template>
  <div
    class="el-progress"
    :class="[
      'el-progress--' + type,
      status ? 'is-' + status : '',
      {
        'el-progress--without-text': !showText,
        'el-progress--text-inside': textInside,
      },
    ]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="el-progress-label" v-if="label">
      <div class="label-text">{{ label }}</div>
      <div class="progress-text" v-if="status !== 'success'">
        {{ percentage }}%
      </div>
    </div>
    <div :class="['el-progress-container', { 'is-line': type === 'line' }]">
      <div class="el-progress-bar" v-if="type === 'line'">
        <div
          :class="[
            'el-progress-bar__outer',
            { 'is-indeterminate': indeterminate },
          ]"
          :style="{ height: strokeWidth + 'px' }"
        >
          <div class="el-progress-bar__inner" :style="barStyle">
            <div
              class="el-progress-bar__innerText"
              v-if="showText && textInside"
            >
              {{ percentage }}%
            </div>
            <div class="el-progress-bar__animation" v-if="loading"></div>
          </div>
          <!-- <div class="el-progress-bar__indeterminate"></div> -->
        </div>
      </div>
      <div
        class="el-progress-circle"
        :style="{ height: width + 'px', width: width + 'px' }"
        v-else
      >
        <svg viewBox="0 0 100 100">
          <defs>
            <linearGradient
              id="grad1"
              x1="100%"
              y1="100%"
              x2="0%"
              y2="0%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" style="stop-color: #fff; stop-opacity: 0" />
              <stop offset="100%" style="stop-color: #fff; stop-opacity: 0.5" />
            </linearGradient>
          </defs>
          <path
            class="el-progress-circle__track"
            :d="trackPath"
            stroke="#ECF0F8"
            :stroke-width="relativeStrokeWidth"
            fill="none"
          ></path>
          <path
            class="el-progress-circle__path"
            :d="trackPath"
            :stroke-linecap="width < 50 ? 'inherit' : 'round'"
            :stroke="stroke"
            :stroke-width="relativeStrokeWidth"
            fill="none"
            :style="circlePathStyle"
          ></path>
          <!-- <path v-if="loading" :d="animationTrackPath" stroke-linecap="round" stroke="url(#grad1)" :stroke-width="relativeStrokeWidth" fill="none" :style="animationPathStyle">
            <animateTransform attributeName="transform" attributeType="XML" begin="0s" dur="3s" type="rotate" from="0 50 50" :to="`${360 * (percentage / 100)} 50 50`" additive="sum" repeatCount="indefinite"/>
          </path>
          <path v-if="loading" :d="animationTrackPath" transform="translate(100.1,100)rotate(180)" stroke-linecap="round" stroke="url(#grad2)" :stroke-width="relativeStrokeWidth" fill="none" :style="animationPathStyle">
            <animateTransform attributeName="transform" attributeType="XML" begin="0s" dur="3s" type="rotate" from="0 50 50" :to="`${360 * (percentage / 100)} 50 50`" additive="sum" repeatCount="indefinite"/>
          </path> -->
          <circle
            v-if="loading"
            cx="50%"
            cy="50%"
            :r="50 - parseFloat(relativeStrokeWidth) / 2 - 1"
            stroke="url(#grad1)"
            :stroke-width="relativeStrokeWidth"
            :stroke-linecap="width < 50 ? 'inherit' : 'round'"
            fill="none"
            stroke-dasharray="1, 360"
          >
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="2s"
              type="rotate"
              from="-90 50 50"
              :to="`${360 * (percentage / 100) - 90 - 20} 50 50`"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            v-if="indeterminate"
            cx="50%"
            cy="50%"
            :r="50 - parseFloat(relativeStrokeWidth) / 2 - 1"
            stroke="#0875DA"
            :stroke-width="relativeStrokeWidth"
            :stroke-linecap="width < 50 ? 'inherit' : 'round'"
            fill="none"
            stroke-dasharray="200%, 314"
          >
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="2s"
              type="rotate"
              from="0 50 50"
              :to="`360 50 50`"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <div class="el-progress-circle__content" v-if="showText">
          <span
            v-if="status"
            :class="[`is-${status}`, 'icon']"
            :style="getStyles"
            ><i :class="[iconClass || getStatusIcons]"></i
          ></span>
          <span class="progress-text" v-else>{{ percentage }}%</span>
        </div>
      </div>
      <div
        class="el-progress__text"
        v-if="showText && !textInside && type === 'line'"
        :style="{ fontSize: progressTextSize + 'px' }"
      >
        <span
          class="progress-num"
          v-if="!['pending', 'success'].includes(status) && !label"
          >{{ percentage }}%</span
        >
        <i
          v-if="iconClass"
          :class="iconClass"
          :style="{ fontSize: type === 'line' ? '16px' : '20px' }"
        ></i>
        <el-icon
          v-if="status && status !== 'discarded' && !iconClass"
          :name="iconClassName"
          :style="{ fontSize: type === 'line' ? '16px' : '24px' }"
          type="mult"
        ></el-icon>
      </div>
      <div
        class="el-progress-close"
        @click="closeProgress"
        v-if="closable && type === 'line'"
      >
        <i class="el-ksd-n-icon-close-outlined"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ElProgress',
  props: {
    type: {
      type: String,
      default: 'line',
      validator: (val) => ['line', 'circle'].indexOf(val) > -1
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: (val) => val >= 0 && val <= 100
    },
    status: {
      type: String
    },
    iconClass: String,
    strokeWidth: {
      type: Number,
      default: 4
    },
    textInside: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 128
    },
    color: String,
    showText: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    indeterminate: Boolean
  },
  computed: {
    barStyle() {
      const style = {};
      style.width = this.percentage + '%';
      if (this.color) {
        style.backgroundColor = this.color;
      }
      return style;
    },
    relativeStrokeWidth() {
      return ((this.strokeWidth / this.width) * 100).toFixed(1);
    },
    trackPath() {
      const radius = parseInt(
        50 - parseFloat(this.relativeStrokeWidth) / 2,
        10
      );

      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius *
        2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
    },
    animationTrackPath() {
      const radius = parseInt(
        50 - parseFloat(this.relativeStrokeWidth) / 2,
        10
      );

      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius *
        2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
    },
    animationStroke() {
      return 'rgb(0, 0, 0)';
    },
    animationPathStyle() {
      const perimeter = this.perimeter;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`
        // strokeDashoffset: 0.95 * perimeter + 'px'
      };
    },
    perimeter() {
      const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return 2 * Math.PI * radius;
    },
    circlePathStyle() {
      const perimeter = this.perimeter;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      };
    },
    stroke() {
      if (this.color) {
        return this.color;
      }
      let ret;
      switch (this.status) {
        case 'success':
          ret = '#49A82B';
          break;
        case 'exception':
          ret = '#CA1616';
          break;
        default:
          ret = '#0875DA';
      }
      return ret;
    },
    iconClassName() {
      // if (this.iconClass) {
      //   return this.iconClass;
      // }
      // if (this.type === 'line') {
      //   return this.status === 'success' ? 'el-ksd-icon-finished_22' : 'el-ksd-icon-error_22';
      // } else {
      //   return this.status === 'success' ? 'el-ksd-icon-finished_24' : 'el-ksd-icon-error_24';
      // }
      switch (this.status) {
        case 'success':
          return 'el-ksd-icon-finished_22';
        case 'exception':
          return 'el-ksd-icon-error_22';
        case 'pending':
          return 'el-ksd-icon-peding_22';
      }
    },
    progressTextSize() {
      return this.type === 'line'
        ? 12 + this.strokeWidth * 0.5
        : this.width * 0.111111;
    },
    getStatusIcons() {
      switch (this.status) {
        case 'success':
          return 'el-ksd-n-icon-confirm-outlined';
        case 'exception':
          return 'el-ksd-n-icon-close-outlined';
        case 'pending':
          return 'el-ksd-n-icon-pending-outlined';
      }
    },
    getStyles() {
      if (this.status) {
        return {
          width: `${this.width * 0.35}px`,
          height: `${this.width * 0.35}px`
        };
      } else {
        return {};
      }
    }
  },
  methods: {
    closeProgress() {
      this.$emit('close');
    }
  }
};
</script>
