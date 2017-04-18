/**
 * Function ensures all pairs of braces, brackets, and parens are 
 * opened and closed in a syntactically-correct order
 */

const matchPairs = (charString) => {
    
    // First, do basic input validation and throw any obvious problems
    if (!charString || typeof charString !== "string" || !charString.length) {
        throw new Error("Must provide a non-empty input string")
    }

    // Define what chars can open and the corresponding close
    const openers = [ "{", "(", "[" ];
    const closers = [ "}", ")", "]" ];

    // Make input an array for easier iteration
    const charArray = charString.split("");

    // Make a stack to hold opened input chars
    let charStack = [];

    // Keep track of any unmatched closes
    let unOpenedClose = false;

    // Loop through input, making sure opens and closes happen in correct order
    charArray.forEach((value, index) => {

        // If input isn't one of allowed chars, throw an error
        if (openers.indexOf(value) < 0 && closers.indexOf(value) < 0) {
            throw new Error("Found illegal '" + value + "' in input string");
        }

        // If character is an opener, add to stack and evaluate next index
        if (openers.indexOf(value) >= 0) {
            charStack.push(value);
            return;
        }

        // If character is a closer, check it and remove from stack
        if (closers.indexOf(value) >= 0) {

            // Make sure it's closing the right char by checking indexes of
            // openers and closers
            const lastStackItem = charStack[charStack.length - 1];
            if (closers.indexOf(value) === openers.indexOf(lastStackItem)) {
                
                // Great! Remove the last stack item and evaluate next index
                charStack.pop();
                return;
            }

            // If current char isn't the right one to close the stack's open
            // item, it must be an unmatched close and should fail the test
            unOpenedClose = true;
            return;
        }
    });

    // Our stack should be empty if everything was closed properly and we
    // shouldn't have any unmatched closes. Test this and return the result
    return (!charStack.length && !unOpenedClose);
}

module.exports = matchPairs;