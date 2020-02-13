import React, { useState, useEffect, useCallback, useReducer } from "react";
import Grid from "./Grid";
import History from "./History";
import { Button } from "semantic-ui-react";
import html2canvas from "html2canvas";
import reducer from "../../reducers/reducer";
import "./Edit.css";

//control panel components
import ColorPicker from "./control-panel/ColorPicker";
import PixelSizeButtons from "./control-panel/PixelSizeButtons";
import RowColumnButtons from "./control-panel/RowColumnButtons";
import TextInputs from "./control-panel/TextInputs";
import MoveImageToggle from "./control-panel/MoveImageToggle";

//imports for image overlay
import ImageOverlay from "./image-overlay/ImageOverlay";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

//initial blank pattern
const blankPattern = [];
for (let i = 0; i < 25; i++) {
  blankPattern.push([]);
  for (let j = 0; j < 25; j++) {
    blankPattern[i].push("#ffffff00");
  }
}

export default function Edit(props) {
  // useReducer
  const [state, dispatch] = useReducer(reducer, {
    pattern: props.setClickedView.colours || blankPattern,
    color: "#9B9B9B"
  });

  // useState
  const [pixelSize, setPixelSize] = useState("medium");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  // image overlay
  const [imageURL, setImageURL] = useState("");
  const [moveImage, setMoveImage] = useState(false);
  const [zIndex, setzIndex] = useState(1000);
  const toggle = useCallback(() => setMoveImage(!moveImage), [moveImage]);

  // clears grid/history if user leaves and then returns to edit page
  useEffect(() => {
    if (props.thisPattern === undefined) {
      dispatch({ type: "reset", value: blankPattern });
      props.setHistory([]);
    }
  }, []);

  // useEffect for image overlay
  useEffect(() => {
    moveImage ? setzIndex(1000) : setzIndex(0);
  }, [moveImage]);

  // show/hide the history tab
  const [history, viewHistory] = useState("hide");
  let historyTab;

  const toggleHistory = () =>
    history === "hide" ? viewHistory("show") : viewHistory("hide");

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

  // creates image from grid
  // encodes as string to be saved in database
  function createImage() {
    let input = document.getElementById("capture");
    return html2canvas(input, {
      backgroundColor: "black"
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
        colours: state.pattern,
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

  const modifyGrid = (side) => {
    dispatch({ type: side})
  };

  return (
    <section className="edit">
      <div className="grid-history" style={{ zIndex: "100" }}>
        <DndProvider backend={Backend}>
          <ImageOverlay imageURL={imageURL} zIndex={zIndex} />
        </DndProvider>
        <Grid
          pattern={state.pattern}
          updateColor={location => dispatch({ type: "paint", location })}
          size={pixelSize}
        />
        {historyTab}
      </div>
      <div className="controls" style={{ backgroundColor: state.color }}>
        <TextInputs
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          setImageURL={setImageURL}
        />
        <MoveImageToggle moveImage={moveImage} toggle={toggle} />
        <ColorPicker
          color={state.color}
          onChangeComplete={input =>
            dispatch({ type: "setColor", value: input.hex })
          }
        />
        <div className="size-controls">
          <RowColumnButtons
            patternRows={state.pattern.length}
            patternColumns={state.pattern[0].length}
            modifyGrid={modifyGrid}
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
