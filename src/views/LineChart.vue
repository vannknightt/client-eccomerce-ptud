<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    labels: {
      handler: function(newValue) {
        this.handleRenderChart();
      },
      deep: true
    },
    data: {
      handler: function(newValue) {
        this.handleRenderChart();
      },
      deep: true
    }
  },
  methods: {
    handleRenderChart() {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              label: "Income",
              data: this.data,
              backgroundColor: "transparent",
              borderColor: "rgba(1, 116, 188, 0.50)",
              pointBackgroundColor: "rgba(171, 71, 188, 1)"
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "VND",
                }
              }
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Date in Month",
                }
              }
            ],
          }
        }
      );
    }
  },
  mounted() {
    this.handleRenderChart();
  }
};
</script>
