import React, { useEffect, useState } from 'react';
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
          defaultValue="Please enter HTML code."
          theme="vs-dark"
          onChange={(newvalue?: string) => props.onChange(newvalue || '')}
      />
  );
}

export default MyEditor;