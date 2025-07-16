import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input';
import axios from 'axios';

interface EditableInputProps {
  value: string;
  id: string;  
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const EditableInput = ({
  id,
  value,
}: EditableInputProps 
) => {
  const [name, setName] = useState(value)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const refInput = useRef<HTMLInputElement>(null)
  
  const updateName = async(name: string) => {
    try {
      setLoading(true)
      const response = await axios.put('/api/client/update/name', {
        id,
        newName: name
      })
      console.log("Name updated successfully: ", response.data)
    } catch (error) {
      console.error("Error updating client name:", error);
    } finally {
      setLoading(false)
      setIsEditing(false)
      setName(name)
      if (refInput.current) {
        refInput.current.blur(); // Remove focus from input after update
      }
    }
  }
    

  return (
    <div>
      {isEditing ? (
        <div className="">
          <form action="">
            <Input
              ref={refInput}
              placeholder='Enter client name...'
              value={name}
              onChange={(e) => {setName(e.target.value)}}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent form submission
                  updateName(name);
                } else if (e.key === 'Escape') {
                  setIsEditing(false); // Exit editing mode
                }
              }}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className='w-full max-w-[400px] min-w-[200px]  justify-between'
            />
          </form>
        </div>
      ):(
        <div className="font-semibold" onClick={() => {
          setIsEditing(true)}}>
          {name}
        </div>
      )}
    </div>
  )
}

export default EditableInput