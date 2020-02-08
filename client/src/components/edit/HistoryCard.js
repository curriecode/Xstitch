import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import View from "../view/View"

export default function HistoryCard(props) {
  // let colours = props.item.colours
  // function historyViewPage(item) {
  //   props.setHistoryView([...item])
  // }

  function viewPage() {
    props.setPage("view")
    props.setCheckpoint(props.item)
    props.setHistoryView("version")


  }
  // console.log("this  is item from history card", props.item)
  return (
    <div className="history-card">
      <Card>
        <div className="history-image">
          <Image src={props.img} size="small" />
        </div>
        <Button basic content="View" onClick={viewPage}
        />
      </Card>
    </div>
  );
}
