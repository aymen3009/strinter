import * as vscode from "vscode";
import { autoReplace } from "./handlers/autoReplace";

export function activate(context: vscode.ExtensionContext) {

  let autoReplaceFunction = vscode.workspace.onDidChangeTextDocument(autoReplace);

  context.subscriptions.push(autoReplaceFunction);
}