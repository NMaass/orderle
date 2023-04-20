import { Grid, Button } from "@mui/material";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
const ReorderableColumn = ({ column }) => {
  const [colors, setColors] = React.useState(Array(column.itemIds.length));
  const onDone = () => {
    let newColors = [];
    column.itemIds.forEach((item, index) => {
      if (column.correctItems.includes(item)) {
        if (column.itemIds[index] === column.correctItems[index]) {
          newColors.push("green");
        } else {
          newColors.push("gold");
        }
      } else {
        newColors.push("");
      }
    });
    setColors(newColors);
  };

  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <Droppable key={column.id} droppableId={column.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <h2>{column.prompt}</h2>
                </Grid>
                {column.itemIds.map((item, index) => {
                  return (
                    <Grid item key={item}>
                      <DraggableCard
                        value={item}
                        index={column.itemIds.indexOf(item)}
                        color={colors[index]}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={onDone}
          style={{ marginTop: "15vh" }}
          size="large"
        >
          Done!
        </Button>
      </Grid>
    </Grid>
  );
};
export default ReorderableColumn;
