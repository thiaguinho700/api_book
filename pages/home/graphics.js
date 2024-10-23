
const dataV1 = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];


const labelsV1 = dataV1.map((item) => item.name);
const uvDataV1 = dataV1.map((item) => item.uv);
const pvDataV1 = dataV1.map((item) => item.pv);


const ctxV1 = document.getElementById("lineChartV1").getContext("2d");
new Chart(ctxV1, {
  type: "line",
  data: {
    labels: labelsV1,
    datasets: [
      {
        label: "PV",
        data: pvDataV1,
        borderColor: "#8884d8",
        backgroundColor: "rgba(136, 132, 216, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: "UV",
        data: uvDataV1,
        borderColor: "#82ca9d",
        backgroundColor: "rgba(130, 202, 157, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Pages",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  },
});

const dataV2 = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];


const labelsV2 = dataV2.map(item => item.name);
const uvDataV2 = dataV2.map(item => item.uv);


const ctxV2 = document.getElementById('barChartV2').getContext('2d');
new Chart(ctxV2, {
  type: 'bar',
  data: {
    labels: labelsV2,
    datasets: [{
      label: 'UV',
      data: uvDataV2,
      backgroundColor: '#8884d8',
      borderColor: '#8884d8',
      borderWidth: 1,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Pages',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'UV Values',
        },
      },
    },
  },
});


const ctxV3 = document.getElementById('composedChartV3').getContext('2d');
new Chart(ctxV3, {
  type: 'bar',
  data: {
    labels: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F'],
    datasets: [
      {
        label: 'UV',
        data: [590, 868, 1397, 1480, 1520, 1400],
        type: 'line',
        borderColor: '#ff7300',
        fill: false,
      },
      {
        label: 'PV',
        data: [800, 967, 1098, 1200, 1108, 680],
        type: 'bar',
        backgroundColor: '#413ea0',
      },
      {
        label: 'AMT',
        data: [1400, 1506, 989, 1228, 1100, 1700],
        type: 'line',
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.2)',
        fill: true,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      },
      y: {
        type: 'category',
        labels: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F']
      }
    }
  }
});



const data = {
  labels: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'],
  datasets: [
    {
      label: 'UV',
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      backgroundColor: 'rgba(136, 132, 216, 0.3)',
      borderColor: '#8884d8',
      borderWidth: 2,
      fill: true,
    },
    {
      label: 'UV (Cardinal Curve)',
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      backgroundColor: 'rgba(130, 202, 157, 0.3)',
      borderColor: '#82ca9d',
      borderWidth: 2,
      fill: true,
      tension: 0.2 
    }
  ]
};


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
        }
      }
    }
  },
  scales: {
    x: {
      stacked: false,
      title: {
        display: true,
        text: 'Name'
      }
    },
    y: {
      stacked: false,
      title: {
        display: true,
        text: 'Value'
      },
      beginAtZero: true
    }
  }
};  


const ctx = document.getElementById('composedChartV4').getContext('2d');
new Chart(ctx, {
  type: 'line', 
  data: data,
  options: options
});



const ctxV5 = document.getElementById('composedChartV5').getContext('2d');
new Chart(ctxV5, {
  type: 'bar',
  data: {
    labels: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'],
    datasets: [{
      label: 'UV',
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      backgroundColor: (ctx) => {
        const index = ctx.dataIndex;
        const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
        return colors[index % colors.length];
      },
      borderRadius: 8,
      borderSkipped: false
    }]
  }
  ,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Name'
        }
      },
      y: {
        stacked: false,
        title: {
          display: true,
          text: 'Value'
        },
        beginAtZero: true
      }
    }
  }
});

const dataV6 = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];

const labels = dataV6.map(item => item.name);
const pvData = dataV6.map(item => item.pv);

const ctxV6 = document.getElementById('composedChartV6').getContext('2d');
new Chart(ctxV6, {
  type: 'bar',
  data: {
      labels: labels,
      datasets: [{
          label: 'PV',
          data: pvData,
          backgroundColor: '#8884d8',
          borderColor: '#8884d8',
          borderWidth: 1,
          barThickness: 20, // Equivalent to barSize in recharts
      }]
  },
  options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          x: {
              display: true,
              title: {
                  display: true,
                  text: 'Name',
              },
              ticks: {
                  padding: 10,
              }
          },
          y: {
              display: true,
              title: {
                  display: true,
                  text: 'PV',
              },
              ticks: {
                  beginAtZero: true,
              }
          }
      },
      plugins: {
          legend: {
              display: true,
          },
          tooltip: {
              callbacks: {
                  label: function(context) {
                      return context.dataset.label + ': ' + context.raw;
                  }
              }
          }
      }
  }
});