import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface ShotsDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const ShotsDropdown = ({ value, onChange }: ShotsDropdownProps) => {
  const options = ["1", "2", "3", "4"];

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[15rem] bg-secondary text-foreground mx-auto justify-center border-foreground focus:border-foreground py-5 px-3 rounded-2xl">
        <SelectValue placeholder="Select no. of shots" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem 
            key={option} 
            value={option} 
            className="font-berk-shwash font-semibold cursor-pointer text-foreground justify-around hover:bg-secondary/80"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ShotsDropdown