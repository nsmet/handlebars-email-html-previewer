import React, { useEffect, useState } from 'react';
import { Option } from 'react-dropdown';
import Editor from './components/editor';
import TemplatePicker from './components/template-picker';
import Templates from './templates/index';

import './styles/index.css';
import HtmlPreviewer from './components/previewer';
import TestDataEditor from './components/testdata-editor';
import MailtrapPopup from './components/mailtrap';
const dropdownOptions = Templates.map((item) => {
  return {
    label: item.name,
    value: item.name
  }
})

function App() {
  const [_chosenTemplate, _setChosenTemplate] = useState(Templates[0]);
  const [_code, _setCode] = useState(Templates[0].html);
  const [_testData, _setTestData] = useState(JSON.stringify(Templates[0].testData, null, "\t"));
  const [_testDataEditorVisible, _setTestDataEditorVisible] = useState(false);
  const [_fullyParsedHtml, _setFullyParsedHtml] = useState('');
  const [_mailtrapVisible, _setMailtrapVisible] = useState(false);

  useEffect(() => {
    _setCode(_chosenTemplate.html);
  }, [_chosenTemplate]);
  
  const _onTemplateChange = (option: Option) => {
    const _template = Templates.find((item) => item.name === option.label) as any;

    _setTestData(JSON.stringify(_template.testData, null, "\t"));
    _setChosenTemplate(_template);
  }

  const _onCodeChange = (code?: string) => {
    _setCode(code || '');
  }

  const _sendtestEmail = (inboxId: string, apiKey: string) => {
    fetch(`http://localhost:5001/mailtrap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiToken: apiKey,
        inboxId: inboxId,
        messageHtml: _fullyParsedHtml,
        subject: 'Handlebars Email Previewer Test Mail'
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="App">
      <div className='grid grid-cols-2 h-screen'>
        <div className='h-screen max-h-screen overflow-auto'>
          <Editor code={_code} onChange={_onCodeChange} />
        </div>
        <div className='h-screen max-h-screen'>
          <div className='flex items-start justify-end'>
            <div className='m-2'>
              <TemplatePicker options={dropdownOptions} onChange={_onTemplateChange} selected={{label: _chosenTemplate.name, value: _chosenTemplate.name}} />
            </div>

            <div className='m-2'>
              <button onClick={() => _setTestDataEditorVisible(true)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    set test data
                </span>
              </button>
            </div>
            <div className='m-2'>
              <button onClick={() => _setMailtrapVisible(true)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Mailtrap
                </span>
              </button>
            </div>
          </div>
          <HtmlPreviewer code={_code} testData={_testData} onParse={_setFullyParsedHtml} />
          
          <TestDataEditor template={_chosenTemplate} json={_testData} onChange={_setTestData} onHide={() => _setTestDataEditorVisible(!_testDataEditorVisible)} visible={_testDataEditorVisible}/>
        </div>
      </div>
  
      <MailtrapPopup visible={_mailtrapVisible} close={ ()=> _setMailtrapVisible(false)} sendTestEmail={_sendtestEmail}/>

    </div>
  );
}

export default App;
