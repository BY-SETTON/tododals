import * as Icons from "react-feather";

export default function SearchIcon() {
  let icons = Object.keys(Icons);
  return (icons.map((icon) => (<div key={icon}>{icon}</div>)))
}
