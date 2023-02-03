import React, { useEffect, useState } from 'react';
// import CodeEditor from '@uiw/react-textarea-code-editor';
import Editor from "@monaco-editor/react";

interface Props {
    code: string;
    onChange: (code: string) => void;
}

function MyEditor(props: Props) {
  return (
      <Editor
          value={props.code}
          language="handlebars"
          defaultValue="Please enter JS code."
          theme="vs-dark"
          onChange={(newvalue:string, evn) => props.onChange(newvalue)}
          // padding={15}
          // style={{
          //   fontSize: 12,
          //   backgroundColor: "#1E293B",
          //   fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          // }}
      />
  );
}

export default MyEditor;