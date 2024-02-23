import * as Icons from "react-feather";

export default function SearchIcon() {
  let icons = Object.keys(Icons);
  console.log(icons);
  return (icons.map((icon) => (<div key={icon}>{icon}</div>)))
}
