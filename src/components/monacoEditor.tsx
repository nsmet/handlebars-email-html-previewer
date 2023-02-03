import React from "react";

import Editor from "@monaco-editor/react";

export default function MonacoEditor() {
  function handleEditorChange(value:any, event:any) {
    console.log("here is the current model value:", value);
  }

  return (
   <Editor
     height="90vh"
     defaultLanguage="html"
     defaultValue="// some comment"
     onChange={handleEditorChange}
   />
  );
}