// This function converts error codes to human readable text

// To use this function, add the expected errorcode and the text you want to display
export default function errorCodeToTextConverter(errorCode) {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed';
    case 'auth/weak-password':
      return 'Weak password';
    default:
      return 'Unknown error. Try again later';
  }
}
