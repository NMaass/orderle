import "./App.css";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import columns from "./assets/columns";
import ReorderableColumn from "./components/ReorderableColumn";
import TopicSelection from "./components/TopicSelection";
import ItemSelection from "./components/ItemSelection";

const App = () => {
  const [columnData, setColumnData] = useState(columns);
  const [showTopics, setShowTopics] = useState(true);
  const [showSelction, setShowSelection] = useState(false);
  const [showOrdering, setShowOrdering] = useState(false);

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return;
    }
    //make sure the draggable moved
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = columnData.columns[source.droppableId];
    const finish = columnData.columns[destination.droppableId];

    //if moving within the same column
    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        itemIds: newItemIds,
      };

      //override existing column
      const newData = {
        ...columnData,
        columns: {
          ...columnData.columns,
          [newColumn.id]: newColumn,
        },
      };
      setColumnData(newData);
      return;
    }
    //cross column moving
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    const finishItemIds = Array.from(finish.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      itemIds: finishItemIds,
    };

    const newData = {
      ...columnData,
      columns: {
        ...columnData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setColumnData(newData);
  };

  const setColumnTopic = (data) => {
    const newData = {
      ...columnData,
      columns: {
        ...columnData.columns,
        reorder: {
          ...columnData.columns.reorder,
          title: data.title,
          itemIds: data.items,
          correctItems: data.items.slice(0, 5),
        },
      },
    };
    console.log(newData);
    setColumnData(newData);
    setShowTopics(false);
    setShowSelection(true);
  };

  const setColumnItems = (data) => {
    const newData = {
      ...columnData,
      columns: {
        ...columnData.columns,
        reorder: {
          ...columnData.columns.reorder,
          itemIds: data,
        },
      },
    };
    console.log(newData);
    setColumnData(newData);
    setShowSelection(false);
    setShowOrdering(true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {showTopics && <TopicSelection setColumn={setColumnTopic} />}
      {showSelction && (
        <ItemSelection
          column={columnData.columns.reorder}
          goNext={setColumnItems}
        />
      )}
      {showOrdering && (
        <ReorderableColumn column={columnData.columns.reorder} />
      )}
    </DragDropContext>
  );
};

export default App;
