import type { ChartData } from 'chart.js'

const BG_COLOR1 = '#7e57c2'
const TOOLTIP_BG = 'rgba(37,37,39,0.69)'
const BG_COLOR_HOVER = '#764cc4'
const BORDER_COLOR1 = '#3a0993'

export const CHART_OPTIONS = {
  responsive: true,
  scales: {
    x: {
      display: false,
    },
  },
  plugins: {
    tooltip: {
      backgroundColor: TOOLTIP_BG,
      titleColor: '#fff',
      bodyColor: '#fff',
      borderWidth: 2,
      borderColor: BORDER_COLOR1,
    },
  },
}

export const BAR_DATASETS = (
  labels: string[],
  data: number[],
  label: string,
): ChartData<'bar', number[], string> => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: BG_COLOR1,
        borderColor: BORDER_COLOR1,
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: BG_COLOR_HOVER,
        animation: { easing: 'easeInQuad', duration: 500 },
      },
    ],
  }
}
