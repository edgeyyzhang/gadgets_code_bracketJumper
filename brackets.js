'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vs = require("vscode");
let LEFT = vs.workspace.getConfiguration('bracket-jumper').get('openingBrackets');
let RIGHT = vs.workspace.getConfiguration('bracket-jumper').get('closingBrackets');
let OTHERS = ["\"", "\'", "$", "|"]
/**
 * Get the character left or right of the given position
 * @param document the document to get from
 * @param pos the position to get at
 * @param dir the direction to get in
 */
function charAtPos(document, pos) {
    let line = document.lineAt(pos).text;
    let ind = pos.character;
    return line.substr(ind, 1);
}
/**
 * The position one step left in the document
 * @param document the document to move in
 * @param pos the position to move from
 * @returns the position one step left, or null if last
 */
function posLeft(document, pos) {
    let offset = document.offsetAt(pos);
    return offset > 0 ? document.positionAt(offset - 1) : null;
}
/**
 * The position one step right in the document
 * @param document the document to move in
 * @param pos the position to move from
 * @returns the position one step right, or null if first
 */
function posRight(document, pos) {
    let offset = document.offsetAt(pos);
    let next = offset < document.getText().length ? document.positionAt(offset + 1) : null;
    // If next same as pos, shift by two. See: https://github.com/Microsoft/vscode/issues/23247
    return next && pos.isEqual(next) ? document.positionAt(offset + 2) : next;
}
/**
 * The position of the nearest enclosing unmatched bracket, in the given direction.
 * @param document the document to search
 * @param pos the position to search from
 * @param dir the direction to search
 * @returns the bracket position, or null if not found
 */
 function unmatchedBracketInDir(doc, pos, dir) {
    let [des, pair] = dir == "left" ? [LEFT, RIGHT] : [RIGHT, LEFT];
    let posFun = dir == "left" ? posLeft : posRight;

    // Hotfix for https://github.com/sashaweiss/vscode-bracket-jumper/issues/1
    if (posLeft(doc, pos) == null) {
        return null;
    }

    let pAdj = pos;
    if (dir == "right" && (LEFT.indexOf(charAtPos(doc, posLeft(doc,pos))) != -1) && (RIGHT.indexOf(charAtPos(doc,pos)) == -1)) {
        pAdj = posLeft(doc, pos)
    } 
    else if (dir == "left" && (LEFT.indexOf(charAtPos(doc, posLeft(doc, pos))) != -1)){
        pAdj = posLeft(doc, pos)
    }
    else if (dir == "left" && (RIGHT.indexOf(charAtPos(doc, posLeft(doc, pos))) != -1) && (RIGHT.indexOf(charAtPos(doc, pos)) == -1)){
        pAdj = posLeft(doc, pos)
    }
    // else if (dir == "right" && (RIGHT.indexOf(charAtPos(doc, pos)) != -1)){
    //     pAdj = posRight(doc, pos)
    // }
    // else if (dir == "left" && (LEFT.indexOf(charAtPos(doc, pos)) != -1) && !(RIGHT.indexOf(charAtPos(doc, posLeft(pos))) != -1)){
    //     pAdj = posLeft(doc, pos)
    // }

    let paired = Array(LEFT.length).fill(0);

    while ((pAdj = posFun(doc, pAdj))) {
        let char = charAtPos(doc, pAdj);
        // Avoid jumping to internally paired bracket sets
        let pairInd = pair.indexOf(char);
        if (pairInd != -1) {
            paired[pairInd]++;
            continue;
        }
        let desInd = des.indexOf(char);
        if (desInd != -1) {
            if (paired[desInd] > 0) {
                paired[desInd]--;
            }
            else {
                return dir == "left" ? new vs.Position(pAdj.line, pAdj.character + 1): pAdj; // Put us on the outside always
            }
        }
    }
    return null;
}
exports.unmatchedBracketInDir = unmatchedBracketInDir;
/**
 * The position of the nearest bracket in the given direction.
 * @param document the document to search
 * @param pos the position to search from
 * @param dir the direction to search
 * @returns the bracket position, or null if not found
 */
 function bracketInDir(doc, pos, dir) {
    let posFun = dir == "left" ? posLeft : posRight;
    // Pesky edge case jumping right when current char is a bracket and last char in file
    if (dir == "right" && RIGHT.indexOf(charAtPos(doc, pos)) != -1) {
        return new vs.Position(pos.line, pos.character + 1);
    }
    // Hotfix for https://github.com/sashaweiss/vscode-bracket-jumper/issues/1
    if (posLeft(doc, pos) == null) {
        return null;
    }
    // Pesky edge case jumping left when prev char is a left bracket, skips it otherwise
    if (dir == "left" && LEFT.indexOf(charAtPos(doc, posLeft(doc, pos))) != -1) {
        return posLeft(doc, pos);
    }
    // Skip examining current char if going left, otherwise gets stuck
    let pAdj = dir == "left" ? posLeft(doc, pos) : pos;
    while ((pAdj = posFun(doc, pAdj))) {
        let char = charAtPos(doc, pAdj);
        if (LEFT.indexOf(char) != -1) {
            return pAdj;
        }
        else if (RIGHT.indexOf(char) != -1) {
            return new vs.Position(pAdj.line, pAdj.character + 1);
        }
    }
    return null;
}
exports.bracketInDir = bracketInDir;

