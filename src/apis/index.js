import axios from "axios";

export const getCountries = () =>
  axios.get("https://api.covid19api.com/countries");

export const getReportByCountry = (country) =>
  axios.get(
    `https://api.covid19api.com/dayone/country/${country}`
  );

export const getCovidInVietNam = () =>
  axios.get("https://tuoitre.io/covid-mix");

export const getCovidChartVietNam = () =>
    axios.get("https://tuoitre.io/covid/bieu-do")
// export const getCountries  = async () =>{
//   try{
//     const res  = await axios.get('https://api.covid19api.com/countries');
//     console.log(res);
//     return res
//   }catch{

//   }

// }
