import React, { useEffect, useState } from 'react';

interface Props {
    visible: boolean;
    close: () => void;
    sendTestEmail: (inboxId: string, apiKey: string) => void;
}

function MailtrapPopup(props: Props) {
    const [_config, _setConfig] = useState({
        inboxId: '',
        apiKey: ''
    });
    
    const _sendEmail = () => {
        props.close();
        props.sendTestEmail(_config.inboxId, _config.apiKey)
        
        // save the API key and inbox id
        localStorage.setItem("mailtrap-config", JSON.stringify(_config));
    }

    useEffect(()=> {
        const saved = localStorage.getItem("mailtrap-config");
        if (saved) {
            const initialValue = JSON.parse(saved);

            if (initialValue.inboxId && initialValue.apiKey) {
                _setConfig(initialValue)
            }
        }
    }, [props.visible])

    return (
        <div className={`w-screen h-screen  bg-slate-600/75 justify-center absolute bottom-0 top-0 ${!props.visible && 'hidden'}`}>
            <div aria-hidden="true" className={`flex items-center justify-center fixed top-0 left-0 right-0 z-50 ${!props.visible && 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}>
                <div className="relative w-full h-full max-w-md md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={props.close} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Send a test mail to mailtrap</h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Mailtrap Inbox ID
                                    </label>
                                    <input onChange={(e) => _setConfig({..._config, inboxId: e.target.value})} value={_config.inboxId} autoComplete="off" name="inboxId" id="inboxId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="inbox ID" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Mailtrap API Key
                                    </label>
                                    <input  onChange={(e) => _setConfig({..._config, apiKey: e.target.value})} value={_config.apiKey} autoComplete="off" type="password" name="apiKey" id="apiKey" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <button
                                    disabled={_config.apiKey.length === 0|| _config.inboxId.length === 0}
                                    onClick={_sendEmail} type="button" className={`${(_config.apiKey.length === 0 || _config.inboxId.length === 0) && 'opacity-40'} text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}>Send test email</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
    
}

export default MailtrapPopup;