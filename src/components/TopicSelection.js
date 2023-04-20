import React from "react";
import topicData from "../assets/topicData";
import { ButtonBase, Card, Grid } from "@mui/material";

const TopicSelection = ({ setColumn }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <h1>Select a topic</h1>
      </Grid>
      {topicData.map((topic) => {
        return (
          <ButtonBase onClick={() => setColumn(topic)} key={topic.title}>
            <Grid item>
              <Card className="tallCard">
                <h1>{topic.title}</h1>
              </Card>
            </Grid>
          </ButtonBase>
        );
      })}
    </Grid>
  );
};
export default TopicSelection;
