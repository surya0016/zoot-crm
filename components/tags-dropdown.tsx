"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader } from "lucide-react"
import { tags } from "@/lib/data" 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface TagsDropDownProps {
  onTagSelect?: (tag: { label: string; value: number } | null) => void
  index: number;
  isEnabled: boolean;
  updating?: boolean; // Optional prop to indicate if the dropdown is being updated
  currentStep: number;
  value?: string | null; // Add this to control the dropdown value
}

export function TagsDropDown({ onTagSelect, index, updating, isEnabled, currentStep, value }: TagsDropDownProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState("")

  // Use controlled value if provided, otherwise use internal state
  const displayValue = value || internalValue;
  // ...existing code...
  return (
    <div className="flex items-center gap-2">
      <span>{index + 1}.</span>
      <Popover open={open && isEnabled} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={!isEnabled || updating}
            className={cn(
              "min-w-[200px] max-w-[400px] w-fit justify-between",
              index < currentStep && displayValue !== null ? "border-blue-400 dark:border-blue-700" : "",
              !isEnabled ? "opacity-30 cursor-not-allowed" : ""
            )}
          >
            {displayValue
              ? tags.find((tag) => tag.label === displayValue)?.label
              : "Select tag..."}
            {updating ? <Loader className="animate-spin opacity-50"/> : <ChevronsUpDown className="opacity-50" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[200px] max-w-[400px] w-fit p-0">
          <Command>
            <CommandInput placeholder="Search tag..." className="h-9" />
            <CommandList>
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => (
                  <CommandItem
                    key={tag.label}
                    value={tag.label}
                    onSelect={(currentValue) => {
                      const newValue = currentValue === displayValue ? "" : currentValue
                      // Update internal state if not controlled
                      if (!value) {
                        setInternalValue(newValue)
                      }
                      setOpen(false)
                      // Call the callback with the selected tag
                      if (onTagSelect) {
                        if (newValue) {
                          const selectedTag = tags.find((tag) => tag.label === newValue)
                          if (selectedTag) {
                            onTagSelect({ label: selectedTag.label, value: parseInt(selectedTag.value) })
                          }
                        } else {
                          onTagSelect(null)
                        }
                      }
                    }}
                  >
                    {tag.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        displayValue === tag.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
