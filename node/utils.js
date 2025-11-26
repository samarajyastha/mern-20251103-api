function square(value) {
  return value * value;
}

function greet() {
  console.log("Hello from util default function");
}

// module.exports = { square };

export { square };

export default greet;
