import './App.css';
import React,{useCallback, useState} from 'react'

function App() {
  const [input,setInput]=useState("");
  // const [titles,setTitles]=useState([]);
  // const [links,setLinks]=useState([]);

  const [incdata,setIncData]=useState([{}]);

  function fetchData(value){
    fetch(`https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=${value}`)
    .then(response=>response.json())
    .then(data=>{
      console.log(data);

      let arr= [];
      

      for(let i=0;i<data[1].length;i++)
      {
        let obj={};
        obj.title= data[1][i];
        obj.link= data[3][i];
        arr.push(obj);
        
      }
      setIncData(arr);
      
      
      
    })
    .catch(error=>console.log(error));
  }
  console.log(incdata);
  


 const debounce=(func)=>{
   let timer;
   return function(...args){
     const context=this;
     if(timer) clearTimeout(timer);

     timer=setTimeout(()=>{
       timer=null;
       func.apply(context,args);

     },500);

   }
 }

 const optimized= useCallback(debounce(fetchData),[]);




  return (
    <div className="App flexc">
      <h1 style={{textAlign:"center"}}>Wiki Search</h1>
      <p style={{textAlign:"center"}}>Your personal <b>search</b> assistant</p>

      <input id="search" onChange={(e)=>optimized(e.target.value)} placeholder="Enter the word you want to search" type="text" style={{border:"1px solid black",margin:"auto",display:"block",width:"40%",height:"35px"}}  />

      <div>

      {
        incdata.map(object=>(
          <a style={{textDecoration:"none",margin:"20px 0",color:"blue"}} href={object.link}><div>{object.title}</div></a>
        ))
      }
      </div>



      
    </div>
  );
}

export default App;
