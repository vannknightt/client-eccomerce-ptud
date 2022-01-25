<template>
  <div>
    <a-row>
      <h2>Shipper income in {{ curDate.format("MMM - yyyy") }}</h2>
    </a-row>
    <a-row>
      <a-month-picker
        placeholder="Select month"
        v-model="curDate"
        @change="handleSelectMonth"
      />
    </a-row>
    <a-row>
      <LineChart :labels="labels" :data="incomeData"/>
    </a-row>
  </div>
</template>
<script>
import shipperService from "@/api-services/shipperService";
import { mapMutations } from "vuex";
import LineChart from "@/views/LineChart";
import { getDaysInMonth } from "@/utils/date";
import moment from "moment";

export default {
  name: "IncomeShipper",
  components: { LineChart },
  data: () => ({
    incomeData: [],
    labels: [],
    curDate: moment(),
    rsData: {}
  }),
  methods: {
    ...mapMutations("shipper", ["setLoading"]),

    async initData() {
      this.setLoading(true);
      const rs = await shipperService.getIncome(this.curDate._d);
      if (!rs) {
        this.setLoading(false);
        this.rsData = []         
        this.processData()
        return;
      }
      this.setLoading(false);
      this.rsData = rs;
      this.processData()
    },
    processLabel(dateFormat = "Do") {
      const month = this.curDate.month() + 1;
      const year = this.curDate.year();
      this.labels = getDaysInMonth(month, year, dateFormat);
    },
    processData() {
      const dummy = {};
      this.labels.forEach((val, index) => {
        const key = index + 1;
        if (!this.rsData[key]) {
          dummy[index] = 0;
          return;
        }

        dummy[index] = this.rsData[key]
      });

      this.incomeData = Object.values(dummy)
    },
    handleSelectMonth() {
      this.processLabel();
      this.initData();
    }
  },
  mounted() {
    this.processLabel();
    this.initData();
  }
};
</script>
