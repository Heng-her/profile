-- Optional: Enable pgcrypto (usually enabled by default)
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table (your custom profile data)
CREATE TABLE public.users (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id         uuid NOT NULL UNIQUE,  -- links to auth.users.id
    username        text UNIQUE NOT NULL CHECK (char_length(username) >= 3),
    email           text NOT NULL CHECK (position('@' IN email) > 1),
    firstname       text,
    lastname        text,
    bio             text,
    profile_image   text,
    role            text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at      timestamp with time zone DEFAULT now()
    update_at       TIMESTAMP WITH TIME ZONE DEFAULT now();
);
-- +++++++++++++++++++++++++++++++++++++++

-- Create view_profile table
CREATE TABLE public.view_profile (
    id          bigserial PRIMARY KEY,
    user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    view_count  bigint DEFAULT 0 CHECK (view_count >= 0),
    UNIQUE (user_id)
);


-- ++++++++++++++++++++++++++++++++++++++++
CREATE TABLE public.contacts (
    id          bigserial PRIMARY KEY,
    user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

    type        text NOT NULL CHECK (type IN ('phone', 'telegram', 'whatsapp', 'line', 'email')),
    value       text NOT NULL,

    created_at  timestamptz DEFAULT now()
);


-- ++++++++++++++++++++++++++++++++++++++++
CREATE TABLE public.social_links (
    id          bigserial PRIMARY KEY,
    user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

    platform    text NOT NULL CHECK (
                    platform IN (
                        'facebook', 'instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'github'
                    )
                 ),
    url         text NOT NULL,

    created_at  timestamptz DEFAULT now()
);


-- +++++++++++++++++++++++++++++++++++++++

-- Allow your app to read auth.users (needed for RLS)
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON TABLE auth.users TO authenticated;

-- Function: sync new auth user → public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    auth_id,
    username,
    email
  )
  VALUES (
    NEW.id,
    -- Default username: email prefix (e.g., "john" from "john@example.com")
    -- Frontend can update it later
    LOWER(SPLIT_PART(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- +++++++++++++++++++++++++++++++++++++++

-- Trigger: fire after user signs up in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ++++++++++++++++++++++++++++++++++++++
  -- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.view_profile ENABLE ROW LEVEL SECURITY;

-- 🟢 Policy 1: Anyone can read profiles (public directory)
CREATE POLICY "Profiles are publicly viewable"
  ON public.users FOR SELECT
  USING (true);

-- 🔐 Policy 2: Users can update ONLY their own profile
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = auth_id);

-- 🔒 Policy 3: Prevent manual inserts/deletes to users (only via trigger)
CREATE POLICY "Only system can insert users"
  ON public.users FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only system can delete users"
  ON public.users FOR DELETE
  USING (false);

-- 📊 Policy 4: View counts are public
CREATE POLICY "View profiles are readable by all"
  ON public.view_profile FOR SELECT
  USING (true);

-- 🛑 Policy 5: Block manual edits to view_profile
CREATE POLICY "Block manual view_profile edits"
  ON public.view_profile FOR ALL
  USING (false);


-- ++++++++++++++++++++++++++++++++++++++
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = auth_id);
-- ++++++++++++++++++++++++++++++++++++++

-- -- Function: increment profile view count    
  CREATE OR REPLACE FUNCTION public.increment_profile_view(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.view_profile
  SET view_count = view_count + 1
  WHERE user_id = target_user_id;

  IF NOT FOUND THEN
    INSERT INTO public.view_profile(user_id, view_count)
    VALUES (target_user_id, 1);
  END IF;
END;
$$;
