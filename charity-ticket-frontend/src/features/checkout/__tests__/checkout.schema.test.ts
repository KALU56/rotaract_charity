import { describe, expect, it } from 'vitest';
import {
  createCheckoutOrderSchema,
  giftRecipientSchema,
} from '../checkout.schema';

describe('Checkout Zod validation schemas', () => {
  it('validates a standard non-gift checkout order successfully', () => {
    const schema = createCheckoutOrderSchema(false);
    const result = schema.safeParse({
      fullName: 'Abel Tesfaye',
      studentId: 'DBU/1402/15',
      department: 'Software Engineering',
      phone: '0911223344',
      recipientName: '',
      recipientIdOrPhone: '',
      paymentMethod: 'telebirr',
      transactionRef: 'TBR928410',
    });

    expect(result.success).toBe(true);
  });

  it('rejects gift checkout when recipient details are missing', () => {
    const schema = createCheckoutOrderSchema(true);
    const result = schema.safeParse({
      fullName: 'Abel Tesfaye',
      studentId: 'DBU/1402/15',
      department: 'Software Engineering',
      phone: '0911223344',
      recipientName: '',
      recipientIdOrPhone: '',
      paymentMethod: 'cbe',
      transactionRef: 'FT263190',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain('recipientName');
      expect(fields).toContain('recipientIdOrPhone');
    }
  });

  it('validates phone minimum length and transaction ref', () => {
    const schema = createCheckoutOrderSchema(false);
    const result = schema.safeParse({
      fullName: 'Abel Tesfaye',
      studentId: 'DBU/1402/15',
      department: 'Software Engineering',
      phone: '1234',
      recipientName: '',
      recipientIdOrPhone: '',
      paymentMethod: 'telebirr',
      transactionRef: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain('phone');
      expect(fields).toContain('transactionRef');
    }
  });

  it('validates giftRecipientSchema for step 1', () => {
    const invalid = giftRecipientSchema.safeParse({
      recipientName: '  ',
      recipientIdOrPhone: '',
      personalNote: '',
    });
    expect(invalid.success).toBe(false);

    const valid = giftRecipientSchema.safeParse({
      recipientName: 'Hanna Mekonnen',
      recipientIdOrPhone: 'DBU/1508/15',
      personalNote: 'Enjoy the movie!',
    });
    expect(valid.success).toBe(true);
  });
});
