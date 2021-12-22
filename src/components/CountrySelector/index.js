import {
  FormControl,
  FormLabel,
  InputLabel,
  NativeSelect,
  makeStyles,
  Select,
  Grid,
} from "@material-ui/core";
import React from "react";
const useStyle = makeStyles((theme) => ({
  FormControl: {
    margin: `${theme.spacing(3)}px 0`,
  },
}));
const CountrySelector = ({
  value,
  handleOnChange,
  countries,
  handleOnChangeSelected,
  selected,
}) => {
  const style = useStyle();
  return (
    <Grid container>
      <Grid item xs={8}>
        {selected==='vn' ? (
          <></>
        ) : (
          <FormControl className={style.FormControl}>
            <InputLabel htmlFor="country-selector" shrink>
              Quốc Gia
            </InputLabel>
            <NativeSelect
              value={value}
              onChange={handleOnChange}
              inputProps={{
                name: "country",
                id: "country-selector",
              }}
            >
              {countries?.map((country) => {
                return (
                  <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
                    {country.Country}
                  </option>
                );
              })}
            </NativeSelect>
            <FormLabel>Lựa chọn quốc gia</FormLabel>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={4}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          className={style.FormControl}
        >
          <Select  native={true} onChange={handleOnChangeSelected}>
            <option value=""></option>
            <option value="vn">Việt Nam</option>
            <option value="tg">Thế giới</option>
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CountrySelector;
