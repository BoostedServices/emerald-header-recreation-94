import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminLoginModal from './AdminLoginModal';
import StatusUpdateModal from './StatusUpdateModal';

interface StatusItem {
  id: string;
  service_name: string;
  status: 'operational' | 'maintenance' | 'degraded' | 'outage';
  updated_at: string;
}

const StatusPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; status: string } | null>(null);

  // Check for saved admin session on component mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminLoggedIn');
    if (savedAdmin === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Set up real-time subscription for status updates
  useEffect(() => {
    console.log('Setting up real-time subscription...');
    const channel = supabase
      .channel('service-status-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'service_status'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          // Invalidate and refetch the status data immediately
          queryClient.invalidateQueries({ queryKey: ['service-status'] });
          
          // Show toast notification for status changes
          if (payload.eventType === 'UPDATE') {
            toast({
              title: "Status Updated",
              description: `${payload.new.service_name} status changed to ${payload.new.status}`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscription...');
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);

  // Fetch status data from Supabase
  const { data: statusItems = [], isLoading, refetch } = useQuery({
    queryKey: ['service-status'],
    queryFn: async () => {
      console.log('Fetching service status...');
      const { data, error } = await supabase
        .from('service_status')
        .select('*')
        .order('service_name');
      
      if (error) {
        console.error('Error fetching service status:', error);
        throw error;
      }
      
      console.log('Fetched status data:', data);
      return data as StatusItem[];
    },
    refetchOnWindowFocus: true,
    staleTime: 0, // Always consider data stale to force refetch
  });

  // Mutation to update status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      console.log('Starting mutation - Updating status for ID:', id, 'to:', status);
      
      // First, let's verify the record exists
      const { data: existingRecord, error: fetchError } = await supabase
        .from('service_status')
        .select('*')
        .eq('id', id)
        .single();
      
      if (fetchError) {
        console.error('Error fetching existing record:', fetchError);
        throw fetchError;
      }
      
      console.log('Existing record found:', existingRecord);
      
      // Now update the record
      const { data, error } = await supabase
        .from('service_status')
        .update({ 
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select('*');
      
      if (error) {
        console.error('Error updating service status:', error);
        throw error;
      }
      
      console.log('Update response data:', data);
      
      if (!data || data.length === 0) {
        console.error('No data returned from update operation');
        throw new Error('Update operation did not return data');
      }
      
      return data[0];
    },
    onSuccess: (data) => {
      console.log('Mutation success with data:', data);
      
      // Update the query cache immediately with the new data
      queryClient.setQueryData(['service-status'], (oldData: StatusItem[] | undefined) => {
        if (!oldData) return [data];
        
        return oldData.map(item => 
          item.id === data.id ? data : item
        );
      });
      
      // Also invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['service-status'] });
      
      toast({
        title: "Success",
        description: `Status updated to ${data.status} successfully!`,
      });
    },
    onError: (error) => {
      console.error('Mutation failed with error:', error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAdminLogin = (username: string, password: string, rememberMe: boolean) => {
    // Simple authentication (in real app, this would be secure)
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      if (rememberMe) {
        localStorage.setItem('adminLoggedIn', 'true');
      }
      setShowLoginModal(false);
      toast({
        title: "Login Successful",
        description: "Welcome back, admin!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const handleStatusUpdate = (serviceName: string) => {
    const service = statusItems.find(item => item.service_name === serviceName);
    if (service) {
      console.log('Opening status modal for service:', service);
      setSelectedProduct({ name: service.service_name, status: service.status });
      setShowStatusModal(true);
    }
  };

  const updateProductStatus = (newStatus: string) => {
    if (selectedProduct) {
      const service = statusItems.find(item => item.service_name === selectedProduct.name);
      if (service) {
        console.log('Initiating status update for service:', service.service_name, 'from', service.status, 'to', newStatus);
        updateStatusMutation.mutate({ id: service.id, status: newStatus });
      } else {
        console.error('Service not found for status update:', selectedProduct.name);
      }
    }
  };

  // ... keep existing code (getStatusConfig function and other utility functions)
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'operational':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#08C422" d="M6.5 18v-.09c0-.865 0-1.659.087-2.304c.095-.711.32-1.463.938-2.08c.618-.619 1.37-.844 2.08-.94c.646-.086 1.44-.086 2.306-.086h.178c.866 0 1.66 0 2.305.087c.711.095 1.463.32 2.08.938c.619.618.844 1.37.94 2.08c.085.637.086 1.416.086 2.267c2.573-.55 4.5-2.812 4.5-5.52c0-2.47-1.607-4.572-3.845-5.337C17.837 4.194 15.415 2 12.476 2C9.32 2 6.762 4.528 6.762 7.647c0 .69.125 1.35.354 1.962a4.4 4.4 0 0 0-.83-.08C3.919 9.53 2 11.426 2 13.765S3.919 18 6.286 18z" opacity="0.5" />
              <path fill="#08C422" fillRule="evenodd" d="M12 22c-1.886 0-2.828 0-3.414-.586S8 19.886 8 18s0-2.828.586-3.414S10.114 14 12 14s2.828 0 3.414.586S16 16.114 16 18s0 2.828-.586 3.414S13.886 22 12 22m2.25-4.862a.667.667 0 0 0-.944-.943l-2.195 2.195l-.417-.417a.667.667 0 0 0-.943.943l.889.889c.26.26.682.26.942 0z" clipRule="evenodd" />
            </svg>,
          text: 'Operational',
          textColor: 'text-[#08C422]',
          bgColor: 'bg-[#08C422]/10'
        };
      case 'maintenance':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#f59e0b" d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2s1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991z" opacity="0.5" />
              <path fill="#f59e0b" d="M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />
            </svg>,
          text: 'Maintenance',
          textColor: 'text-amber-400',
          bgColor: 'bg-amber-500/10'
        };
      case 'degraded':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#f97316" d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2s1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991z" opacity="0.5" />
              <path fill="#f97316" d="M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />
            </svg>,
          text: 'Degraded',
          textColor: 'text-orange-400',
          bgColor: 'bg-orange-500/10'
        };
      case 'outage':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#ef4444" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" opacity="0.5" />
              <path fill="#ef4444" d="M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" />
            </svg>,
          text: 'Outage',
          textColor: 'text-red-400',
          bgColor: 'bg-red-500/10'
        };
      default:
        return {
          icon: <div className="w-5 h-5 bg-gray-500 rounded-full"></div>,
          text: 'Unknown',
          textColor: 'text-gray-400',
          bgColor: 'bg-gray-500/10'
        };
    }
  };

  const overallStatus = statusItems.every(item => item.status === 'operational') ? 'All Systems Operational' : 'Some Systems Experiencing Issues';
  const operationalCount = statusItems.filter(item => item.status === 'operational').length;
  const lastUpdated = statusItems.length > 0 ? new Date(Math.max(...statusItems.map(item => new Date(item.updated_at).getTime()))) : new Date();

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="bg-[#121212] text-white py-16 px-4 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading status...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Go Back Arrow */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform duration-200"
            >
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            <span className="text-sm font-medium">Go Back</span>
          </button>
        </div>

        {/* Header with Settings Button */}
        <div className="text-center mb-16 relative">
          {/* Settings Button */}
          <div className="absolute top-0 right-0">
            {!isAdminLoggedIn ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="p-3 bg-[#1a1a1a] rounded-xl border border-[#252525] hover:border-[#08C422]/30 transition-all duration-300 hover:bg-[#1a1a1a]/80"
                title="Admin Settings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#fff" fillRule="evenodd" d="M9.965 2.809a1.51 1.51 0 0 0-1.401-.203a10 10 0 0 0-2.982 1.725a1.51 1.51 0 0 0-.524 1.313c.075.753-.058 1.48-.42 2.106c-.361.627-.925 1.106-1.615 1.417c-.458.203-.786.62-.875 1.113a10 10 0 0 0 0 3.44c.093.537.46.926.875 1.114c.69.31 1.254.79 1.616 1.416c.361.627.494 1.353.419 2.106c-.045.452.107.964.524 1.313a10 10 0 0 0 2.982 1.725c.471.169.996.093 1.4-.203c.615-.442 1.312-.691 2.036-.691s1.42.249 2.035.691c.37.266.89.39 1.401.203a10 10 0 0 0 2.982-1.725c.417-.349.57-.86.524-1.313c-.075-.753.057-1.48.42-2.106c.361-.627.925-1.105 1.615-1.416c.414-.188.782-.577.875-1.114a10.1 10.1 0 0 0 0-3.44a1.51 1.51 0 0 0-.875-1.113c-.69-.311-1.254-.79-1.616-1.417c-.362-.626-.494-1.353-.419-2.106a1.51 1.51 0 0 0-.524-1.313a10 10 0 0 0-2.982-1.725a1.51 1.51 0 0 0-1.4.203C13.42 3.25 12.723 3.5 12 3.5s-1.42-.249-2.035-.691" className="duoicon-secondary-layer" opacity="0.3"/>
                  <path fill="#fff" fillRule="evenodd" d="M9 12c0-2.309 2.5-3.753 4.5-2.598A3 3 0 0 1 15 12c0 2.309-2.5 3.753-4.5 2.598A3 3 0 0 1 9 12" className="duoicon-primary-layer"/>
                </svg>
              </button>
            ) : (
              <button
                onClick={handleAdminLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 text-sm font-semibold"
              >
                Logout
              </button>
            )}
          </div>

          <h1 className="text-5xl font-bold text-white mb-6">
            System Status
          </h1>
          <div className="inline-flex items-center gap-4 bg-[#1a1a1a] rounded-2xl px-8 py-4 border border-[#252525]">
            <div className="relative">
              <div className="w-4 h-4 bg-[#08C422] rounded-full"></div>
              <div className="absolute inset-0 w-4 h-4 bg-[#08C422] rounded-full animate-ping opacity-40"></div>
            </div>
            <span className="text-xl font-semibold text-white">{overallStatus}</span>
          </div>
          <p className="text-gray-400 mt-6 text-lg">
            {operationalCount} of {statusItems.length} services operational
          </p>
        </div>

        {/* Status Grid */}
        <div className="grid gap-6 mb-12">
          {statusItems.map((item, index) => {
            const config = getStatusConfig(item.status);
            return (
              <div key={item.id} className="group bg-[#1a1a1a] rounded-2xl p-8 border border-[#252525] hover:border-[#08C422]/30 transition-all duration-300 hover:bg-[#1a1a1a]/80" style={{
                animationDelay: `${index * 100}ms`,
                animation: `fade-in 0.6s ease-out ${index * 100}ms both`
              }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      {config.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors">
                      {item.service_name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {isAdminLoggedIn && (
                      <button
                        onClick={() => handleStatusUpdate(item.service_name)}
                        className="p-2 bg-[#2a2a2a] rounded-lg border border-gray-600 hover:border-[#08C422]/50 transition-all duration-300 hover:bg-[#2a2a2a]/80"
                        title="Update Status"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                          <path fill="#fff" fillRule="evenodd" d="M9.965 2.809a1.51 1.51 0 0 0-1.401-.203a10 10 0 0 0-2.982 1.725a1.51 1.51 0 0 0-.524 1.313c.075.753-.058 1.48-.42 2.106c-.361.627-.925 1.106-1.615 1.417c-.458.203-.786.62-.875 1.113a10 10 0 0 0 0 3.44c.093.537.46.926.875 1.114c.69.31 1.254.79 1.616 1.416c.361.627.494 1.353.419 2.106c-.045.452.107.964.524 1.313a10 10 0 0 0 2.982 1.725c.471.169.996.093 1.4-.203c.615-.442 1.312-.691 2.036-.691s1.42.249 2.035.691c.37.266.89.39 1.401.203a10 10 0 0 0 2.982-1.725c.417-.349.57-.86.524-1.313c-.075-.753.057-1.48.42-2.106c.361-.627.925-1.105 1.615-1.416c.414-.188.782-.577.875-1.114a10.1 10.1 0 0 0 0-3.44a1.51 1.51 0 0 0-.875-1.113c-.69-.311-1.254-.79-1.616-1.417c-.362-.626-.494-1.353-.419-2.106a1.51 1.51 0 0 0-.524-1.313a10 10 0 0 0-2.982-1.725a1.51 1.51 0 0 0-1.4.203C13.42 3.25 12.723 3.5 12 3.5s-1.42-.249-2.035-.691" className="duoicon-secondary-layer" opacity="0.3"/>
                          <path fill="#fff" fillRule="evenodd" d="M9 12c0-2.309 2.5-3.753 4.5-2.598A3 3 0 0 1 15 12c0 2.309-2.5 3.753-4.5 2.598A3 3 0 0 1 9 12" className="duoicon-primary-layer"/>
                        </svg>
                      </button>
                    )}
                    <span className={`text-sm font-medium ${config.textColor} ${config.bgColor} px-4 py-2 rounded-full border-0`}>
                      {config.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Legend */}
        <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#252525]">
          <h3 className="text-xl font-semibold text-white mb-6">Status Key</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="#08C422" d="M6.5 18v-.09c0-.865 0-1.659.087-2.304c.095-.711.32-1.463.938-2.08c.618-.619 1.37-.844 2.08-.94c.646-.086 1.44-.086 2.306-.086h.178c.866 0 1.66 0 2.305.087c.711.095 1.463.32 2.08.938c.619.618.844 1.37.94 2.08c.085.637.086 1.416.086 2.267c2.573-.55 4.5-2.812 4.5-5.52c0-2.47-1.607-4.572-3.845-5.337C17.837 4.194 15.415 2 12.476 2C9.32 2 6.762 4.528 6.762 7.647c0 .69.125 1.35.354 1.962a4.4 4.4 0 0 0-.83-.08C3.919 9.53 2 11.426 2 13.765S3.919 18 6.286 18z" opacity="0.5" />
                <path fill="#08C422" fillRule="evenodd" d="M12 22c-1.886 0-2.828 0-3.414-.586S8 19.886 8 18s0-2.828.586-3.414S10.114 14 12 14s2.828 0 3.414.586S16 16.114 16 18s0 2.828-.586 3.414S13.886 22 12 22m2.25-4.862a.667.667 0 0 0-.944-.943l-2.195 2.195l-.417-.417a.667.667 0 0 0-.943.943l.889.889c.26.26.682.26.942 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-300">Operational</span>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="#f59e0b" d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2s1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991z" opacity="0.5" />
                <path fill="#f59e0b" d="M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />
              </svg>
              <span className="text-sm text-gray-300">Maintenance</span>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="#f97316" d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2s1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991z" opacity="0.5" />
                <path fill="#f97316" d="M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />
              </svg>
              <span className="text-sm text-gray-300">Degraded</span>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="#ef4444" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" opacity="0.5" />
                <path fill="#ef4444" d="M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" />
              </svg>
              <span className="text-sm text-gray-300">Outage</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <g fill="none">
                <path fill="#fff" fillRule="evenodd" d="M7 4.018c-.54.023-.928.074-1.271.19a4 4 0 0 0-2.522 2.52C3 7.349 3 8.115 3 9.649c0 .095 0 .143.013.181a.25.25 0 0 0 .158.158c.038.013.086.013.182.013h17.294c.096 0 .144 0 .182-.013a.25.25 0 0 0 .158-.158C21 9.791 21 9.743 21 9.647c0-1.533 0-2.3-.207-2.918a4 4 0 0 0-2.522-2.522c-.343-.115-.732-.166-1.271-.189V6.5a1.5 1.5 0 0 1-3 0V4h-4v2.5a1.5 1.5 0 1 1-3 0z" clipRule="evenodd"/>
                <path fill="#fff" fillOpacity="0.25" d="M3 11.5c0-.236 0-.354.073-.427S3.264 11 3.5 11h17c.236 0 .354 0 .427.073s.073.191.073.427v.5c0 3.771 0 5.657-1.172 6.828S16.771 20 13 20h-2c-3.771 0-5.657 0-6.828-1.172S3 15.771 3 12z"/>
                <path stroke="#fff" strokeLinecap="round" d="M8.5 2.5v4m7-4v4" strokeWidth="1"/>
              </g>
            </svg>
            <span>Last updated: {lastUpdated.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleAdminLogin}
      />

      <StatusUpdateModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        productName={selectedProduct?.name || ''}
        currentStatus={selectedProduct?.status || ''}
        onUpdateStatus={updateProductStatus}
      />
    </div>
  );
};

export default StatusPage;
