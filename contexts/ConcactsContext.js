import React, { createContext, useState } from 'react';

export const ContactsContext = createContext();


const ContactsContextProvider = (props) => {
    const [contacts, setContacts] = useState([])

    const setSavedContacts = (newContact)=>{
        setContacts(newContact)
    }

    const addNewContacts =(userinfo) =>{
        setUserInfo(userinfo);
    }

    const searchContacts = (val) =>{
        if (val == "") {
            return [...contacts]
        }
        var filteredContact = contacts.filter(function (contact) {
            var value = contact.fullname.toLowerCase()
            return value.includes(val)
        });

        return [...filteredContact];
    }


    return (
        <ContactsContext.Provider value={{contacts,searchContacts,setSavedContacts}}>
            {props.children}
        </ContactsContext.Provider>
    );
}

export default ContactsContextProvider;
