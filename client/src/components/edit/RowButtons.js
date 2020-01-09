import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function RowButtons(props) {
  return (
    <Button.Group vertical>
      <Button icon labelPosition="left" onClick={props.addRowTop}>
        <Icon name="plus" />
        Add Row Top
      </Button>
      <Button icon labelPosition="left" onClick={props.deleteRowTop}>
        <Icon name="plus" />
        Delete Row Top
      </Button>
      <Button icon labelPosition="left" onClick={props.addRowBottom}>
        <Icon name="plus" />
        Add Row Bottom
      </Button>
      <Button icon labelPosition="left" onClick={props.deleteRowBottom}>
        Delete Row Bottom
        <Icon name="minus" />
      </Button>
    </Button.Group>
  );
}
