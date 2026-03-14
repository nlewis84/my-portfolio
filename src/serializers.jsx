import React from "react";

const serializers = {
  types: {
    code: (props) => (
      <pre>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

export default serializers;
