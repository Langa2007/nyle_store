-- db/fix_user_id_type.sql

-- 1. Drop foreign key constraints
ALTER TABLE public.cart DROP CONSTRAINT IF EXISTS cart_user_id_fkey;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE public.vendor_members DROP CONSTRAINT IF EXISTS vendor_members_user_id_fkey;
ALTER TABLE public.user_sessions DROP CONSTRAINT IF EXISTS user_sessions_user_id_fkey;
ALTER TABLE public.password_reset_tokens DROP CONSTRAINT IF EXISTS password_reset_tokens_user_id_fkey;
ALTER TABLE public."Account" DROP CONSTRAINT IF EXISTS "Account_userId_fkey";
ALTER TABLE public."Session" DROP CONSTRAINT IF EXISTS "Session_userId_fkey";

-- 2. Alter users table ID (Primary Key)
ALTER TABLE public.users ALTER COLUMN id TYPE VARCHAR(255);

-- 3. Alter referencing columns
ALTER TABLE public.cart ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE public.orders ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE public.reviews ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE public.vendor_members ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE public.user_sessions ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE public.password_reset_tokens ALTER COLUMN user_id TYPE VARCHAR(255);

-- Handle NextAuth tables with DO blocks because they might not exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Account' AND table_schema = 'public') THEN
        ALTER TABLE public."Account" ALTER COLUMN "userId" TYPE VARCHAR(255);
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Session' AND table_schema = 'public') THEN
        ALTER TABLE public."Session" ALTER COLUMN "userId" TYPE VARCHAR(255);
    END IF;
END $$;

-- 4. Re-add foreign key constraints
ALTER TABLE public.cart ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.orders ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.reviews ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.vendor_members ADD CONSTRAINT vendor_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.user_sessions ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Re-add NextAuth constraints if tables exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Account' AND table_schema = 'public') THEN
        ALTER TABLE public."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Session' AND table_schema = 'public') THEN
        ALTER TABLE public."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;
    END IF;
END $$;
