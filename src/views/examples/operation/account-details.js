import React, { useState, useEffect, useRef } from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormInput, FormUpload,Combo } from './form-components';
import { refOpeValidator, emailValidator, passwordValidator,ageValidator,refSysValidator,refCliValidator,refIdCliValidator } from './validators';


export const AccountDetails = <div>
    <Field key={'p_reference_sys'} id={'p_reference_sys'} name={'p_reference_sys'} label={'Entrez la référence système '} component={FormInput} validator={refSysValidator} />
    <Field key={'p_reference_client'} id={'p_reference_client'} name={'p_reference_client'} label={'Entrez la référence du client '} component={FormInput} validator={refCliValidator} />
    <Field key={'p_reference_operateur'} id={'p_reference_operateur'} name={'p_reference_operateur'} label={'Entrez la référence opérateur '} component={FormInput} validator={refOpeValidator} />
    {/*<Field key={'email'} id={'email'} name={'email'} label={'Entrez votre adresse email'} hint={'NB: Saisissez votre adresse e-mail personnelle.'} type={'email'} component={FormInput} validator={emailValidator} />
    <Field key={'password'} id={'password'} name={'password'} label={'Password'} type={'password'} component={FormInput} validator={passwordValidator} />
    <Field key={'age'} id={'age'} name={'age'} label={'age'} type={'selectField'} component={FormInput} validator={ageValidator} />
    <Field key={'avatar'} id={'avatar'} name={'avatar'} label={'Avatar'} optional={true} hint={'Hint: Upload your avatar picture'} component={FormUpload} />*/}
    <Field key={'p_client'} id={'p_client'} name={'p_client'} label={'Selectionnez le client'} hint={'Hint: Only European countries'}  component={Combo}   validator={refIdCliValidator}/>
  </div>;


