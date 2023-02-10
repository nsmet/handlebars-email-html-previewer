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
    fetch(`https://mailtrap-relay.herokuapp.com/mailtrap`, {
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
        <div className='h-screen max-h-screen overflow-auto'>
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
            <div className='m-2'>
              <a href="https://twitter.com/jacksbridger" target={'_blank'} className="bg-blue-400 p-3 font-semibold text-white inline-flex items-center space-x-2 rounded" rel="noreferrer">
                <svg className="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </a>
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
