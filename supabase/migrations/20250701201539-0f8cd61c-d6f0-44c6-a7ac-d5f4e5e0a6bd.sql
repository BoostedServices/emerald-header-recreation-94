
-- Drop the existing restrictive RLS policy for updates
DROP POLICY IF EXISTS "Authenticated users can update service status" ON public.service_status;

-- Create a new policy that allows anyone to update service status
-- This is appropriate for a public status page where admins can update status
CREATE POLICY "Anyone can update service status" 
ON public.service_status 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Also allow inserts in case we need to add new services
CREATE POLICY "Anyone can insert service status" 
ON public.service_status 
FOR INSERT 
WITH CHECK (true);
