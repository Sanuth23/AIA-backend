import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'eudaimonia.aia@gmail.com', // Replace with your Gmail address
        pass: 'Eudaimonia@123', // Use app-specific password (not your Gmail password)
      },
    });
  }

  // Send email
  async sendRegistrationEmail(customerDetails: any) {
    const mailOptions = {
      from: 'eudaimonia.aia@gmail.com', // Replace with your Gmail address
      to: 'eudaimonia.aia@gmail.com', // Replace with the company's email address
      subject: 'New Customer Registration',
      text: `A new customer has registered.\n\nCustomer Details:\nName: ${customerDetails.name}\nEmail: ${customerDetails.email}\nPhone: ${customerDetails.phone}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
