import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function ColumnButtons(props) {
  return (
    <Button.Group vertical>
      <Button icon labelPosition="left" onClick={props.addColumnLeft}>
        <Icon name="plus" />
        Add Column Left
      </Button>
      <Button icon labelPosition="left" onClick={props.deleteColumnLeft}>
        <Icon name="plus" />
        Delete Column Left
      </Button>
      <Button icon labelPosition="left" onClick={props.addColumnRight}>
        <Icon name="plus" />
        Add Column Right
      </Button>
      <Button icon labelPosition="left" onClick={props.deleteColumnRight}>
        Delete Column Right
        <Icon name="minus" />
      </Button>
    </Button.Group>
  );
}
