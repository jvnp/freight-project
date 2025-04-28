import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const Quote = pgTable("quote", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  shipmentId: t.varchar({ length: 80 }).notNull(),
  originCountry: t.varchar({ length: 100 }).notNull(),
  destinationCountry: t.varchar({ length: 100 }).notNull(),
  shipperName: t.varchar({ length: 256 }).notNull(),
  consigneeName: t.varchar({ length: 256 }).notNull(),
  mode: t.varchar({ length: 20 }).notNull(),
  date: t.timestamp().notNull(),
  createdAt: t.timestamp().notNull().defaultNow(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`NOW()`),
}));

export const CreateQuoteSchema = createInsertSchema(Quote, {
  shipmentId: z
    .string()
    .max(80, "Shipment ID must be at most 80 characters")
    .nullable(),
  originCountry: z
    .string({ message: "Origin country should be a valid text." })
    .max(100, "Origin country must be at most 100 characters"),
  destinationCountry: z
    .string({ message: "Destination country should be a valid text." })
    .max(100, "Destination country must be at most 100 characters"),
  shipperName: z
    .string({ message: "Shipper name is not valid." })
    .max(256, "Shipper name must be at most 256 characters"),
  consigneeName: z
    .string({ message: "Consignee name is not valid." })
    .max(256, "Consignee name must be at most 256 characters"),
  mode: z
    .string({ message: "Mode is not valid." })
    .max(20, "Mode must be at most 20 characters"),
  date: z.coerce.date({
    message: "Date is not valid.",
  }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateQuote = z.infer<typeof CreateQuoteSchema>;
