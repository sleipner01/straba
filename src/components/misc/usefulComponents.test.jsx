import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { LoadingDots, Error, NoMatch } from './usefulComponents';

test('Renders Loading dots', async () => {
  act(() => {
    render(<LoadingDots />);
  });
  await waitFor(() => {
    expect(true);
  });
});

test('Renders Error Element', async () => {
  act(() => {
    render(<Error />);
  });
  await waitFor(() => {
    expect(true);
  });
});

test('Renders NoMatch screen', async () => {
  act(() => {
    render(<NoMatch />);
  });
  await waitFor(() => {
    expect(true);
  });
});
