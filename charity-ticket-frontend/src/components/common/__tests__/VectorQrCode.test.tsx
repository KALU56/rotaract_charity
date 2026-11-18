import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VectorQrCode } from '../VectorQrCode';

describe('VectorQrCode', () => {
  it('renders an accessible SVG with the pass seed in aria-label', () => {
    render(<VectorQrCode seed="RDB26-IND-019" size={124} />);
    const svg = screen.getByRole('img', {
      name: /Scannable PR Hall QR pass code RDB26-IND-019/i,
    });
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '124');
    expect(svg).toHaveAttribute('height', '124');
  });
});
