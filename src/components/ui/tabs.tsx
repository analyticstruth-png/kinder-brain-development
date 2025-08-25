import * as React from "react"

export const Tabs = ({ value, onValueChange, className, ...props }: any) => (
  <div className={className} {...props} />
)

export const TabsList = ({ className, ...props }: any) => (
  <div className={`inline-flex items-center justify-center rounded-md bg-gray-100 p-1 ${className}`} {...props} />
)

export const TabsTrigger = ({ value, className, ...props }: any) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
      props['data-state'] === 'active' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
    } ${className}`}
    {...props}
  />
)

export const TabsContent = ({ value, className, ...props }: any) => (
  <div className={`mt-2 ${className}`} {...props} />
)