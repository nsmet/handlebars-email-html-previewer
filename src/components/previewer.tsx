import React, { useEffect, useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';


interface Props {
    code: string;
}
function HtmlPreviewer(props: Props) {
    const [_parsedHtml, _setParsedHtml] = useState(props.code);

    useEffect(() => {
        _setParsedHtml(props.code);
    }, [props.code])

    return (
        <div dangerouslySetInnerHTML={{
            __html:  _parsedHtml}}>
        </div>
    )
}

export default HtmlPreviewer;