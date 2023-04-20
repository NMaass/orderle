import { ButtonBase, Card, Grid } from "@mui/material";
import React, { useEffect } from "react";

const SelectionCard = ({ value, onClick, index, color }) => {
  useEffect(() => {}, [color]);
  return (
    <ButtonBase onClick={() => onClick(index)}>
      <Card className="wideCard" style={{ backgroundColor: color }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <h3>{value}</h3>
          </Grid>
        </Grid>
      </Card>
    </ButtonBase>
  );
};

export default SelectionCard;
