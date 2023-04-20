import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import SelectionCard from "./SelectionCard";
import shuffle from "../utils/ShuffleUtil";

const ItemSelection = ({ column, goNext }) => {
  const [selected, setSelected] = useState(
    new Array(column.itemIds.length).fill(false)
  );
  const [notReady, setNotReady] = useState(true);

  const [randomizedColumn, setRandomizedColumn] = useState(
    shuffle(column.itemIds.slice())
  );
  const select = (index) => {
    const numberSelected = selected.filter(Boolean).length;
    if (!selected[index]) {
      if (numberSelected < 5) {
        let newSelected = selected.slice();
        newSelected[index] = true;
        setSelected(newSelected);
        if (numberSelected === 4) {
          setNotReady(false);
        }
      }
    } else {
      let newSelected = selected.slice();
      newSelected[index] = false;
      setSelected(newSelected);
      setNotReady(true);
    }
  };

  const finalizeList = () => {
    let selectedItems = [];
    for (let i = 0; i < selected.length; i++) {
      if (selected[i]) {
        selectedItems.push(randomizedColumn[i]);
      }
    }
    console.log(selectedItems);
    goNext(selectedItems);
  };

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="flex-end"
    >
      <Grid item>
        <h1>{column.title}</h1>
      </Grid>
      {randomizedColumn.map((item, index) => {
        return (
          <Grid item key={item}>
            <SelectionCard
              index={index}
              value={item}
              color={selected[index] && "green"}
              onClick={select}
            />
          </Grid>
        );
      })}
      <Grid item>
        <Button onClick={finalizeList} variant="contained" disabled={notReady}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};
export default ItemSelection;
