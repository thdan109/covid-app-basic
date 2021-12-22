import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import CountUp from "react-countup";
const useStyles = makeStyles({
  wrapper: (props) =>{
    if (props.type === 'confirmed') return { borderLeft: '5px solid #c9302c'};
    if (props.type === 'recovered'|| props.type === 'totalrecovered') return { borderLeft: '5px solid #28a745'};
    if (props.type === 'new') return { borderLeft: '5px solid yellow'};
    if (props.type === 'death' || props.type === 'totaldeath') return { borderLeft: '5px solid grey'};
    else return { borderLeft: '1px solid green', background: '#AFEEEE'};
  },
  title:{
    fontSize: 18
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold'
  }

})
export default function HighlightCard({title, count, type}) {
  const style = useStyles({type})
  return (
    <Card className={style.wrapper}>
      <CardContent>
        <Typography variant="body2" component="p" className={style.title}>
          {title}
        </Typography>
        <Typography variant="body2" component="span" className={style.count}>
          <CountUp end={count || 0} duration='2' separator=' ' />
        </Typography>
      </CardContent>
    </Card>
  );
}
