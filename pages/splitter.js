import LineCountTextarea from '@/components/InputCounter/LineCountTextarea'
import React, { useState } from 'react'

function splitter() {
  const [value, setValue] = useState("");

  return (
    <div>
        <LineCountTextarea value={value}
                  numOfLines={10}
                  onValueChange={(newValue) => setValue(newValue)}
                  placeholder="Enter your text here..."/>
    </div>
  )
}

export default splitter