import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';
import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
import easyinvoice from 'easyinvoice';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(new URL('./', import.meta.url));
const __dirname = dirname(__filename);

const transporter = nodeMailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.SENDING_EMAIL,
    pass: process.env.SENDING_EMAIL_PASSWORD,
  },
});

const generateInvoicePDF = async (bookingData) => {
  const invoiceid = (await Booking.find().countDocuments()) + 1;
  const invoiceNumber = `INV-${invoiceid}`.toString();
  const invoiceDate = new Date().toLocaleDateString();
  const flight = await Flight.findById(bookingData.flight_booking_id);
  const invoice = {
    settings: {
      currency: 'LKR',
      taxNotation: 'vat',
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
    },
    images: {
      logo: 'https://i.imgur.com/jrOkQBU.png',
    },

    sender: {
      company: 'Holiday Central',
      address: '1234 Street, City, Country',
      email: 'info@yourcompany.com',
      phone: '+1 234 567 890',
    },
    client: {
      company: `${bookingData.c_first_name || ''} ${
        bookingData.c_last_name || ''
      }`,
      address: '5678 Street, City, Country',
      email: bookingData.c_email,
      phone: bookingData.c_phone,
    },
    information: {
      number: invoiceNumber,
      date: invoiceDate,
      'due-date': invoiceDate,
    },
    products: [
      {
        quantity: bookingData.passengers || 0,
        description: `Tickets for ${
          bookingData.passengers || 0
        } Passenger(s) - ${bookingData.booking_type || ''}`,
        price: flight.price,
        'tax-rate': 0,
      },
    ],
    'bottom-notice': 'Thank you for your business with us.',
  };

  const result = await easyinvoice.createInvoice(invoice);
  const pdfBuffer = Buffer.from(result.pdf, 'base64');

  // Create the "invoices" folder if it doesn't exist
  const invoicesFolderPath = path.join(__dirname, 'invoices');
  if (!fs.existsSync(invoicesFolderPath)) {
    fs.mkdirSync(invoicesFolderPath);
  }

  const invoiceFilePath = path.join(
    invoicesFolderPath,
    `INV-${bookingData._id}.pdf`
  );
  fs.writeFileSync(invoiceFilePath, pdfBuffer);

  return invoiceFilePath;
};

const sendBookingConfirmationEmail = async (booking) => {
  const invoiceFilePath = await generateInvoicePDF(booking);
  const mailOptions = {
    from: process.env.SENDING_EMAIL,
    to: booking.c_email,
    subject: `Booking Confirmation #${booking._id}`,
    text: 'Thank you for booking with us!, Attached your payment invoice.',
    attachments: [
      {
        filename: `INV-${booking._id}.pdf`,
        path: invoiceFilePath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent');
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
  }
};

export const addBooking = async (req, res) => {
  const booking = req.body;
  const newBooking = new Booking(booking);
  try {
    await newBooking.save();
    await sendBookingConfirmationEmail(newBooking);
    res.status(201).json(newBooking);
    const flight = await Flight.findByIdAndUpdate(booking.flight_booking_id, {
      $inc: { available_seats: -booking.passengers },
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate([
      {
        path: 'agent_id',
        model: 'Agent',
      },
      {
        path: 'flight_booking_id',
        model: 'Flight',
        strictPopulate: false,
        populate: [
          {
            path: 'departure_destination arrival_destination',
            model: 'Airport',
          },
          { path: 'airline', model: 'Airline' },
        ],
      },
    ]);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    await Booking.findByIdAndRemove(id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id).populate([
      {
        path: 'agent_id',
        model: 'Agent',
      },
      {
        path: 'flight_booking_id',
        model: 'Flight',
        strictPopulate: false,
        populate: [
          {
            path: 'departure_destination arrival_destination',
            model: 'Airport',
          },
          { path: 'airline', model: 'Airline' },
        ],
      },
    ]);
    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
