import React, { useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';


interface Props {
    options: Option[];
    onChange: (template: any) => void;
    selected: Option;
}
function TemplatePicker(props: Props) {
    return (
        <div>
           <Dropdown options={props.options} onChange={props.onChange} value={props.selected} placeholder="Select your template" />
        </div>
    )
}

export default TemplatePicker;