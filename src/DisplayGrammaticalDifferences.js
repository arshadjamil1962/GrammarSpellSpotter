import React, { useState } from "react";

function findGrammaticalDifferences(paramOriginalStr, paramCorrectedStr) {
  //Splitting given strings into array of words
  const originalStr = paramOriginalStr.split(" ");
  const correctedStr = paramCorrectedStr.split(" ");

  // separating miss-spelled words from the original words array
  var wordsCorrected = originalStr.filter(word => !correctedStr.includes(word));

  var highlightedText = "";

  //Setting the 2 arrays's indexes
  let originalStrIndex = 0;
  let correctedStrIndex = 0;
  do {
    var hasMatched = (correctedStr[correctedStrIndex] === originalStr[originalStrIndex]);

    if (hasMatched) {
      // for matching word in 2-arrays, adding the word in highlightedtext
      // and shifting both array index to next index
      highlightedText = highlightedText + " " + correctedStr[correctedStrIndex];
      originalStrIndex++;
      correctedStrIndex++;
    } else {

      // checking that the un-matched word is a miss-spelled word
      if (wordsCorrected.includes(originalStr[originalStrIndex])) {
        // for un-matching and spelled corrected word, adding the word from corrected array in highlightedtext
        highlightedText = highlightedText + "<span class='spellDiff'> " + correctedStr[correctedStrIndex] + " </span>";
        // if its a miss-spelled word, shifting the index of original array to next index
        // in order to match the shifting of corrected array index
        originalStrIndex++;
      } else {
        // for un-matching and grammatically corrected word, adding the word from corrected array in highlightedtext
        highlightedText = highlightedText + "<span class='gramDiff'> " + correctedStr[correctedStrIndex] + " </span>";

      }
      //shifting index of corrected array to next index.
      correctedStrIndex++
    }
  }
  while (correctedStrIndex < correctedStr.length);

  //wrapping highlightedtext as paragraph

  highlightedText = "<p>" + highlightedText + "</p>";

  return (<div dangerouslySetInnerHTML={{ __html: highlightedText }} />)
}

function DisplayGrammaticalDifferences() {
  // const [str1, setStr1] = useState("IT is a globl force that connects people, businesses, and governmnts, enabling rapid advancements in varius fields. From Silicon Valley in the United States, which renowned for its tech innovation and entrepreneurship, to India, a global IT outsorcing hub, and Silicon Wadi in Israel, known for its vibrant tech start-up scene, IT hubs are scatered across the globe, each contributing to global digital landscape.");
  // const [str2, setStr2] = useState("IT is a global force that connects people, businesses, and governments, enabling rapid advancements in various fields. From Silicon Valley in the United States, which is renowned for its tech innovation and entrepreneurship, to India, a global IT outsourcing hub, and Silicon Wadi in Israel, known for its vibrant tech start-up scene, IT hubs are scattered across the globe, each contributing to the global digital landscape.");

  const [str1, setStr1] = useState("IT is a globl force that conects people, businesses, and governmnts, enabling rapid advancemnts in varius fields.");
  const [str2, setStr2] = useState("IT is a global force that connects the people, businesses, and governments, enabling rapid advancements in various fields of life.");

  const differences = findGrammaticalDifferences(str1, str2);

  return (
    <div>
      <div style={{ width: '100%', backgroundColor: "antiquewhite", fontSize:"x-large" }}>
        <p style={{ padding:"10px" }}><span className="spellDiff"> Spelling </span>-<span className="gramDiff"> Grammar </span> Spotter</p>
      </div>
      <div>
        <label>First String : Miss Spelled-Grammared</label>
        <textarea
          value={str1}
          onChange={(e) => setStr1(e.target.value)}
          placeholder="Enter the first string"
          rows={4}
          cols={150}
        />
      </div>
      <div>
        <label>Second String : Correct Spelled-Grammared</label>
        <textarea
          value={str2}
          onChange={(e) => setStr2(e.target.value)}
          placeholder="Enter the second string"
          rows={4}
          cols={150}
        />
      </div>
      <div>
        {differences}
      </div>
      <div style={{ width: '100%', backgroundColor: "antiquewhite" }}>
        <p style={{ padding: "10px" }}>Application that compare two strings: one with misspelled words and incorrect grammar, and the other with the correct spelling and grammar. The application identify the differences between the two strings and display them by highlighting the incorrect parts along with the corrected version.</p>
      </div>
    </div>
  );
}

export default DisplayGrammaticalDifferences;
