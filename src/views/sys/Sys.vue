<template>
  <div id="chart"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as echarts from "echarts";
import { getOptions } from "./util";
import { createWebsocket } from "@/util/net";
import { ECharts } from "echarts";
export default defineComponent({
  data() {
    return {
      chart: {} as ECharts,
      axis: [] as string[],
      cpuData: [] as number[],
      websocket: {} as WebSocket,
    };
  },
  methods: {
    initChart() {
      this.chart = echarts.init(
        document.getElementById("chart") as HTMLElement
      );
      const axis = [5, 20, 36, 10, 10, 20];
      this.chart.setOption(getOptions(axis, [5, 20, 36, 10, 10, 20]));
    },
    connectWebsocket() {
      this.websocket = createWebsocket("1");
      this.websocket.onmessage = (res) => {
        const usage = JSON.parse(res.data);
        this.axis.push(usage.time);
        this.cpuData.push(usage.cpu);
        this.chart.setOption(getOptions(this.axis, this.cpuData));
      };
    },
  },
  mounted() {
    this.initChart();
    this.connectWebsocket();
  },
  unmounted() {
    console.log("----------------------------");
    this.websocket.close();
  },
});
</script>
<style scoped>
#chart {
  width: 100%;
  height: 200px;
}
</style>