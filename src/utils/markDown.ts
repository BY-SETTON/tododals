export default function convertMarkDownToHTML(markDown: string) {
  let isBoldOpen = false;

  let newString = ''
  for (let i = 0; i < markDown.length; i++) {
    switch (markDown[i]) {
      case '*':
        isBoldOpen = !isBoldOpen;
        newString = isBoldOpen ? `${newString}<b>` : `${newString}</b>`
        continue;
      case '\n':
        newString = `${newString}<br>`
        continue;
    }
    newString = `${newString}${markDown[i]}`
  }
  return newString;
}
