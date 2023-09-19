import React from 'react';
import { ArrowRight } from 'react-feather';

const CustomTab = () => {
  return (
    <div className='w-3/4 bg-primary rounded-lg px-4 py-2 flex justify-between cursor-pointer'>
      Category
      <ArrowRight />
    </div>
  )
}

export default CustomTab