import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';

type DialogProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  
  // Button configurations
  showCancel?: boolean;
  showConfirm?: boolean;
  cancelText?: string;
  confirmText?: string;
  cancelVariant?: 'default' | 'danger' | 'primary';
  confirmVariant?: 'default' | 'danger' | 'primary';
  
  // Callbacks
  onCancel?: () => void;
  onConfirm?: () => void;
  
  // Styling
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  panelClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  // Behavior
  closeOnBackdrop?: boolean;
  hideButtons?: boolean;
};

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
};

const buttonVariants = {
  default: 'bg-white/10 text-white inset-ring inset-ring-white/5 hover:bg-white/20',
  danger: 'bg-red-500 text-white hover:bg-red-400',
  primary: 'bg-blue-500 text-white hover:bg-blue-400',
};

export default function CustomDialog({
  open,
  onClose,
  title,
  description,
  children,
  showCancel = false,
  showConfirm = true,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  cancelVariant = 'default',
  confirmVariant = 'danger',
  onCancel,
  onConfirm,
  className,
  titleClassName,
  descriptionClassName,
  panelClassName,
  size = 'lg',
  closeOnBackdrop = true,
  hideButtons = false,
}: DialogProps) {
  
  const handleClose = (value: boolean) => {
    if (closeOnBackdrop || value === false) {
      onClose(value);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose(false);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} className={`relative z-10 ${className || ''}`}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full ${sizeClasses[size]} data-closed:sm:translate-y-0 data-closed:sm:scale-95 ${panelClassName || ''}`}
          >
            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  {title && (
                    <DialogTitle 
                      as="h3" 
                      className={`text-base font-semibold text-white ${titleClassName || ''}`}
                    >
                      {title}
                    </DialogTitle>
                  )}
                  {description && (
                    <div className="mt-2">
                      <p className={`text-sm text-gray-400 ${descriptionClassName || ''}`}>
                        {description}
                      </p>
                    </div>
                  )}
                  {children && (
                    <div className="mt-4">
                      {children}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {!hideButtons && (showCancel || showConfirm) && (
              <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                {showConfirm && (
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold sm:w-auto ${buttonVariants[confirmVariant]}`}
                  >
                    {confirmText}
                  </button>
                )}
                {showCancel && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold sm:w-auto ${buttonVariants[cancelVariant]}`}
                  >
                    {cancelText}
                  </button>
                )}
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

// Example usage component
function ExampleUsage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-8 space-y-4">
      <h1 className="text-white text-2xl font-bold mb-6">Dialog Examples</h1>
      
      {/* Example 1: Basic Dialog */}
      <button
        onClick={() => setDialogOpen(true)}
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400"
      >
        Open Basic Dialog
      </button>
      
      <CustomDialog
        open={dialogOpen}
        onClose={setDialogOpen}
        title="Deactivate account"
        description="Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
        confirmText="Deactivate"
        cancelText="Cancel"
        confirmVariant="danger"
        onConfirm={() => console.log('Account deactivated')}
        onCancel={() => console.log('Cancelled')}
      />

      {/* Example 2: Custom Content */}
      <button
        onClick={() => setCustomDialogOpen(true)}
        className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-400"
      >
        Open Custom Dialog
      </button>
      
      <CustomDialog
        open={customDialogOpen}
        onClose={setCustomDialogOpen}
        title="Success!"
        confirmText="Got it"
        confirmVariant="primary"
        showCancel={false}
        size="md"
      >
        <div className="text-gray-300 space-y-2">
          <p>Your changes have been saved successfully.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Profile updated</li>
            <li>Settings synchronized</li>
            <li>Email notifications sent</li>
          </ul>
        </div>
      </CustomDialog>

      {/* Example 3: Form Dialog */}
      <button
        onClick={() => setFormDialogOpen(true)}
        className="rounded-md bg-purple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-400"
      >
        Open Form Dialog
      </button>
      
      <CustomDialog
        open={formDialogOpen}
        onClose={setFormDialogOpen}
        title="Add New Item"
        confirmText="Add Item"
        confirmVariant="primary"
        cancelVariant="default"
        size="lg"
        closeOnBackdrop={false}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Item Name
            </label>
            <input
              type="text"
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            />
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}

export { CustomDialog, ExampleUsage };

import { useState } from 'react';