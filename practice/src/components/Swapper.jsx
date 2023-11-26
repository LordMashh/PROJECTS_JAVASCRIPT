import React, { useState } from "react";

export default function Swapper() {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1", checked: false },
    { id: 2, text: "Item 2", checked: false },
    { id: 3, text: "Item 3", checked: false },
    // Add more items as needed
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggle = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSwap = () => {
    const selectedFromList1 = items.filter((item) => item.checked);
    const selectedFromList2 = selectedItems.filter((item) => item.checked);

    setItems((prevItems) => {
      const updatedList1 = prevItems.filter((item) => !item.checked);
      return [...updatedList1, ...selectedFromList2];
    });

    setSelectedItems((prevItems) => {
      const updatedList2 = prevItems.filter((item) => !item.checked);
      return [...updatedList2, ...selectedFromList1];
    });

    // Clear checked status
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, checked: false }))
    );
    setSelectedItems((prevItems) =>
      prevItems.map((item) => ({ ...item, checked: false }))
    );
  };

  return (
    <div className="flex  items-center justify-around mt-20">
      <div>
        <h2>List 1</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggle(item.id)}
                />
                {item.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSwap}>Swap</button>
      <div>
        <h2>List 2</h2>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggle(item.id)}
                />
                {item.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
