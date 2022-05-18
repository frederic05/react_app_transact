import * as React from 'react';
import { Field } from '@progress/kendo-react-form';
import { CardSelector } from './card-selector';
import { FormInput, FormMaskedTextBox, FormDateInput,FormTextArea } from './form-components';
import { requiredValidator, cardValidator, cvcValidator,refOperValidator,refCanValidator } from './validators';
export const PaymentDetails = <div>

<Field key={'p_operateur'} id={'p_operateur'} name={'p_operateur'} label={"veuillez indiquer l'opérateur"}       component={FormInput} validator={refOperValidator} />
<Field key={'p_canal'}     id={'p_canal'}     name={'p_canal'}     label={"veuillez indiquer le canal utiliser"} component={FormInput} validator={refCanValidator} />
<Field key={'p_details'}   id={'p_details'}   name={'p_details'}   label={"saisissez le detail de l'operation"}  optional={true}       component={FormTextArea} />
<Field key={'p_message'}   id={'p_message'}   name={'p_message'}   label={'sasissez un message'} optional={true} component={FormTextArea} />

{/* }
    <Field key={'cardType'} name={'cardType'} component={CardSelector} validator={requiredValidator} />
    <div style={{
    display: 'flex',
    justifyContent: 'space-between'
  }}>
      <div style={{
      width: '75%',
      marginRight: '25px'
    }}>
        <Field key={'cardNumber'} id={'cardNumber'} name={'cardNumber'} label={'Card Number'} hint={'Hint: Your Credit Card Number'} mask={'000-000-000-000'} component={FormMaskedTextBox} validator={cardValidator} />
      </div>
      <Field key={'cvc'} id={'cvc'} name={'cvc'} label={'CVC Number'} hint={'Hint: The last 3 digids on the back of the Card'} mask={'000'} component={FormMaskedTextBox} validator={cvcValidator} />
    </div>
    <Field key={'expireDate'} id={'expireDate'} name={'expireDate'} label={'Expiration Date'} component={FormDateInput} validator={requiredValidator} />
  <Field key={'cardHolder'} id={'cardHolder'} name={'cardHolder'} label={'Card Holder Name'} component={FormInput} validator={requiredValidator} />*/}
  </div>;