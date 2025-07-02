
-- Create a table for service status
CREATE TABLE public.service_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('operational', 'maintenance', 'degraded', 'outage')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER handle_updated_at 
  BEFORE UPDATE ON public.service_status 
  FOR EACH ROW 
  EXECUTE PROCEDURE public.handle_updated_at();

-- Insert initial service status data
INSERT INTO public.service_status (service_name, status) VALUES
  ('Echo Valorant Full', 'operational'),
  ('Echo Ultimate', 'operational'),
  ('Echo Unreal', 'operational'),
  ('Echo Temp Spoofer', 'operational'),
  ('Echo Perm Spoofer', 'operational');

-- Enable Row Level Security
ALTER TABLE public.service_status ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read service status (public information)
CREATE POLICY "Service status is publicly readable" 
  ON public.service_status 
  FOR SELECT 
  USING (true);

-- Create policy to allow authenticated users to update service status (admin functionality)
CREATE POLICY "Authenticated users can update service status" 
  ON public.service_status 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');
