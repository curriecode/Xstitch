import React, { useState, useEffect, useCallback } from "react";
import Grid from "./Grid";
import History from "./History";
import "./Edit.css";
import { Button } from "semantic-ui-react";
import html2canvas from "html2canvas";

//control panel components
import ColorPicker from "./control-panel/ColorPicker";
import PixelSizeButtons from "./control-panel/PixelSizeButtons";
import RowColumnButtons from "./control-panel/RowColumnButtons";
import TextInputs from "./control-panel/TextInputs";
import MoveImageToggle from "./control-panel/MoveImageToggle";

//imports for image overlay/drag and drop
import ImageOverlay from "./image-overlay/ImageOverlay";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

export default function Edit(props) {
  const blankPattern = [];
  const [color, setColor] = useState("#9B9B9B");
  const [pattern, updatePattern] = useState(
    props.setClickedView.colours || blankPattern
  );
  // console.log("pataern data from edit", pattern)

  const [pixelSize, setPixelSize] = useState("medium");

  useEffect(() => {

    if (props.thisPattern === undefined) {
      updatePattern(blankPattern);
      props.setHistory([]);
    }
  }, [])


  //default array for rendering grid
  for (let i = 0; i < 25; i++) {
    blankPattern.push([]);
    for (let j = 0; j < 25; j++) {
      blankPattern[i].push("#ffffff00");
    }
  }
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");

  // used to show/hide the history tab
  const [history, viewHistory] = useState("hide");
  let historyTab;

  // image overlay
  const [moveImage, setMoveImage] = useState(false);
  const [zIndex, setzIndex] = useState(1000);
  const toggle = useCallback(() => setMoveImage(!moveImage), [moveImage]);

  // useEffect for image overlay
  useEffect(() => {
    if (moveImage) {
      setzIndex(1000);
    } else {
      setzIndex(0);
    }
  }, [moveImage]);

  function updateColor(input) {
    const newPattern = pattern.map((row, rowIndex) => {
      if (rowIndex === input[0]) {
        return row.map((pixel, pixelIndex) => {
          if (pixelIndex === input[1]) {
            return (row[pixelIndex] = color);
          } else {
            return pixel;
          }
        });
      } else {
        return row;
      }
    });
    updatePattern(newPattern);
  }

  function handleChangeComplete(input) {
    setColor(input.hex);
  }

  function addRowBottom() {
    const newRow = [];
    for (let i = 0; i < pattern[0].length; i++) {
      newRow.push("#ffffff");
    }
    updatePattern(prev => [...prev, newRow]);
  }

  function addRowTop() {
    const newRow = [];
    for (let i = 0; i < pattern[0].length; i++) {
      newRow.push("#ffffff");
    }
    updatePattern(prev => [newRow, ...prev]);
  }

  function deleteRowTop() {
    updatePattern(pattern.slice(1, pattern.length));
  }

  function deleteRowBottom() {
    updatePattern(pattern.slice(0, pattern.length - 1));
  }

  function addColumnRight() {
    updatePattern(prev => {
      let newPattern = [];
      prev.forEach(row => {
        row.push("#ffffff");
        newPattern.push(row);
      });
      return newPattern;
    });
  }

  function addColumnLeft() {
    updatePattern(prev => {
      let newPattern = [];
      prev.forEach(row => {
        row.unshift("#ffffff");
        newPattern.push(row);
      });
      return newPattern;
    });
  }

  function deleteColumnRight() {
    updatePattern(prev => {
      let newPattern = [];
      prev.forEach(row => {
        row.pop();
        newPattern.push(row);
      });
      return newPattern;
    });
  }

  function deleteColumnLeft() {
    updatePattern(prev => {
      let newPattern = [];
      prev.forEach(row => {
        row.shift();
        newPattern.push(row);
      });
      return newPattern;
    });
  }

  function toggleHistory() {
    if (history === "hide") {
      viewHistory("show");
    } else {
      viewHistory("hide");
    }
  }

  if (history === "hide") {
    historyTab = <div></div>;
  } else {
    historyTab = (
      <History
        setPage={props.setPage}
        setCheckpoint={props.setCheckpoint}
        setHistoryView={props.setHistoryView}
        history={props.checkpointHistory}
      />
    );
  }

  function createImage() {
    let input = document.getElementById("capture");
    return html2canvas(input, {
      backgroundColor: "grey"
    }).then(canvas => {
      return canvas.toDataURL("image/png");
    });
  }

  //creates new pattern or checkpoint in the database when save is clicked
  function save(title, description) {
    return createImage().then(image => {
      let saveData = {
        description: description,
        title: title,
        colours: pattern,
        image_url: image
      };
      props.saveHandler(saveData);
    });
  }

  function setSize(input) {
    setPixelSize(input);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  return (
    <section className="edit">
      <div className="grid-history" style={{ zIndex: "100"}}>
        <DndProvider backend={Backend}>
          <ImageOverlay imageURL={imageURL} zIndex={zIndex} />
        </DndProvider>
        <Grid pattern={pattern} updateColor={updateColor} size={pixelSize} />
        {historyTab}
      </div>
      <div className="controls" style={{ backgroundColor: color }}>
        <TextInputs
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          setImageURL={setImageURL}
        />
        <MoveImageToggle moveImage={moveImage} toggle={toggle}/>
        <ColorPicker color={color} onChangeComplete={handleChangeComplete} />
        <div className="size-controls">
          <RowColumnButtons
            patternRows={pattern.length}
            patternColumns={pattern[0].length}
            addRowTop={addRowTop}
            deleteRowTop={deleteRowTop}
            addRowBottom={addRowBottom}
            deleteRowBottom={deleteRowBottom}
            addColumnLeft={addColumnLeft}
            deleteColumnLeft={deleteColumnLeft}
            addColumnRight={addColumnRight}
            deleteColumnRight={deleteColumnRight}
          />
          <PixelSizeButtons setSize={setSize} />
        </div>
        <Button content="Version history" onClick={toggleHistory} />
        <Button
          onClick={() => {
            save(title, description);
          }}
        >
          Save
        </Button>
      </div>
    </section>
  );
}
