import * as React from "react"

export const Button = ({ className, variant = "default", ...props }: any) => (
  <button
    className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      variant === "default" ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
    } ${className}`}
    {...props}
  />
)