import { Grid } from "@material-ui/core";
import LineChart from "../Charts/LineChart/index";
import React from "react";
import HighMaps from "../Charts/HighMap/index";

const Summary = ({ report, selectedCountryId, selected }) => {
   const [mapData, setMapData] = React.useState({});
  React.useEffect(() => {
    if (selectedCountryId) {
      import(
        `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
      ).then(res=>setMapData(res))
    }
  }, [selectedCountryId]);
  if (selected==='vn') return null;
  return (
    <div style={{marginTop:20}}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} sx={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Summary;
