import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input';

interface EditableInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const EditableInput = ({
  value,
}: EditableInputProps 
) => {
  const [name, setName] = useState(value)
  const [isEditing, setIsEditing] = useState(false)
  const refInput = useRef<HTMLInputElement>(null)


  return (
    <div>
      {isEditing ? (
        <div className="">
          <Input
            ref={refInput}
            placeholder='Enter client name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className='w-full max-w-[400px] min-w-[200px]  justify-between'
          />
        </div>
      ):(
        <div className="" onClick={() => {
          setIsEditing(true)}}>
          {name}
        </div>
      )}
    </div>
  )
}

export default EditableInput