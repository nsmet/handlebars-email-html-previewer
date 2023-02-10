import React, { useEffect, useState } from 'react';
import { Option } from 'react-dropdown';
import Editor from './components/editor';
import TemplatePicker from './components/template-picker';
import Templates from './templates/index';

import './styles/index.css';
import HtmlPreviewer from './components/previewer';
const dropdownOptions = Templates.map((item) => {
  return {
    label: item.name,
    value: item.name
  }
})

function App() {
  const [_chosenTemplate, _setChosenTemplate] = useState(Templates[0]);
  const [_code, _setCode] = useState(Templates[0].html);

  useEffect(() => {
    _setCode(_chosenTemplate.html);
  }, [_chosenTemplate]);

  const _onTemplateChange = (option: Option) => {
    _setChosenTemplate(Templates.find((item) => item.name === option.label) as any);
  }

  const _onCodeChange = (code?: string) => {
    _setCode(code || '');
  }

  return (
    <div className="App">
      <div>
        <TemplatePicker options={dropdownOptions} onChange={_onTemplateChange} selected={{label: _chosenTemplate.name, value: _chosenTemplate.name}} />
      </div>

      <div className='grid grid-cols-2 gap-2 h-screen'>
        <div className='h-full max-h-fulll'>
          <Editor code={_code} onChange={_onCodeChange} />
        </div>
        <div className='h-full max-h-fulll'>
          <HtmlPreviewer code={_code} />
        </div>
      </div>
    </div>
  );
}

export default App;
