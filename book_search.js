/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */

 function findTerm(scannedText, term) {
  var includeList = [];

  for (var i = 0; i < scannedText.Content.length; i++) {
      var subcontent = scannedText.Content[i];

      if (subcontent.Text.includes(term)) {
          includeList.push({
              ISBN: scannedText.ISBN,
              Page: subcontent.Page,
              Line: subcontent.Line,
          });
      }

      // check if the line ends in dash, and if hyphenated words splits two lines
      else if (
          subcontent.Text.slice(-1) == "-" &&
          i + 1 <= scannedText.Content.length) {
          let fullString = subcontent.Text.concat(
              scannedText.Content[i + 1].Text,
          ).split(" ");

          fullString.forEach((word) => {
              if (word.includes("-") && word.replace("-", "") ==
                  term) {
                  for (var lineNum = subcontent.Line; lineNum <=
                      subcontent.Line + 1; lineNum++) {
                      includeList.push({
                          ISBN: scannedText.ISBN,
                          Page: subcontent.Page,
                          Line: lineNum,
                      });
                  }
              }
          });
      }
  }

  return includeList;
}

function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */

  var resultsList = [];

  scannedTextObj.forEach((scannedText) => {
      resultsList = resultsList.concat(findTerm(scannedText,
          searchTerm));
  });

  var result = {
      SearchTerm: searchTerm,
      Results: resultsList,
  };

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */


// Test Data
const twentyLeaguesOutArray = [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 8,
    },
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ];

const emptyObjectIn = [];

const twentyLeaguesIn2 = {
  Title: "Twenty Thousand Leagues Under the Sea",
  ISBN: "9780000528531",
  Content: [
    {
      Page: 31,
      Line: 8,
      Text: "now simply went on by her own momentum.  The dark-",
    },
    {
      Page: 31,
      Line: 9,
      Text: "ness was then profound; and however good the Canadian's",
    },
    {
      Page: 31,
      Line: 10,
      Text: "eyes were, I asked myself how he had managed to see, and",
    },
  ],
};

const multipleBooksIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
  {
    Title: "Catch-22",
    ISBN: "9780099529118",
    Content: [
      {
        Page: 45,
        Line: 1,
        Text: '"That\'s some catch, that Catch-22," he observed.',
      },
      {
        Page: 45,
        Line: 2,
        Text: '"It\'s the best there is," Doc Daneeka agreed.”',
      },
    ],
  },
];

const multipleBooksOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
    {
      ISBN: "9780099529118",
      Page: 45,
      Line: 2,
    },
  ],
};

const dashedWordOut = {
  SearchTerm: "Catch-22",
  Results: [
    {
     ISBN: "9780099529118",
     Page: 45,
     Line: 1
    }
  ]
}

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

// empty scannedTextObj input
const test6result = findSearchTermInBooks("dog", emptyObjectIn);
if (
  JSON.stringify(test6result) ===
  JSON.stringify({ SearchTerm: "dog", Results: [] })
) {
  console.log("PASS: Test 3");
} else {
  console.log("FAIL: Test 3");
  console.log("Expected:", { SearchTerm: "dog", Results: [] });
  console.log("Received:", test6result);
}

// check input with multiple different books
const test7result = findSearchTermInBooks("the", multipleBooksIn);
if (JSON.stringify(multipleBooksOut) === JSON.stringify(test7result)) {
  console.log("PASS: Test 4");
} else {
  console.log("FAIL: Test 4");
  console.log("Expected:", multipleBooksOut);
  console.log("Received:", test7result);
}

// check input with mulitple words in the search term
const test8result = findSearchTermInBooks("Doc Daneeka", multipleBooksIn);
if (test8result.Results.length == 1) {
  console.log("PASS: Test 5");
} else {
  console.log("FAIL: Test 5");
  console.log("Expected:", 1);
  console.log("Received:", test8result.Results.length);
}

// search for non-split word with a dash
const test9results = findSearchTermInBooks('Catch-22', multipleBooksIn)
if (JSON.stringify(test9results) === JSON.stringify(dashedWordOut)) {
  console.log('PASS: Test 6');
} else {
  console.log('FAIL: Test 6');
  console.log('Expected:', dashedWordOut);
  console.log('Received:', test9results)
}

// case sensetive 
const test11results = findSearchTermInBooks('catch-22,', multipleBooksIn)
if (test11results.Results.length == 0) {
  console.log('PASS: Test 7')
} else {
  console.log('FAIL: Test 7');
  console.log('Expected:', 0);
  console.log('Received:', test11results.Results.length);
}

// **Tests for helper functions**

// search for nonexistent term
const test3result = findTerm(twentyLeaguesIn2, 'dog');
if (test3result.length == 0) {
  console.log("PASS: Test 8");
} else {
  console.log("FAIL: Test 8");
  console.log("Expected:", 0);
  console.log("Received:", test3result.length);
}

// check split word
const test4result = findTerm(twentyLeaguesIn2, "darkness");
if (JSON.stringify(twentyLeaguesOutArray) === JSON.stringify(test4result)) {
  console.log("PASS: Test 9");
} else {
  console.log("FAIL: Test 9");
  console.log("Expected:", twentyLeaguesOutArray);
  console.log("Received:", test4result);
}

// search for one half of the split word
const test5result = findTerm(twentyLeaguesIn2, 'dark-');
if (test5result.length == 1) {
  console.log("PASS: Test 10");
} else {
  console.log("FAIL: Test 10");
  console.log("Expected:", 1);
  console.log("Received:", test5result.length);
}

// search for words appearing on multiple lines
const test10results = findTerm(twentyLeaguesIn2, 'and')
if (test10results.length == 2) {
  console.log('PASS: Test 11');
} else {
    console.log('FAIL: Test 11');
    console.log('Expected:', 2);
    console.log('Received:', test10results.length);
  }