function symbolInDir(doc, pos, dir, symbol) {
    let posFun = dir == "left" ? posLeft : posRight;
    // Hotfix for https://github.com/sashaweiss/vscode-bracket-jumper/issues/1
    if (posLeft(doc, pos) == null) {
        return null;
    }

    // // Pesky edge case jumping left when prev char is a left bracket, skips it otherwise
    // if (dir == "left" && LEFT.indexOf(charAtPos(doc, posLeft(doc, pos))) != -1) {
    //     return posLeft(doc, pos);
    // }
    // // Skip examining current char if going left, otherwise gets stuck
    // let pAdj = dir == "left" ? posLeft(doc, pos) : pos;
    let pAdj = (dir=="left" && charAtPos(doc,posLeft(doc,pos))==symbol) ? posLeft(doc, pos) : pos;
    while ((pAdj = posFun(doc, pAdj))) {
        let char = charAtPos(doc, pAdj);
        if (char == symbol) {
            if (dir == "left"){
                // return pAdj
                return posRight(doc, pAdj)
            } else {
                return pAdj
            }
        }  else if (symbol == "\"" && char == "\'") {
            if (dir == "left"){
                // return pAdj
                return posRight(doc, pAdj)
            } else {
                return pAdj
            }
        }  
    }
    return null;
}
exports.symbolInDir = symbolInDir;
/**
 * Update the LEFT and RIGHT arrays.
 */
function updateLeftRight() {
    const config = vs.workspace.getConfiguration('bracket-jumper');
    LEFT = config.get('openingBrackets');
    RIGHT = config.get('closingBrackets');
}
exports.updateLeftRight = updateLeftRight;
//# sourceMappingURL=brackets.js.map

function tabOut(doc, pos, dir) {
    // Hotfix for https://github.com/sashaweiss/vscode-bracket-jumper/issues/1
    if (posLeft(doc, pos) == null) {
        return null;
    }

    // if (dir == "left") {
    //     if ((RIGHT.indexOf(charAtPos(doc, posLeft(doc, pos)))!=-1)) {
    //         return posLeft(doc, pos)
    //     }    
    //     if ((LEFT.indexOf(charAtPos(doc, posLeft(doc, pos)))!=-1)) {
    //         return posLeft(doc, pos)
    //     }            
    //         // if (OTHERS.indexOf(charAtPos(doc, pos))!=-1) {
    //             //     return symbolInDir(doc, pos, "left", charAtPos(doc, pos))
    //             // }
    //     if (RIGHT.indexOf(charAtPos(doc, pos))!=-1) {
    //         return unmatchedBracketInDir(doc, posRight(doc, pos), "left")
    //     }
    // }
    if ((RIGHT.indexOf(charAtPos(doc, pos))!=-1 || OTHERS.indexOf(charAtPos(doc, pos))!=-1)) {
        return posRight(doc, pos)
    }   
    vs.commands.executeCommand("tab")
}
exports.tabOut = tabOut;

