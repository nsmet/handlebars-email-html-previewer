import React, { useEffect, useState } from 'react';
import Handlebars from 'handlebars';
import 'react-dropdown/style.css';


interface Props {
    code: string;
    testData: string;
    onParse: (html: string) => void;
}
function HtmlPreviewer(props: Props) {
    const [_parsedHtml, _setParsedHtml] = useState(props.code);

    useEffect(() => {
        try {
            const handlebarsTemplate = Handlebars.compile(props.code);
            const parsedHtml = handlebarsTemplate(JSON.parse(props.testData));

            _setParsedHtml(parsedHtml);
            props.onParse(parsedHtml);
        } catch (e) {
            
        }
    }, [props.code, props.testData])

    return (
        <div dangerouslySetInnerHTML={{
            __html:  _parsedHtml
        }}>
        </div>
    )
}

export default HtmlPreviewer;