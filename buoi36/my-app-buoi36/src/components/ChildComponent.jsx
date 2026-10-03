import { memo } from "react";

const ChildComponent = memo(function ChildComponent() {
  console.log("Render Child Component");

  return <div>Child Component</div>;
});

export default ChildComponent;
