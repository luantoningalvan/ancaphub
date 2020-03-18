import React from "react";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import CardBody from "../ui/CardBody";

const LastItemsWidget = props => {
  return (
    <div style={{width: "100%"}}>
    <Card>
      <CardHeader>
        <h3>Contribuições Recentes</h3>
      </CardHeader>
      <CardBody>
        Teste
      </CardBody>
    </Card>
    </div>
  )
};

export default LastItemsWidget;