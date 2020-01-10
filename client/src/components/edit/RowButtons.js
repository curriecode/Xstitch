import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function RowButtons(props) {
  return (
    <Button.Group vertical>
      <Button labelPosition="left" onClick={props.addRowTop}>
        Add Row Top
      </Button>
      <Button labelPosition="left" onClick={props.deleteRowTop}>
        Delete Row Top
      </Button>
      <Button labelPosition="left" onClick={props.addRowBottom}>
        Add Row Bottom
      </Button>
      <Button labelPosition="left" onClick={props.deleteRowBottom}>
        Delete Row Bottom
      </Button>
    </Button.Group>
  );
}
