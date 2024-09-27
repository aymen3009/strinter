import * as vscode from 'vscode';

export const checkComment = (editor : vscode.TextEditor, document : vscode.TextDocument) => {

  if (!editor) return;
  const position = editor.selection.active;
  const currentLine = position.line;
  const lineText = document.lineAt(currentLine).text.trim();

  if(lineText.startsWith("//") || lineText.startsWith("/*") || lineText.startsWith("*/")) return true;

  let insideMultilineComment = false;
  let commentStarted = false;


  for (let i = 0; i < currentLine; i++) {

    const line = document.lineAt(i).text.trim();

    if ( line.startsWith("/*")&& !commentStarted) {

      insideMultilineComment = true;
      commentStarted = true;

    }

    if (line.endsWith("*/") && commentStarted) {

      insideMultilineComment = false;
      commentStarted = false;

    }
  }

  return insideMultilineComment;
}