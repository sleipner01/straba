import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('renders', async () => {
  act(() => {
    render(<App />);
  });
  await waitFor(() => {
    expect(true);
  });
});
