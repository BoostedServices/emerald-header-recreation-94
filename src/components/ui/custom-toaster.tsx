
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

export function CustomToaster() {
  const { toasts } = useToast()

  const getIcon = (title: string) => {
    if (title.includes('Added') || title.includes('Success') || title.includes('Updated')) {
      return <CheckCircle className="h-4 w-4 text-[#08C422] mr-2 flex-shrink-0" />;
    }
    if (title.includes('Error') || title.includes('Failed')) {
      return <AlertCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />;
    }
    if (title.includes('Removed') || title.includes('Info')) {
      return <Info className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />;
    }
    return <CheckCircle className="h-4 w-4 text-[#08C422] mr-2 flex-shrink-0" />;
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className="bg-[#2a2a2a] border-[#3a3a3a] text-white shadow-2xl animate-slide-in-right border-l-4 border-l-[#08C422]"
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-white flex items-center">
                  {getIcon(String(title))}
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-gray-300 ml-6">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-gray-400 hover:text-white" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-4 right-4 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:max-w-[420px]" />
    </ToastProvider>
  )
}
