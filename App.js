import "./App.css";
import ReactDOM from "react-dom";
import React, { useState } from "react";


function App() {
  const [billTo, setbillTo] = useState("");
  const [shipTo, setshipTo] = useState("");
  const [supplyPlace, setsupplyPlace] = useState("");
  const [pan, setPan] = useState("");
  const [gstIn, setgstIn] = useState("");
  const [billDate, setBillDate] = useState("");
  const [billNo,setBillNo]=useState("");
  const [inputList, setInputList] = useState([{name: "", hsnOrSacCode: "",unit: "", cost: "", gstRate: ""}]);
  //
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  //
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  //
  const handleAddClick = () => {
    setInputList([...inputList, {name: "", hsnOrSacCode: "",unit: "", cost: "", gstRate: ""  }]);
  };

  //

  const handleshipChange = (e) => {
    setshipTo(e.target.value);
  };
  const handlesBillNoChange = (e) => {
    setBillNo(e.target.value);
  };
  const handleplaceChange = (e) => {
    setsupplyPlace(e.target.value);
  };
  const handlepanChange = (e) => {
    setPan(e.target.value);
  };
  const handlegstInChange = (e) => {
    setgstIn(e.target.value);
  };
   
const handlebillto=(e)=>{
  setbillTo(e.target.value)
}
  const handlebillDate = (e) => {
    setBillDate(e.target.value);
  };


  const handleSubmit = async(e) => {
    const url ='https://3a66-103-59-74-38.in.ngrok.io' 
    const path='api/v1/purchase-order/save'
    const data = {
       
       billTo:billTo,
       shipTo:shipTo,
       supplyPlace:supplyPlace,
       pan:pan,
       gstin:gstIn,
       billNo: "",
       billDate:billDate.toString(),
       items:inputList
    } 
    const res = await fetch(`${url}/${path}`, {
      method: 'POST',
      //made :'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':origin,
        'Access-Control-Allow-Credentials':true
      },
      body: JSON.stringify(data),
    })
//     fetch("https://3a66-103-59-74-38.in.ngrok.io/api/v1/purchase-order/save", {
//     method: 'POST',
//     credentials: 'include',
    
//     headers :{
//       'Content-Type': 'application/json;charset=utf-8',   
//     },
//     body: data
// })
// .then(res => res.json())
// .then(
// (result) => {
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// })
    console.log("The response that we are getting from the backednd is ",res);
    console.log("Items list is ",inputList);
  };

  

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h2> Rare Concepts </h2>
          <h3> Details Form </h3>
          <form
            className="flex w-full justify-around"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="w-2/5">
              <label align="left">Bill To</label>
              <br />
              <input
                type="text"
                value={billTo}
                required
                onChange={(e) => {
                    handlebillto(e);
                }}
              />
              <br />

              <label>Ship To</label>
              <br />
              <input
                type="text"
                value={shipTo}
                required
                onChange={(e) => {
                  handleshipChange(e);
                }}
              />
              <br />
              <label>Supply Place</label>
              <br />
              <input
                type="text"
                value={supplyPlace}
                required
                onChange={(e) => {
                  handleplaceChange(e);
                }}
              />
              <br />
              <label>Pan</label>
              <br />
              <input
                type="text"
                value={pan}
                required
                onChange={(e) => {
                  handlepanChange(e);
                }}
              />
              <br />
              <label>GSTIN No.</label>
              <br />
              <input
                type="text"
                value={gstIn}
                required
                onChange={(e) => {
                  handlegstInChange(e);
                }}
              />
              <br />
            </div>
            <div className="absolute top-0 start-0">
            <button type="button" id="Search">Search Bill</button>
            </div>
            <div className="w-2/5">
              <label>Bill No.</label>
              <br />
              <input
                type="text"
                value={billNo}
                required
                onChange={(e) => {
                  handlesBillNoChange(e);
                }}
              />
              <br />
              <label>Bill Date</label>
              <br />
              <input
                type="date"
                value={billDate}
                required
                onChange={(e) => {
                  handlebillDate(e);
                }}
              />
              <br />
            </div>
          </form>
        </header>
      </div>
      <br />
      <div className="AppItems">
      <h3><a>Item Details</a></h3>
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="name"
              placeholder="Enter Particulars"
              value={x.particulars}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="hsnOrSacCode"
              placeholder="Enter HSN/SAC Code"
              value={x.hsnOrSacCode}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              name="unit"
              placeholder="Enter Unit"
              value={x.unit}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="cost"
              placeholder="Enter Cost"
              value={x.cost}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="gstRate"
              placeholder="Enter GST Rate"
              value={x.gstRate}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })
      }
     
      </div>
        <button className="absolute right-0 bottom-0" id="Submit" onClick={handleSubmit}> Submit</button>
        </div>
      
  );
}

export default App;
