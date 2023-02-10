import React, { useEffect, useState } from 'react';
import { Option } from 'react-dropdown';
import Editor from './components/editor';
import TemplatePicker from './components/template-picker';
import Templates from './templates/index';

import './styles/index.css';
import HtmlPreviewer from './components/previewer';
import TestDataEditor from './components/testdata-editor';
const dropdownOptions = Templates.map((item) => {
  return {
    label: item.name,
    value: item.name
  }
})

function App() {
  const [_chosenTemplate, _setChosenTemplate] = useState(Templates[0]);
  const [_code, _setCode] = useState(Templates[0].html);
  const [_testData, _setTestData] = useState(`{
    "name": "John Doe",
    "headlineImg":"https://images.unsplash.com/photo-1496047160831-9aa3ac415852?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "headlineTitle":"Peaceful, a, social enterprise; inspiring support, shared value fairness.",
    "headlineDate":"January 13, 2020",
    "headlineParagraph":"B-corp issue outcomes, blended value do-gooder social intrapreneurship catalyze. Outcomes inclusive social entrepreneur, save the world B-corp or venture philanthropy a but.",
    "headlineUrl":"https://www.twitter.com",
    "imageGallery": [
      {
        "imgUrl": "https://images.unsplash.com/photo-1496047160831-9aa3ac415852?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "date":"January 13, 2020",
        "title":"Peaceful, a, social enterprise; inspiring support, shared value fairness.",
        "url":"https://www.twitter.com",
        "paragraph":"B-corp issue outcomes, blended value do-gooder social intrapreneurship catalyze. Outcomes inclusive social entrepreneur, save the world B-corp or venture philanthropy a but."
      },
      {
        "imgUrl": "https://images.unsplash.com/photo-1496047160831-9aa3ac415852?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "date":"January 13, 2020",
        "title":"Peaceful, a, social enterprise; inspiring support, shared value fairness.",
        "url":"https://www.twitter.com",
        "paragraph":"B-corp issue outcomes, blended value do-gooder social intrapreneurship catalyze. Outcomes inclusive social entrepreneur, save the world B-corp or venture philanthropy a but."
      }
    ]
  }`);
  const [_testDataEditorVisible, _setTestDataEditorVisible] = useState(false);

  useEffect(() => {
    _setCode(_chosenTemplate.html);
  }, [_chosenTemplate]);

  const _onTemplateChange = (option: Option) => {
    _setChosenTemplate(Templates.find((item) => item.name === option.label) as any);
  }

  const _onCodeChange = (code: string) => {
    _setCode(code);
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
          </div>
          <HtmlPreviewer code={_code} testData={_testData} />
          
          <TestDataEditor json={_testData} onChange={_setTestData} onHide={() => _setTestDataEditorVisible(!_testDataEditorVisible)} visible={_testDataEditorVisible}/>
        </div>
      </div>
    </div>
  );
}

export default App;
