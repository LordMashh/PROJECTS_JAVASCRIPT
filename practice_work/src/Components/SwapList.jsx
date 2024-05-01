import React, { useState } from 'react';

const SwapList = () => {
  const [list1, setList1] = useState([
    { id: 1, text: 'Item 1', checked: false },
    { id: 2, text: 'Item 2', checked: false },
    { id: 3, text: 'Item 3', checked: false },
  ]);

  const [list2, setList2] = useState([
    { id: 4, text: 'Item A', checked: false },
    { id: 5, text: 'Item B', checked: false },
    { id: 6, text: 'Item C', checked: false },
  ]);

  const handleCheckboxChange = (list, itemId) => {
    const updatedList = list.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );

    if (list === list1) {
      setList1(updatedList);
    } else {
      setList2(updatedList);
    }
  };

  const handleSwap = () => {
    const selectedList1Items = list1.filter(item => item.checked);
    const selectedList2Items = list2.filter(item => item.checked);

    const updatedList1 = list1.filter(item => !item.checked).concat(selectedList2Items);
    const updatedList2 = list2.filter(item => !item.checked).concat(selectedList1Items);

    setList1(updatedList1);
    setList2(updatedList2);

    // Remove checked state after swap
    setList1(updatedList1.map(item => ({ ...item, checked: false })));
    setList2(updatedList2.map(item => ({ ...item, checked: false })));

    
  };

  return (
    <div className='flex justify-center items-center gap-9'>
      <div>
        <h2>List 1</h2>
        {list1.map(item => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(list1, item.id)}
            />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
        <button onClick={handleSwap}>Swap</button>
      <div>
        <h2>List 2</h2>
        {list2.map(item => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(list2, item.id)}
            />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwapList;
