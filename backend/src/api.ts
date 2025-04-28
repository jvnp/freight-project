import { Router } from "express";

import { db } from "./db";
import { desc, eq } from "drizzle-orm";
import { CreateQuoteSchema, Quote } from "./db/schema";
import { z } from "zod";

const router = Router();

/**
 * GET /api/quotes
 * @description Get all quotes
 */
router.get("/quote", async (_, res) => {
  try {
    const quotes = await db.query.Quote.findMany({
      orderBy: desc(Quote.createdAt),
    });

    res.json({ status: "ok", data: quotes });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.json({ status: "error", data: "Internal server error" });
  }
});

/**
 * GET /api/quotes/:id
 * @description Get a quote by ID
 * @param {string} id - The ID of the quote
 */
router.get("/quote/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const quote = await db.query.Quote.findFirst({
      where: eq(Quote.id, id),
    });

    res.json({ status: "ok", data: quote });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.json({ status: "error", data: "Internal server error" });
  }
});

/**
 * POST /api/quotes
 * @description Create new quote(s)
 */
router.post("/quote", async (req, res) => {
  try {
    const data = z.array(CreateQuoteSchema).parse(req.body);

    const dataWithId = data.map((element) => ({
      ...element,
      shipmentId: element.shipmentId || crypto.randomUUID(),
    }));
    const quotes = await db.insert(Quote).values(dataWithId).returning();

    res.json({ status: "ok", data: quotes });
    return;
  } catch (error) {
    console.error("Error create quotes: ", error);
    if (error instanceof z.ZodError) {
      res.json({
        status: "error",
        data: error.errors.map((e) => ({
          message: e.message,
          path: e.path.join("."),
        })),
      });
      return;
    }
    if (error instanceof Error)
      res.status(500).json({
        status: "error",
        data: "Error in the server. Please try again later.",
      });
  }
});

export default router;
