import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

test('renders', async () => {
  act(() => {
    render(<div></div>);
  });
  await waitFor(() => {
    expect(true);
  });
});
