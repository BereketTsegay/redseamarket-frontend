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

let customValue = [];

export default class customField extends Component {

   constructor(props){
      super(props);

      this.state = {
           customValue: [],
      }
      
   }

   

   handleChange = (name, value) => {
      
      let field = {
         'field_id': name,
         'value': value
         };

         if(customValue.some(data => data.field_id === name)){
            const elementsIndex = customValue.findIndex(element => element.field_id == name )
            customValue[elementsIndex].value = value
         }
         else{
            customValue.push({'field_id': name,'value': value});
         }

      this.props.fieldValues(customValue);
   }

   optionChange = (e) => {

      let name = e.target.name;
      let value = e.target.value;

      let field = {
         'field_id': name,
         'value': value
         };
      
      if(customValue.some(data => data.field_id === name)){
         const elementsIndex = customValue.findIndex(element => element.field_id == name )
         customValue[elementsIndex].value = value
      }
      else{
         customValue.push({'field_id': name,'value': value});
      }

      this.props.fieldValues(customValue);

   }

    render() {

         let categoryField = this.props.categoryField;
         
         return (
            
            categoryField.map((categoryField, index) => {
                if(categoryField.field.type === 'text'){
                   return(
                      <TextField handleChange={this.handleChange} name={categoryField.field.id} key={index} label={categoryField.field.name} placeholder={categoryField.field.name} readonly={false} />
                   );
                }
                else if(categoryField.field.type === 'textarea'){
                   return(
                      <TextArea handleChange={this.handleChange} name={categoryField.field.id} label={categoryField.field.name} key={index} placeholder={categoryField.field.name}/>
                   );
                }
                else if(categoryField.field.type === 'checkbox'){
                   return(
                      <Checkbox key={index} checkboxChange={this.handleChange} name={categoryField.field.id} label={categoryField.field.name} />
                   );
                }
                else if(categoryField.field.type === 'select'){
                   return(
                     //  <SelectField key={index} placeholder={categoryField.field.id} optionChange={this.optionChange} option={categoryField.field.field_option} type="customField" />
                     <div className="form-group" key={index}>
                        <label>{categoryField.field.name}</label>
                        <select onChange={(e) => this.optionChange(e)} name={categoryField.field.id} className="form-control">
                              <option value="">Select {categoryField.field.name}</option>
                              {categoryField.field.field_option.map((option, index) => {
                                 
                                 return (
                                    <option key={index} value={option.id}>{option.value}</option>
                                 )
                              })}
                              
                        </select>
                     </div>
                   );
                }
                else if(categoryField.field.type === 'radio'){
                   return (
                      <Radio key={index} radioChange={this.handleChange} label={categoryField.field.name} name={categoryField.field.id} option={categoryField.field.field_option} />
                   );
                }
                else if(categoryField.field.type === 'file'){
                   return(
                      <FileField key={index} placeholder={categoryField.field.id} />
                   );
                }
                else if(categoryField.field.type === 'url'){
                   return(
                      <TextField handleChange={this.handleChange} label={categoryField.field.name} name={categoryField.field.id} key={index} placeholder={categoryField.field.name} readonly={false} />
                   );
                }
                else if(categoryField.field.type === 'number'){
                   return(
                      <Number key={index} handleChange={this.handleChange} label={categoryField.field.name} name={categoryField.field.id} placeholder={categoryField.field.name}/>
                   );
                }
                else if(categoryField.field.type === 'date'){
                   return(
                      <Date handleChange={this.handleChange} name={categoryField.field.id} label={categoryField.field.name} key={index} placeholder={categoryField.field.id} readonly={false} />
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
