"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface DropDownMenuuProps {
  options: {name: string, value: string}[]
  onChange: (value: string)=>void
}

export function FilterDropDown({options, onChange}:DropDownMenuuProps) {
  const [checkedItems, setCheckedItems] = React.useState<Set<string>>(new Set())
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24">
        {options.map((item, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={checkedItems.has(item.value)}
            onCheckedChange={(checked: Checked) => {
              const newCheckedItems = new Set(checkedItems)
              if (checked) {
                newCheckedItems.add(item.value)
                onChange(item.value)
              } else {
                newCheckedItems.delete(item.value)
                onChange("")
              }
              setCheckedItems(newCheckedItems)
            }}
          >
            {item.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
