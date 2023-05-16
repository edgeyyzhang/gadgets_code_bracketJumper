'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const commands = require("./commands");
const brackets_1 = require("./brackets");
function activate(context) {
    console.log('bracket-jumper activating...registering commands...');
    let ascendLeft = vscode.commands.registerCommand('bracket-jumper.ascendLeft', () => {
        commands.ascendLeft();
    });
    let ascendRight = vscode.commands.registerCommand('bracket-jumper.ascendRight', () => {
        commands.ascendRight();
    });
    let ascendSelectLeft = vscode.commands.registerCommand('bracket-jumper.selectAscendLeft', () => {
        commands.ascendSelectLeft();
    });
    let ascendSelectRight = vscode.commands.registerCommand('bracket-jumper.selectAscendRight', () => {
        commands.ascendSelectRight();
    });

    let ascendRightDQuote = vscode.commands.registerCommand('bracket-jumper.ascendRightDQuote', () => {
        commands.ascendRightDQuote();
    });
    let ascendLeftDQuote = vscode.commands.registerCommand('bracket-jumper.ascendLeftDQuote', () => {
        commands.ascendLeftDQuote();
    });
    let ascendRightDollar = vscode.commands.registerCommand('bracket-jumper.ascendRightDollar', () => {
        commands.ascendRightDollar();
    });
    let ascendLeftDollar = vscode.commands.registerCommand('bracket-jumper.ascendLeftDollar', () => {
        commands.ascendLeftDollar();
    });
    let ascendSelectRightDQuote = vscode.commands.registerCommand('bracket-jumper.ascendSelectRightDQuote', () => {
        commands.ascendSelectRightDQuote();
    });
    let ascendSelectLeftDQuote = vscode.commands.registerCommand('bracket-jumper.ascendSelectLeftDQuote', () => {
        commands.ascendSelectLeftDQuote();
    });
    let ascendSelectRightDollar = vscode.commands.registerCommand('bracket-jumper.ascendSelectRightDollar', () => {
        commands.ascendSelectRightDollar();
    });
    let ascendSelectLeftDollar = vscode.commands.registerCommand('bracket-jumper.ascendSelectLeftDollar', () => {
        commands.ascendSelectLeftDollar();
    });
    let ascendRightEq = vscode.commands.registerCommand('bracket-jumper.ascendRightEq', () => {
        commands.ascendRightEq();
    });
    let ascendLeftEq = vscode.commands.registerCommand('bracket-jumper.ascendLeftEq', () => {
        commands.ascendLeftEq();
    });
    let ascendSelectRightEq = vscode.commands.registerCommand('bracket-jumper.ascendSelectRightEq', () => {
        commands.ascendSelectRightEq();
    });
    let ascendSelectLeftEq = vscode.commands.registerCommand('bracket-jumper.ascendSelectLeftEq', () => {
        commands.ascendSelectLeftEq();
    });
    let myTabOut = vscode.commands.registerCommand('bracket-jumper.myTabOut', () => {
        commands.myTabOut();
    });
    let myTabIn = vscode.commands.registerCommand('bracket-jumper.myTabIn', () => {
        commands.myTabIn();
    });
    
    
    let configListener = vscode.workspace.onDidChangeConfiguration(() => {
        brackets_1.updateLeftRight();
    });
    console.log('Commands registered.');
    context.subscriptions.push(ascendLeft, ascendRight, ascendSelectLeft, ascendSelectRight, ascendRightDQuote, ascendLeftDQuote, ascendRightDollar, ascendLeftDollar, ascendSelectRightDQuote, ascendSelectLeftDQuote, ascendSelectRightDollar, ascendSelectLeftDollar, ascendRightEq, ascendLeftEq, ascendSelectRightEq, ascendSelectLeftEq, configListener, myTabOut, myTabIn);
}
exports.activate = activate;
function deactivate() {
    // Currently do nothing...deregister commands?
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map