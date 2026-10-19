--
-- PostgreSQL database dump
--

\restrict hKbAFKMqEmCCslMux4jORphJEOH2X8hBzK4tRBQJHRpcKBnBh2FNsQahA8CbqCG

-- Dumped from database version 17.11 (59c914d)
-- Dumped by pg_dump version 18.6 (Debian 18.6-3)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.wishlist_items DROP CONSTRAINT IF EXISTS wishlist_items_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_shipping_zones DROP CONSTRAINT IF EXISTS vendor_shipping_zones_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_shipping_zones DROP CONSTRAINT IF EXISTS vendor_shipping_zones_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_sessions DROP CONSTRAINT IF EXISTS vendor_sessions_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_product_defaults DROP CONSTRAINT IF EXISTS vendor_product_defaults_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_payout_accounts DROP CONSTRAINT IF EXISTS vendor_payout_accounts_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_members DROP CONSTRAINT IF EXISTS vendor_members_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_members DROP CONSTRAINT IF EXISTS vendor_members_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_categories DROP CONSTRAINT IF EXISTS vendor_categories_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_sessions DROP CONSTRAINT IF EXISTS user_sessions_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_locations DROP CONSTRAINT IF EXISTS user_locations_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.recently_viewed_items DROP CONSTRAINT IF EXISTS recently_viewed_items_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product_variants DROP CONSTRAINT IF EXISTS product_variants_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.payments DROP CONSTRAINT IF EXISTS payments_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cart DROP CONSTRAINT IF EXISTS cart_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_cart_id_fkey;
ALTER TABLE IF EXISTS ONLY public."Session" DROP CONSTRAINT IF EXISTS "Session_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Account" DROP CONSTRAINT IF EXISTS "Account_userId_fkey";
DROP TRIGGER IF EXISTS update_vendors_updated_at ON public.vendors;
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
DROP INDEX IF EXISTS public.wishlist_user_idx;
DROP INDEX IF EXISTS public.wishlist_session_idx;
DROP INDEX IF EXISTS public.recently_viewed_user_idx;
DROP INDEX IF EXISTS public.recently_viewed_session_idx;
DROP INDEX IF EXISTS public.idx_vendor_sessions_vendor;
DROP INDEX IF EXISTS public.idx_vendor_sessions_token;
DROP INDEX IF EXISTS public.idx_vendor_sessions_expires;
DROP INDEX IF EXISTS public.idx_support_messages_status;
DROP INDEX IF EXISTS public.idx_support_messages_email;
DROP INDEX IF EXISTS public.idx_reported_issues_status;
DROP INDEX IF EXISTS public.idx_products_vendor;
DROP INDEX IF EXISTS public.idx_products_price;
DROP INDEX IF EXISTS public.idx_products_original_price;
DROP INDEX IF EXISTS public.idx_products_featured;
DROP INDEX IF EXISTS public.idx_products_category;
DROP INDEX IF EXISTS public.idx_products_brand;
DROP INDEX IF EXISTS public.idx_products_bestseller;
DROP INDEX IF EXISTS public.idx_password_reset_user;
DROP INDEX IF EXISTS public.idx_password_reset_expires;
DROP INDEX IF EXISTS public.idx_order_items_vendor_id;
DROP INDEX IF EXISTS public.idx_newsletter_email;
DROP INDEX IF EXISTS public.idx_cart_items_product_id;
DROP INDEX IF EXISTS public.idx_cart_items_cart_id;
DROP INDEX IF EXISTS public."VerificationToken_token_key";
DROP INDEX IF EXISTS public."VerificationToken_identifier_token_key";
DROP INDEX IF EXISTS public."Session_sessionToken_key";
DROP INDEX IF EXISTS public."Account_provider_providerAccountId_key";
DROP INDEX IF EXISTS neon_auth.users_sync_deleted_at_idx;
ALTER TABLE IF EXISTS ONLY public.wishlist_items DROP CONSTRAINT IF EXISTS wishlist_user_product_unique;
ALTER TABLE IF EXISTS ONLY public.wishlist_items DROP CONSTRAINT IF EXISTS wishlist_session_product_unique;
ALTER TABLE IF EXISTS ONLY public.wishlist_items DROP CONSTRAINT IF EXISTS wishlist_items_pkey;
ALTER TABLE IF EXISTS ONLY public.vendors DROP CONSTRAINT IF EXISTS vendors_pkey;
ALTER TABLE IF EXISTS ONLY public.vendors DROP CONSTRAINT IF EXISTS vendors_email_unique;
ALTER TABLE IF EXISTS ONLY public.vendors DROP CONSTRAINT IF EXISTS vendors_email_key;
ALTER TABLE IF EXISTS ONLY public.vendor_shipping_zones DROP CONSTRAINT IF EXISTS vendor_shipping_zones_pkey;
ALTER TABLE IF EXISTS ONLY public.vendor_sessions DROP CONSTRAINT IF EXISTS vendor_sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.vendor_product_defaults DROP CONSTRAINT IF EXISTS vendor_product_defaults_vendor_id_key;
ALTER TABLE IF EXISTS ONLY public.vendor_product_defaults DROP CONSTRAINT IF EXISTS vendor_product_defaults_pkey;
ALTER TABLE IF EXISTS ONLY public.vendor_payout_accounts DROP CONSTRAINT IF EXISTS vendor_payout_accounts_vendor_id_provider_key;
ALTER TABLE IF EXISTS ONLY public.vendor_payout_accounts DROP CONSTRAINT IF EXISTS vendor_payout_accounts_pkey;
ALTER TABLE IF EXISTS ONLY public.vendor_members DROP CONSTRAINT IF EXISTS vendor_members_vendor_id_user_id_key;
ALTER TABLE IF EXISTS ONLY public.vendor_members DROP CONSTRAINT IF EXISTS vendor_members_pkey;
ALTER TABLE IF EXISTS ONLY public.vendor_leads DROP CONSTRAINT IF EXISTS vendor_leads_pkey;
ALTER TABLE IF EXISTS ONLY public.vendor_categories DROP CONSTRAINT IF EXISTS vendor_categories_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.user_sessions DROP CONSTRAINT IF EXISTS user_sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.user_locations DROP CONSTRAINT IF EXISTS user_locations_pkey;
ALTER TABLE IF EXISTS ONLY public.support_messages DROP CONSTRAINT IF EXISTS support_messages_pkey;
ALTER TABLE IF EXISTS ONLY public.store_reviews DROP CONSTRAINT IF EXISTS store_reviews_pkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_pkey;
ALTER TABLE IF EXISTS ONLY public.reported_issues DROP CONSTRAINT IF EXISTS reported_issues_pkey;
ALTER TABLE IF EXISTS ONLY public.recently_viewed_items DROP CONSTRAINT IF EXISTS recently_viewed_user_product_unique;
ALTER TABLE IF EXISTS ONLY public.recently_viewed_items DROP CONSTRAINT IF EXISTS recently_viewed_session_product_unique;
ALTER TABLE IF EXISTS ONLY public.recently_viewed_items DROP CONSTRAINT IF EXISTS recently_viewed_items_pkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_sku_key;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.product_variants DROP CONSTRAINT IF EXISTS product_variants_sku_key;
ALTER TABLE IF EXISTS ONLY public.product_variants DROP CONSTRAINT IF EXISTS product_variants_pkey;
ALTER TABLE IF EXISTS ONLY public.payments DROP CONSTRAINT IF EXISTS payments_pkey;
ALTER TABLE IF EXISTS ONLY public.password_reset_tokens DROP CONSTRAINT IF EXISTS password_reset_tokens_token_key;
ALTER TABLE IF EXISTS ONLY public.password_reset_tokens DROP CONSTRAINT IF EXISTS password_reset_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.partner_applications DROP CONSTRAINT IF EXISTS partner_applications_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.newsletter_subscribers DROP CONSTRAINT IF EXISTS newsletter_subscribers_pkey;
ALTER TABLE IF EXISTS ONLY public.newsletter_subscribers DROP CONSTRAINT IF EXISTS newsletter_subscribers_email_key;
ALTER TABLE IF EXISTS ONLY public.newsletter_logs DROP CONSTRAINT IF EXISTS newsletter_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.hero_slides DROP CONSTRAINT IF EXISTS hero_slides_pkey;
ALTER TABLE IF EXISTS ONLY public.faqs DROP CONSTRAINT IF EXISTS faqs_pkey;
ALTER TABLE IF EXISTS ONLY public.email_logs DROP CONSTRAINT IF EXISTS email_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_name_key;
ALTER TABLE IF EXISTS ONLY public.cart DROP CONSTRAINT IF EXISTS cart_pkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_pkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_cart_id_product_id_key;
ALTER TABLE IF EXISTS ONLY public.announcements DROP CONSTRAINT IF EXISTS announcements_pkey;
ALTER TABLE IF EXISTS ONLY public.activity_logs DROP CONSTRAINT IF EXISTS activity_logs_pkey;
ALTER TABLE IF EXISTS ONLY public."Session" DROP CONSTRAINT IF EXISTS "Session_pkey";
ALTER TABLE IF EXISTS ONLY public."Account" DROP CONSTRAINT IF EXISTS "Account_pkey";
ALTER TABLE IF EXISTS ONLY neon_auth.users_sync DROP CONSTRAINT IF EXISTS users_sync_pkey;
ALTER TABLE IF EXISTS public.wishlist_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vendors ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vendor_shipping_zones ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vendor_sessions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vendor_product_defaults ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vendor_payout_accounts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vendor_members ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vendor_leads ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vendor_categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.user_sessions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.user_locations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.support_messages ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.store_reviews ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.reviews ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.reported_issues ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.recently_viewed_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_variants ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payments ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.password_reset_tokens ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.partner_applications ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.order_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.newsletter_subscribers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.newsletter_logs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.hero_slides ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.faqs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.email_logs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cart_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cart ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.announcements ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.activity_logs ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.wishlist_items_id_seq;
DROP TABLE IF EXISTS public.wishlist_items;
DROP SEQUENCE IF EXISTS public.vendors_id_seq;
DROP TABLE IF EXISTS public.vendors;
DROP SEQUENCE IF EXISTS public.vendor_shipping_zones_id_seq;
DROP TABLE IF EXISTS public.vendor_shipping_zones;
DROP SEQUENCE IF EXISTS public.vendor_sessions_id_seq;
DROP TABLE IF EXISTS public.vendor_sessions;
DROP SEQUENCE IF EXISTS public.vendor_product_defaults_id_seq;
DROP TABLE IF EXISTS public.vendor_product_defaults;
DROP SEQUENCE IF EXISTS public.vendor_payout_accounts_id_seq;
DROP TABLE IF EXISTS public.vendor_payout_accounts;
DROP SEQUENCE IF EXISTS public.vendor_members_id_seq;
DROP TABLE IF EXISTS public.vendor_members;
DROP SEQUENCE IF EXISTS public.vendor_leads_id_seq;
DROP TABLE IF EXISTS public.vendor_leads;
DROP SEQUENCE IF EXISTS public.vendor_categories_id_seq;
DROP TABLE IF EXISTS public.vendor_categories;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.user_sessions_id_seq;
DROP TABLE IF EXISTS public.user_sessions;
DROP SEQUENCE IF EXISTS public.user_locations_id_seq;
DROP TABLE IF EXISTS public.user_locations;
DROP SEQUENCE IF EXISTS public.support_messages_id_seq;
DROP TABLE IF EXISTS public.support_messages;
DROP SEQUENCE IF EXISTS public.store_reviews_id_seq;
DROP TABLE IF EXISTS public.store_reviews;
DROP SEQUENCE IF EXISTS public.reviews_id_seq;
DROP TABLE IF EXISTS public.reviews;
DROP SEQUENCE IF EXISTS public.reported_issues_id_seq;
DROP TABLE IF EXISTS public.reported_issues;
DROP SEQUENCE IF EXISTS public.recently_viewed_items_id_seq;
DROP TABLE IF EXISTS public.recently_viewed_items;
DROP SEQUENCE IF EXISTS public.products_id_seq;
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public.product_variants_id_seq;
DROP TABLE IF EXISTS public.product_variants;
DROP SEQUENCE IF EXISTS public.payments_id_seq;
DROP TABLE IF EXISTS public.payments;
DROP SEQUENCE IF EXISTS public.password_reset_tokens_id_seq;
DROP TABLE IF EXISTS public.password_reset_tokens;
DROP SEQUENCE IF EXISTS public.partner_applications_id_seq;
DROP TABLE IF EXISTS public.partner_applications;
DROP SEQUENCE IF EXISTS public.orders_id_seq;
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public.order_items_id_seq;
DROP TABLE IF EXISTS public.order_items;
DROP SEQUENCE IF EXISTS public.newsletter_subscribers_id_seq;
DROP TABLE IF EXISTS public.newsletter_subscribers;
DROP SEQUENCE IF EXISTS public.newsletter_logs_id_seq;
DROP TABLE IF EXISTS public.newsletter_logs;
DROP SEQUENCE IF EXISTS public.hero_slides_id_seq;
DROP TABLE IF EXISTS public.hero_slides;
DROP SEQUENCE IF EXISTS public.faqs_id_seq;
DROP TABLE IF EXISTS public.faqs;
DROP SEQUENCE IF EXISTS public.email_logs_id_seq;
DROP TABLE IF EXISTS public.email_logs;
DROP SEQUENCE IF EXISTS public.categories_id_seq;
DROP TABLE IF EXISTS public.categories;
DROP SEQUENCE IF EXISTS public.cart_items_id_seq;
DROP TABLE IF EXISTS public.cart_items;
DROP SEQUENCE IF EXISTS public.cart_id_seq;
DROP TABLE IF EXISTS public.cart;
DROP SEQUENCE IF EXISTS public.announcements_id_seq;
DROP TABLE IF EXISTS public.announcements;
DROP SEQUENCE IF EXISTS public.activity_logs_id_seq;
DROP TABLE IF EXISTS public.activity_logs;
DROP TABLE IF EXISTS public."VerificationToken";
DROP TABLE IF EXISTS public."Session";
DROP TABLE IF EXISTS public."Account";
DROP TABLE IF EXISTS neon_auth.users_sync;
DROP FUNCTION IF EXISTS public.update_updated_at_column();
DROP TYPE IF EXISTS public.vendor_status;
DROP SCHEMA IF EXISTS neon_auth;
--
-- Name: neon_auth; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA neon_auth;


