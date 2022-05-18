import * as React from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormInput, FormAutoComplete, FormRadioGroup, FormTextArea } from './form-components';
import { nameValidator, requiredValidator,refNumEmValidator,refNumDesValidator,refValValidator,refStatutValidator} from './validators';
import { countries, genders,statut } from './data';


export const PersonalDetails = <div>
  <Field key={'p_emetteur'} id={'p_emetteur'} name={'p_emetteur'}  type={'text'}  label={"Saisissez le numéro de l'memeteur"} component={FormInput} validator={refNumEmValidator} />
  <Field key={'p_destinataire'} id={'p_destinataire'} name={'p_destinataire'}  type={'text'}  label={"Saisissez le numéro du destinataire"} component={FormInput} validator={refNumDesValidator} />
  <Field key={'p_valeur'} id={'p_valeur'} name={'p_valeur'}  type={'number'}  label={"Saisissez le montant de la transaction"} component={FormInput} validator={refValValidator} />
  <Field key={'p_statut'} id={'p_statut'} name={'p_statut'} label={'statut opération'} layout={'horizontal'} component={FormRadioGroup} data={statut} validator={refStatutValidator} />
  {/*<Field key={'fullName'} id={'fullName'} name={'fullName'} label={'Full Name'} component={FormInput} validator={nameValidator} />
    <Field key={'countryselected'} id={'countryselected'} name={'countryselected'} label={'Country'} hint={'Hint: Only European countries'} component={FormAutoComplete} data={countries} validator={requiredValidator} />
    <Field key={'gender'} id={'gender'} name={'gender'} label={'Gender'} layout={'horizontal'} component={FormRadioGroup} data={genders} validator={requiredValidator} />
    <Field key={'about'} id={'about'} name={'about'} label={'About'} optional={true} component={FormTextArea} />*/}
  </div>;