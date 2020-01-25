import React, { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import Grid from "./Grid";
import History from "./History";
import "./Edit.css";
import { Button } from "semantic-ui-react";
import html2canvas from "html2canvas";
import PixelSizeButtons from "./PixelSizeButtons";
import RowColumnButtons from "./RowColumnButtons";



export default function Edit(props) {
  const blankPattern = [];
  const [color, setColor] = useState("#9B9B9B");
  const [pattern, updatePattern] = useState(
    props.setClickedView.colours || blankPattern
  );
  console.log("pataern data from edit", pattern)
  const [pixelSize, setPixelSize] = useState("medium");

  // const clearGrid = () => {
  //   if (props.currentPattern === null) {
  //     console.log("inside clearGrid")
  //     updatePattern(blankPattern)
  //   }
  // }

  useEffect(() => {
    console.log("insdie useEffect")
    console.log("this pattern in useEffect", props.thisPattern)
    if (props.thisPattern === undefined) {
      updatePattern(blankPattern)
    }
    console.log("after update")
  }, [])

  //default array for rendering grid
  for (let i = 0; i < 25; i++) {
    blankPattern.push([]);
    for (let j = 0; j < 25; j++) {
      blankPattern[i].push("#fff");
    }
  }
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  // const [image, setImage] = useState(null)

  // used to show/hide the history tab
  const [history, viewHistory] = useState("hide");
  let historyTab;

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
    // console.log("title here", event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
    // console.log("description here", event.target.value);
  }


  return (
    <section className="edit">
      <div className="grid-history">
        {/* {renderGrid} */}
        <Grid pattern={pattern} updateColor={updateColor} size={pixelSize} />
        {historyTab}
      </div>
      <div className="controls" style={{ backgroundColor: color }}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Title
            </span>
          </div>
          <input
            // o={title}
            type="text"
            className="form-control"
            aria-label="Title"
            aria-describedby="basic-addon1"
            onChange={handleTitleChange}
          ></input>
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Description
            </span>
          </div>
          <input
            // value={form.description}
            type="text"
            className="form-control"
            aria-label="Description"
            aria-describedby="basic-addon1"
            onChange={handleDescriptionChange}
          ></input>
        </div>
        <ColorPicker color={color} onChangeComplete={handleChangeComplete} />
        <div className="size-controls">
          <RowColumnButtons
            addRowTop={addRowTop}
            deleteRowTop={deleteRowTop}
            addRowBottom={addRowBottom}
            deleteRowBottom={deleteRowBottom}
            addColumnLeft={addColumnLeft}
            deleteColumnLeft={deleteColumnLeft}
            addColumnRight={addColumnRight}
            deleteColumnRight={deleteColumnRight}
          />
        </div>
        <PixelSizeButtons setSize={setSize} />
        <Button content="Version history" onClick={toggleHistory} />
        <Button
          onClick={() => {
            console.log("props within save", props);
            save(title, description);
          }}
        >
          Save
        </Button>
      </div>
      {/* </div> */}
    </section>
  );
}
