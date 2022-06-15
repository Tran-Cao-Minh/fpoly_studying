function sayHello(fullName) {
  const fullName = fullName.trim();
  const fullNameUpperCase = fullName.toUpperCase();
  alert(`Hello ${fullNameUpperCase}`);
}

function logHello(fullName) {
  const fullName = fullName.trim();
  const fullNameUpperCase = fullName.toUpperCase();
  console.log(`Hello ${fullNameUpperCase}`);
}

window.addEventListener("load", () => {
  sayHello("Everyone");
  logHello("Everyone");
});
