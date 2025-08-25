import React, { useState } from 'react'
interface DataSet {
    name: string;
    phone: string;
}
const Lists = () => {
  const [dataSet2,setDataset2]= useState<DataSet[]>([])
  const [inp,setInp] = React.useState<string>("")
    // const dataSet2:DataSet[] =  [
    //     {name:"Amadi",phone:"08012345675"},
    //     {name:"Chile",phone:"08012345679"},
    //     {name:"John",phone:"08012345674"},
    //     {name:"Victor",phone:"08012345671"},
    // ]

    const handleSubmit= (e:any)=> {
    e.preventDefault();
    if (inp.trim() === "") return;
    const newData: DataSet = { name: inp, phone: "08012345678" };
     setDataset2([...dataSet2, newData]); // Add new item to the list
    setInp(""); // Clear input after submission   
    }

  const handleRemove = (index:number) => {
    const updatedDataSet = dataSet2.filter((_, i) => i !== index);
    setDataset2(updatedDataSet); // Remove item at the specified index
    setInp(""); // Clear input after removal  
  };
  return (
    <div>
      <h3>Lists</h3>
      {
        dataSet2.map((data, index) => (
          <div onDoubleClick={()=> handleRemove(index) } key={index} className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">{data.name}</h2>
            <p className="text-gray-600">{data.phone}</p>
          </div>
        ))
      }

      {/* add new list */}
      <form onSubmit={(e)=> handleSubmit(e) } >
        <fieldset>
          <legend className="text-lg font-semibold mb-2">Add New Item</legend>
          <input
            type="text"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            placeholder="Enter name"
            className="border p-2 rounded w-full mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button> 
        </fieldset>
      </form>
    </div>
  )
}

export default Lists