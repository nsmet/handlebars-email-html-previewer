import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

interface Props {
    visible: boolean;
    json: string;
    onHide: () => void;
    onChange: (code: string) => void;
}

function TestDataEditor(props: Props) {
    const [_localCode, _setLocalCode] = useState(`{
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
    const [_isValid, _setIsValid] = useState(true);

    
    const _onChange = (value: string) => { 
        try {
            JSON.parse(value);
            props.onChange(value);
            _setLocalCode(value);
            _setIsValid(true);
        } catch (e) {
            _setIsValid(false);
        }
    }

    return (
        <div className={` w-screen h-screen flex items-center justify-center absolute bottom-0 top-0 ${!props.visible && 'invisible'}`}>
            <div id="slideover-container" className={`w-full h-full fixed inset-0 ${!props.visible && 'invisible'}`}>
                <div onClick={ () => props.onHide()} id="slideover-bg" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${!props.visible ? 'opacity-0' : 'opacity-50'}`}></div>
                <div className={`w-1/2 h-full absolute right-0 duration-300 ease-out transition-all ${!props.visible && 'translate-x-full'}`}>
                    <div className="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>

                    <div className='h-full testDataBgColor'>
                       
                        <CodeEditor
                            value={_localCode}
                            language="json"
                            placeholder="Please enter JSON code."
                            onChange={(evn) => _onChange(evn.target.value)}
                            padding={15}
                            style={{
                                fontSize: 12,
                                backgroundColor: "#1E293B",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                minHeight: '120px'
                            }}
                        />
                        {!_isValid && 
                            <p className="text-amber-500">Invalid JSON</p>
                        }
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestDataEditor;