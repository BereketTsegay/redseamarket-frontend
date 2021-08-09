import React, { Component } from 'react';
import TextField from '../formcontrols/text';
import FileField from '../formcontrols/file';
import TextArea from '../formcontrols/textarea';
import SelectField from '../formcontrols/select';
import Checkbox from '../formcontrols/checkbox';
import Number from '../formcontrols/number';
import Date from '../formcontrols/date';
import Radio from '../formcontrols/radio';
import DependencySelect from '../formcontrols/dependencySelect';

export default class customField extends Component {

    constructor(props){
        super(props);
    }

    render() {

        let categoryField = this.props.categoryField;

        return (
            
            categoryField.map((categoryField, index) => {
                if(categoryField.field.type === 'text'){
                   return(
                      <TextField handleChange={this.handleChange} name="text" value="text" key={index} placeholder={categoryField.field.name} readonly={false} />
                   );
                }
                else if(categoryField.field.type === 'textarea'){
                   return(
                      <TextArea handleChange={this.handleChange} name={categoryField.field.name} value="textarea" key={index} placeholder={categoryField.field.name}/>
                   );
                }
                else if(categoryField.field.type === 'checkbox'){
                   return(
                      <Checkbox key={index} label={categoryField.field.name} />
                   );
                }
                else if(categoryField.field.type === 'select'){
                   return(
                      <SelectField key={index} placeholder={categoryField.field.name} option={categoryField.field.field_option} type="customField" />
                   );
                }
                else if(categoryField.field.type === 'radio'){
                   return (
                      <Radio key={index} label={categoryField.field.name} option={categoryField.field.field_option} />
                   );
                }
                else if(categoryField.field.type === 'file'){
                   return(
                      <FileField key={index} placeholder={categoryField.field.name} />
                   );
                }
                else if(categoryField.field.type === 'url'){
                   return(
                      <TextField handleChange={this.handleChange} name="url" value="url" key={index} placeholder={categoryField.field.name} readonly={false} />
                   );
                }
                else if(categoryField.field.type === 'number'){
                   return(
                      <Number key={index} placeholder={categoryField.field.name}/>
                   );
                }
                else if(categoryField.field.type === 'date'){
                   return(
                      <Date key={index} placeholder={categoryField.field.name}/>
                   );
                }
                else if(categoryField.field.type === 'dependency'){
                   return (
                      <DependencySelect key={index} dependency={categoryField.field.dependency} />
                   );
                }
             })
        )
    }
}
