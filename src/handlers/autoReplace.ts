import * as vscode from 'vscode';
import { checkComment } from '../helpers/checkcomment';

let lastLineText = '';

export const autoReplace = (event: vscode.TextDocumentChangeEvent) => {

  const document = event.document;
  const languageId = document.languageId;
  if (!(languageId === 'javascript' || languageId === 'typescript')) return;


  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const position = editor.
  selection.active;
  const currentLine = position.line;
  const lineText = document.lineAt(currentLine).text.trim();
  if (lastLineText === lineText) return;
  lastLineText = lineText;

  if(!lineText || checkComment(editor, document)) return;


  // regex for finding string literals "${}" or '${}'
  const regex = /(['"])(?:\\.|(?!\1).)*?\${[^}]*}(?:\\.|(?!\1).)*?(?<!\\)\1/g;
  const match = lineText.match(regex);


  if (match && match.length) {
    const start = new vscode.Position(currentLine, lineText.indexOf(match[0]));
    const end = new vscode.Position(currentLine, start.character + match[0].length);
    const range = new vscode.Range(start, end);
    const text = document.getText(range);


    // replace the quotes with backticks
    const newText = text.replace('`',"\`").replace(/\\(["'])/g, '$1');


    const edit = new vscode.WorkspaceEdit();
    edit.replace(document.uri, range, newText);
    vscode.workspace.applyEdit(edit);
}
}
