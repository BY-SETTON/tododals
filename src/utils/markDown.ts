export default function convertMarkDownToHTML(markDown: string) {
  if (!markDown) {
    return '';
  }
  let isBoldOpen = false;
  let isLinkOpen = false;
  let finishedURLProcessing = true;
  let processingLink = true;
  let processingLinkText = false;

  let linkText = '';
  let linkUrl = '<a style="color: blue; text-decoration: underline;" target="_blank" href="';

  let newString = ''
  for (let i = 0; i < markDown.length + 2; i++) {
    switch (markDown[i]) {
      case '*':
        isBoldOpen = !isBoldOpen;
        newString = isBoldOpen ? `${newString}<b>` : `${newString}</b>`
        continue;
      case '[':
        isLinkOpen = true;
        finishedURLProcessing = false;
        continue;
      case ']':
        isLinkOpen = false;
        processingLinkText = false;
        continue;
      case ',':
        processingLink = false;
        processingLinkText = true;
        continue;
      case '\n':
        newString = `${newString}<br>`
        continue;
    }

    console.log(!finishedURLProcessing, '!finishedURLProcessing');
    console.log(processingLinkText, 'processingLinkText');
    console.log(linkText, 'linkText');
    console.log(linkUrl, 'linkUrl');

    if (!finishedURLProcessing) {
      if (isLinkOpen || !finishedURLProcessing) {
        if (processingLink) {
          linkUrl = `${linkUrl}${markDown[i]}`
        } else {
          if (processingLinkText) {
            linkText = `${linkText}${markDown[i]}`
          } else {
            linkUrl = `${linkUrl}">${linkText}</a>`;
            console.log(linkUrl, '-------------------------------------linkUrl');
            finishedURLProcessing = true;
          }
        }
      }
      if (finishedURLProcessing) {
        newString = `${newString}${linkUrl}`
      }
    } else {
      newString = `${newString}${markDown[i] || ''}`
    }
    console.log(newString);
  }
  return newString;
}
