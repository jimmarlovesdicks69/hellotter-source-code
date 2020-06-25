export const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};


export const setNameFirstLetterCapital = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export var getInitials = function (string) {
  var names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const getEmailName = (email) => {
  var name = email.substring(0, email.lastIndexOf("@"));
  return '@' + name
}

export const getFirstName = (fullName) => {
  var firstName = fullName.split(' ').slice(0, -1).join(' ');
  return firstName
}

export const getLastName = (fullName) => {
  var lastName = fullName.split(' ').slice(-1).join(' ');
  return lastName
}
export const sortContacts = (contacts) => {
  var sorted = contacts.sort(function (a, b) {
    var nameA = a.fullname.toUpperCase(); // ignore upper and lowercase
    var nameB = b.fullname.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  return sorted
}