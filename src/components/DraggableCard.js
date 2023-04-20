import { Card, Grid } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableCard = ({ value, index, color }) => {
  return (
    <Draggable draggableId={value} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Card
            {...provided.dragHandleProps}
            className="card"
            style={{ backgroundColor: color }}
          >
            <Grid container justifyContent="center">
              <Grid item>
                <h3>{value}</h3>
              </Grid>
            </Grid>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
export default DraggableCard;
