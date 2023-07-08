'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vs = require("vscode");
const brackets = require("./brackets");
// function jumpLeft() {
//     let editor = vs.window.activeTextEditor;
//     let curPos = editor.selection.active;
//     let document = editor.document;
//     let bracketPos = brackets.bracketInDir(document, curPos, "left");
//     if (bracketPos) {
//         let newSelection = new vs.Selection(bracketPos, bracketPos);
//         editor.selection = newSelection;
//         editor.revealRange(new vs.Range(bracketPos, bracketPos));
//     }
// }
// exports.jumpLeft = jumpLeft;
// function jumpRight() {
//     let editor = vs.window.activeTextEditor;
//     let curPos = editor.selection.active;
//     let document = editor.document;
//     let bracketPos = brackets.bracketInDir(document, curPos, "right");
//     if (bracketPos) {
//         let newSelection = new vs.Selection(bracketPos, bracketPos);
//         editor.selection = newSelection;
//         editor.revealRange(new vs.Range(bracketPos, bracketPos));
//     }
// }
// exports.jumpRight = jumpRight;
// function selectLeft() {
//     let editor = vs.window.activeTextEditor;
//     let curPos = editor.selection.active;
//     let anchorPos = editor.selection.anchor;
//     let document = editor.document;
//     let bracketPos = brackets.bracketInDir(document, curPos, "left");
//     if (bracketPos) {
//         let newSelection = new vs.Selection(anchorPos, bracketPos);
//         editor.selection = newSelection;
//         editor.revealRange(new vs.Range(bracketPos, bracketPos));
//     }
// }
// exports.selectLeft = selectLeft;
// function selectRight() {
//     let editor = vs.window.activeTextEditor;
//     let curPos = editor.selection.active;
//     let anchorPos = editor.selection.anchor;
//     let document = editor.document;
//     let bracketPos = brackets.bracketInDir(document, curPos, "right");
//     if (bracketPos) {
//         let newSelection = new vs.Selection(anchorPos, bracketPos);
//         editor.selection = newSelection;
//         editor.revealRange(new vs.Range(bracketPos, bracketPos));
//     }
// }
// exports.selectRight = selectRight;
function ascendLeft() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.unmatchedBracketInDir(document, curPos, "left");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendLeft = ascendLeft;

function ascendRight() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = [];
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.unmatchedBracketInDir(document, curPos, "right");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }     
    }
    editor.selections = selections
}
exports.ascendRight = ascendRight;

function ascendSelectLeft() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let anchors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
        anchors[curInd] = editor.selections[curInd].anchor;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let ancPos = anchors[curInd]
        let bracketPos = brackets.unmatchedBracketInDir(document, curPos, "left");
        if (bracketPos) {
            let newSelection = new vs.Selection(ancPos, bracketPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendSelectLeft = ascendSelectLeft;

function ascendSelectRight() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let anchors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
        anchors[curInd] = editor.selections[curInd].anchor;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let ancPos = anchors[curInd]
        let bracketPos = brackets.unmatchedBracketInDir(document, curPos, "right");
        if (bracketPos) {
            let newSelection = new vs.Selection(ancPos, bracketPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendSelectRight = ascendSelectRight;

// =============== My ===============
function ascendRightDQuote() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "right", "\"");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendRightDQuote = ascendRightDQuote;

function ascendLeftDQuote() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "left", "\"");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendLeftDQuote = ascendLeftDQuote;

function ascendRightDollar() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "right", "$");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendRightDollar= ascendRightDollar;

function ascendLeftDollar() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "left", "$");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendLeftDollar = ascendLeftDollar;

function ascendSelectRightDQuote() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let anchors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
        anchors[curInd] = editor.selections[curInd].anchor;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let ancPos = anchors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "right", "\"");
        if (bracketPos) {
            let newSelection = new vs.Selection(ancPos, bracketPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendSelectRightDQuote = ascendSelectRightDQuote;

function ascendSelectLeftDQuote() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let anchors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
        anchors[curInd] = editor.selections[curInd].anchor;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let ancPos = anchors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "left", "\"");
        if (bracketPos) {
            let newSelection = new vs.Selection(ancPos, bracketPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendSelectLeftDQuote = ascendSelectLeftDQuote;

function ascendSelectRightDollar() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let anchors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
        anchors[curInd] = editor.selections[curInd].anchor;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let ancPos = anchors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "right", "$");
        if (bracketPos) {
            let newSelection = new vs.Selection(ancPos, bracketPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendSelectRightDollar= ascendSelectRightDollar;

function ascendSelectLeftDollar() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let anchors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
        anchors[curInd] = editor.selections[curInd].anchor;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let ancPos = anchors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "left", "$");
        if (bracketPos) {
            let newSelection = new vs.Selection(ancPos, bracketPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendSelectLeftDollar = ascendSelectLeftDollar;

function ascendRightEq() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "right", "=");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendRightEq = ascendRightEq;

function ascendLeftEq() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "left", "=");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendLeftEq = ascendLeftEq;

function ascendSelectRightEq() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let anchors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
        anchors[curInd] = editor.selections[curInd].anchor;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let ancPos = anchors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "right", "=");
        if (bracketPos) {
            let newSelection = new vs.Selection(ancPos, bracketPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendSelectRightEq = ascendSelectRightEq;

function ascendSelectLeftEq() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let anchors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
        anchors[curInd] = editor.selections[curInd].anchor;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let ancPos = anchors[curInd]
        let bracketPos = brackets.symbolInDir(document, curPos, "left", "=");
        if (bracketPos) {
            let newSelection = new vs.Selection(ancPos, bracketPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.ascendSelectLeftEq = ascendSelectLeftEq;

function myTabOut() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.tabOut(document, curPos, "right");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.myTabOut = myTabOut;

function myTabIn() {
    let editor = vs.window.activeTextEditor;
    let document = editor.document;
    let cursors = []
    let selections = []
    for (let curInd = 0; curInd < editor.selections.length; curInd++) {
        cursors[curInd] = editor.selections[curInd].active;
    }
    for (let curInd = 0; curInd < cursors.length; curInd++) {
        let curPos = cursors[curInd]
        let bracketPos = brackets.tabOut(document, curPos, "left");
        if (bracketPos) {
            let newSelection = new vs.Selection(bracketPos, bracketPos);
            selections[curInd] = newSelection;
        }  else {
            let newSelection = new vs.Selection(curPos, curPos);
            selections[curInd] = newSelection;
        }            
    }
    editor.selections = selections
}
exports.myTabIn = myTabIn;
