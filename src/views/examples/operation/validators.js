import { getter } from '@progress/kendo-react-common';
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const ccardRegex = new RegExp(/^[0-9-]+$/);
const cvcRegex = new RegExp(/^[0-9]+$/);
export const termsValidator = value => value ? "" : "It's required to agree with Terms and Conditions.";
export const emailValidator = value => !value ? "Email field is required." : emailRegex.test(value) ? "" : "Email is not in a valid format.";
export const nameValidator = value => !value ? " la référence systeme est requis" : value.length < 7 ? "la référence systeme doit comporter au moins 7 caractères" : "";

export const refSysValidator = value => !value ? "la référence systeme est requis" : value.length < 5 ? "la référence systeme doit comporter au moins 7 caractères" : "";
export const refCliValidator = value => !value ? "la référence du client est requis" : value.length < 5 ? "la référence du client doit comporter au moins 7 caractères" : "";
export const refOpeValidator = value => !value ? "la référence du client est requis" : value.length < 5 ? "la référence du client doit comporter au moins 7 caractères" : "";
export const refNumEmValidator = value => !value ? "le numéro de l'emeteur est requis" : value.length < 9 ? "le numero de l'emeteur doit comporter 12 chiffre" : "";
export const refNumDesValidator = value => !value ? "le numéro du destinataire est requis" : value.length < 9 ? "le numero du destinataire doit comporter 12 chiffre" : "";
export const refValValidator = value => !value ? "le montant de la transaction  est requis" : value < 100 ? "le montant doit être superieur à 100 xof" : "";
export const refStatutValidator = value => value ? "" : "erreur: ce champs est requis.";
export const refOperValidator = value => value ? "" : "l'opérateur est requis.";
export const refCanValidator = value => value ? "" : "le utiliser est requis.";
export const refIdCliValidator = value => value ? "" : "vueillez selectionner le client";

export const phoneValidator = value => !value ? "Phone number is required." : phoneRegex.test(value) ? "" : "Not a valid phone number.";
export const cardValidator = value => !value ? "Credit card number is required. " : ccardRegex.test(value) ? "" : "Not a valid credit card number format.";
export const cvcValidator = value => !value ? "CVC code is required," : cvcRegex.test(value) || value.length !== 3 ? "" : "Not a valid CVC code format.";
export const guestsValidator = value => !value ? "Number of guests is required" : value < 5 ? "" : "Maximum 5 guests";
export const nightsValidator = value => value ? "" : "Number of Nights is required.";
export const arrivalDateValidator = value => value ? "" : "Arrival Date is required.";
export const colorValidator = value => value ? "" : "Color is required.";
export const requiredValidator = value => value ? "" : "Error: This field is required.";
export const passwordValidator = value => value && value.length > 8 ? '' : 'Password must be at least 8 symbols.';
export const addressValidator = value => value ? "" : "Address is required.";

export const ageValidator = value => value ? "" : "votre age est requis";

export const requiredcomboValidator = value => value ? "" : "Ce champ est obligatoire.";


const userNameGetter = getter('username');
const emailGetter = getter('email');
export const formValidator = values => {
  const userName = userNameGetter(values);
  const emailValue = emailGetter(values);

  if (userName && emailValue && emailRegex.test(emailValue)) {
    return {};
  }

  return {
    VALIDATION_SUMMARY: 'Please fill in the following fields.',
    ['username']: !userName ? 'User Name is required.' : '',
    ['email']: emailValue && emailRegex.test(emailValue) ? '' : 'Email is required and should be in a valid format.'
  };
};