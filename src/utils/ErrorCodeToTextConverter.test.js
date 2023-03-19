import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import errorCodeToTextConverter from './ErrorCodeToTextConverter';

test('Known error', async () => {
  act(() => {
    errorCodeToTextConverter('auth/email-already-in-use');
  });
  await waitFor(() => {
    expect('Email already in use');
  });
});

test('Unknown error', async () => {
  act(() => {
    errorCodeToTextConverter('wierd error');
  });
  await waitFor(() => {
    expect('Unknown error. Try again later');
  });
});
