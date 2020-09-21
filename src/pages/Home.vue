<template>
  <div>
    <div ref="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    var myChart = echarts.init(this.$refs.main);
    var option = {
      title: {
        text: "近一周销量",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六","周天"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20,33],
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>

<style lang="stylus" scoped></style>