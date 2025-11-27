const codeitUrl =
  "https://www.codeit.com.np/web-development/mern-stack?sub=React&duration=1+month";

const urlObject = new URL(codeitUrl);
console.log(urlObject);
console.log(urlObject.host);
console.log(urlObject.search);
console.log(urlObject.searchParams);

const params = new URLSearchParams(urlObject.search);
console.log(params);

params.set("time", "8pm");

console.log(params);

params.set("duration", "2 month");
console.log(params);
