import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function ColumnButtons(props) {
  return (
    <Button.Group vertical>
      <Button labelPosition="left" onClick={props.addColumnLeft}>
        Add Column Left
      </Button>
      <Button labelPosition="left" onClick={props.deleteColumnLeft}>
        Delete Column Left
      </Button>
      <Button labelPosition="left" onClick={props.addColumnRight}>
        Add Column Right
      </Button>
      <Button labelPosition="left" onClick={props.deleteColumnRight}>
        Delete Column Right
      </Button>
    </Button.Group>
  );
}
