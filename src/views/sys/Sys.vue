<template>
  <div id="cpu" class="chart"></div>
  <div id="mem" class="chart"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as echarts from "echarts";
import { getOptions, unwarp} from "./util";
import { createWebsocket } from "@/util/net";
import { ECharts } from "echarts";
export default defineComponent({
  data() {
    return {
      cpuChart: {} as ECharts,
      memChart: {} as ECharts,

      axis: [] as string[],
      cpuData: [] as number[],
      memData:[] as number[],
      websocket: {} as WebSocket,
    };
  },
  methods: {
    initChart() {
      this.cpuChart = echarts.init(
        document.getElementById("cpu") as HTMLElement
      );
       this.memChart = echarts.init(
        document.getElementById("mem") as HTMLElement
      );
      unwarp(this.cpuChart).setOption(getOptions([], []));
      unwarp(this.memChart).setOption(getOptions([], []));

    },
    connectWebsocket() {
      this.websocket = createWebsocket("1");
      this.websocket.onmessage = (res) => {
        const usage = JSON.parse(res.data);
        if (this.cpuData.length > 20) {
          this.cpuData.shift();
          this.memData.shift()
          this.axis.shift()
        }
        this.axis.push(usage.time);
        this.cpuData.push(Math.round(usage.cpu * 100) / 100);
        this.memData.push(Math.round(usage.mem * 100) / 100)
        unwarp(this.cpuChart).setOption(getOptions(this.axis, this.cpuData));
        unwarp(this.memChart).setOption(getOptions(this.axis, this.memData))
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
.chart {
  width: 100%;
  height: 300px;
}
</style>