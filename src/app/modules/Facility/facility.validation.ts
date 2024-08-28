import { z } from 'zod';

const createFacility = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Name is required' }),

    description: z.string().nonempty({ message: 'Description is required' }),

    pricePerHour: z
      .number()
      .nonnegative({ message: 'Price per hour must be a non-negative number' }),

    location: z.string().nonempty({ message: 'Location is required' }),
  }),
});
const updateFacility = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Name is required' }).optional(),

    description: z
      .string()
      .nonempty({ message: 'Description is required' })
      .optional(),

    pricePerHour: z
      .number()
      .nonnegative({ message: 'Price per hour must be a non-negative number' })
      .optional(),

    location: z
      .string()
      .nonempty({ message: 'Location is required' })
      .optional(),
    image: z.string().nonempty({ message: 'Image is required' }).optional(),
  }),
});

export const facilityValidation = {
  createFacility,
  updateFacility,
};
