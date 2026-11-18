import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App runtime & routing smoke test', () => {
  it('mounts landing page and navigates to checkout and passes without runtime errors', async () => {
    window.scrollTo = () => {};
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /One Movie Night\. A Lasting Difference/i,
        })
      ).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole('button', { name: /Get or Gift Tickets/i })
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Select Your PR Hall Movie Pass/i })
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /My QR Passes/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Digital PR Hall QR Passes/i })
      ).toBeInTheDocument();
    });
  });
});
