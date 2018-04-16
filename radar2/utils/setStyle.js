export const getStyle = ({ measure }) => ({
  height: measure.height,
  width: measure.width
  // top: measure.y,
  // left: measure.x
});

export const getMeasures = ({ id, nodes, callback, parent }) => {
  let getNode = nodes[id].getNode
    ? nodes[id].getNode().measure
    : nodes[id].measure;

  getNode((x, y, width, height, px, py) => {
    console.log({ x, y, width, height, py, px });
    let nativeEvent = { layout: { x, y, width, height, py, px } };
    callback({ nativeEvent, id });
  });
};
