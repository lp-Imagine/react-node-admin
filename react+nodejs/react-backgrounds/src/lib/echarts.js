/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-06 17:32:50
 * @LastEditors: peng
 * @LastEditTime: 2021-07-15 16:46:46
 */
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入提示框和标题组件
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

import "echarts/lib/chart/bar"; // 引入柱状图
import "echarts/lib/chart/radar"; // 引入雷达图
import "echarts/lib/chart/pie"; // 引入饼状图
import "echarts/lib/chart/line"; // 引入折线图

require("echarts/theme/macarons"); // echarts theme
export default echarts;