--
-- Name: vendor_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.vendor_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users_sync; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth.users_sync (
    raw_json jsonb NOT NULL,
    id text GENERATED ALWAYS AS ((raw_json ->> 'id'::text)) STORED NOT NULL,
    name text GENERATED ALWAYS AS ((raw_json ->> 'display_name'::text)) STORED,
    email text GENERATED ALWAYS AS ((raw_json ->> 'primary_email'::text)) STORED,
    created_at timestamp with time zone GENERATED ALWAYS AS (to_timestamp((trunc((((raw_json ->> 'signed_up_at_millis'::text))::bigint)::double precision) / (1000)::double precision))) STORED,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


--
-- Name: Account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" character varying(255) NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


--
-- Name: Session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" character varying(255) NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


--
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity_logs (
    id integer NOT NULL,
    admin_id integer,
    action text,
    target text,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: activity_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.activity_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activity_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.activity_logs_id_seq OWNED BY public.activity_logs.id;


--
-- Name: announcements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.announcements (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: announcements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.announcements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: announcements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.announcements_id_seq OWNED BY public.announcements.id;


--
-- Name: cart; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    user_id character varying(255),
    session_id character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT cart_items_quantity_check CHECK ((quantity > 0))
);


--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url text
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: email_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_logs (
    id integer NOT NULL,
    to_email text NOT NULL,
    subject text,
    status text DEFAULT 'sent'::text,
    error_message text,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: email_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.email_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: email_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.email_logs_id_seq OWNED BY public.email_logs.id;


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faqs (
    id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    category text,
    order_index integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- Name: hero_slides; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hero_slides (
    id integer NOT NULL,
    title character varying(255),
    subtitle text,
    image_url text NOT NULL,
    button_text character varying(50) DEFAULT 'Shop Now'::character varying,
    button_link character varying(255) DEFAULT '/products'::character varying,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: hero_slides_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hero_slides_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hero_slides_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hero_slides_id_seq OWNED BY public.hero_slides.id;


--
-- Name: newsletter_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.newsletter_logs (
    id integer NOT NULL,
    subject text NOT NULL,
    body text NOT NULL,
    sent_by integer,
    sent_at timestamp with time zone DEFAULT now(),
    recipients_count integer
);


--
-- Name: newsletter_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.newsletter_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: newsletter_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.newsletter_logs_id_seq OWNED BY public.newsletter_logs.id;


--
-- Name: newsletter_subscribers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.newsletter_subscribers (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    subscribed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: newsletter_subscribers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.newsletter_subscribers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: newsletter_subscribers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.newsletter_subscribers_id_seq OWNED BY public.newsletter_subscribers.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    price_at_order_time numeric(10,2),
    price numeric(10,2),
    vendor_id integer
);


--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id character varying(255),
    total_price numeric(10,2),
    status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total_amount numeric(10,2),
    total numeric DEFAULT 0,
    vendor_id integer
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: partner_applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.partner_applications (
    id integer NOT NULL,
    partner_type character varying(100) NOT NULL,
    partnership_tier character varying(100),
    organization_name character varying(255) NOT NULL,
    registration_number character varying(255),
    year_established character varying(100),
    business_size character varying(100),
    website character varying(255),
    linkedin character varying(255),
    full_name character varying(255) NOT NULL,
    job_title character varying(255),
    email character varying(255) NOT NULL,
    phone character varying(50) NOT NULL,
    alternative_phone character varying(50),
    country character varying(100),
    city character varying(100),
    address text,
    description text,
    services jsonb,
    target_markets jsonb,
    key_clients text,
    annual_revenue character varying(100),
    countries_of_operation jsonb,
    partnership_goals text,
    expected_volume character varying(100),
    integration_timeline character varying(100),
    additional_info text,
    status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    contacted_at timestamp without time zone,
    contacted_by integer,
    termination_reason text,
    termination_notice_sent_at timestamp without time zone,
    termination_deadline timestamp without time zone,
    terminated_at timestamp without time zone
);


--
-- Name: partner_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.partner_applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partner_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.partner_applications_id_seq OWNED BY public.partner_applications.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    id integer NOT NULL,
    token character varying(128) NOT NULL,
    expires_at bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    user_id character varying(255) NOT NULL,
    user_type character varying(20) NOT NULL,
    CONSTRAINT password_reset_tokens_user_type_check CHECK (((user_type)::text = ANY ((ARRAY['user'::character varying, 'vendor'::character varying])::text[])))
);


--
-- Name: password_reset_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.password_reset_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: password_reset_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.password_reset_tokens_id_seq OWNED BY public.password_reset_tokens.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    order_id integer,
    provider character varying(50),
    provider_ref character varying(120),
    amount numeric(12,2) NOT NULL,
    currency character varying(10) DEFAULT 'KES'::character varying,
    status character varying(30) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: product_variants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_variants (
    id integer NOT NULL,
    product_id integer,
    sku character varying(100),
    price numeric(10,2) NOT NULL,
    stock integer DEFAULT 0,
    attributes jsonb,
    image_url character varying(500),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: product_variants_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_variants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_variants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_variants_id_seq OWNED BY public.product_variants.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    image_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    stock integer DEFAULT 0,
    vendor_id integer,
    category text,
    sku character varying(100),
    weight numeric(10,2),
    dimensions character varying(100),
    shipping_cost numeric(10,2) DEFAULT 0,
    free_shipping_threshold numeric(10,2),
    product_type character varying(50) DEFAULT 'simple'::character varying,
    attributes jsonb,
    gallery_images text[],
    updated_at timestamp without time zone DEFAULT now(),
    status character varying(20) DEFAULT 'draft'::character varying,
    created_by character varying(20) DEFAULT 'vendor'::character varying,
    approved_by integer,
    approved_at timestamp without time zone,
    rejection_reason text,
    submitted_at timestamp without time zone,
    original_price numeric(10,2),
    features jsonb,
    warranty_info text,
    shipping_info text,
    return_policy text,
    specifications jsonb,
    tags jsonb,
    brand character varying(100),
    color character varying(50),
    material character varying(100),
    estimated_delivery_days integer DEFAULT 3,
    is_featured boolean DEFAULT false,
    is_bestseller boolean DEFAULT false,
    rating numeric(3,2) DEFAULT 0.00,
    review_count integer DEFAULT 0,
    meta_title character varying(255),
    meta_description text,
    discount_percentage numeric DEFAULT 0,
    is_deal_requested boolean DEFAULT false,
    deal_status text DEFAULT 'none'::text,
    is_hot_deal boolean DEFAULT false,
    CONSTRAINT products_status_check CHECK (((status)::text = ANY ((ARRAY['draft'::character varying, 'pending'::character varying, 'approved'::character varying, 'rejected'::character varying, 'active'::character varying])::text[])))
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: recently_viewed_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recently_viewed_items (
    id integer NOT NULL,
    user_id character varying(255),
    session_id character varying(255),
    product_id integer NOT NULL,
    viewed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT recently_viewed_owner_check CHECK ((((user_id IS NOT NULL) AND (session_id IS NULL)) OR ((user_id IS NULL) AND (session_id IS NOT NULL))))
);


--
-- Name: recently_viewed_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recently_viewed_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recently_viewed_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recently_viewed_items_id_seq OWNED BY public.recently_viewed_items.id;


--
-- Name: reported_issues; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reported_issues (
    id integer NOT NULL,
    reporter_name text,
    reporter_email text,
    description text NOT NULL,
    url text,
    priority text DEFAULT 'normal'::text,
    status text DEFAULT 'open'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    reporter_phone character varying(50),
    issue_category_id integer,
    issue_title character varying(255),
    resolution_message text
);


--
-- Name: reported_issues_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reported_issues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reported_issues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reported_issues_id_seq OWNED BY public.reported_issues.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    product_id integer,
    user_id character varying(255),
    rating integer,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: store_reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.store_reviews (
    id integer NOT NULL,
    reviewer_name character varying(255) NOT NULL,
    reviewer_email character varying(255) NOT NULL,
    feedback_changes text NOT NULL,
    would_recommend boolean NOT NULL,
    general_thoughts text NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    rating integer,
    CONSTRAINT store_reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


--
-- Name: store_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.store_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: store_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.store_reviews_id_seq OWNED BY public.store_reviews.id;


--
-- Name: support_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.support_messages (
    id integer NOT NULL,
    name text,
    email text NOT NULL,
    subject text,
    message text NOT NULL,
    status text DEFAULT 'open'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: support_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.support_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: support_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.support_messages_id_seq OWNED BY public.support_messages.id;


--
-- Name: user_locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_locations (
    id integer NOT NULL,
    user_id character varying(255) NOT NULL,
    name character varying(100),
    address text NOT NULL,
    latitude numeric(10,8),
    longitude numeric(11,8),
    is_default boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: user_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_locations_id_seq OWNED BY public.user_locations.id;


--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_sessions (
    id integer NOT NULL,
    user_id character varying(255) NOT NULL,
    session_token character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    expires_at timestamp without time zone NOT NULL
);


--
-- Name: user_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_sessions_id_seq OWNED BY public.user_sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_admin boolean DEFAULT false,
    refresh_token text,
    last_ip character varying(45),
    last_activity timestamp without time zone,
    session_valid boolean DEFAULT true,
    "emailVerified" timestamp(3) without time zone,
    image text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vendor_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendor_categories (
    id integer NOT NULL,
    vendor_id integer,
    category_name character varying(100) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: vendor_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vendor_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vendor_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vendor_categories_id_seq OWNED BY public.vendor_categories.id;


--
-- Name: vendor_leads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendor_leads (
    id integer NOT NULL,
    full_name character varying(255),
    business_name character varying(255),
    email character varying(255) NOT NULL,
    business_email character varying(255),
    phone character varying(50) NOT NULL,
    business_phone character varying(50),
    location text,
    country character varying(100),
    latitude numeric,
    longitude numeric,
    type character varying(20) DEFAULT 'kenyan'::character varying,
    status character varying(50) DEFAULT 'interested'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: vendor_leads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vendor_leads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vendor_leads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vendor_leads_id_seq OWNED BY public.vendor_leads.id;


--
-- Name: vendor_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendor_members (
    id integer NOT NULL,
    vendor_id integer NOT NULL,
    user_id character varying(255) NOT NULL,
    role character varying(30) NOT NULL
);


--
-- Name: vendor_members_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vendor_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vendor_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vendor_members_id_seq OWNED BY public.vendor_members.id;


--
-- Name: vendor_payout_accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendor_payout_accounts (
    id integer NOT NULL,
    vendor_id integer,
    provider character varying(50),
    account_ref character varying(150),
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: vendor_payout_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vendor_payout_accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vendor_payout_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vendor_payout_accounts_id_seq OWNED BY public.vendor_payout_accounts.id;


--
-- Name: vendor_product_defaults; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendor_product_defaults (
    id integer NOT NULL,
    vendor_id integer,
    default_shipping_cost numeric(10,2),
    default_free_shipping_threshold numeric(10,2),
    default_category character varying(100),
    auto_submit_for_approval boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: vendor_product_defaults_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vendor_product_defaults_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vendor_product_defaults_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vendor_product_defaults_id_seq OWNED BY public.vendor_product_defaults.id;


--
-- Name: vendor_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendor_sessions (
    id integer NOT NULL,
    vendor_id integer NOT NULL,
    session_token character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    expires_at timestamp without time zone NOT NULL
);


--
-- Name: vendor_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vendor_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vendor_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vendor_sessions_id_seq OWNED BY public.vendor_sessions.id;


--
-- Name: vendor_shipping_zones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendor_shipping_zones (
    id integer NOT NULL,
    vendor_id integer,
    product_id integer,
    country character varying(100),
    region character varying(100),
    cost numeric(10,2) DEFAULT 0,
    free_threshold numeric(10,2),
    estimated_days integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: vendor_shipping_zones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vendor_shipping_zones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vendor_shipping_zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vendor_shipping_zones_id_seq OWNED BY public.vendor_shipping_zones.id;


--
-- Name: vendors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendors (
    id integer NOT NULL,
    legal_name character varying(200),
    email character varying(150) NOT NULL,
    phone character varying(50),
    address text,
    created_at timestamp without time zone DEFAULT now(),
    company_name character varying(255),
    contact_person character varying(255),
    password character varying(255),
    status public.vendor_status DEFAULT 'pending'::public.vendor_status,
    country character varying(100),
    business_type character varying(50),
    county character varying(100),
    is_verified boolean DEFAULT false,
    verification_token text,
    verification_expires timestamp without time zone,
    shipping_rate numeric DEFAULT 0,
    shipping_policy text,
    return_policy text,
    company_logo character varying(500),
    updated_at timestamp without time zone DEFAULT now(),
    plan_type character varying(50) DEFAULT 'basic'::character varying,
    max_products integer DEFAULT 10,
    current_approved_count integer DEFAULT 0,
    is_trusted_vendor boolean DEFAULT false,
    login_otp character varying(255),
    login_otp_expires timestamp without time zone
);


--
-- Name: vendors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vendors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vendors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vendors_id_seq OWNED BY public.vendors.id;


--
-- Name: wishlist_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wishlist_items (
    id integer NOT NULL,
    user_id character varying(255),
    session_id character varying(255),
    product_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT wishlist_owner_check CHECK ((((user_id IS NOT NULL) AND (session_id IS NULL)) OR ((user_id IS NULL) AND (session_id IS NOT NULL))))
);


--
-- Name: wishlist_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wishlist_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wishlist_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wishlist_items_id_seq OWNED BY public.wishlist_items.id;


--
-- Name: activity_logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_logs ALTER COLUMN id SET DEFAULT nextval('public.activity_logs_id_seq'::regclass);


--
-- Name: announcements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements ALTER COLUMN id SET DEFAULT nextval('public.announcements_id_seq'::regclass);


--
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: email_logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_logs ALTER COLUMN id SET DEFAULT nextval('public.email_logs_id_seq'::regclass);


--
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- Name: hero_slides id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hero_slides ALTER COLUMN id SET DEFAULT nextval('public.hero_slides_id_seq'::regclass);


--
-- Name: newsletter_logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.newsletter_logs ALTER COLUMN id SET DEFAULT nextval('public.newsletter_logs_id_seq'::regclass);


--
-- Name: newsletter_subscribers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.newsletter_subscribers ALTER COLUMN id SET DEFAULT nextval('public.newsletter_subscribers_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: partner_applications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_applications ALTER COLUMN id SET DEFAULT nextval('public.partner_applications_id_seq'::regclass);


--
-- Name: password_reset_tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens ALTER COLUMN id SET DEFAULT nextval('public.password_reset_tokens_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: product_variants id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_variants ALTER COLUMN id SET DEFAULT nextval('public.product_variants_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: recently_viewed_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recently_viewed_items ALTER COLUMN id SET DEFAULT nextval('public.recently_viewed_items_id_seq'::regclass);


--
-- Name: reported_issues id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_issues ALTER COLUMN id SET DEFAULT nextval('public.reported_issues_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: store_reviews id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.store_reviews ALTER COLUMN id SET DEFAULT nextval('public.store_reviews_id_seq'::regclass);


--
-- Name: support_messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.support_messages ALTER COLUMN id SET DEFAULT nextval('public.support_messages_id_seq'::regclass);


--
-- Name: user_locations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_locations ALTER COLUMN id SET DEFAULT nextval('public.user_locations_id_seq'::regclass);


--
-- Name: user_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sessions ALTER COLUMN id SET DEFAULT nextval('public.user_sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vendor_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_categories ALTER COLUMN id SET DEFAULT nextval('public.vendor_categories_id_seq'::regclass);


--
-- Name: vendor_leads id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_leads ALTER COLUMN id SET DEFAULT nextval('public.vendor_leads_id_seq'::regclass);


--
-- Name: vendor_members id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_members ALTER COLUMN id SET DEFAULT nextval('public.vendor_members_id_seq'::regclass);


--
-- Name: vendor_payout_accounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_payout_accounts ALTER COLUMN id SET DEFAULT nextval('public.vendor_payout_accounts_id_seq'::regclass);


--
-- Name: vendor_product_defaults id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_product_defaults ALTER COLUMN id SET DEFAULT nextval('public.vendor_product_defaults_id_seq'::regclass);


--
-- Name: vendor_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_sessions ALTER COLUMN id SET DEFAULT nextval('public.vendor_sessions_id_seq'::regclass);


--
-- Name: vendor_shipping_zones id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_shipping_zones ALTER COLUMN id SET DEFAULT nextval('public.vendor_shipping_zones_id_seq'::regclass);


--
-- Name: vendors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);


--
-- Name: wishlist_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wishlist_items ALTER COLUMN id SET DEFAULT nextval('public.wishlist_items_id_seq'::regclass);


--
-- Data for Name: users_sync; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth.users_sync (raw_json, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: activity_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.activity_logs (id, admin_id, action, target, created_at) FROM stdin;
1	5	Sent Newsletter	newsletter	2026-02-23 12:42:29.906878
2	5	Sent Newsletter	newsletter	2026-02-23 13:24:59.528969
3	5	Sent Newsletter	newsletter	2026-02-23 19:13:59.892257
4	5	Sent Newsletter	newsletter	2026-02-23 19:29:26.227826
\.


--
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.announcements (id, title, message, created_at) FROM stdin;
1	Thank you!	Thank you for subscribing to our update, you'll get timely and first hand information from us\nNyle Team	2026-02-23 12:42:29.873185
2	Thank you!	Nyle wants to thank you for subscribing to our newsletter. You'll receive timely updates from our Team\nFrom Nyle Team Thank you!	2026-02-23 13:24:59.503751
3	Update release	we are releasing major update in the next 2 weeks stay tuned!	2026-02-23 19:13:59.870964
4	Hello Team	Hello There!	2026-02-23 19:29:26.20128
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart (id, user_id, session_id, created_at, updated_at) FROM stdin;
1	\N	s_1769189198320_df7q0n2n	2026-01-23 17:41:51.591833	2026-01-23 17:41:51.591833
15	\N	s_1769697568397_0xpw6o1p	2026-01-29 14:39:28.977671	2026-01-29 14:39:28.977671
18	\N	s_1769698340630_ztql6inu	2026-01-29 14:52:20.971322	2026-01-29 14:52:20.971322
19	\N	s_1769698340898_491fj80t	2026-01-29 14:52:21.056976	2026-01-29 14:52:21.056976
20	\N	s_1769699373824_ihk4akdv	2026-01-29 15:09:36.008578	2026-01-29 15:09:36.008578
21	\N	s_1769699374232_el5xxhmd	2026-01-29 15:09:42.355519	2026-01-29 15:09:42.355519
22	\N	s_1769699434595_slzlovqu	2026-01-29 15:10:38.965066	2026-01-29 15:10:38.965066
23	\N	s_1770032829571_ulbgbq5d	2026-02-02 11:47:11.31848	2026-02-02 11:47:11.31848
24	\N	s_1770034326656_frr7kcyr	2026-02-02 12:12:07.756178	2026-02-02 12:12:07.756178
25	\N	s_1770034326655_3twv28wa	2026-02-02 12:12:07.75554	2026-02-02 12:12:07.75554
27	\N	s_1770034326656_frr7kcyr	2026-02-02 12:12:07.755348	2026-02-02 12:12:07.755348
26	\N	s_1770034326655_3twv28wa	2026-02-02 12:12:07.754898	2026-02-02 12:12:07.754898
28	\N	s_1770035828517_oz1liwdp	2026-02-02 12:37:09.179822	2026-02-02 12:37:09.179822
29	\N	s_1770035828576_ugxhz4rb	2026-02-02 12:37:09.262622	2026-02-02 12:37:09.262622
30	\N	s_1770035828576_ugxhz4rb	2026-02-02 12:37:09.263299	2026-02-02 12:37:09.263299
31	\N	s_1770038092816_av0v5pse	2026-02-02 13:14:53.579285	2026-02-02 13:14:53.579285
32	\N	s_1770038092816_av0v5pse	2026-02-02 13:14:53.609963	2026-02-02 13:14:53.609963
33	\N	s_1770038092873_j3qo1xpw	2026-02-02 13:14:53.679505	2026-02-02 13:14:53.679505
34	\N	s_1770038092873_j3qo1xpw	2026-02-02 13:14:53.680054	2026-02-02 13:14:53.680054
35	\N	s_1770039209036_sejljbj6	2026-02-02 13:33:29.257237	2026-02-02 13:33:29.257237
36	\N	s_1770039210053_pghjfsye	2026-02-02 13:33:30.204403	2026-02-02 13:33:30.204403
37	\N	s_1770039210053_pghjfsye	2026-02-02 13:33:30.204861	2026-02-02 13:33:30.204861
38	\N	s_1770040076770_3pcx6hms	2026-02-02 13:47:57.309223	2026-02-02 13:47:57.309223
39	\N	s_1770040076770_3pcx6hms	2026-02-02 13:47:57.306947	2026-02-02 13:47:57.306947
40	\N	s_1770040076762_f49hqiah	2026-02-02 13:47:57.312968	2026-02-02 13:47:57.312968
41	\N	s_1770040462174_ru9w5gjd	2026-02-02 13:54:23.442645	2026-02-02 13:54:23.442645
42	\N	s_1770041576772_9ttat2x8	2026-02-02 14:12:57.225156	2026-02-02 14:12:57.225156
43	\N	s_1770041576802_ld3dipe9	2026-02-02 14:12:57.225304	2026-02-02 14:12:57.225304
377	\N	s_1769425670828_bwt12cks	2026-03-04 04:00:28.141498	2026-03-04 04:00:28.141498
52	\N	s_1770211465372_pohqcqiu	2026-02-04 13:24:26.236888	2026-02-04 13:24:26.236888
51	\N	s_1770211465372_pohqcqiu	2026-02-04 13:24:26.238472	2026-02-04 13:24:26.238472
53	\N	s_1770211523081_jtec1ifp	2026-02-04 13:25:23.80266	2026-02-04 13:25:23.80266
54	\N	s_1770212169077_w1ghlstq	2026-02-04 13:36:09.5122	2026-02-04 13:36:09.5122
55	\N	s_1770212169077_w1ghlstq	2026-02-04 13:36:09.535565	2026-02-04 13:36:09.535565
56	\N	s_1770212169142_03afrtvb	2026-02-04 13:36:09.635444	2026-02-04 13:36:09.635444
57	\N	s_1770212169142_03afrtvb	2026-02-04 13:36:09.64134	2026-02-04 13:36:09.64134
58	\N	s_1770216388841_ka67ymkk	2026-02-04 14:46:29.336487	2026-02-04 14:46:29.336487
59	\N	s_1770216388841_ka67ymkk	2026-02-04 14:46:29.436874	2026-02-04 14:46:29.436874
61	\N	s_1770216388872_w1kktas6	2026-02-04 14:46:29.554659	2026-02-04 14:46:29.554659
60	\N	s_1770216388872_w1kktas6	2026-02-04 14:46:29.552816	2026-02-04 14:46:29.552816
62	\N	s_1770320327932_vufcd5ta	2026-02-05 19:38:50.229481	2026-02-05 19:38:50.229481
63	\N	s_1770320892856_aq6n67we	2026-02-05 19:48:13.239773	2026-02-05 19:48:13.239773
65	\N	s_1770320892856_aq6n67we	2026-02-05 19:48:13.263958	2026-02-05 19:48:13.263958
64	\N	s_1770320892850_6tmf7qub	2026-02-05 19:48:13.256302	2026-02-05 19:48:13.256302
66	\N	s_1770320892850_6tmf7qub	2026-02-05 19:48:13.325016	2026-02-05 19:48:13.325016
67	\N	s_1770320978093_ad1h86w1	2026-02-05 19:49:38.632083	2026-02-05 19:49:38.632083
68	\N	s_1770320978169_h31cv8vv	2026-02-05 19:49:38.645273	2026-02-05 19:49:38.645273
69	\N	s_1770321873740_a2qo476t	2026-02-05 20:04:34.764952	2026-02-05 20:04:34.764952
71	\N	s_1770321873776_8ewjhppg	2026-02-05 20:04:34.764655	2026-02-05 20:04:34.764655
70	\N	s_1770321873740_a2qo476t	2026-02-05 20:04:34.765326	2026-02-05 20:04:34.765326
72	\N	s_1770323172781_ytrau2aa	2026-02-05 20:26:13.510007	2026-02-05 20:26:13.510007
73	\N	s_1770323172908_15wsw15b	2026-02-05 20:26:13.506065	2026-02-05 20:26:13.506065
74	\N	s_1770323172781_ytrau2aa	2026-02-05 20:26:13.50439	2026-02-05 20:26:13.50439
75	\N	s_1770323172908_15wsw15b	2026-02-05 20:26:13.522055	2026-02-05 20:26:13.522055
76	\N	s_1770325018788_lifrbl1h	2026-02-05 20:56:59.518906	2026-02-05 20:56:59.518906
78	\N	s_1770325018838_rc57kel3	2026-02-05 20:56:59.518699	2026-02-05 20:56:59.518699
77	\N	s_1770325018838_rc57kel3	2026-02-05 20:56:59.519024	2026-02-05 20:56:59.519024
79	\N	s_1770325018788_lifrbl1h	2026-02-05 20:56:59.519109	2026-02-05 20:56:59.519109
80	\N	s_1771241085982_ipym9rh2	2026-02-16 11:25:38.873968	2026-02-16 11:25:38.873968
81	\N	s_1771268648920_acnmznva	2026-02-16 19:04:52.364948	2026-02-16 19:04:52.364948
82	\N	s_1771268648920_acnmznva	2026-02-16 19:04:52.357498	2026-02-16 19:04:52.357498
83	\N	s_1771268649664_kpm3z0yk	2026-02-16 19:04:53.068007	2026-02-16 19:04:53.068007
85	\N	s_1771523302544_qe82wh7t	2026-02-19 17:48:22.951532	2026-02-19 17:48:22.951532
84	\N	s_1771523302544_qe82wh7t	2026-02-19 17:48:22.951976	2026-02-19 17:48:22.951976
86	\N	s_1771523305390_6ufx5mzj	2026-02-19 17:48:25.89528	2026-02-19 17:48:25.89528
193	\N	s_1772182499265_348tsfhx	2026-02-27 08:55:00.035185	2026-02-27 08:55:00.035185
195	\N	s_1772182505753_8kim527h	2026-02-27 08:55:06.160861	2026-02-27 08:55:06.160861
197	\N	s_1772182518240_qbwcwrre	2026-02-27 08:55:18.671687	2026-02-27 08:55:18.671687
100	\N	s_1771524481653_4jwn8vyg	2026-02-19 18:08:02.419042	2026-02-19 18:08:02.419042
104	\N	s_1771527826983_vda567o5	2026-02-19 19:03:50.507462	2026-02-19 19:03:50.507462
105	\N	s_1771527827175_qntst4z4	2026-02-19 19:03:51.321577	2026-02-19 19:03:51.321577
106	\N	s_1771527827175_qntst4z4	2026-02-19 19:03:51.322977	2026-02-19 19:03:51.322977
439	\N	s_1772633272016_4y6u24	2026-03-04 14:07:52.023768	2026-03-04 14:07:52.023768
2	5	\N	2026-01-23 18:58:44.329066	2026-05-15 13:23:35.090509
417	\N	s_1772632062576_rvi2vz	2026-03-04 13:47:42.583445	2026-03-04 13:47:42.583445
418	\N	s_1772632062673_qxwent	2026-03-04 13:47:42.680227	2026-03-04 13:47:42.680227
419	\N	s_1772632063121_tnczxc	2026-03-04 13:47:43.128931	2026-03-04 13:47:43.128931
420	\N	s_1772632063489_odn2tm	2026-03-04 13:47:43.496763	2026-03-04 13:47:43.496763
421	\N	s_1772632072325_awi2kj	2026-03-04 13:47:52.332661	2026-03-04 13:47:52.332661
422	\N	s_1772632072668_o2srvu	2026-03-04 13:47:52.675709	2026-03-04 13:47:52.675709
423	\N	s_1772632072994_mvkboi	2026-03-04 13:47:53.00209	2026-03-04 13:47:53.00209
424	\N	s_1772632073361_5xets0	2026-03-04 13:47:53.368038	2026-03-04 13:47:53.368038
425	\N	s_1772632073740_nv3ild	2026-03-04 13:47:53.747372	2026-03-04 13:47:53.747372
426	\N	s_1772632074073_p4o5tl	2026-03-04 13:47:54.080665	2026-03-04 13:47:54.080665
427	\N	s_1772632085525_tj8jbj	2026-03-04 13:48:05.532121	2026-03-04 13:48:05.532121
428	\N	s_1772632085889_6jxgq4	2026-03-04 13:48:05.897025	2026-03-04 13:48:05.897025
429	\N	s_1772632086204_z7frus	2026-03-04 13:48:06.212185	2026-03-04 13:48:06.212185
430	\N	s_1772632086542_e0zzij	2026-03-04 13:48:06.549896	2026-03-04 13:48:06.549896
431	\N	s_1772632086886_qewpsp	2026-03-04 13:48:06.893177	2026-03-04 13:48:06.893177
432	\N	s_1772632087198_rci5wc	2026-03-04 13:48:07.205458	2026-03-04 13:48:07.205458
433	\N	s_1772632230135_vd0e1c	2026-03-04 13:50:30.142381	2026-03-04 13:50:30.142381
434	\N	s_1772632230859_pq8n8u	2026-03-04 13:50:30.866018	2026-03-04 13:50:30.866018
435	\N	s_1772632231215_9enbn7	2026-03-04 13:50:31.221889	2026-03-04 13:50:31.221889
436	\N	s_1772632288906_49m5iy	2026-03-04 13:51:28.913825	2026-03-04 13:51:28.913825
437	\N	s_1772632289221_wyb2lo	2026-03-04 13:51:29.229542	2026-03-04 13:51:29.229542
438	\N	s_1772632289551_fyzq6q	2026-03-04 13:51:29.558861	2026-03-04 13:51:29.558861
440	\N	s_1772633272132_c9vvj1	2026-03-04 14:07:52.139418	2026-03-04 14:07:52.139418
441	\N	s_1772633272363_d1bdfz	2026-03-04 14:07:52.370839	2026-03-04 14:07:52.370839
443	\N	s_1772636906726_hu5f7s	2026-03-04 15:08:26.733505	2026-03-04 15:08:26.733505
444	\N	s_1772636907093_7o6l3g	2026-03-04 15:08:27.100247	2026-03-04 15:08:27.100247
446	\N	s_1772698351187_hqyu0f	2026-03-05 08:12:31.19514	2026-03-05 08:12:31.19514
447	\N	s_1772698351527_269ekn	2026-03-05 08:12:31.534547	2026-03-05 08:12:31.534547
448	\N	s_1772698351882_2xgs8q	2026-03-05 08:12:31.889585	2026-03-05 08:12:31.889585
449	\N	s_1772698352244_zmcff5	2026-03-05 08:12:32.252129	2026-03-05 08:12:32.252129
450	\N	s_1772698352581_yz3whk	2026-03-05 08:12:32.589415	2026-03-05 08:12:32.589415
451	\N	s_1772698756066_zcd31r	2026-03-05 08:19:16.073585	2026-03-05 08:19:16.073585
452	\N	s_1772698757141_dq7k2s	2026-03-05 08:19:17.148929	2026-03-05 08:19:17.148929
453	\N	s_1772698757499_pa4yt1	2026-03-05 08:19:17.507077	2026-03-05 08:19:17.507077
461	\N	s_1772721011464_uh4tbx	2026-03-05 14:30:11.470995	2026-03-05 14:30:11.470995
462	\N	s_1772721012205_wmqj7x	2026-03-05 14:30:12.212389	2026-03-05 14:30:12.212389
472	\N	s_1772733320601_t956aa	2026-03-05 17:55:20.60794	2026-03-05 17:55:20.60794
473	\N	s_1772733320993_9h2ojq	2026-03-05 17:55:20.999648	2026-03-05 17:55:20.999648
474	\N	s_1772733321758_v61g6h	2026-03-05 17:55:21.764484	2026-03-05 17:55:21.764484
475	\N	s_1772733322124_mqtdqi	2026-03-05 17:55:22.13023	2026-03-05 17:55:22.13023
484	\N	s_1772734435461_mm6t84	2026-03-05 18:13:55.468131	2026-03-05 18:13:55.468131
485	\N	s_1772734435804_m503fd	2026-03-05 18:13:55.811358	2026-03-05 18:13:55.811358
486	\N	s_1772734486621_c1lvwc	2026-03-05 18:14:46.628916	2026-03-05 18:14:46.628916
487	\N	s_1772734496472_f54r5u	2026-03-05 18:14:56.479233	2026-03-05 18:14:56.479233
488	\N	s_1772734514934_w11wjy	2026-03-05 18:15:14.936163	2026-03-05 18:15:14.999052
489	\N	s_1772734517374_rvlui4	2026-03-05 18:15:17.376412	2026-03-05 18:15:17.376412
490	\N	s_1772734517781_4nhgtk	2026-03-05 18:15:17.783033	2026-03-05 18:15:17.783033
491	\N	s_1772734518399_2ev1re	2026-03-05 18:15:18.4005	2026-03-05 18:15:18.4005
492	\N	s_1772734519013_s7x8zy	2026-03-05 18:15:19.014722	2026-03-05 18:15:19.014722
493	\N	s_1772734522706_dcmafu	2026-03-05 18:15:22.708353	2026-03-05 18:15:22.708353
494	\N	s_1772734533378_u5i2k4	2026-03-05 18:15:33.380341	2026-03-05 18:15:33.439932
495	\N	s_1772734536800_wp0kjx	2026-03-05 18:15:36.802092	2026-03-05 18:15:36.802092
496	\N	s_1772734537290_27tsxb	2026-03-05 18:15:37.291535	2026-03-05 18:15:37.291535
497	\N	s_1772734537905_dn5t1s	2026-03-05 18:15:37.906659	2026-03-05 18:15:37.906659
498	\N	s_1772734538842_xrzqrx	2026-03-05 18:15:38.843524	2026-03-05 18:15:38.843524
499	\N	s_1772734543656_vc5kbg	2026-03-05 18:15:43.657785	2026-03-05 18:15:43.657785
500	\N	s_1772734623923_brd2c7	2026-03-05 18:17:03.924688	2026-03-05 18:17:03.984622
539	\N	s_1772740962802_g1hc9c	2026-03-05 20:02:42.810139	2026-03-05 20:02:42.810139
540	\N	s_1772740993706_p6i38a	2026-03-05 20:03:13.713889	2026-03-05 20:03:13.713889
541	\N	s_1772740994539_rstnc3	2026-03-05 20:03:14.546766	2026-03-05 20:03:14.546766
542	\N	s_1772740995811_4xohdx	2026-03-05 20:03:15.818415	2026-03-05 20:03:15.818415
543	\N	s_1772741018440_cqcyqt	2026-03-05 20:03:38.447477	2026-03-05 20:03:38.447477
544	\N	s_1772741019098_wqqc3k	2026-03-05 20:03:39.105575	2026-03-05 20:03:39.105575
545	\N	s_1772741024302_2mvqte	2026-03-05 20:03:44.309863	2026-03-05 20:03:44.309863
546	\N	s_1772741024629_o9irbg	2026-03-05 20:03:44.636072	2026-03-05 20:03:44.636072
548	\N	s_1772897732313_8t05gf	2026-03-07 15:35:32.320253	2026-03-07 15:35:32.320253
549	\N	s_1772897732645_cl3cxs	2026-03-07 15:35:32.652234	2026-03-07 15:35:32.652234
550	\N	s_1772897732994_urdznd	2026-03-07 15:35:33.002099	2026-03-07 15:35:33.002099
551	\N	s_1772897733383_02u9gd	2026-03-07 15:35:33.391014	2026-03-07 15:35:33.391014
563	\N	s_1773039909619_i0adgs	2026-03-09 07:05:09.626491	2026-03-09 07:05:09.626491
571	\N	s_1773042401180_jh4kpb	2026-03-09 07:46:41.384922	2026-03-09 07:46:41.384922
575	\N	s_1773042401377_14s5uz	2026-03-09 07:46:41.483191	2026-03-09 07:46:41.483191
576	\N	s_1773042401377_ca5007	2026-03-09 07:46:41.488558	2026-03-09 07:46:41.488558
577	\N	s_1773042401391_r876gi	2026-03-09 07:46:41.501158	2026-03-09 07:46:41.501158
578	\N	s_1773042401500_qrbicd	2026-03-09 07:46:41.518493	2026-03-09 07:46:41.518493
580	\N	s_1773082669970_w0pkrx	2026-03-09 18:57:49.978248	2026-03-09 18:57:49.978248
593	\N	s_1773083193407_3zo56s	2026-03-09 19:06:33.41484	2026-03-09 19:06:33.41484
594	\N	s_1773083193804_dxsovq	2026-03-09 19:06:33.811598	2026-03-09 19:06:33.811598
595	\N	s_1773083194227_b5r034	2026-03-09 19:06:34.235001	2026-03-09 19:06:34.235001
596	\N	s_1773083194625_ghxrn8	2026-03-09 19:06:34.632555	2026-03-09 19:06:34.632555
597	\N	s_1773083197763_zyc6bp	2026-03-09 19:06:37.770959	2026-03-09 19:06:37.770959
598	\N	s_1773141151100_p5t66i	2026-03-10 11:12:31.108091	2026-03-10 11:12:31.108091
599	\N	s_1773141151164_hund0i	2026-03-10 11:12:31.172158	2026-03-10 11:12:31.172158
442	\N	s_1772636906725_qpsz7q	2026-03-04 15:08:26.732776	2026-03-04 15:08:26.732776
445	\N	s_1772698349937_ko7p0q	2026-03-05 08:12:29.944685	2026-03-05 08:12:29.944685
454	\N	s_1772720242931_vybm68	2026-03-05 14:17:22.938145	2026-03-05 14:17:22.938145
455	\N	s_1772720306333_erwdri	2026-03-05 14:18:26.340783	2026-03-05 14:18:26.340783
456	\N	s_1772720978718_l7j3gf	2026-03-05 14:29:38.724897	2026-03-05 14:29:38.724897
457	\N	s_1772720981152_se0ry4	2026-03-05 14:29:41.159497	2026-03-05 14:29:41.159497
458	\N	s_1772720982424_qbc5j0	2026-03-05 14:29:42.431155	2026-03-05 14:29:42.431155
118	\N	s_1771530234338_vuqk2ka0	2026-02-19 19:43:54.866865	2026-02-19 19:43:54.866865
119	\N	s_1771530234338_vuqk2ka0	2026-02-19 19:43:54.965692	2026-02-19 19:43:54.965692
120	\N	s_1771530234673_l43x5bh7	2026-02-19 19:43:55.191358	2026-02-19 19:43:55.191358
121	\N	s_1771530234673_l43x5bh7	2026-02-19 19:43:55.191719	2026-02-19 19:43:55.191719
122	\N	s_1771530294015_o4og7n7w	2026-02-19 19:44:55.085897	2026-02-19 19:44:55.085897
459	\N	s_1772720988777_olsm5v	2026-03-05 14:29:48.783763	2026-03-05 14:29:48.783763
460	\N	s_1772720989717_fkidlz	2026-03-05 14:29:49.723944	2026-03-05 14:29:49.723944
463	\N	s_1772733045149_9agk94	2026-03-05 17:50:45.155859	2026-03-05 17:50:45.155859
464	\N	s_1772733052449_sx91on	2026-03-05 17:50:52.455775	2026-03-05 17:50:52.455775
465	\N	s_1772733052818_fbh533	2026-03-05 17:50:52.824402	2026-03-05 17:50:52.824402
466	\N	s_1772733053173_oq3e35	2026-03-05 17:50:53.179605	2026-03-05 17:50:53.179605
129	\N	s_1771744653545_ubxjzh22	2026-02-22 07:17:34.157546	2026-02-22 07:17:34.157546
467	\N	s_1772733053528_e9trsz	2026-03-05 17:50:53.534856	2026-03-05 17:50:53.534856
468	\N	s_1772733307381_2jaaej	2026-03-05 17:55:07.387972	2026-03-05 17:55:07.387972
469	\N	s_1772733307717_tj2bn3	2026-03-05 17:55:07.724082	2026-03-05 17:55:07.724082
470	\N	s_1772733316268_texxat	2026-03-05 17:55:16.275464	2026-03-05 17:55:16.275464
471	\N	s_1772733316608_dpraez	2026-03-05 17:55:16.614509	2026-03-05 17:55:16.614509
476	\N	s_1772733394739_6etq15	2026-03-05 17:56:34.746615	2026-03-05 17:56:34.746615
477	\N	s_1772733395853_jdehn9	2026-03-05 17:56:35.860281	2026-03-05 17:56:35.860281
478	\N	s_1772734077522_nn8sap	2026-03-05 18:07:57.528853	2026-03-05 18:07:57.528853
479	\N	s_1772734078002_e43ukh	2026-03-05 18:07:58.00875	2026-03-05 18:07:58.00875
480	\N	s_1772734430711_4yanen	2026-03-05 18:13:50.71777	2026-03-05 18:13:50.71777
481	\N	s_1772734431834_svbaav	2026-03-05 18:13:51.841325	2026-03-05 18:13:51.841325
482	\N	s_1772734433792_8tetby	2026-03-05 18:13:53.799181	2026-03-05 18:13:53.799181
483	\N	s_1772734434295_44fdqv	2026-03-05 18:13:54.302112	2026-03-05 18:13:54.302112
501	\N	s_1772734661972_g5vuk1	2026-03-05 18:17:41.97417	2026-03-05 18:17:41.97417
502	\N	s_1772734676078_ptz3ad	2026-03-05 18:17:56.079986	2026-03-05 18:17:56.14751
503	\N	s_1772734677857_1ceeph	2026-03-05 18:17:57.859013	2026-03-05 18:17:57.859013
504	\N	s_1772734678244_5cfx0m	2026-03-05 18:17:58.24554	2026-03-05 18:17:58.24554
505	\N	s_1772734678625_o6sacs	2026-03-05 18:17:58.626586	2026-03-05 18:17:58.626586
506	\N	s_1772734679050_5xkvir	2026-03-05 18:17:59.051615	2026-03-05 18:17:59.051615
150	\N	s_1771849731600_ai87txss	2026-02-23 12:29:24.685505	2026-02-23 12:29:24.685505
507	\N	s_1772734888060_0nv3dt	2026-03-05 18:21:28.062013	2026-03-05 18:21:28.062013
508	\N	s_1772734888422_m30ug5	2026-03-05 18:21:28.4235	2026-03-05 18:21:28.4235
509	\N	s_1772737665306_fuv6sd	2026-03-05 19:07:45.313793	2026-03-05 19:07:45.313793
510	\N	s_1772737665625_23ov2h	2026-03-05 19:07:45.632585	2026-03-05 19:07:45.632585
511	\N	s_1772737665685_kzcham	2026-03-05 19:07:45.692316	2026-03-05 19:07:45.692316
512	\N	s_1772737665988_av23se	2026-03-05 19:07:45.995391	2026-03-05 19:07:45.995391
513	\N	s_1772737666276_9ugamx	2026-03-05 19:07:46.283213	2026-03-05 19:07:46.283213
514	\N	s_1772737666599_rrjy8k	2026-03-05 19:07:46.607081	2026-03-05 19:07:46.607081
515	\N	s_1772739212146_2kqtpi	2026-03-05 19:33:32.15419	2026-03-05 19:33:32.15419
516	\N	s_1772739212523_tlr99v	2026-03-05 19:33:32.530638	2026-03-05 19:33:32.530638
517	\N	s_1772739215184_za4otw	2026-03-05 19:33:35.191925	2026-03-05 19:33:35.191925
518	\N	s_1772739215652_xvusgs	2026-03-05 19:33:35.659359	2026-03-05 19:33:35.659359
519	\N	s_1772739216057_5f8wu0	2026-03-05 19:33:36.065045	2026-03-05 19:33:36.065045
520	\N	s_1772739216391_g420ta	2026-03-05 19:33:36.399002	2026-03-05 19:33:36.399002
521	\N	s_1772739219159_0fh4ae	2026-03-05 19:33:39.167021	2026-03-05 19:33:39.167021
522	\N	s_1772739219475_qimhk8	2026-03-05 19:33:39.482347	2026-03-05 19:33:39.482347
523	\N	s_1772739219905_3lsan3	2026-03-05 19:33:39.912443	2026-03-05 19:33:39.912443
524	\N	s_1772739220225_4nq0o2	2026-03-05 19:33:40.232638	2026-03-05 19:33:40.232638
525	\N	s_1772739930280_6mdgss	2026-03-05 19:45:30.288022	2026-03-05 19:45:30.288022
526	\N	s_1772739930674_yoxmt3	2026-03-05 19:45:30.681583	2026-03-05 19:45:30.681583
527	\N	s_1772739933948_fzw1q5	2026-03-05 19:45:33.956094	2026-03-05 19:45:33.956094
528	\N	s_1772739934330_n5r0ce	2026-03-05 19:45:34.338315	2026-03-05 19:45:34.338315
529	\N	s_1772739934789_ln362p	2026-03-05 19:45:34.797791	2026-03-05 19:45:34.797791
530	\N	s_1772739935556_1gauhr	2026-03-05 19:45:35.563608	2026-03-05 19:45:35.563608
531	\N	s_1772739968093_dlavez	2026-03-05 19:46:08.102418	2026-03-05 19:46:08.102418
532	\N	s_1772740028728_uvaqcr	2026-03-05 19:47:08.737113	2026-03-05 19:47:08.737113
533	\N	s_1772740029443_tnnqb6	2026-03-05 19:47:09.451284	2026-03-05 19:47:09.451284
534	\N	s_1772740903731_lr1m2o	2026-03-05 20:01:43.738573	2026-03-05 20:01:43.738573
535	\N	s_1772740904268_nsl4c7	2026-03-05 20:01:44.275207	2026-03-05 20:01:44.275207
536	\N	s_1772740904847_a35lq4	2026-03-05 20:01:44.854592	2026-03-05 20:01:44.854592
537	\N	s_1772740905443_utht0s	2026-03-05 20:01:45.45063	2026-03-05 20:01:45.45063
538	\N	s_1772740917745_3dul7q	2026-03-05 20:01:57.752922	2026-03-05 20:01:57.752922
547	\N	s_1772897732009_c36nf0	2026-03-07 15:35:32.016992	2026-03-07 15:35:32.016992
552	\N	s_1772899191364_rfxgbs	2026-03-07 15:59:51.373116	2026-03-07 15:59:51.373116
553	\N	s_1772989499724_ju012b	2026-03-08 17:04:59.730979	2026-03-08 17:04:59.730979
554	\N	s_1772989499829_d0r3tx	2026-03-08 17:04:59.836901	2026-03-08 17:04:59.836901
555	\N	s_1772989500100_ksr0x7	2026-03-08 17:05:00.106932	2026-03-08 17:05:00.106932
556	\N	s_1772989500323_cvt9vv	2026-03-08 17:05:00.330446	2026-03-08 17:05:00.330446
557	\N	s_1772989500346_sz9f64	2026-03-08 17:05:00.353513	2026-03-08 17:05:00.353513
558	\N	s_1772989500413_hcab4g	2026-03-08 17:05:00.420974	2026-03-08 17:05:00.420974
559	\N	s_1772989500858_lt4r33	2026-03-08 17:05:00.864992	2026-03-08 17:05:00.864992
560	\N	s_1772989503214_k8ff92	2026-03-08 17:05:03.220793	2026-03-08 17:05:03.220793
561	\N	s_1772989504296_l05a6k	2026-03-08 17:05:04.302623	2026-03-08 17:05:04.302623
562	\N	s_1772989506051_sqt26a	2026-03-08 17:05:06.058163	2026-03-08 17:05:06.058163
564	\N	s_1773039909619_dr81pk	2026-03-09 07:05:09.627112	2026-03-09 07:05:09.627112
565	\N	s_1773039909717_jh291p	2026-03-09 07:05:09.724801	2026-03-09 07:05:09.724801
566	\N	s_1773039909938_nl91mu	2026-03-09 07:05:09.946203	2026-03-09 07:05:09.946203
567	\N	s_1773039909956_ckbrgx	2026-03-09 07:05:09.965857	2026-03-09 07:05:09.965857
568	\N	s_1773039910083_n8fap4	2026-03-09 07:05:10.091424	2026-03-09 07:05:10.091424
569	\N	s_1773039910145_uq409i	2026-03-09 07:05:10.174761	2026-03-09 07:05:10.174761
570	\N	s_1773039910185_a0kj3l	2026-03-09 07:05:10.193045	2026-03-09 07:05:10.193045
572	\N	s_1773042401276_v37ayt	2026-03-09 07:46:41.385108	2026-03-09 07:46:41.385108
573	\N	s_1773042401376_wp61ne	2026-03-09 07:46:41.482648	2026-03-09 07:46:41.482648
574	\N	s_1773042401377_s77v06	2026-03-09 07:46:41.48333	2026-03-09 07:46:41.48333
581	\N	s_1773082669969_pe68km	2026-03-09 18:57:49.977418	2026-03-09 18:57:49.977418
579	\N	s_1773082669969_gohfw5	2026-03-09 18:57:49.97608	2026-03-09 18:57:49.97608
582	\N	s_1773082670074_f4fj23	2026-03-09 18:57:50.082255	2026-03-09 18:57:50.082255
583	\N	s_1773082670105_rebyt3	2026-03-09 18:57:50.112299	2026-03-09 18:57:50.112299
584	\N	s_1773082670198_rv394s	2026-03-09 18:57:50.205681	2026-03-09 18:57:50.205681
585	\N	s_1773082670325_kaay80	2026-03-09 18:57:50.33277	2026-03-09 18:57:50.33277
586	\N	s_1773082670406_z0k4xj	2026-03-09 18:57:50.413404	2026-03-09 18:57:50.413404
587	\N	s_1773082670426_xrcifd	2026-03-09 18:57:50.43324	2026-03-09 18:57:50.43324
588	\N	s_1773082670426_jwdp23	2026-03-09 18:57:50.434682	2026-03-09 18:57:50.434682
589	\N	s_1773083189234_qa3ub1	2026-03-09 19:06:29.24214	2026-03-09 19:06:29.24214
590	\N	s_1773083190787_znr59a	2026-03-09 19:06:30.794913	2026-03-09 19:06:30.794913
591	\N	s_1773083191184_guuvhy	2026-03-09 19:06:31.192199	2026-03-09 19:06:31.192199
592	\N	s_1773083192441_jswxhq	2026-03-09 19:06:32.449071	2026-03-09 19:06:32.449071
600	\N	s_1773141151408_fen0gh	2026-03-10 11:12:31.416228	2026-03-10 11:12:31.416228
601	\N	s_1773141217632_uhlrcw	2026-03-10 11:13:37.63911	2026-03-10 11:13:37.63911
602	\N	s_1773141218601_nnfu73	2026-03-10 11:13:38.60837	2026-03-10 11:13:38.60837
603	\N	s_1773141219183_ccsqek	2026-03-10 11:13:39.189901	2026-03-10 11:13:39.189901
604	\N	s_1773141266265_x01csz	2026-03-10 11:14:26.272368	2026-03-10 11:14:26.272368
605	\N	s_1773141266800_4jxky4	2026-03-10 11:14:26.806693	2026-03-10 11:14:26.806693
606	\N	s_1773141267381_tzvtir	2026-03-10 11:14:27.388346	2026-03-10 11:14:27.388346
607	\N	s_1773141268009_fjcaiy	2026-03-10 11:14:28.01651	2026-03-10 11:14:28.01651
608	\N	s_1773141268559_hbq029	2026-03-10 11:14:28.566091	2026-03-10 11:14:28.566091
609	\N	s_1773141269280_e5nd22	2026-03-10 11:14:29.287611	2026-03-10 11:14:29.287611
610	\N	s_1773141269776_4aojax	2026-03-10 11:14:29.782828	2026-03-10 11:14:29.782828
611	\N	s_1773141270172_s416ny	2026-03-10 11:14:30.179032	2026-03-10 11:14:30.179032
612	\N	s_1773155794185_u36krc	2026-03-10 15:16:34.192784	2026-03-10 15:16:34.192784
613	\N	s_1773155795773_5zjbeu	2026-03-10 15:16:35.780872	2026-03-10 15:16:35.780872
614	\N	s_1773155796727_oe48mt	2026-03-10 15:16:36.734157	2026-03-10 15:16:36.734157
615	\N	s_1773155798371_ofg8ju	2026-03-10 15:16:38.378268	2026-03-10 15:16:38.378268
616	\N	s_1773155803586_v3gq4k	2026-03-10 15:16:43.59366	2026-03-10 15:16:43.59366
617	\N	s_1773155804448_j5hyur	2026-03-10 15:16:44.45509	2026-03-10 15:16:44.45509
618	\N	s_1773155805409_zq7h0p	2026-03-10 15:16:45.416693	2026-03-10 15:16:45.416693
619	\N	s_1773155807338_g4fi8h	2026-03-10 15:16:47.345526	2026-03-10 15:16:47.345526
620	\N	s_1773155807966_peq74k	2026-03-10 15:16:47.973028	2026-03-10 15:16:47.973028
621	\N	s_1773155808493_u3wzej	2026-03-10 15:16:48.499975	2026-03-10 15:16:48.499975
622	\N	s_1773155815767_wy42a5	2026-03-10 15:16:55.7742	2026-03-10 15:16:55.7742
623	\N	s_1773155816140_qmacnn	2026-03-10 15:16:56.146923	2026-03-10 15:16:56.146923
624	\N	s_1773155816722_gjjw5v	2026-03-10 15:16:56.729316	2026-03-10 15:16:56.729316
625	\N	s_1773155817737_we24hx	2026-03-10 15:16:57.744156	2026-03-10 15:16:57.744156
626	\N	s_1773155818369_vkt1sj	2026-03-10 15:16:58.376156	2026-03-10 15:16:58.376156
627	\N	s_1773155818868_4lgzwl	2026-03-10 15:16:58.875762	2026-03-10 15:16:58.875762
628	\N	s_1773155819342_yfgczj	2026-03-10 15:16:59.35043	2026-03-10 15:16:59.35043
629	\N	s_1773155819883_1pmgg2	2026-03-10 15:16:59.890184	2026-03-10 15:16:59.890184
630	\N	s_1773155840140_p5w813	2026-03-10 15:17:20.146516	2026-03-10 15:17:20.146516
631	\N	s_1773155840687_dxaixc	2026-03-10 15:17:20.694226	2026-03-10 15:17:20.694226
632	\N	s_1773155841573_7lj6m1	2026-03-10 15:17:21.580609	2026-03-10 15:17:21.580609
633	\N	s_1773155842538_etx53d	2026-03-10 15:17:22.544565	2026-03-10 15:17:22.544565
634	\N	s_1773155843113_cbh18s	2026-03-10 15:17:23.120504	2026-03-10 15:17:23.120504
635	\N	s_1773155843628_nv7hui	2026-03-10 15:17:23.634807	2026-03-10 15:17:23.634807
636	\N	s_1773155849197_wf18pf	2026-03-10 15:17:29.20388	2026-03-10 15:17:29.20388
637	\N	s_1773155849987_xrvv8r	2026-03-10 15:17:29.994295	2026-03-10 15:17:29.994295
638	\N	s_1773155851069_1slmul	2026-03-10 15:17:31.075899	2026-03-10 15:17:31.075899
639	\N	s_1773155851569_kmoc9z	2026-03-10 15:17:31.576547	2026-03-10 15:17:31.576547
640	\N	s_1773155852075_8vv02q	2026-03-10 15:17:32.082122	2026-03-10 15:17:32.082122
641	\N	s_1773155852894_2mg2sy	2026-03-10 15:17:32.901207	2026-03-10 15:17:32.901207
642	\N	s_1773155865521_081iy5sg	2026-03-10 15:17:47.350293	2026-03-10 15:17:47.350293
643	\N	s_1773156086228_ype7ui	2026-03-10 15:21:26.236101	2026-03-10 15:21:26.236101
644	\N	s_1773156086587_6nv0yz	2026-03-10 15:21:26.594144	2026-03-10 15:21:26.594144
645	\N	s_1773156087017_mchhzu	2026-03-10 15:21:27.024661	2026-03-10 15:21:27.024661
646	\N	s_1773156114936_fxyiq0	2026-03-10 15:21:54.943343	2026-03-10 15:21:54.943343
647	\N	s_1773156116445_tmso0i	2026-03-10 15:21:56.452576	2026-03-10 15:21:56.452576
648	\N	s_1773156116849_8jomh3	2026-03-10 15:21:56.855996	2026-03-10 15:21:56.855996
649	\N	s_1773156758023_ds3i9s	2026-03-10 15:32:38.030455	2026-03-10 15:32:38.030455
650	\N	s_1773156758391_5pjyyg	2026-03-10 15:32:38.398717	2026-03-10 15:32:38.398717
651	\N	s_1773156758710_g7jf0r	2026-03-10 15:32:38.717397	2026-03-10 15:32:38.717397
653	\N	s_1773265898630_zdi004	2026-03-11 21:51:38.637373	2026-03-11 21:51:38.637373
652	\N	s_1773265898630_iq4bv1	2026-03-11 21:51:38.637659	2026-03-11 21:51:38.637659
654	\N	s_1773265899013_8ol7rt	2026-03-11 21:51:39.02084	2026-03-11 21:51:39.02084
655	\N	s_1773265899049_pjzy75	2026-03-11 21:51:39.056291	2026-03-11 21:51:39.056291
656	\N	s_1773265899128_8m7ml4	2026-03-11 21:51:39.135767	2026-03-11 21:51:39.135767
657	\N	s_1773265899151_wvbus5	2026-03-11 21:51:39.158619	2026-03-11 21:51:39.158619
658	\N	s_1773265899226_9cg2b6	2026-03-11 21:51:39.233536	2026-03-11 21:51:39.233536
659	\N	s_1773265899270_dmy0l4	2026-03-11 21:51:39.277492	2026-03-11 21:51:39.277492
660	\N	s_1773322347560_lmqm6k	2026-03-12 13:32:27.567995	2026-03-12 13:32:27.567995
661	\N	s_1773322347561_lo1i91	2026-03-12 13:32:27.56903	2026-03-12 13:32:27.56903
662	\N	s_1773322347561_7nqkb3	2026-03-12 13:32:27.568942	2026-03-12 13:32:27.568942
663	\N	s_1773322348213_b2n2hc	2026-03-12 13:32:28.221067	2026-03-12 13:32:28.221067
664	\N	s_1773322424452_j0p4ph	2026-03-12 13:33:44.459737	2026-03-12 13:33:44.459737
665	\N	s_1773322427395_opt0j8	2026-03-12 13:33:47.40325	2026-03-12 13:33:47.40325
666	\N	s_1773322532910_hd97d4	2026-03-12 13:35:32.917712	2026-03-12 13:35:32.917712
667	\N	s_1773322533466_b1hohi	2026-03-12 13:35:33.473732	2026-03-12 13:35:33.473732
668	\N	s_1773322543761_m3jw7o	2026-03-12 13:35:43.768669	2026-03-12 13:35:43.768669
669	\N	s_1773322545237_cqb0tq	2026-03-12 13:35:45.244449	2026-03-12 13:35:45.244449
670	\N	s_1773322552275_vdnva2	2026-03-12 13:35:52.281694	2026-03-12 13:35:52.281694
671	\N	s_1773322553919_jpyk6c	2026-03-12 13:35:53.925993	2026-03-12 13:35:53.925993
672	\N	s_1773322873664_3hdrc0	2026-03-12 13:41:13.671609	2026-03-12 13:41:13.671609
673	\N	s_1773322953502_94eczu	2026-03-12 13:42:33.515133	2026-03-12 13:42:33.515133
674	\N	s_1773323185534_odxpwa	2026-03-12 13:46:25.541225	2026-03-12 13:46:25.541225
675	\N	s_1773323510089_jx09qt	2026-03-12 13:51:50.095521	2026-03-12 13:51:50.095521
676	\N	s_1773323757386_d7pvo3	2026-03-12 13:55:57.392817	2026-03-12 13:55:57.392817
677	\N	s_1773323807375_pj68v0	2026-03-12 13:56:47.382609	2026-03-12 13:56:47.382609
678	\N	s_1773324002541_ku93ts	2026-03-12 14:00:02.548478	2026-03-12 14:00:02.548478
679	\N	s_1773324022255_ao86vz	2026-03-12 14:00:22.262722	2026-03-12 14:00:22.262722
680	\N	s_1773324022623_9x42x7	2026-03-12 14:00:22.630586	2026-03-12 14:00:22.630586
681	\N	s_1773324023894_eijmwh	2026-03-12 14:00:23.901876	2026-03-12 14:00:23.901876
682	\N	s_1773324024243_18pt72	2026-03-12 14:00:24.250409	2026-03-12 14:00:24.250409
683	\N	s_1773324027531_6y2w0u	2026-03-12 14:00:27.538769	2026-03-12 14:00:27.538769
684	\N	s_1773324027902_orl55z	2026-03-12 14:00:27.909081	2026-03-12 14:00:27.909081
685	\N	s_1773324028787_o18ms2	2026-03-12 14:00:28.79431	2026-03-12 14:00:28.79431
686	\N	s_1773324029824_dyvxs2	2026-03-12 14:00:29.831668	2026-03-12 14:00:29.831668
687	\N	s_1773324055946_ai7yrb	2026-03-12 14:00:55.953073	2026-03-12 14:00:55.953073
688	\N	s_1773324086267_6ovtwu	2026-03-12 14:01:26.27493	2026-03-12 14:01:26.27493
689	\N	s_1773324095442_mg8gtd	2026-03-12 14:01:35.449593	2026-03-12 14:01:35.449593
690	\N	s_1773324095843_1m4yj0	2026-03-12 14:01:35.850604	2026-03-12 14:01:35.850604
691	\N	s_1773324323750_01lu2b	2026-03-12 14:05:23.757877	2026-03-12 14:05:23.757877
692	\N	s_1773324324096_ukj71m	2026-03-12 14:05:24.104293	2026-03-12 14:05:24.104293
693	\N	s_1773324361067_780p9e	2026-03-12 14:06:01.074862	2026-03-12 14:06:01.074862
694	\N	s_1773324703867_t2zmfy	2026-03-12 14:11:43.874036	2026-03-12 14:11:43.874036
695	\N	s_1773324704176_81caai	2026-03-12 14:11:44.183772	2026-03-12 14:11:44.183772
696	\N	s_1773324880649_pzriw8	2026-03-12 14:14:40.65657	2026-03-12 14:14:40.65657
697	\N	s_1773324881032_09kr3j	2026-03-12 14:14:41.03989	2026-03-12 14:14:41.03989
698	\N	s_1773326576414_u2t8uj	2026-03-12 14:42:56.421394	2026-03-12 14:42:56.421394
699	\N	s_1773326576815_70qyt0	2026-03-12 14:42:56.821732	2026-03-12 14:42:56.821732
700	\N	s_1773326715199_wuod5v	2026-03-12 14:45:15.206199	2026-03-12 14:45:15.206199
701	\N	s_1773326715999_ph989j	2026-03-12 14:45:16.006853	2026-03-12 14:45:16.006853
702	\N	s_1773326720207_6fw5nj	2026-03-12 14:45:20.213841	2026-03-12 14:45:20.213841
703	\N	s_1773326720577_wk4su8	2026-03-12 14:45:20.584573	2026-03-12 14:45:20.584573
704	\N	s_1773326720913_spg17z	2026-03-12 14:45:20.920289	2026-03-12 14:45:20.920289
705	\N	s_1773326721260_b0ho1h	2026-03-12 14:45:21.267371	2026-03-12 14:45:21.267371
706	\N	s_1773326873041_wws8bb	2026-03-12 14:47:53.048063	2026-03-12 14:47:53.048063
707	\N	s_1773328443478_wdp8b5mo	2026-03-12 15:14:04.55397	2026-03-12 15:14:04.55397
708	\N	s_1773329736093_qxt3is	2026-03-12 15:35:36.099856	2026-03-12 15:35:36.099856
709	\N	s_1773329918202_74aocv	2026-03-12 15:38:38.209951	2026-03-12 15:38:38.209951
710	\N	s_1773330061285_8hsc44	2026-03-12 15:41:01.292963	2026-03-12 15:41:01.292963
711	\N	s_1773330987736_v2qeuk	2026-03-12 15:56:27.742912	2026-03-12 15:56:27.742912
712	\N	s_1773330992386_9gmhff	2026-03-12 15:56:32.393334	2026-03-12 15:56:32.393334
713	\N	s_1773330993370_5b0qyr	2026-03-12 15:56:33.377634	2026-03-12 15:56:33.377634
714	\N	s_1773330997384_7tf9ff	2026-03-12 15:56:37.413833	2026-03-12 15:56:37.413833
715	\N	s_1773332741750_qwdaj1	2026-03-12 16:25:41.758397	2026-03-12 16:25:41.758397
716	\N	s_1773332850297_99pdz6	2026-03-12 16:27:30.305066	2026-03-12 16:27:30.305066
717	\N	s_1773333993608_e9fl6h	2026-03-12 16:46:33.615809	2026-03-12 16:46:33.615809
718	\N	s_1773333998308_cghkhl	2026-03-12 16:46:38.315172	2026-03-12 16:46:38.315172
719	\N	s_1773333999858_lf8dv1	2026-03-12 16:46:39.865392	2026-03-12 16:46:39.865392
720	\N	s_1773334010776_yptiqm	2026-03-12 16:46:50.783939	2026-03-12 16:46:50.783939
721	\N	s_1773334011567_20uxz5	2026-03-12 16:46:51.574696	2026-03-12 16:46:51.574696
722	\N	s_1773334228133_saep2p	2026-03-12 16:50:28.140037	2026-03-12 16:50:28.140037
723	\N	s_1773341485027_h8vrme	2026-03-12 18:51:25.033298	2026-03-12 18:51:25.033298
724	\N	s_1773341488777_nfzqxv	2026-03-12 18:51:28.782993	2026-03-12 18:51:28.782993
725	\N	s_1773341491763_rw36bo	2026-03-12 18:51:31.768953	2026-03-12 18:51:31.768953
726	\N	s_1773341789542_2uetl7	2026-03-12 18:56:29.548149	2026-03-12 18:56:29.548149
727	\N	s_1773341967266_04wk4s	2026-03-12 18:59:27.272594	2026-03-12 18:59:27.272594
728	\N	s_1773343079003_27kyy6	2026-03-12 19:17:59.009344	2026-03-12 19:17:59.009344
729	\N	s_1773344028094_xp2n9w	2026-03-12 19:33:48.101588	2026-03-12 19:33:48.101588
730	\N	s_1773344032271_drho0d	2026-03-12 19:33:52.278493	2026-03-12 19:33:52.278493
731	\N	s_1773344034889_j9oiku	2026-03-12 19:33:54.895742	2026-03-12 19:33:54.895742
732	\N	s_1773379445931_6mot8i	2026-03-13 05:24:05.938322	2026-03-13 05:24:05.938322
733	\N	s_1773380148243_0cpk31	2026-03-13 05:35:48.250919	2026-03-13 05:35:48.250919
734	\N	s_1773380151103_20stnu	2026-03-13 05:35:51.110459	2026-03-13 05:35:51.110459
735	\N	s_1773380152652_un5g9v	2026-03-13 05:35:52.659298	2026-03-13 05:35:52.659298
736	\N	s_1773380491102_xlczlo	2026-03-13 05:41:31.109511	2026-03-13 05:41:31.109511
737	\N	s_1773380622047_v9m6xe	2026-03-13 05:43:42.054637	2026-03-13 05:43:42.054637
738	\N	s_1773380748481_jnzd0v	2026-03-13 05:45:48.488442	2026-03-13 05:45:48.488442
739	\N	s_1773426086069_q820jb	2026-03-13 18:21:26.076054	2026-03-13 18:21:26.076054
740	\N	s_1773477235882_q5mtx6	2026-03-14 08:33:55.90507	2026-03-14 08:33:55.90507
741	\N	s_1773477236109_fj7qm5	2026-03-14 08:33:56.116647	2026-03-14 08:33:56.116647
742	\N	s_1773743227989_pinu3z	2026-03-17 10:27:07.99632	2026-03-17 10:27:07.99632
743	\N	s_1773743229033_e15eng	2026-03-17 10:27:09.040592	2026-03-17 10:27:09.040592
744	\N	s_1773743229537_jfzqve	2026-03-17 10:27:09.544208	2026-03-17 10:27:09.544208
745	\N	s_1773743230327_ehio12	2026-03-17 10:27:10.33444	2026-03-17 10:27:10.33444
746	\N	s_1773743256606_hhdyi9	2026-03-17 10:27:36.613992	2026-03-17 10:27:36.613992
747	\N	s_1773743257945_bbv31m	2026-03-17 10:27:37.953048	2026-03-17 10:27:37.953048
748	\N	s_1773743694716_ipqprd	2026-03-17 10:34:54.722613	2026-03-17 10:34:54.722613
749	\N	s_1773743757840_2gk0jj	2026-03-17 10:35:57.847198	2026-03-17 10:35:57.847198
750	\N	s_1773744032346_gak43j	2026-03-17 10:40:32.353131	2026-03-17 10:40:32.353131
751	\N	s_1773744046097_q9dugp	2026-03-17 10:40:46.104017	2026-03-17 10:40:46.104017
752	\N	s_1773744046977_d0l4nw	2026-03-17 10:40:46.983826	2026-03-17 10:40:46.983826
753	\N	s_1773744147142_yltmgt	2026-03-17 10:42:27.148515	2026-03-17 10:42:27.148515
754	\N	s_1773745814524_qjjzrt	2026-03-17 11:10:14.551221	2026-03-17 11:10:14.551221
755	\N	s_1773745814562_q3cpsf	2026-03-17 11:10:14.579453	2026-03-17 11:10:14.579453
756	\N	s_1773745814631_6focog	2026-03-17 11:10:14.648685	2026-03-17 11:10:14.648685
757	\N	s_1773745814839_ddbfpq	2026-03-17 11:10:14.87386	2026-03-17 11:10:14.87386
758	\N	s_1773745814845_5nvfvm	2026-03-17 11:10:14.874665	2026-03-17 11:10:14.874665
759	\N	s_1773745814977_7kce58	2026-03-17 11:10:14.993874	2026-03-17 11:10:14.993874
760	\N	s_1773745814985_5mmp16	2026-03-17 11:10:15.0029	2026-03-17 11:10:15.0029
761	\N	s_1773745815072_igzbcf	2026-03-17 11:10:15.089418	2026-03-17 11:10:15.089418
762	\N	s_1773745815218_3k2fxt	2026-03-17 11:10:15.235896	2026-03-17 11:10:15.235896
763	\N	s_1773745815547_0bwsq9	2026-03-17 11:10:15.564745	2026-03-17 11:10:15.564745
764	\N	s_1773745815870_wykefd	2026-03-17 11:10:15.888238	2026-03-17 11:10:15.888238
765	\N	s_1773745816368_v4343q	2026-03-17 11:10:16.385769	2026-03-17 11:10:16.385769
766	\N	s_1773745816681_hei7fv	2026-03-17 11:10:16.698553	2026-03-17 11:10:16.698553
767	\N	s_1773745816998_izth6l	2026-03-17 11:10:17.015708	2026-03-17 11:10:17.015708
768	\N	s_1773745817342_uxb5sc	2026-03-17 11:10:17.360969	2026-03-17 11:10:17.360969
769	\N	s_1773745817653_8lscp9	2026-03-17 11:10:17.670558	2026-03-17 11:10:17.670558
770	\N	s_1773745817972_1l442k	2026-03-17 11:10:17.989996	2026-03-17 11:10:17.989996
771	\N	s_1773745818315_zcovad	2026-03-17 11:10:18.332449	2026-03-17 11:10:18.332449
772	\N	s_1773745818653_xukp0x	2026-03-17 11:10:18.670398	2026-03-17 11:10:18.670398
773	\N	s_1773745818970_cp0aa9	2026-03-17 11:10:18.988056	2026-03-17 11:10:18.988056
774	\N	s_1773745926631_dsq88m	2026-03-17 11:12:06.648691	2026-03-17 11:12:06.648691
775	\N	s_1773745927403_9gs20t	2026-03-17 11:12:07.420367	2026-03-17 11:12:07.420367
776	\N	s_1773745927734_zkurmt	2026-03-17 11:12:07.75145	2026-03-17 11:12:07.75145
777	\N	s_1773746080339_03jr4h	2026-03-17 11:14:40.347269	2026-03-17 11:14:40.347269
778	\N	s_1773746080708_y3d5br	2026-03-17 11:14:40.716308	2026-03-17 11:14:40.716308
779	\N	s_1773746086943_nrg8ph	2026-03-17 11:14:46.951254	2026-03-17 11:14:46.951254
780	\N	s_1773746087294_xt0na7	2026-03-17 11:14:47.301998	2026-03-17 11:14:47.301998
781	\N	s_1773746092289_c3srfi	2026-03-17 11:14:52.297185	2026-03-17 11:14:52.297185
782	\N	s_1773746092721_swj2gf	2026-03-17 11:14:52.729245	2026-03-17 11:14:52.729245
783	\N	s_1773746093080_0yat26	2026-03-17 11:14:53.08819	2026-03-17 11:14:53.08819
784	\N	s_1773746093547_1mnkhk	2026-03-17 11:14:53.554947	2026-03-17 11:14:53.554947
785	\N	s_1773746100469_e8c0rv	2026-03-17 11:15:00.476527	2026-03-17 11:15:00.476527
786	\N	s_1773746100819_u1y3gi	2026-03-17 11:15:00.826842	2026-03-17 11:15:00.826842
787	\N	s_1773746118769_1l4jg6	2026-03-17 11:15:18.777066	2026-03-17 11:15:18.777066
788	\N	s_1773746119546_xl9e1q	2026-03-17 11:15:19.55353	2026-03-17 11:15:19.55353
789	\N	s_1773746180465_0hlo86	2026-03-17 11:16:20.473623	2026-03-17 11:16:20.473623
790	\N	s_1773746228088_204fjp	2026-03-17 11:17:08.095159	2026-03-17 11:17:08.095159
791	\N	s_1773746375456_mq3lrw	2026-03-17 11:19:35.463756	2026-03-17 11:19:35.463756
792	\N	s_1773746375804_ixz3oz	2026-03-17 11:19:35.81212	2026-03-17 11:19:35.81212
793	\N	s_1773746534488_zbwhjp	2026-03-17 11:22:14.495709	2026-03-17 11:22:14.495709
794	\N	s_1773746534887_9rss2v	2026-03-17 11:22:14.894472	2026-03-17 11:22:14.894472
795	\N	s_1773746721618_sgdonm	2026-03-17 11:25:21.625945	2026-03-17 11:25:21.625945
796	\N	s_1773746721954_lewwa9	2026-03-17 11:25:21.962622	2026-03-17 11:25:21.962622
797	\N	s_1773746906239_4oucox	2026-03-17 11:28:26.246288	2026-03-17 11:28:26.246288
798	\N	s_1773746936971_xkvdws	2026-03-17 11:28:56.97851	2026-03-17 11:28:56.97851
799	\N	s_1773747254364_h3prr2	2026-03-17 11:34:14.371571	2026-03-17 11:34:14.371571
800	\N	s_1773747279079_1ah399	2026-03-17 11:34:39.087198	2026-03-17 11:34:39.087198
801	\N	s_1773747284087_wxz7p5	2026-03-17 11:34:44.095255	2026-03-17 11:34:44.095255
802	\N	s_1773747284491_3tch5n	2026-03-17 11:34:44.499227	2026-03-17 11:34:44.499227
803	\N	s_1773747299275_fvomqx	2026-03-17 11:34:59.282223	2026-03-17 11:34:59.282223
804	\N	s_1773747351630_8x5elj	2026-03-17 11:35:51.647278	2026-03-17 11:35:51.647278
805	\N	s_1773747358575_t32zy5	2026-03-17 11:35:58.598917	2026-03-17 11:35:58.598917
806	\N	s_1773747359486_y5phau	2026-03-17 11:35:59.502548	2026-03-17 11:35:59.502548
807	\N	s_1773747361233_u0pfoj	2026-03-17 11:36:01.249296	2026-03-17 11:36:01.249296
808	\N	s_1773747614729_c99ham	2026-03-17 11:40:14.745335	2026-03-17 11:40:14.745335
809	\N	s_1773747615059_0w694r	2026-03-17 11:40:15.075138	2026-03-17 11:40:15.075138
810	\N	s_1773747930804_dqjkxd	2026-03-17 11:45:30.821391	2026-03-17 11:45:30.821391
811	\N	s_1773747931231_f4hubb	2026-03-17 11:45:31.248061	2026-03-17 11:45:31.248061
812	\N	s_1773747964932_yosizq	2026-03-17 11:46:04.949596	2026-03-17 11:46:05.022131
813	\N	s_1773747976913_ene23c	2026-03-17 11:46:16.930054	2026-03-17 11:46:16.996527
814	\N	s_1773747980413_f63nn6	2026-03-17 11:46:20.430742	2026-03-17 11:46:20.430742
815	\N	s_1773747981226_s1b3hk	2026-03-17 11:46:21.243527	2026-03-17 11:46:21.243527
816	\N	s_1773748006233_009xqk	2026-03-17 11:46:46.249419	2026-03-17 11:46:46.249419
817	\N	s_1773748051446_iwlspl	2026-03-17 11:47:31.46366	2026-03-17 11:47:31.46366
818	\N	s_1773748054053_lxj93w	2026-03-17 11:47:34.068868	2026-03-17 11:47:34.068868
819	\N	s_1773748064305_z5pdhw	2026-03-17 11:47:44.322639	2026-03-17 11:47:44.322639
820	\N	s_1773748077084_kmhlpg	2026-03-17 11:47:57.101164	2026-03-17 11:47:57.101164
821	\N	s_1773748077432_3jlj03	2026-03-17 11:47:57.448559	2026-03-17 11:47:57.448559
822	\N	s_1773748233856_jswo2z	2026-03-17 11:50:33.873172	2026-03-17 11:50:33.873172
823	\N	s_1773748243552_s3t6uu	2026-03-17 11:50:43.569155	2026-03-17 11:50:43.569155
824	\N	s_1773748249004_2jbe5d	2026-03-17 11:50:49.020767	2026-03-17 11:50:49.020767
834	\N	s_1773748697966_zsqqfp	2026-03-17 11:58:17.983027	2026-03-17 11:58:17.983027
835	\N	s_1773748698364_fgs5ak	2026-03-17 11:58:18.380324	2026-03-17 11:58:18.380324
825	\N	s_1773748294565_s4rxmk	2026-03-17 11:51:34.582027	2026-03-17 11:51:34.582027
826	\N	s_1773748322203_s0qnbr	2026-03-17 11:52:02.219225	2026-03-17 11:52:02.219225
827	\N	s_1773748396838_qdq26g	2026-03-17 11:53:16.854778	2026-03-17 11:53:16.854778
828	\N	s_1773748481693_r59bmv	2026-03-17 11:54:41.709353	2026-03-17 11:54:41.709353
829	\N	s_1773748529041_8rcfsx	2026-03-17 11:55:29.057493	2026-03-17 11:55:29.057493
830	\N	s_1773748537618_bfy6w7	2026-03-17 11:55:37.635061	2026-03-17 11:55:37.635061
831	\N	s_1773748558934_nanafk	2026-03-17 11:55:58.95101	2026-03-17 11:55:58.95101
832	\N	s_1773748564547_g5qknb	2026-03-17 11:56:04.564126	2026-03-17 11:56:04.564126
833	\N	s_1773748570215_piatdr	2026-03-17 11:56:10.231564	2026-03-17 11:56:10.231564
837	\N	s_1773756270093_nui8j7	2026-03-17 14:04:30.100133	2026-03-17 14:04:30.100133
836	\N	s_1773756270092_j1nlkj	2026-03-17 14:04:30.099905	2026-03-17 14:04:30.099905
838	\N	s_1773756270280_e91izk	2026-03-17 14:04:30.287522	2026-03-17 14:04:30.287522
839	\N	s_1773756270709_vllcab	2026-03-17 14:04:30.716515	2026-03-17 14:04:30.716515
840	\N	s_1773759421495_7end89	2026-03-17 14:57:01.500422	2026-03-17 14:57:01.500422
841	\N	s_1773759421992_v0put7	2026-03-17 14:57:01.998241	2026-03-17 14:57:01.998241
842	\N	s_1773759424551_3sq7g6	2026-03-17 14:57:04.5571	2026-03-17 14:57:04.5571
843	\N	s_1773759424931_b6kykl	2026-03-17 14:57:04.93708	2026-03-17 14:57:04.93708
844	\N	s_1773759425438_673uey	2026-03-17 14:57:05.443991	2026-03-17 14:57:05.443991
845	\N	s_1773759425894_1zld4w	2026-03-17 14:57:05.899408	2026-03-17 14:57:05.899408
846	\N	s_1773759455706_zh7d3l	2026-03-17 14:57:35.712054	2026-03-17 14:57:35.712054
847	\N	s_1773759459599_xp0cii	2026-03-17 14:57:39.604397	2026-03-17 14:57:39.604397
848	\N	s_1773759466403_9kct0u	2026-03-17 14:57:46.408981	2026-03-17 14:57:46.408981
849	\N	s_1773759507067_maq8t9	2026-03-17 14:58:27.073009	2026-03-17 14:58:27.073009
850	\N	s_1773759629872_tw4e3v	2026-03-17 15:00:29.878086	2026-03-17 15:00:29.878086
851	\N	s_1773843524878_6d529a	2026-03-18 14:18:44.885862	2026-03-18 14:18:44.885862
852	\N	s_1773843525255_nsc8q8	2026-03-18 14:18:45.262396	2026-03-18 14:18:45.262396
853	\N	s_1773843525289_lwcos5	2026-03-18 14:18:45.296681	2026-03-18 14:18:45.296681
854	\N	s_1773843525446_ne8h1a	2026-03-18 14:18:45.453008	2026-03-18 14:18:45.453008
855	\N	s_1773844304372_tb16cu	2026-03-18 14:31:44.380053	2026-03-18 14:31:44.380053
856	\N	s_1773844304782_lmtw84	2026-03-18 14:31:44.790097	2026-03-18 14:31:44.790097
857	\N	s_1773844305157_efc6d9	2026-03-18 14:31:45.164981	2026-03-18 14:31:45.164981
858	\N	s_1773844305499_3c8bq6	2026-03-18 14:31:45.506123	2026-03-18 14:31:45.506123
859	\N	s_1773845889818_7rt5w3	2026-03-18 14:58:09.825888	2026-03-18 14:58:09.825888
860	\N	s_1773845890125_scjkge	2026-03-18 14:58:10.133285	2026-03-18 14:58:10.133285
861	\N	s_1773845890126_ug7367	2026-03-18 14:58:10.133779	2026-03-18 14:58:10.133779
862	\N	s_1773845890360_6jr7gk	2026-03-18 14:58:10.367736	2026-03-18 14:58:10.367736
863	\N	s_1773846561881_kq4ib7	2026-03-18 15:09:21.889821	2026-03-18 15:09:21.889821
864	\N	s_1773846562882_n30nqr	2026-03-18 15:09:22.890264	2026-03-18 15:09:22.890264
865	\N	s_1773847912257_iwz7xz	2026-03-18 15:31:52.26508	2026-03-18 15:31:52.26508
866	\N	s_1773847912655_5cix82	2026-03-18 15:31:52.663044	2026-03-18 15:31:52.663044
867	\N	s_1773911885616_fug241	2026-03-19 09:18:05.624534	2026-03-19 09:18:05.624534
868	\N	s_1773911885794_vi62oj	2026-03-19 09:18:05.801874	2026-03-19 09:18:05.801874
869	\N	s_1773911958371_ex65sl	2026-03-19 09:19:18.378412	2026-03-19 09:19:18.378412
870	\N	s_1773911958982_zgd5si	2026-03-19 09:19:18.989804	2026-03-19 09:19:18.989804
871	\N	s_1773911959832_myxpzy	2026-03-19 09:19:19.839859	2026-03-19 09:19:19.839859
872	\N	s_1774261815981_5hcch1	2026-03-23 10:30:15.990526	2026-03-23 10:30:15.990526
873	\N	s_1774261816037_x12jyk	2026-03-23 10:30:16.04668	2026-03-23 10:30:16.04668
874	\N	s_1774261816401_suktiq	2026-03-23 10:30:16.411113	2026-03-23 10:30:16.411113
876	\N	s_1774632835074_dxiygovf	2026-03-27 17:33:55.88635	2026-03-27 17:33:55.88635
875	\N	s_1774632835074_dxiygovf	2026-03-27 17:33:55.885691	2026-03-27 17:33:55.885691
877	\N	s_1774632835097_1t85tdac	2026-03-27 17:33:55.887617	2026-03-27 17:33:55.887617
878	\N	s_1774632835097_1t85tdac	2026-03-27 17:33:55.900024	2026-03-27 17:33:55.900024
879	\N	s_1774632835097_1t85tdac	2026-03-27 17:33:55.900353	2026-03-27 17:33:55.900353
880	\N	s_1774632835097_1t85tdac	2026-03-27 17:33:55.914615	2026-03-27 17:33:55.914615
881	\N	s_1774679762221_q9fxc4	2026-03-28 06:36:02.229011	2026-03-28 06:36:02.229011
882	\N	s_1774679762832_4eqx4n	2026-03-28 06:36:02.843762	2026-03-28 06:36:02.843762
883	\N	s_1774679762855_93xiiw	2026-03-28 06:36:02.863069	2026-03-28 06:36:02.863069
884	\N	s_1774679762856_d7m5f7	2026-03-28 06:36:02.863444	2026-03-28 06:36:02.863444
886	\N	s_1774692800678_sxj3dm	2026-03-28 10:13:20.685974	2026-03-28 10:13:20.685974
885	\N	s_1774692800678_t8eb8a	2026-03-28 10:13:20.685575	2026-03-28 10:13:20.685575
887	\N	s_1774692800889_lzlzfy	2026-03-28 10:13:20.896815	2026-03-28 10:13:20.896815
888	\N	s_1774692800890_1164lm	2026-03-28 10:13:20.897366	2026-03-28 10:13:20.897366
889	\N	s_1774692801149_szo6tx	2026-03-28 10:13:21.156935	2026-03-28 10:13:21.156935
890	\N	s_1774692801185_fecvnd	2026-03-28 10:13:21.192454	2026-03-28 10:13:21.192454
891	\N	s_1774693032854_szdttv	2026-03-28 10:17:12.862055	2026-03-28 10:17:12.862055
892	\N	s_1774693033194_bwnwl0	2026-03-28 10:17:13.202202	2026-03-28 10:17:13.202202
893	\N	s_1774693033534_g2sg7s	2026-03-28 10:17:13.541144	2026-03-28 10:17:13.541144
894	\N	s_1774693033860_6psf1c	2026-03-28 10:17:13.867412	2026-03-28 10:17:13.867412
895	\N	s_1774693334012_or7ejplw	2026-03-28 10:22:14.692763	2026-03-28 10:22:14.692763
896	\N	s_1774693334012_or7ejplw	2026-03-28 10:22:14.693194	2026-03-28 10:22:14.693194
897	\N	s_1774693333800_rnuwedvo	2026-03-28 10:22:14.777299	2026-03-28 10:22:14.777299
898	\N	s_1774693333800_rnuwedvo	2026-03-28 10:22:14.779184	2026-03-28 10:22:14.779184
899	\N	s_1774693334012_or7ejplw	2026-03-28 10:22:14.780071	2026-03-28 10:22:14.780071
900	\N	s_1774693334012_or7ejplw	2026-03-28 10:22:14.782212	2026-03-28 10:22:14.782212
901	\N	s_1774723017658_o2o87o	2026-03-28 18:36:57.666964	2026-03-28 18:36:57.666964
902	\N	s_1774723017670_lyvrtu	2026-03-28 18:36:57.677441	2026-03-28 18:36:57.677441
903	\N	s_1774723018392_livz0f	2026-03-28 18:36:58.399855	2026-03-28 18:36:58.399855
904	\N	s_1774723018393_4buc0r	2026-03-28 18:36:58.401224	2026-03-28 18:36:58.401224
905	\N	s_1774888793289_yrbv19	2026-03-30 16:39:53.296264	2026-03-30 16:39:53.296264
906	\N	s_1774888793497_6104jb	2026-03-30 16:39:53.504874	2026-03-30 16:39:53.504874
907	\N	s_1774888793902_yd5y8c	2026-03-30 16:39:53.912553	2026-03-30 16:39:53.912553
908	\N	s_1774888793904_e7jpw2	2026-03-30 16:39:53.912856	2026-03-30 16:39:53.912856
909	\N	s_1774888905189_r22ghi	2026-03-30 16:41:45.19716	2026-03-30 16:41:45.19716
910	\N	s_1774888906012_vkyyli	2026-03-30 16:41:46.020669	2026-03-30 16:41:46.020669
911	\N	s_1774888909873_cab3mm	2026-03-30 16:41:49.883021	2026-03-30 16:41:49.883021
912	\N	s_1774888910239_v0m0o0	2026-03-30 16:41:50.247077	2026-03-30 16:41:50.247077
913	\N	s_1774888912579_xncyk2	2026-03-30 16:41:52.587302	2026-03-30 16:41:52.587302
914	\N	s_1774888912954_y8ppfz	2026-03-30 16:41:52.96192	2026-03-30 16:41:52.96192
915	\N	s_1774888915152_7pp2cl	2026-03-30 16:41:55.160531	2026-03-30 16:41:55.160531
916	\N	s_1774888915516_sim68u	2026-03-30 16:41:55.524366	2026-03-30 16:41:55.524366
917	\N	s_1774888918529_u66oca	2026-03-30 16:41:58.537547	2026-03-30 16:41:58.537547
918	\N	s_1774888918866_zfj89k	2026-03-30 16:41:58.873902	2026-03-30 16:41:58.873902
919	\N	s_1774889010677_0hk8wo	2026-03-30 16:43:30.684849	2026-03-30 16:43:30.684849
920	\N	s_1774889014163_d0mtqs	2026-03-30 16:43:34.170481	2026-03-30 16:43:34.170481
921	\N	s_1774889047095_9a2wrb	2026-03-30 16:44:07.102778	2026-03-30 16:44:07.102778
922	\N	s_1774889047534_tdsvdo	2026-03-30 16:44:07.541407	2026-03-30 16:44:07.541407
923	\N	s_1774889058660_y8ctna	2026-03-30 16:44:18.668419	2026-03-30 16:44:18.668419
924	\N	s_1774889058997_j4h5ak	2026-03-30 16:44:19.005344	2026-03-30 16:44:19.005344
925	\N	s_1774889108213_rdzg6m	2026-03-30 16:45:08.220945	2026-03-30 16:45:08.220945
926	\N	s_1774889113710_5hcrr9	2026-03-30 16:45:13.717307	2026-03-30 16:45:13.717307
927	\N	s_1774889116425_k4yqzh	2026-03-30 16:45:16.432207	2026-03-30 16:45:16.432207
928	\N	s_1774889116813_29spie	2026-03-30 16:45:16.820194	2026-03-30 16:45:16.820194
929	\N	s_1774889174571_d4gorj	2026-03-30 16:46:14.578766	2026-03-30 16:46:14.578766
930	\N	s_1774889194571_1vab05	2026-03-30 16:46:34.579185	2026-03-30 16:46:34.579185
931	\N	s_1774889228421_fhwxro	2026-03-30 16:47:08.42887	2026-03-30 16:47:08.42887
932	\N	s_1774889228422_erxq5l	2026-03-30 16:47:08.429289	2026-03-30 16:47:08.429289
933	\N	s_1774889265098_7dcipf	2026-03-30 16:47:45.105942	2026-03-30 16:47:45.105942
934	\N	s_1774889265099_h1k7vz	2026-03-30 16:47:45.106766	2026-03-30 16:47:45.106766
943	\N	s_1774889462134_lgknt9	2026-03-30 16:51:02.141253	2026-03-30 16:51:02.141253
945	\N	s_1774889473658_m98avv	2026-03-30 16:51:13.665492	2026-03-30 16:51:13.665492
946	\N	s_1774889473686_23gxbx	2026-03-30 16:51:13.693091	2026-03-30 16:51:13.693091
947	\N	s_1774889499644_trp7l4	2026-03-30 16:51:39.651695	2026-03-30 16:51:39.651695
948	\N	s_1774889499657_d786yc	2026-03-30 16:51:39.666184	2026-03-30 16:51:39.666184
949	\N	s_1774889519925_fdni2f	2026-03-30 16:51:59.932474	2026-03-30 16:51:59.932474
950	\N	s_1774889519952_1wbs4h	2026-03-30 16:51:59.960625	2026-03-30 16:51:59.960625
951	\N	s_1774889619015_5zukrr	2026-03-30 16:53:39.023143	2026-03-30 16:53:39.023143
952	\N	s_1774889619026_steslh	2026-03-30 16:53:39.034248	2026-03-30 16:53:39.034248
935	\N	s_1774889376523_dwtxil	2026-03-30 16:49:36.530398	2026-03-30 16:49:36.530398
936	\N	s_1774889376534_7kc2bd	2026-03-30 16:49:36.542081	2026-03-30 16:49:36.542081
937	\N	s_1774889397512_6j8ucy	2026-03-30 16:49:57.519439	2026-03-30 16:49:57.519439
938	\N	s_1774889399415_nxfsj0	2026-03-30 16:49:59.422344	2026-03-30 16:49:59.422344
939	\N	s_1774889408866_64qq7a	2026-03-30 16:50:08.873472	2026-03-30 16:50:08.873472
940	\N	s_1774889408976_totbkx	2026-03-30 16:50:08.982907	2026-03-30 16:50:08.982907
941	\N	s_1774889431158_oftdbg	2026-03-30 16:50:31.1657	2026-03-30 16:50:31.1657
942	\N	s_1774889431162_o6u2hm	2026-03-30 16:50:31.170544	2026-03-30 16:50:31.170544
944	\N	s_1774889462134_icct7c	2026-03-30 16:51:02.14153	2026-03-30 16:51:02.14153
954	\N	s_1774981403163_gvbo9n	2026-03-31 18:23:23.196861	2026-03-31 18:23:23.196861
955	\N	s_1774981403209_3p0jpr	2026-03-31 18:23:23.240324	2026-03-31 18:23:23.240324
953	\N	s_1774981403163_0zm0rp	2026-03-31 18:23:23.197456	2026-03-31 18:23:23.197456
956	\N	s_1774981403458_y06q0h	2026-03-31 18:23:23.482539	2026-03-31 18:23:23.482539
957	\N	s_1774981403458_0ns2jo	2026-03-31 18:23:23.483186	2026-03-31 18:23:23.483186
958	\N	s_1774981403537_asivq7	2026-03-31 18:23:23.543243	2026-03-31 18:23:23.543243
959	\N	s_1774981403536_9ukj84	2026-03-31 18:23:23.543038	2026-03-31 18:23:23.543038
960	\N	s_1774981403720_mxn1sl	2026-03-31 18:23:23.727021	2026-03-31 18:23:23.727021
961	\N	s_1775042210434_mow6d6	2026-04-01 11:16:50.441003	2026-04-01 11:16:50.441003
962	\N	s_1775042211058_v3vc4p	2026-04-01 11:16:51.065828	2026-04-01 11:16:51.065828
963	\N	s_1775042211410_7ot9om	2026-04-01 11:16:51.417487	2026-04-01 11:16:51.417487
964	\N	s_1775042211775_6cpr9w	2026-04-01 11:16:51.78198	2026-04-01 11:16:51.78198
965	\N	s_1775042212144_szm1g0	2026-04-01 11:16:52.151327	2026-04-01 11:16:52.151327
966	\N	s_1775042212498_c6fjly	2026-04-01 11:16:52.506271	2026-04-01 11:16:52.506271
967	\N	s_1775042329308_ezi5zx	2026-04-01 11:18:49.314554	2026-04-01 11:18:49.314554
968	\N	s_1775042329658_f02ewd	2026-04-01 11:18:49.664508	2026-04-01 11:18:49.664508
969	\N	s_1775042331031_f6fomh	2026-04-01 11:18:51.037785	2026-04-01 11:18:51.037785
970	\N	s_1775042525335_zj0lz2	2026-04-01 11:22:05.342805	2026-04-01 11:22:05.342805
971	\N	s_1775042525671_m620js	2026-04-01 11:22:05.678308	2026-04-01 11:22:05.678308
972	\N	s_1775042526017_gql58i	2026-04-01 11:22:06.024363	2026-04-01 11:22:06.024363
973	\N	s_1775042564256_ayh2y1	2026-04-01 11:22:44.263882	2026-04-01 11:22:44.263882
974	\N	s_1775042564600_m3o2dr	2026-04-01 11:22:44.610978	2026-04-01 11:22:44.610978
975	\N	s_1775042564954_476y5v	2026-04-01 11:22:44.962339	2026-04-01 11:22:44.962339
976	\N	s_1775042565298_ladh8z	2026-04-01 11:22:45.305988	2026-04-01 11:22:45.305988
977	\N	s_1775042565659_pz7dus	2026-04-01 11:22:45.666639	2026-04-01 11:22:45.666639
978	\N	s_1775042565999_704a5i	2026-04-01 11:22:46.007139	2026-04-01 11:22:46.007139
979	\N	s_1775042566343_lvqsvs	2026-04-01 11:22:46.350415	2026-04-01 11:22:46.350415
980	\N	s_1775042566697_dnudp8	2026-04-01 11:22:46.704919	2026-04-01 11:22:46.704919
981	\N	s_1775042567051_5c9pf4	2026-04-01 11:22:47.059037	2026-04-01 11:22:47.059037
982	\N	s_1775042567404_t2qzkk	2026-04-01 11:22:47.412421	2026-04-01 11:22:47.412421
983	\N	s_1775043703896_ym7pe3nl	2026-04-01 11:41:44.861136	2026-04-01 11:41:44.861136
984	\N	s_1775043704449_yn5ue80f	2026-04-01 11:41:44.961756	2026-04-01 11:41:44.961756
985	\N	s_1775043703896_ym7pe3nl	2026-04-01 11:41:44.961582	2026-04-01 11:41:44.961582
986	\N	s_1775043804770_4zpzv0	2026-04-01 11:43:24.777059	2026-04-01 11:43:24.777059
987	\N	s_1775043805118_622aay	2026-04-01 11:43:25.125208	2026-04-01 11:43:25.125208
988	\N	s_1775043809904_bza9p0	2026-04-01 11:43:29.911738	2026-04-01 11:43:29.911738
989	\N	s_1775043810842_qbhyxu	2026-04-01 11:43:30.849616	2026-04-01 11:43:30.849616
990	\N	s_1775109235534_ymj2do	2026-04-02 05:53:55.541008	2026-04-02 05:53:55.541008
991	\N	s_1775109235794_kmam5y	2026-04-02 05:53:55.801887	2026-04-02 05:53:55.801887
992	\N	s_1775109235927_ctd4n0	2026-04-02 05:53:55.934243	2026-04-02 05:53:55.934243
993	\N	s_1775109236027_mdx4pc	2026-04-02 05:53:56.034373	2026-04-02 05:53:56.034373
994	\N	s_1775109236054_ezh3wh	2026-04-02 05:53:56.061016	2026-04-02 05:53:56.061016
995	\N	s_1775109236190_907p1y	2026-04-02 05:53:56.197387	2026-04-02 05:53:56.197387
996	\N	s_1775109236193_ycltct	2026-04-02 05:53:56.200008	2026-04-02 05:53:56.200008
997	\N	s_1775130085885_ihcr5e	2026-04-02 11:41:25.892194	2026-04-02 11:41:25.892194
998	\N	s_1775130086617_be3wi6	2026-04-02 11:41:26.624349	2026-04-02 11:41:26.624349
999	\N	s_1775130086940_yfea3a	2026-04-02 11:41:26.94709	2026-04-02 11:41:26.94709
1000	\N	s_1775130087295_ytl1gp	2026-04-02 11:41:27.302868	2026-04-02 11:41:27.302868
1001	\N	s_1775132834159_q5ao9k	2026-04-02 12:27:14.166592	2026-04-02 12:27:14.166592
1002	\N	s_1775132834533_rsdnzq	2026-04-02 12:27:14.540363	2026-04-02 12:27:14.540363
1003	\N	s_1775132838960_19gaqa	2026-04-02 12:27:18.967685	2026-04-02 12:27:18.967685
1004	\N	s_1775132840129_e1glds	2026-04-02 12:27:20.136248	2026-04-02 12:27:20.136248
1005	\N	s_1775132840448_48l34o	2026-04-02 12:27:20.455464	2026-04-02 12:27:20.455464
1006	\N	s_1775155343040_z40jwy	2026-04-02 18:42:23.051834	2026-04-02 18:42:23.051834
1007	\N	s_1775155345144_v03h8f	2026-04-02 18:42:25.152301	2026-04-02 18:42:25.152301
1008	\N	s_1775155353919_ngqzp3	2026-04-02 18:42:33.926399	2026-04-02 18:42:33.926399
1009	\N	s_1775155355615_kylfef	2026-04-02 18:42:35.622257	2026-04-02 18:42:35.622257
1010	\N	s_1775155357302_un11b7	2026-04-02 18:42:37.309858	2026-04-02 18:42:37.309858
1011	\N	s_1775284783169_3kepv2	2026-04-04 06:39:43.176083	2026-04-04 06:39:43.176083
1012	\N	s_1775285572506_vk69wq	2026-04-04 06:52:52.51323	2026-04-04 06:52:52.51323
1013	\N	s_1775290574033_dyme3v	2026-04-04 08:16:14.040091	2026-04-04 08:16:14.040091
1014	\N	s_1775290574079_2cbtvg	2026-04-04 08:16:14.086047	2026-04-04 08:16:14.086047
1015	\N	s_1775290574143_tmmcu3	2026-04-04 08:16:14.149824	2026-04-04 08:16:14.149824
1016	\N	s_1775290574415_629w8n	2026-04-04 08:16:14.422047	2026-04-04 08:16:14.422047
1017	\N	s_1775324088668_4730i5	2026-04-04 17:34:48.674921	2026-04-04 17:34:48.674921
1018	\N	s_1775324088995_qhv2ij	2026-04-04 17:34:49.002446	2026-04-04 17:34:49.002446
1019	\N	s_1775469625996_lfblukix	2026-04-06 10:00:26.524646	2026-04-06 10:00:26.524646
1020	\N	s_1775469626414_fd59h69w	2026-04-06 10:00:26.624913	2026-04-06 10:00:26.624913
1021	\N	s_1775474026646_mel2ds	2026-04-06 11:13:46.654567	2026-04-06 11:13:46.654567
1022	\N	s_1775896626560_bm3d78	2026-04-11 08:37:06.568249	2026-04-11 08:37:06.568249
1023	\N	s_1775896633384_c7txbx	2026-04-11 08:37:13.391265	2026-04-11 08:37:13.391265
1024	\N	s_1776188447980_ubenvksi	2026-04-14 17:40:49.823494	2026-04-14 17:40:49.823494
1025	\N	s_1776265324427_9mn1b7hs	2026-04-15 15:02:06.809811	2026-04-15 15:02:06.809811
1026	\N	s_1776265325677_6wfsvfxi	2026-04-15 15:02:07.098208	2026-04-15 15:02:07.098208
1027	\N	s_1776277735565_ykdevkqb	2026-04-15 18:28:57.471008	2026-04-15 18:28:57.471008
1028	\N	s_1776789830722_77y6w8dc	2026-04-21 16:43:51.74282	2026-04-21 16:43:51.74282
1029	\N	s_1776789830786_q6ho2oc3	2026-04-21 16:43:51.743052	2026-04-21 16:43:51.743052
1032	\N	s_1776927670655_n5gi70wp	2026-04-23 07:01:11.99121	2026-04-23 07:01:11.99121
1031	\N	s_1776927671086_p4z9aplt	2026-04-23 07:01:11.980943	2026-04-23 07:01:11.980943
1030	\N	s_1776927670655_n5gi70wp	2026-04-23 07:01:11.982058	2026-04-23 07:01:11.982058
1035	\N	s_1776928129897_qktleaqw	2026-04-23 07:08:51.483445	2026-04-23 07:08:51.483445
1036	\N	s_1776928129980_d8dzdg69	2026-04-23 07:08:51.483824	2026-04-23 07:08:51.483824
1034	\N	s_1776928129980_d8dzdg69	2026-04-23 07:08:51.488299	2026-04-23 07:08:51.488299
1033	\N	s_1776928129897_qktleaqw	2026-04-23 07:08:51.486586	2026-04-23 07:08:51.486586
1037	\N	s_1776929451521_v6v03l6v	2026-04-23 07:30:52.593922	2026-04-23 07:30:52.593922
1038	\N	s_1776929451688_nmrpfn6q	2026-04-23 07:30:52.713403	2026-04-23 07:30:52.713403
1039	8	\N	2026-04-23 15:49:21.924269	2026-04-23 15:49:21.924269
1040	\N	s_1777476515497_o5h4q8se	2026-04-29 15:29:08.867636	2026-04-29 15:29:08.867636
1041	\N	s_1777476561782_46wikbul	2026-04-29 15:29:23.972071	2026-04-29 15:29:23.972071
1043	\N	s_1778004143149_cqe7z03h	2026-05-05 18:02:55.311629	2026-05-05 18:02:55.311629
1045	11	\N	2026-05-15 16:04:50.994054	2026-05-15 16:04:50.994054
1044	10	\N	2026-05-05 18:07:30.973017	2026-05-05 18:24:04.744374
1046	\N	s_1779115546822_v0kldhth	2026-05-18 14:46:29.966565	2026-05-18 14:46:29.966565
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart_items (id, cart_id, product_id, quantity, created_at, updated_at) FROM stdin;
2	488	1	1	2026-03-05 18:15:14.967278	2026-03-05 18:15:14.967278
3	494	1	1	2026-03-05 18:15:33.410271	2026-03-05 18:15:33.410271
4	500	2	1	2026-03-05 18:17:03.953389	2026-03-05 18:17:03.953389
5	502	2	1	2026-03-05 18:17:56.109139	2026-03-05 18:17:56.109139
6	812	1	1	2026-03-17 11:46:04.984492	2026-03-17 11:46:04.984492
7	813	1	1	2026-03-17 11:46:16.963214	2026-03-17 11:46:16.963214
12	1044	2	1	2026-05-05 18:24:04.716711	2026-05-05 18:24:04.716711
14	2	1	2	2026-05-15 13:23:35.061406	2026-05-15 13:23:35.061406
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, description, created_at, image_url) FROM stdin;
1	Electronics	\N	2025-09-23 16:39:37.401395	https://res.cloudinary.com/dfj4qmznz/image/upload/v1768896644/nyle-categories/r3t59lmhjmjlpnfe6x0s.jpg
6	Construction building & machinery	\N	2025-11-06 07:37:05.737442	https://res.cloudinary.com/dfj4qmznz/image/upload/v1768896713/nyle-categories/g2xpvwsihxkysqjxbla6.jpg
5	Beauty	\N	2025-11-06 07:36:41.089749	https://res.cloudinary.com/dfj4qmznz/image/upload/v1768896844/nyle-categories/hwulssiy8aoa2xh91ux2.jpg
4	Cutleries	\N	2025-11-06 07:36:25.527965	https://res.cloudinary.com/dfj4qmznz/image/upload/v1768896897/nyle-categories/ul4i8mnayvlvhu7n5kuq.jpg
3	Home & Garden	\N	2025-11-06 07:36:02.962423	https://res.cloudinary.com/dfj4qmznz/image/upload/v1768896921/nyle-categories/dn51zzn9jejftoan3uwh.jpg
8	Office supplies	\N	2025-11-06 07:37:36.045604	https://res.cloudinary.com/dfj4qmznz/image/upload/v1768896966/nyle-categories/z97m4qqueiszsaegd3u1.jpg
2	computers	\N	2025-11-06 07:34:50.466497	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769193343/nyle-categories/ciqwcevr5cuenemlqvrc.jpg
11	Children wear	\N	2025-11-06 07:38:33.296606	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769193360/nyle-categories/yf47fz4w4sbrv7utk2mn.jpg
15	Farm equipements	\N	2025-11-06 07:39:32.899604	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769193392/nyle-categories/fisxghdeqootdqqbvw1y.jpg
10	Men's wear	\N	2025-11-06 07:38:21.492858	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769193427/nyle-categories/mrxac2n9m1y3zsltjksw.jpg
9	Luggage & bags	\N	2025-11-06 07:37:56.739725	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769193449/nyle-categories/udb9xnmjzdkwbn0inqqp.jpg
12	Women's outfit	\N	2025-11-06 07:38:47.968427	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769193488/nyle-categories/wulzogvnfbcbasqvmqyo.jpg
13	Sports gear	\N	2025-11-06 07:39:02.733594	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769193509/nyle-categories/uwupiuk5ptgeuol21dlo.jpg
18	Automobile spare parts	\N	2025-11-14 10:15:16.493513	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769194011/nyle-categories/ho9hrkkpxzbcwggr9tfp.jpg
17	Baby products	\N	2025-11-06 07:40:04.210702	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769194065/nyle-categories/rfujyvd112odionycp0l.jpg
16	Household items	\N	2025-11-06 07:39:50.916385	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769194111/nyle-categories/znb7v8e2xxvj4t2lttyv.jpg
14	Farm clothing	\N	2025-11-06 07:39:17.79429	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769194141/nyle-categories/r9ha6m3yis3hhzvwuiic.jpg
19	Medicine and Health	\N	2026-01-26 09:34:53.712794	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769420093/nyle-categories/szlzdhydxxmwzqpouizm.jpg
20	Fast Foods	\N	2026-01-26 11:18:08.959693	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769426287/nyle-categories/mtfy3qp9dtiqspoymk3j.jpg
21	Shoes	\N	2026-01-26 11:19:04.633038	https://res.cloudinary.com/dfj4qmznz/image/upload/v1769426344/nyle-categories/ngjs2m3vtkfdwzftmuvl.jpg
7	Groceries	\N	2025-11-06 07:37:17.113662	https://res.cloudinary.com/dfj4qmznz/image/upload/v1771264650/nyle-categories/sy7qmrahsurtrjins8vy.jpg
\.


--
-- Data for Name: email_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.email_logs (id, to_email, subject, status, error_message, created_at) FROM stdin;
\.


--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.faqs (id, question, answer, category, order_index, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: hero_slides; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.hero_slides (id, title, subtitle, image_url, button_text, button_link, order_index, is_active, created_at, updated_at) FROM stdin;
5	Quality for Your Family	Everything you need for a comfortable and happy home.	https://images.unsplash.com/photo-1556911220-e15201887572?q=80&w=2070&auto=format&fit=crop	Explore Home	#products	4	t	2026-04-03 15:15:23.650938	2026-04-03 15:15:23.650938
4	Modern Tech Essentials	Gadgets that power your productivity and entertainment.	https://res.cloudinary.com/dfj4qmznz/image/upload/v1776264477/nyle-hero/mblayijlbxbieapisra8.jpg	Shop Tech	#products	3	t	2026-04-03 15:15:23.635065	2026-04-15 14:47:57.60786
1	Discover Amazing Products Daily	Your premier destination for quality products from trusted vendors across Kenya.	https://res.cloudinary.com/dfj4qmznz/image/upload/v1776264558/nyle-hero/wfx0htjy86bczfntsvvf.jpg	Start Shopping	#products	0	t	2026-04-03 15:15:23.581927	2026-04-15 14:49:19.114754
2	Smart Home, Smart Living	Experience the future with our curated collection of smart appliances.	https://res.cloudinary.com/dfj4qmznz/image/upload/v1776264601/nyle-hero/heb3cdvq1lw8lg1bvcfj.jpg	View Appliances	#products	1	t	2026-04-03 15:15:23.604526	2026-04-15 14:50:02.07398
3	Elevate Your Style	New arrivals in fashion. Trendy, authentic, and affordable.	https://res.cloudinary.com/dfj4qmznz/image/upload/v1776264630/nyle-hero/c362ggk0uexz7qoxvhup.jpg	Browse Fashion	#products	2	t	2026-04-03 15:15:23.619847	2026-04-15 14:50:30.586579
\.


--
-- Data for Name: newsletter_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.newsletter_logs (id, subject, body, sent_by, sent_at, recipients_count) FROM stdin;
\.


--
-- Data for Name: newsletter_subscribers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.newsletter_subscribers (id, email, subscribed_at) FROM stdin;
1	you@example.com	2025-11-03 14:14:03.576445
2	fidellanga67@gmail.com	2026-02-02 13:52:21.362218
5	lynn91582@gmail.com	2026-02-23 19:12:24.74266
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_items (id, order_id, product_id, quantity, price_at_order_time, price, vendor_id) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, user_id, total_price, status, created_at, total_amount, total, vendor_id) FROM stdin;
\.


--
-- Data for Name: partner_applications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.partner_applications (id, partner_type, partnership_tier, organization_name, registration_number, year_established, business_size, website, linkedin, full_name, job_title, email, phone, alternative_phone, country, city, address, description, services, target_markets, key_clients, annual_revenue, countries_of_operation, partnership_goals, expected_volume, integration_timeline, additional_info, status, created_at, contacted_at, contacted_by, termination_reason, termination_notice_sent_at, termination_deadline, terminated_at) FROM stdin;
1	other	platinum	nyle 	BRN-00300	1-2 years	2-10 Employees			Fidel Owiti	Director	fidellanga67@gmail.com	+254704521408	0704521408	Kenya	Nairobi	0704521408	logistics	["delivery"]	["global markets"]		10m	[]	to grow on nyle and make nyle grow bigger	medium	short		approved	2026-03-05 14:33:08.579349	2026-03-05 17:49:03.790721	5	\N	\N	\N	\N
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.password_reset_tokens (id, token, expires_at, created_at, user_id, user_type) FROM stdin;
2	f747de2c5624afe037a036593dc717d05bd9d7500e2842d7796ff6c115d3cc74	1775997430210	2026-04-12 12:22:10.21731	19	vendor
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payments (id, order_id, provider, provider_ref, amount, currency, status, created_at) FROM stdin;
\.


--
-- Data for Name: product_variants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_variants (id, product_id, sku, price, stock, attributes, image_url, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, name, description, price, image_url, created_at, stock, vendor_id, category, sku, weight, dimensions, shipping_cost, free_shipping_threshold, product_type, attributes, gallery_images, updated_at, status, created_by, approved_by, approved_at, rejection_reason, submitted_at, original_price, features, warranty_info, shipping_info, return_policy, specifications, tags, brand, color, material, estimated_delivery_days, is_featured, is_bestseller, rating, review_count, meta_title, meta_description, discount_percentage, is_deal_requested, deal_status, is_hot_deal) FROM stdin;
3	Samsung A51	Samsung Galaxy A51	24000.00	https://res.cloudinary.com/dfj4qmznz/image/upload/v1764397707/nyle-products/ld0kehl9aht9qnf9jy62.jpg	2025-11-29 06:28:28.435991	12	\N	computers	\N	\N	\N	0.00	\N	simple	\N	\N	2025-12-21 12:01:32.366338	active	admin	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	f	f	0.00	0	\N	\N	0	f	none	f
1	Macbook	Macbook Air M2 Silver Mockup	80000.00	https://res.cloudinary.com/dfj4qmznz/image/upload/v1766068990/nyle-products/e7xzlczgcy0qvaow8dbj.jpg	2025-12-18 14:43:10.437571	8	19	computers	PROD-1766068884251	1.70	10x6x7	0.00	\N	simple	\N	\N	2025-12-21 12:01:32.366338	approved	vendor	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	f	f	0.00	0	\N	\N	0	f	none	f
2	New High-Top Sneakers	Versatile Streetwear Style Thick Sole Trainers	3399.98	https://res.cloudinary.com/dfj4qmznz/image/upload/v1770036100/nyle-vendor-products/fvkghyng22djw78rgwus.jpg	2026-01-26 12:13:38.309204	12	19	Shoes	VENDOR-19-1769429618333	\N		0.00	\N	simple	\N	\N	2026-02-02 12:42:04.061705	approved	vendor	5	2026-02-02 12:42:04.061705	\N	2026-02-02 12:41:40.235341	0.00	{}				{}	{}				3	t	t	0.00	0			0	f	none	f
\.


--
-- Data for Name: recently_viewed_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recently_viewed_items (id, user_id, session_id, product_id, viewed_at, created_at, updated_at) FROM stdin;
2	\N	activity_1776277735562_65dz8f9l	2	2026-04-15 18:31:38.7394	2026-04-15 18:31:07.607637	2026-04-15 18:31:38.7394
1	\N	activity_1776188447978_4kyszx69	1	2026-04-16 04:32:35.007267	2026-04-14 17:42:25.268904	2026-04-16 04:32:35.007267
9	5	\N	2	2026-04-23 06:45:40.762171	2026-04-23 06:45:40.762171	2026-04-23 15:03:30.823286
8	5	\N	1	2026-05-01 08:14:41.217333	2026-04-23 06:46:05.582042	2026-05-01 08:14:41.217333
22	10	\N	1	2026-05-05 18:12:42.278437	2026-05-05 18:09:13.569311	2026-05-05 18:12:42.278437
19	10	\N	2	2026-05-05 18:22:47.588948	2026-05-05 18:07:31.144026	2026-05-05 18:22:47.588948
\.


--
-- Data for Name: reported_issues; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reported_issues (id, reporter_name, reporter_email, description, url, priority, status, created_at, updated_at, reporter_phone, issue_category_id, issue_title, resolution_message) FROM stdin;
1	fidel langa	fidellanga67@gmail.com	delivery delay		normal	resolved	2026-03-13 05:37:45.199113+00	2026-03-17 11:39:17.761037+00	+254704521408	4	Delivery Delay	sorry for the delay it will re solved soon thank you for trusting in NYLE!
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews (id, product_id, user_id, rating, comment, created_at) FROM stdin;
\.


--
-- Data for Name: store_reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_reviews (id, reviewer_name, reviewer_email, feedback_changes, would_recommend, general_thoughts, status, created_at, updated_at, rating) FROM stdin;
4	fidel langa	fidellanga67@gmail.com	review	t	good	approved	2026-05-14 14:17:57.04271+00	2026-05-14 14:18:36.219569+00	5
1	fidel langa	fidellanga67@gmail.com	fucking good	t	great	approved	2026-05-14 05:23:20.511281+00	2026-05-14 14:18:47.659268+00	5
2	fidel langa	fidellanga67@gmail.com	bravo	t	great man	approved	2026-05-14 05:45:48.088873+00	2026-05-14 14:18:49.891863+00	5
3	fidel langa	fidellanga67@gmail.com	bravo	t	good	approved	2026-05-14 13:39:48.559535+00	2026-05-14 14:18:54.917001+00	5
\.


--
-- Data for Name: support_messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.support_messages (id, name, email, subject, message, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_locations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_locations (id, user_id, name, address, latitude, longitude, is_default, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_sessions (id, user_id, session_token, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, created_at, is_admin, refresh_token, last_ip, last_activity, session_valid, "emailVerified", image) FROM stdin;
1	john doe	john@example.com	123456	2025-07-26 21:58:36.630158	f	\N	\N	\N	t	\N	\N
4	Admin User	admin@example.com	$2b$10$6WbO/EYOxqlDwd6Z90.kIe3zUARM1D8.YntE854msr0d6pkGJhMpq	2025-07-27 13:54:50.436222	t	\N	\N	\N	t	\N	\N
7	Test User	testuser@example.com	$2b$10$LNCwOhHDTVyK2381qEOb/.Uv4AUJGK/Q5uzNKLpTkJiXLOZwlXuDy	2025-10-15 15:39:53.832293	f	\N	\N	\N	t	\N	\N
8	Fidel Langa	langafidel264@gmail.com	\N	2026-04-23 15:49:19.708	f	\N	\N	\N	t	\N	https://lh3.googleusercontent.com/a/ACg8ocKVj6I10-lOM8nRv-d0vT_FzmgIC0HkQ5vAEkPwlQzjsLwCbg=s96-c
11	NYLE luxe	nyleluxe@gmail.com	\N	2026-05-15 16:04:49.668	f	\N	\N	\N	t	\N	https://lh3.googleusercontent.com/a/ACg8ocLR-OXoXKfCOFU_Sgw-5s0oBmRVx8LGxlq5sciWOm4zp4eWEg=s96-c
10	Wayne Siengo	waynesiengo6@gmail.com	\N	2026-05-05 18:07:29.698	f	\N	\N	\N	t	\N	https://lh3.googleusercontent.com/a/ACg8ocKfFAd26ZqRUjmQuedxekzB9N9mps6PCW2SIwtfdqmVOuGTPmLL=s96-c
5	Admin User	fidellanga67@gmail.com	$2b$10$umIrOicOALby3lpn.YpybuC1suc1Z8y0sIn0s5iZ5we8VBE2sWeci	2025-07-27 19:39:13.500069	t	\N	102.0.3.66	\N	t	\N	\N
\.


--
-- Data for Name: vendor_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendor_categories (id, vendor_id, category_name, is_active, created_at) FROM stdin;
\.


--
-- Data for Name: vendor_leads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendor_leads (id, full_name, business_name, email, business_email, phone, business_phone, location, country, latitude, longitude, type, status, created_at) FROM stdin;
1	Fidel Owiti	nyle	fidellanga67@gmail.com	fidellanga67@gmail.com	+254704521408	+254704521408	Nairobi, Kenya	\N	\N	\N	kenyan	link_sent	2026-02-27 08:43:03.981584
\.


--
-- Data for Name: vendor_members; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendor_members (id, vendor_id, user_id, role) FROM stdin;
\.


--
-- Data for Name: vendor_payout_accounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendor_payout_accounts (id, vendor_id, provider, account_ref, created_at) FROM stdin;
\.


--
-- Data for Name: vendor_product_defaults; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendor_product_defaults (id, vendor_id, default_shipping_cost, default_free_shipping_threshold, default_category, auto_submit_for_approval, created_at) FROM stdin;
\.


--
-- Data for Name: vendor_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendor_sessions (id, vendor_id, session_token, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: vendor_shipping_zones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendor_shipping_zones (id, vendor_id, product_id, country, region, cost, free_threshold, estimated_days, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: vendors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendors (id, legal_name, email, phone, address, created_at, company_name, contact_person, password, status, country, business_type, county, is_verified, verification_token, verification_expires, shipping_rate, shipping_policy, return_policy, company_logo, updated_at, plan_type, max_products, current_approved_count, is_trusted_vendor, login_otp, login_otp_expires) FROM stdin;
19	nyle store	fidellanga67@gmail.com	0704521408	0704521408	2025-11-19 12:09:00.058691	nyle	Fidel Owiti	$2b$10$Z16hj3Ie9Ai8Ge1fCg.8TO0riK3fxg74CNrpfVSV4ACvHmWNKcqA2	approved	Migori	Computers	\N	t	\N	\N	0	\N	\N	\N	2026-03-17 11:16:30.108351	basic	50	2	f	\N	\N
9	NONe	monmusiq@gmail.com	07000000000	Kwale	2026-04-15 18:58:22.02624	nuuuu	Fidempa	$2b$10$p6PFtwJmuMIpnY4njmRbLeFJwmHr9YRkDmN/nYuHMNBUS55NQs21G	pending	Kwale	Farm Clothing	\N	f	550572	2026-04-15 20:58:22.059	0	\N	\N	\N	2026-04-15 18:58:22.066636	basic	10	0	f	\N	\N
10	NONe	fidempa03@gmail.com	07000000000	Kwale	2026-04-15 18:58:39.92366	nuuuu	Fidempa	$2b$10$22hn1FDFmUQbJGfkLeDJUe.qSkmNAqrIzjen8zbZ54xN2A/VVccVa	pending	Kwale	Farm Clothing	\N	f	663945	2026-04-15 20:58:39.933	0	\N	\N	\N	2026-04-15 18:58:39.940116	basic	10	0	f	\N	\N
\.


--
-- Data for Name: wishlist_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.wishlist_items (id, user_id, session_id, product_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: activity_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.activity_logs_id_seq', 4, true);


--
-- Name: announcements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.announcements_id_seq', 4, true);


--
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cart_id_seq', 1046, true);


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 14, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 21, true);


--
-- Name: email_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.email_logs_id_seq', 1, false);


--
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.faqs_id_seq', 1, false);


--
-- Name: hero_slides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hero_slides_id_seq', 5, true);


--
-- Name: newsletter_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.newsletter_logs_id_seq', 1, false);


--
-- Name: newsletter_subscribers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.newsletter_subscribers_id_seq', 5, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_items_id_seq', 8, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 7, true);


--
-- Name: partner_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partner_applications_id_seq', 1, true);


--
-- Name: password_reset_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.password_reset_tokens_id_seq', 2, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: product_variants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_variants_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 2, true);


--
-- Name: recently_viewed_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recently_viewed_items_id_seq', 29, true);


--
-- Name: reported_issues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reported_issues_id_seq', 1, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- Name: store_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_reviews_id_seq', 4, true);


--
-- Name: support_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.support_messages_id_seq', 1, false);


--
-- Name: user_locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_locations_id_seq', 1, false);


--
-- Name: user_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_sessions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: vendor_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vendor_categories_id_seq', 1, false);


--
-- Name: vendor_leads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vendor_leads_id_seq', 1, true);


--
-- Name: vendor_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vendor_members_id_seq', 1, false);


--
-- Name: vendor_payout_accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vendor_payout_accounts_id_seq', 1, false);


--
-- Name: vendor_product_defaults_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vendor_product_defaults_id_seq', 1, false);


--
-- Name: vendor_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vendor_sessions_id_seq', 1, false);


--
-- Name: vendor_shipping_zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vendor_shipping_zones_id_seq', 1, false);


--
-- Name: vendors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vendors_id_seq', 10, true);


--
-- Name: wishlist_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.wishlist_items_id_seq', 2, true);


--
-- Name: users_sync users_sync_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.users_sync
    ADD CONSTRAINT users_sync_pkey PRIMARY KEY (id);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_cart_id_product_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_product_id_key UNIQUE (cart_id, product_id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: email_logs email_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_logs
    ADD CONSTRAINT email_logs_pkey PRIMARY KEY (id);


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- Name: hero_slides hero_slides_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hero_slides
    ADD CONSTRAINT hero_slides_pkey PRIMARY KEY (id);


--
-- Name: newsletter_logs newsletter_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.newsletter_logs
    ADD CONSTRAINT newsletter_logs_pkey PRIMARY KEY (id);


--
-- Name: newsletter_subscribers newsletter_subscribers_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.newsletter_subscribers
    ADD CONSTRAINT newsletter_subscribers_email_key UNIQUE (email);


--
-- Name: newsletter_subscribers newsletter_subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.newsletter_subscribers
    ADD CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: partner_applications partner_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_applications
    ADD CONSTRAINT partner_applications_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_token_key UNIQUE (token);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: product_variants product_variants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variants_pkey PRIMARY KEY (id);


--
-- Name: product_variants product_variants_sku_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variants_sku_key UNIQUE (sku);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_sku_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sku_key UNIQUE (sku);


--
-- Name: recently_viewed_items recently_viewed_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recently_viewed_items
    ADD CONSTRAINT recently_viewed_items_pkey PRIMARY KEY (id);


--
-- Name: recently_viewed_items recently_viewed_session_product_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recently_viewed_items
    ADD CONSTRAINT recently_viewed_session_product_unique UNIQUE (session_id, product_id);


--
-- Name: recently_viewed_items recently_viewed_user_product_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recently_viewed_items
    ADD CONSTRAINT recently_viewed_user_product_unique UNIQUE (user_id, product_id);


--
-- Name: reported_issues reported_issues_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_issues
    ADD CONSTRAINT reported_issues_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: store_reviews store_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.store_reviews
    ADD CONSTRAINT store_reviews_pkey PRIMARY KEY (id);


--
-- Name: support_messages support_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.support_messages
    ADD CONSTRAINT support_messages_pkey PRIMARY KEY (id);


--
-- Name: user_locations user_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_locations
    ADD CONSTRAINT user_locations_pkey PRIMARY KEY (id);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vendor_categories vendor_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_categories
    ADD CONSTRAINT vendor_categories_pkey PRIMARY KEY (id);


--
-- Name: vendor_leads vendor_leads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_leads
    ADD CONSTRAINT vendor_leads_pkey PRIMARY KEY (id);


--
-- Name: vendor_members vendor_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_members
    ADD CONSTRAINT vendor_members_pkey PRIMARY KEY (id);


--
-- Name: vendor_members vendor_members_vendor_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_members
    ADD CONSTRAINT vendor_members_vendor_id_user_id_key UNIQUE (vendor_id, user_id);


--
-- Name: vendor_payout_accounts vendor_payout_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_payout_accounts
    ADD CONSTRAINT vendor_payout_accounts_pkey PRIMARY KEY (id);


--
-- Name: vendor_payout_accounts vendor_payout_accounts_vendor_id_provider_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_payout_accounts
    ADD CONSTRAINT vendor_payout_accounts_vendor_id_provider_key UNIQUE (vendor_id, provider);


--
-- Name: vendor_product_defaults vendor_product_defaults_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_product_defaults
    ADD CONSTRAINT vendor_product_defaults_pkey PRIMARY KEY (id);


--
-- Name: vendor_product_defaults vendor_product_defaults_vendor_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_product_defaults
    ADD CONSTRAINT vendor_product_defaults_vendor_id_key UNIQUE (vendor_id);


--
-- Name: vendor_sessions vendor_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_sessions
    ADD CONSTRAINT vendor_sessions_pkey PRIMARY KEY (id);


--
-- Name: vendor_shipping_zones vendor_shipping_zones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_shipping_zones
    ADD CONSTRAINT vendor_shipping_zones_pkey PRIMARY KEY (id);


--
-- Name: vendors vendors_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_email_key UNIQUE (email);


--
-- Name: vendors vendors_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_email_unique UNIQUE (email);


--
-- Name: vendors vendors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);


--
-- Name: wishlist_items wishlist_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_pkey PRIMARY KEY (id);


--
-- Name: wishlist_items wishlist_session_product_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_session_product_unique UNIQUE (session_id, product_id);


--
-- Name: wishlist_items wishlist_user_product_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_user_product_unique UNIQUE (user_id, product_id);


--
-- Name: users_sync_deleted_at_idx; Type: INDEX; Schema: neon_auth; Owner: -
--

CREATE INDEX users_sync_deleted_at_idx ON neon_auth.users_sync USING btree (deleted_at);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: idx_cart_items_cart_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cart_items_cart_id ON public.cart_items USING btree (cart_id);


--
-- Name: idx_cart_items_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cart_items_product_id ON public.cart_items USING btree (product_id);


--
-- Name: idx_newsletter_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers USING btree (email);


--
-- Name: idx_order_items_vendor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_order_items_vendor_id ON public.order_items USING btree (vendor_id);


--
-- Name: idx_password_reset_expires; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_password_reset_expires ON public.password_reset_tokens USING btree (expires_at);


--
-- Name: idx_password_reset_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_password_reset_user ON public.password_reset_tokens USING btree (user_id, user_type);


--
-- Name: idx_products_bestseller; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_bestseller ON public.products USING btree (is_bestseller) WHERE (is_bestseller = true);


--
-- Name: idx_products_brand; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_brand ON public.products USING btree (brand);


--
-- Name: idx_products_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_category ON public.products USING btree (category);


--
-- Name: idx_products_featured; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_featured ON public.products USING btree (is_featured) WHERE (is_featured = true);


--
-- Name: idx_products_original_price; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_original_price ON public.products USING btree (original_price) WHERE (original_price IS NOT NULL);


--
-- Name: idx_products_price; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_price ON public.products USING btree (price);


--
-- Name: idx_products_vendor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_vendor ON public.products USING btree (vendor_id);


--
-- Name: idx_reported_issues_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_reported_issues_status ON public.reported_issues USING btree (status);


--
-- Name: idx_support_messages_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_support_messages_email ON public.support_messages USING btree (email);


--
-- Name: idx_support_messages_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_support_messages_status ON public.support_messages USING btree (status);


--
-- Name: idx_vendor_sessions_expires; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_vendor_sessions_expires ON public.vendor_sessions USING btree (expires_at);


--
-- Name: idx_vendor_sessions_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_vendor_sessions_token ON public.vendor_sessions USING btree (session_token);


--
-- Name: idx_vendor_sessions_vendor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_vendor_sessions_vendor ON public.vendor_sessions USING btree (vendor_id);


--
-- Name: recently_viewed_session_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX recently_viewed_session_idx ON public.recently_viewed_items USING btree (session_id, viewed_at DESC);


--
-- Name: recently_viewed_user_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX recently_viewed_user_idx ON public.recently_viewed_items USING btree (user_id, viewed_at DESC);


--
-- Name: wishlist_session_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX wishlist_session_idx ON public.wishlist_items USING btree (session_id, created_at DESC);


--
-- Name: wishlist_user_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX wishlist_user_idx ON public.wishlist_items USING btree (user_id, created_at DESC);


--
-- Name: products update_products_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: vendors update_vendors_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON public.vendors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON DELETE CASCADE;


--
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: cart cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE SET NULL;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: product_variants product_variants_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variants_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;


--
-- Name: recently_viewed_items recently_viewed_items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recently_viewed_items
    ADD CONSTRAINT recently_viewed_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_locations user_locations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_locations
    ADD CONSTRAINT user_locations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_sessions user_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: vendor_categories vendor_categories_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_categories
    ADD CONSTRAINT vendor_categories_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;


--
-- Name: vendor_members vendor_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_members
    ADD CONSTRAINT vendor_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: vendor_members vendor_members_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_members
    ADD CONSTRAINT vendor_members_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;


--
-- Name: vendor_payout_accounts vendor_payout_accounts_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_payout_accounts
    ADD CONSTRAINT vendor_payout_accounts_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;


--
-- Name: vendor_product_defaults vendor_product_defaults_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_product_defaults
    ADD CONSTRAINT vendor_product_defaults_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;


--
-- Name: vendor_sessions vendor_sessions_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_sessions
    ADD CONSTRAINT vendor_sessions_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;


--
-- Name: vendor_shipping_zones vendor_shipping_zones_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_shipping_zones
    ADD CONSTRAINT vendor_shipping_zones_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: vendor_shipping_zones vendor_shipping_zones_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_shipping_zones
    ADD CONSTRAINT vendor_shipping_zones_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;


--
-- Name: wishlist_items wishlist_items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict hKbAFKMqEmCCslMux4jORphJEOH2X8hBzK4tRBQJHRpcKBnBh2FNsQahA8CbqCG

