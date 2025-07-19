"use client"
import clsx from 'clsx';
import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // N'oubliez pas d'importer le CSS

const MyPhoneInput = ({
    state = undefined,
    ...props
}:{
    state?: string
}) => {

  return (
    <div className={clsx("w-full flex items-center justify-between pl-4 py-1.5", {
                                    "border border-red-500" : state !== undefined,
                                    "border border-[#33475B]" : state === undefined
                                })}>
      <PhoneInput
        id="phone-input"
        placeholder="Entrez votre numéro de téléphone"
        value=''
        onChange={() => {}}
        className='outline-none'
        defaultCountry="CM" 
        international
        withCountryCallingCode
        limitMaxLength={true}
        smartCaret={true}
        {...props}
      />
    </div>
  );
};
/*{value && <p>Numéro formaté : {value}</p>}*/


export default MyPhoneInput;