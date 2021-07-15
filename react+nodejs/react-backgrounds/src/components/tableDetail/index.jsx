import React from "react";

class TableDetail extends React.Component {
  render() {
    return <div>{this.props.match.params.id}</div>;
  }
}

export default TableDetail;
