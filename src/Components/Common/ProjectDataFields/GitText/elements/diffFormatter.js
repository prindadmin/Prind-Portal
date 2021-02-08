
import * as Diff from 'diff';


function checkContentIsEmpty(parent) {
  // Check for empty comparison text
  if (parent.state.oldVersion.initialContent === undefined || parent.state.newVersion.initialContent === undefined) {
    console.warn("One of the contents was empty")
    console.warn(`old: ${parent.state.oldVersion.initialContent}; new: ${parent.state.newVersion.initialContent}`)
    return true
  }
  return false
}


function removeNewLines(text, replaceWith) {
  var replaceString = ""
  if (replaceWith !== undefined) {
    replaceString = replaceWith
  }
  return text.replace(/\n/g, replaceString)
}


function splitOnOpeningTags(fileString) {
  return fileString.split(/(?=<[a-zA-Z0-9 "=:;-]+>)/g).slice(0)
}


function AddFormatting(parent) {
  console.log(parent.state)

  // Check for empty comparison text
  if (checkContentIsEmpty(parent)) {
    return parent.state.newVersion.initialContent
  }

  // Remove line breaks because they make things confusing when marking up
  //const oldToCompare = removeNewLines(parent.state.oldVersion.initialContent)
  //const newToCompare = removeNewLines(parent.state.newVersion.initialContent)

  const oldToCompareWithNewLines = parent.state.oldVersion.initialContent
  const newToCompareWithNewLines = parent.state.newVersion.initialContent

  /*
  const diffWords = Diff.diffWords(oldToCompare, newToCompare);
  const diffLines1 = Diff.diffLines(oldToCompare, newToCompare, {newlineIsToken: true});
  const diffLines2 = Diff.diffLines(oldToCompare, newToCompare, {newlineIsToken: false});
  const diffLines3 = Diff.diffTrimmedLines(oldToCompare, newToCompare, {newlineIsToken: true});
  const diffLines4 = Diff.diffTrimmedLines(oldToCompare, newToCompare, {newlineIsToken: false});
  const diffLines5 = Diff.diffLines(oldToCompareWithNewLines, newToCompareWithNewLines, {newlineIsToken: true});
  const diffLines6 = Diff.diffLines(oldToCompareWithNewLines, newToCompareWithNewLines, {newlineIsToken: false});
  const diffLines7 = Diff.diffTrimmedLines(oldToCompareWithNewLines, newToCompareWithNewLines, {newlineIsToken: true});
  const diffLines8 = Diff.diffTrimmedLines(oldToCompareWithNewLines, newToCompareWithNewLines, {newlineIsToken: false});
  console.log(diffWords)
  //console.log(diffLines1)
  //console.log(diffLines2)
  //console.log(diffLines3)
  //console.log(diffLines4)
  console.log(diffLines5) // Removes text and adds it back in after a new line; maybe we could account for this as a special case?
  console.log(diffLines6) // Removes text and adds it back in straight away; maybe we could account for this as a special case?
  console.log(diffLines7) // perfect!!!
  console.log(diffLines8) // Removes text and adds it back in straight away; maybe we could account for this as a special case?
  */

  const diff = Diff.diffTrimmedLines(oldToCompareWithNewLines, newToCompareWithNewLines, {newlineIsToken: true});

  var outputDifference = ''

  diff.forEach((part) => {
    // green for additions, red for deletions
    // no formatting for common parts
    const style = part.added ? "color: lawngreen; background: none;" :
                  part.removed ? "color: red; background: none; text-decoration: line-through;" :
                  ""

    if(style === '') {
      outputDifference += `${part.value}`
      return;
    }

    const markedUpClass = part.value.replaceAll(/<p /g, `<p style="${style}" `)

    outputDifference += markedUpClass
  })

  //console.log(outputDifference)
  console.log(splitOnOpeningTags(outputDifference))

  return outputDifference
}

export default AddFormatting
