import { Container, Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import moment from "moment";
import React from "react";
import { getCountries, getCovidChartVietNam, getCovidInVietNam, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import "moment/locale/vi";
import HighlightVN from "./components/Highlight/HighlightVN";
moment.locale("vi");
function App() {
  const [countries, setCountries] = React.useState();
  const [covidVN, setCovidVN] = React.useState();
  const [selectedCountryId, setSelectedCountryId] = React.useState("");
  const [dataVN, setDataVN] = React.useState([]);
  const [dataVX, setDataVX] = React.useState([]);
  const [report, setReport] = React.useState([]);
  const [covidChart, setCovidChart] = React.useState()
  const [ selected, setSelected] = React.useState('')
  React.useEffect(() => {
    getCountries().then((res) => {
      const countries = sortBy(res.data, "Country");
      setCountries(countries);
      setSelectedCountryId("vn");
    });
    getCovidInVietNam().then((res) =>{
      // setCovidVN(res.data)
      // console.log(res.data);
     
      const dataPR = [];
      // console.log(res.data);
      res.data?.map((item) =>
        Array(item).map((item1) =>
          dataPR.push({
            province: item1[1],
            confirm: item1[2],
            new: item1[6],
            vaccinated: item1[4],
            totalVaccin: item1[5],
          })
        )
      );
      setDataVN(res?.data[0])
      setDataVX(res?.data[1])
      setCovidVN(dataPR)
    })
    getCovidChartVietNam().then(res=>{
      setCovidChart(res.data)
     
    })
  }, []);

  const handleOnChange = (ev) => {
    setSelectedCountryId(ev.target.value);
  };

  const handleOnChangeSelected = (ev) =>{
    // console.log(ev.target.value);
    setSelected(ev.target.value)
  }

  React.useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries?.find(
        (country) => country?.ISO2.toLowerCase() === selectedCountryId
      );
      // Call api
      getReportByCountry(Slug).then((res) => {
        res.data.pop();
        setReport(res?.data);
      });
    }
  }, [countries, selectedCountryId]);

  return (
    <Container style={{marginTop: 30}}>
      <Typography variant="h1" component="h1" color="primary">SỐ LIỆU COVID-19</Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
        handleOnChangeSelected={handleOnChangeSelected}
        selected={selected}
      />
      <Highlight report={report} selected={selected} />
      <HighlightVN report={covidVN} infor={covidChart} selected={selected} dataVN={dataVN} dataVX={dataVX}/>  
      <Summary report={report} selectedCountryId={selectedCountryId} selected={selected} />
    </Container>
  );
}

export default App;
