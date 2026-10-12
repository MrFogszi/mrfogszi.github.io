const VueProgressbar = {
  props: {
    label: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 100
    }
  },
  methods: {
    get_color() {
      if (this.percentage > 75) return "darkgreen";
      return "#3b82f6";
    }
  },

  template: `
    <div
      class="skill__track"
      role="progressbar"
      :aria-label="label + ' progress'"
      :aria-valuenow="percentage"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="skill__fill"
        :style="{ width: percentage + '%', background: get_color() }"
      ></div>
    </div>
  `
};
