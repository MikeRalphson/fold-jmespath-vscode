// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const yaml = require('js-yaml');

function parse() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('You must have an open editor window to convert an OpenAPI document');
        return; // No open text editor
    }

    let text = editor.document.getText();
    let yamlMode = false;
    let obj;
    try {
        obj = JSON.parse(text);
    }
    catch (ex) {
        try {
            obj = yaml.safeLoad(text,{ json: true });
            yamlMode = true;
        }
        catch (ex) {
            console.error('Could not parse document as JSON/YAML');
        }    
    }
    return yamlMode;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Extension "fold-jmespath" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.foldJMesPath', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        //vscode.window.showInformationMessage('Code Folding FTW!');
        const yamlMode = parse();
        vscode.window.showInformationMessage('YAML? '+yamlMode);
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;