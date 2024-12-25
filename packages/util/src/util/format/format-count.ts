export function formatCount(count: number) {
  if (count < 1000) {
    return count.toString();
  }

  if (count < 10000) {
    let [integer, decimal] = (count / 1000).toString().split(".");
    if (decimal && decimal[0] !== "0") {
      decimal = decimal[0];
    } else {
      decimal = "";
    }

    return decimal ? `${integer}.${decimal}천` : `${integer}천`;
  }

  let [integer, decimal] = (count / 10000).toString().split(".");
  if (decimal && decimal[0] !== "0") {
    decimal = decimal[0];
  } else {
    decimal = "";
  }

  return decimal ? `${integer}.${decimal}만` : `${integer}만`;
}
