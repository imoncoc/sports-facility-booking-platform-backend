import { join } from 'path';
import { Booking } from '../Booking/booking.model';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'paid',
      },
    );
    message = 'Successful Paid';
  } else {
    message = 'Payment_Failed';
  }

  const filePath = join(__dirname, '../views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  //   template = template.replace('{{message}}', message);
  template = template.replace(/{{message}}/g, message);

  return template;
};

export const paymentServices = {
  confirmationService,
};
