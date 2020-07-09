import { Dimensions, PixelRatio, Platform } from "react-native";

export const validateEmail = email => {
  var re = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
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

export function getUrlParameter(name, uri) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(uri);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

//Calculate text size based on screen dimensions
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 430;


export function normalize(size) {
  if (size == undefined)
    return 15
  const newSize = size * scale
  return Math.round(PixelRatio.roundToNearestPixel(newSize))

}

//Idntify if phone is iphone x or higher
export function isIphoneX() {

  return (
    // Check either, iPhone X or XR
    (isIPhoneXSize() || isIPhoneXrSize())
  )
}

export function isIPhoneXSize() {
  return SCREEN_HEIGHT == 812 || SCREEN_WIDTH == 812;
}

export function isIPhoneXrSize(dim) {
  return SCREEN_HEIGHT == 896 || SCREEN_WIDTH == 896;
}