"use client"
import clsx from 'clsx';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // N'oubliez pas d'importer le CSS

const MyPhoneInput = ({
    state = undefined,
    ...props
}:{
    state?: string
}) => {
  const [value, setValue] = useState(); // Le numéro sera stocké ici, formaté internationalement

  return (
    <div className={clsx("w-full flex items-center justify-between pl-4 py-1.5", {
                                    "border border-red-500" : state !== undefined,
                                    "border border-[#33475B]" : state === undefined
                                })}>
      <PhoneInput
        id="phone-input"
        placeholder="Entrez votre numéro de téléphone"
        value={value}
        onChange={() => {}}
        className='outline-none'
        defaultCountry="CM" 
        international
        withCountryCallingCode
        limitMaxLength={true}
        smartCaret={true}
        {...props}
      />
      {value && <p>Numéro formaté : {value}</p>}
    </div>
  );
};

export default MyPhoneInput;