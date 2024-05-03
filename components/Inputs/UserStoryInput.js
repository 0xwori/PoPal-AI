import React, { useState } from 'react';

function UserStoryInput({ onChange }) {
  const [asA, setAsA] = useState('');
  const [iWant, setIWant] = useState('');
  const [soThat, setSoThat] = useState('');

  const handleAsAChange = (e) => {
    const value = e.target.value;
    setAsA(value);
    onChange({ asA: value, iWant, soThat });
  };

  const handleIWantChange = (e) => {
    const value = e.target.value;
    setIWant(value);
    onChange({ asA, iWant: value, soThat });
  };

  const handleSoThatChange = (e) => {
    const value = e.target.value;
    setSoThat(value);
    onChange({ asA, iWant, soThat: value });
  };

  return (
    <div className='my-5 border border-gray-100 rounded-xl p-4'>
      <div className='flex justify-between items-center my-1'>
        <span className='text-xl inline-block font-medium leading-none tracking-tight text-gray-900 w-1/4'>As a...</span>
        <input type="text" placeholder='Taxi user' value={asA} onChange={handleAsAChange} className="w-3/4 p-4 text-gray-900 border-b border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
      <div className='flex justify-between items-center my-1'>
        <span className='text-xl inline-block font-medium leading-none tracking-tight text-gray-900 w-1/4'>I want...</span>
        <input type="text" placeholder='To see all taxi drives on a map ' value={iWant} onChange={handleIWantChange} className="w-3/4 p-4 text-gray-900 border-b border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
      <div className='flex justify-between items-center my-1'>
        <span className='text-xl inline-block font-medium leading-none tracking-tight text-gray-900 w-1/4'>So that...</span>
        <input type="text" placeholder='I can easily locate them and book a ride' value={soThat} onChange={handleSoThatChange} className="w-3/4 p-4 text-gray-900 border-b border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
    </div>
  );
}

export default UserStoryInput;
