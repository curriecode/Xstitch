import React, { useState } from "react";
import ViewGrid from "./ViewGrid";
import "./View.css";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function View(props) {
  const blankPattern = [];
  let colours;

  if (props.historyView === "version") {
    colours = props.currentCheckpoint.colours
  } else {
    colours = props.setClickedView.colours
  }

  let gridView = <ViewGrid pattern={blankPattern} />;

  if (colours) {
    gridView = <ViewGrid pattern={colours} />;
  }

  function goToEditpage() {
    props.setPage("edit");
    props.getCheckpointHistory();
    props.getPattern();
  }

  function print() {
    const input = document.getElementById("pdf");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
      });
      pdf.addImage(imgData, 'PNG', 0, 0)
      pdf.save('xstitch.pdf');
    });
  }

  return (
    <section className="view" id="pdf">
      {gridView}
      <div className="view-buttons" data-html2canvas-ignore="true">
        <Button.Group vertical>
          <Button icon labelPosition="left" onClick={print}>
            <Icon name="print" />
            Print
          </Button>
          <Button icon labelPosition="left" onClick={print}>
            <Icon name="image" />
            Save PDF
          </Button>
          <Button
            icon
            color="blue"
            labelPosition="left"
            floated="right"
            onClick={goToEditpage}
          >
            Edit
            <Icon name="edit" />
          </Button>
          <Button
            icon color="green"
            labelPosition="left"
            floated="right"
            onClick={props.forkPattern}>
            Fork
            <Icon name="fork" />
          </Button>
        </Button.Group>
      </div>
    </section>
  );
}
