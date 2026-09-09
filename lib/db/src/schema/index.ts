import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const artisansTable = pgTable("artisans", {
  id: text("id").primaryKey(),
  phone: text("phone").notNull().unique(),
  name: text("name"),
  state: text("state"),
  district: text("district"),
  craftCluster: text("craft_cluster"),
  socialCategory: text("social_category"), // SC, ST, OBC, Minority, Women, General
  udyamNumber: text("udyam_number"),
  pehchanId: text("pehchan_id"),
  aadhaarVerified: boolean("aadhaar_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productsTable = pgTable("products", {
  id: text("id").primaryKey(),
  artisanId: text("artisan_id").references(() => artisansTable.id),
  name: text("name").notNull(),
  nameHindi: text("name_hindi"),
  craftCategory: text("craft_category").notNull(),
  material: text("material").notNull(),
  description: text("description").notNull(),
  descriptionHindi: text("description_hindi"),
  tags: text("tags").array(),
  price: integer("price").notNull(),
  b2bPrice: integer("b2b_price"),
  exportPrice: integer("export_price"),
  imageUrl: text("image_url"),
  thumbnailUrl: text("thumbnail_url"),
  status: text("status").default("Published").notNull(),
  views: integer("views").default(0).notNull(),
  inquiries: integer("inquiries").default(0).notNull(),
  geoIndication: text("geo_indication"),
  ondcListed: boolean("ondc_listed").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const inquiriesTable = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  productId: text("product_id").references(() => productsTable.id),
  buyerName: text("buyer_name").notNull(),
  buyerPhone: text("buyer_phone").notNull(),
  buyerOrg: text("buyer_org"),
  quantity: integer("quantity").default(1).notNull(),
  message: text("message"),
  inquiryType: text("inquiry_type").default("b2b").notNull(),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertArtisanSchema = createInsertSchema(artisansTable);
export const selectArtisanSchema = createSelectSchema(artisansTable);
export type InsertArtisan = InferInsertModel<typeof artisansTable>;
export type Artisan = InferSelectModel<typeof artisansTable>;

export const insertProductSchema = createInsertSchema(productsTable);
export const selectProductSchema = createSelectSchema(productsTable);
export type InsertProduct = InferInsertModel<typeof productsTable>;
export type Product = InferSelectModel<typeof productsTable>;

export const insertInquirySchema = createInsertSchema(inquiriesTable);
export const selectInquirySchema = createSelectSchema(inquiriesTable);
export type InsertInquiry = InferInsertModel<typeof inquiriesTable>;
export type Inquiry = InferSelectModel<typeof inquiriesTable>;