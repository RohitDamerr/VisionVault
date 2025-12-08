import { z } from "zod";

export const createSiteSchema = z.object({
  title: z.string().min(1, { message: "Title can't be empty" }).max(50),
  subdomain: z.string().min(1, { message: "Subdomain can't be empty" }).max(50),
});
