import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function RowButtons(props) {
  return (
    <Button.Group vertical>
      <Button icon labelPosition="left" onClick={props.addRowBelow}>
        <Icon name="plus" />
        Add Row Below
      </Button>
      <Button icon labelPosition="left" onClick={props.deleteRowBelow}>
        Delete Row Below
        <Icon name="minus" />
      </Button>
    </Button.Group>
  );
}
