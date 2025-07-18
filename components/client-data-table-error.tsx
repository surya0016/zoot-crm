"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorPageProps {
  errorMessage: string
}

export default function ErrorPage({ errorMessage }: ErrorPageProps) {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-[600px] flex items-center justify-center bg-background px-4 py-8">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        {/* Error Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Oops! Something went wrong</h1>
          <p className="text-sm text-muted-foreground">We encountered an unexpected error</p>
        </div>

        {/* Error Message */}
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <p className="text-sm text-foreground font-medium break-words">{errorMessage}</p>
        </div>

        {/* Refresh Button */}
        <Button onClick={handleRefresh} className="w-full sm:w-auto min-w-[140px]" size="lg">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Page
        </Button>
      </div>
    </div>
  )
}
