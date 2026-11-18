import { z } from 'zod';

export const giftRecipientSchema = z.object({
  recipientName: z
    .string()
    .trim()
    .min(1, 'Please enter the recipient DBU student’s full name.'),
  recipientIdOrPhone: z
    .string()
    .trim()
    .min(1, 'Please enter the recipient’s DBU ID or mobile number.'),
  personalNote: z.string(),
});

export const createCheckoutOrderSchema = (isGift: boolean) =>
  z.object({
    fullName: z.string().trim().min(1, 'Your full name is required.'),
    studentId: z
      .string()
      .trim()
      .min(1, 'Your DBU Student ID is required (e.g., DBU/1402/15).'),
    department: z
      .string()
      .trim()
      .min(1, 'Your department is required (e.g., Software Engineering).'),
    phone: z
      .string()
      .trim()
      .min(9, 'Valid Ethiopian mobile number is required.'),
    recipientName: isGift
      ? z.string().trim().min(1, 'Recipient student full name is required.')
      : z.string(),
    recipientIdOrPhone: isGift
      ? z
          .string()
          .trim()
          .min(1, 'Recipient DBU Student ID or phone is required.')
      : z.string(),
    paymentMethod: z.enum(['telebirr', 'cbe']),
    transactionRef: z
      .string()
      .trim()
      .min(1, 'Please enter your Telebirr or CBE transaction reference.'),
  });

export type CheckoutOrderFormValues = z.infer<
  ReturnType<typeof createCheckoutOrderSchema>
>;
