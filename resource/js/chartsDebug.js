const defaultConfig = {
  // 折线图
  line: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  },
  //雷达图
  // radar: {
  //   title: {
  //     text: 'Basic Radar Chart'
  //   },
  //   legend: {
  //     data: ['Allocated Budget', 'Actual Spending']
  //   },
  //   radar: {
  //     indicator: [
  //       { name: 'Sales', max: 6500 },
  //       { name: 'Administration', max: 16000 },
  //       { name: 'Information Technology', max: 30000 },
  //       { name: 'Customer Support', max: 38000 },
  //       { name: 'Development', max: 52000 },
  //       { name: 'Marketing', max: 25000 }
  //     ]
  //   },
  //   series: [
  //     {
  //       name: 'Budget vs spending',
  //       type: 'radar',
  //       data: [
  //         {
  //           value: [4200, 3000, 20000, 35000, 50000, 18000],
  //           name: 'Allocated Budget'
  //         },
  //         {
  //           value: [5000, 14000, 28000, 26000, 42000, 21000],
  //           name: 'Actual Spending'
  //         }
  //       ]
  //     }
  //   ]
  // },
  radar: {
    radar: {
      name: {
        show: true,
        color: '#5C626B'
      },
      indicator: [{ "name": "2-1", "max": 100 }]
    },
    textStyle: {
      fontSize: 34
    },
    series: [
      {
        label: {
          show: false
        },
        type: 'radar',
        areaStyle: {
          color: 'rgba(107, 136, 255, 0.4)',
          cap: 'round'
        },
        lineStyle: {
          color: 'rgba(107, 136, 255, 0.4)'
        },
        data: [
          {
            value: ["80"],
            name: '',
            symbol: 'circle',
            symbolSize: 15,
            itemStyle: {
              color: 'blue'
            }

          }
        ]
      }
    ]
  },
  //柱状图
  bar: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  },
  // 饼图
  pie: {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  },
  wordcloud: {
    "list": [
      [
        "各位观众",
        45
      ],
      [
        "词云",
        21
      ],
      [
        "来啦!!!",
        13
      ]
    ],
    "gridSize": 6,
    "weightFactor": 1,
    "maxFontSize": 60,
    "minFontSize": 14,
    "fontWeight": "normal",
    "fontFamily": "Times, serif",
    "color": "random-light",
    "backgroundColor": "#333",
    "rotateRatio": 1
  },
  china: {
    "visualMap": {
      "type": "continuous",
      "itemWidth": 16,
      "itemHeight": 100,
      "symbol": "rect",
      "min": 0,
      "max": 36,
      "text": [
        "高",
        "低"
      ],
      "realtime": false,
      "calculable": true,
      "showLabel": false,
      "textGap": 10,
      "itemGap": 3,
      "bottom": 15,
      "precision": 0,
      "inRange": {
        "color": [
          "#EFF5FF",
          "#6394F9"
        ]
      }
    },
    "tooltip": {
      "trigger": "item",
      "formatter": "{b}<br/>{c}",
      "backgroundColor": "rgba(51,51,51,0.85)",
      "borderColor": "rgba(51,51,51,0.85)",
      "textStyle": {
        "color": "#fff"
      }
    },
    "series": [
      {
        "type": "map",
        "map": "china",
        "select": {
          "disabled": true
        },
        "name": "新闻数量",
        "top": 10,
        "zoom": 1.05,
        "label": {
          "show": false
        },
        "itemStyle": {
          "borderColor": "#fff",
          "borderWidth": 1.5,
          "areaColor": "#11599E",
          "color": "green"
        },
        "emphasis": {
          "itemStyle": {
            "areaColor": "#EEC30D",
            "borderWidth": 0
          },
          "label": {
            "show": true,
            "color": "#555"
          }
        },
        "data": [
          {
            "name": "北京",
            "id": 10,
            "value": 36
          },
          {
            "name": "江西",
            "id": 36,
            "value": 30
          },
          {
            "name": "浙江",
            "id": 35,
            "value": 28
          },
          {
            "name": "广东",
            "id": 40,
            "value": 24
          },
          {
            "name": "四川",
            "id": 61,
            "value": 17
          },
          {
            "name": "江苏",
            "id": 99,
            "value": 15
          },
          {
            "name": "上海",
            "id": 30,
            "value": 14
          },
          {
            "name": "南海诸岛",
            "id": 42,
            "value": 14
          },
          {
            "name": "海南",
            "id": 42,
            "value": 14
          },
          {
            "name": "香港",
            "id": 90,
            "value": 10
          },
          {
            "name": "河北",
            "id": 12,
            "value": 9
          },
          {
            "name": "辽宁",
            "id": 20,
            "value": 9
          },
          {
            "name": "山东",
            "id": 32,
            "value": 9
          },
          {
            "name": "贵州",
            "id": 63,
            "value": 9
          },
          {
            "name": "福建",
            "id": 34,
            "value": 8
          },
          {
            "name": "陕西",
            "id": 80,
            "value": 7
          },
          {
            "name": "山西",
            "id": 14,
            "value": 6
          },
          {
            "name": "黑龙江",
            "id": 22,
            "value": 6
          },
          {
            "name": "内蒙古",
            "id": 13,
            "value": 4
          },
          {
            "name": "河南",
            "id": 70,
            "value": 4
          },
          {
            "name": "湖北",
            "id": 71,
            "value": 4
          },
          {
            "name": "吉林",
            "id": 21,
            "value": 3
          },
          {
            "name": "云南",
            "id": 62,
            "value": 3
          },
          {
            "name": "安徽",
            "id": 33,
            "value": 2
          },
          {
            "name": "广西",
            "id": 41,
            "value": 2
          },
          {
            "name": "湖南",
            "id": 72,
            "value": 2
          },
          {
            "name": "新疆",
            "id": 83,
            "value": 2
          },
          {
            "name": "天津",
            "id": 11,
            "value": 1
          },
          {
            "name": "重庆",
            "id": 60,
            "value": 1
          },
          {
            "name": "西藏",
            "id": 64,
            "value": 1
          },
          {
            "name": "甘肃",
            "id": 84,
            "value": 1
          },
          {
            "name": "青海",
            "id": 81,
            "value": 0
          },
          {
            "name": "宁夏",
            "id": 82,
            "value": 0
          },
          {
            "name": "澳门",
            "id": 91,
            "value": 0
          },
          {
            "name": "台湾",
            "id": 92,
            "value": 0
          },
          {
            "name": "国外",
            "id": 93,
            "value": 0
          }
        ]
      }
    ]
  }
}


const { createApp } = Vue
axios.defaults.withCredentials = true
createApp({
  data() {
    return {
      width: 600,
      height: 400,
      chartConfig: JSON.stringify(defaultConfig['bar']),
      version: 5,
      imageBase64: '',
      type: 'bar',
    }
  },

  watch: {
    type(val) {
      this.chartConfig = JSON.stringify(defaultConfig[val])
    },
  },
  methods: {
    formatJSON() {
      this.chartConfig = fmt2json(this.chartConfig)
    },
    generateImg() {
      const self = this;
      axios({
        method: 'post',
        url: '/echarts',
        data: {
          chartConfig: JSON.parse(this.chartConfig),
          height: this.height,
          width: this.width,
          version: this.version,
          type: this.type
        }
      }).then(res => {
        this.imageBase64 = res.data
      });
    },
  }
}).mount('#app')
