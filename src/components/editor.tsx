import React, { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

interface Props {
    code: string;
    onChange: (code: string) => void;
}

function Editor(props: Props) {
  return (
      <CodeEditor
          value={props.code}
          language="handlebars"
          placeholder="Please enter HTML code."
          onChange={(evn) => props.onChange(evn.target.value)}
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: "#1E293B",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
      />
  );
}

export default Editor;