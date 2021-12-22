import { Grid } from "@material-ui/core";
import React from "react";
import HighlightCard from "./HighlightCard";
import TableInforCovid from "./TableVietNam";
import HighMaps from "../Charts/HighMap/index";

const HighlightVn = ({ report, selected, infor, dataVN, dataVX }) => {
  const data = report && report.slice(2);
  const dataChart = infor && infor.length ? infor[infor.length - 1] : [];
  const dataVN1 = dataVN;

  const [mapData, setMapData] = React.useState({});
  React.useEffect(() => {
    // if (selectedCountryId) {
    import(`@highcharts/map-collection/countries/vn/vn-all.geo.json`).then(
      (res) => setMapData(res)
    );
    // }
  }, []);

  const columns = [
    {
      name: "province",
      label: "Thành phố",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "confirm",
      label: "Ca nhiễm ",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "new",
      label: "Ca mới",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "vaccinated",
      label: "Vắc xin đã tiêm",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "totalVaccin",
      label: "Tổng vắc-xin",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const summary = [
    {
      title: "Ca mới",
      count: dataChart && dataChart[1],
      type: "new",
    },
    {
      title: "Tử vong",
      count: dataVN1 && dataVN1[4],
      type: "death",
    },
    {
      title: "Khỏi",
      count: dataVN1 && dataVN1[6],
      type: "recovered",
    },
   
    {
      title: "Số ca nhiễm",
      count: dataVN1 && dataVN1[2],
      type: "confirmed",
    },
    {
      title: "Tổng tử vong",
      count: dataVN1 && dataVN1[5],
      type: "totaldeath",
    },

    {
      title: "Tổng khỏi",
      count: dataVN1 && dataVN1[3],
      type: "totalrecovered",
    },
  ];

  const vacxin = [
    {
      title: "Tổng vắc xin",
      count: dataVX && dataVX[2],
      type: "totalxv",
    },
    {
      title: "Vắc xin phân bố",
      count: dataVX && dataVX[3],
      type: "useVX",
    },
    {
      title: "Vắc xin đã tiêm",
      count: dataVX && dataVX[5],
      type: "usedVX",
    },
    {
      title: "Đã đăng ký tiêm",
      count: dataVX && dataVX[4],
      type: "signed",
    },
  ];

  if (selected !== "vn") return null;
  return (
    <Grid container spacing={3}>
      {vacxin.map((item) => (
        <Grid key={item.type} item sm={3} xs={12}>
          <HighlightCard
            title={item.title}
            count={item.count}
            type={item.type}
          />
        </Grid>
      ))}

      {summary.map((item) => (
        <Grid key={item.type} item sm={4} xs={12}>
          <HighlightCard
            title={item.title}
            count={item.count}
            type={item.type}
          />
        </Grid>
      ))}

      <Grid container spacing={2} >
        <Grid item sm={8} xs={12}>
          {data !== [] ? (
            <TableInforCovid data={data} columns={columns} />
          ) : (
            <></>
          )}
        </Grid>
        <Grid item sm={4} xs={12} style={{marginTop: 100}}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HighlightVn;
