import HighchartsReact from "highcharts-react-official";
import Highchart from 'highcharts';
import highchartsMap from "highcharts/modules/map";
import React from "react";
import { cloneDeep } from "lodash";

highchartsMap(Highchart)
const initOptions = {
  chart: {
    height: '500'
  },
  title: {
    text: null,
  },
  mapNavigation :{
    enable: true,
  },
  colorAxis:{
    min: 0,
    stops: [
      [0.2, '#FFA07A'],
      [0.4, '#FF7F50'],
      [0.6, '#FF6347'],
      [0.8, '#FF4500'],
      [1, '#8B0000']
    ]
  },
  legend:{
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
  },
  series:[
    {
      mapData: {},
      name: "Dân số",
      joinBy: ['hc-key', 'key']
    }
  ]
}
export default function HighMaps ({mapData}) {
  const [ options, setOptions] = React.useState({});
  const chartref = React.useRef(null);
  const [configLoaded, setConfigLoaded] = React.useState(false);

  React.useEffect(() =>{
    if (mapData && Object.keys(mapData).length) {
      const fakeData = mapData.features.map((feature, index) =>({
        key: feature.properties['hc-key'],
        value: index,
      }));
      setOptions({
        ...initOptions,
        series:[{
          ...initOptions.series[0],
          mapData: mapData,
          data: fakeData
        }]
      });
      if (!configLoaded) setConfigLoaded(true)
    }
  },[mapData, configLoaded])

  React.useEffect(() =>{
    if (chartref && chartref.current){
      chartref.current.chart.series[0].update({
        mapData: mapData
      })
    }
  },[mapData])
  if (!configLoaded) return null
  return (
    <HighchartsReact 
      Highcharts={Highchart}
      options={ cloneDeep( options)}
      constructorType='mapChart'
      ref={chartref}
    />
  )
} 