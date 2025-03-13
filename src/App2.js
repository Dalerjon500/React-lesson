//
// function App2() {


    // let date = [
    //     {id:1,name:"Dalerjon","Ismatov"}
    //     {id:2,name:"Johnson","Kuper"}
    // ]


//   let obj =[{name: "Daler",lastName:"Ismatov"}]
//
//   let users = ["Behruz","Daler","Firdavs"]
//     return <div>
//             {
//                 users.map(user =><h1>{user}</h1>)
//             }
//     </div>
// }
//
// export default App2;








// import {useState} from "react";
//
// const App2=() => {
//   const [name, setName] = useState("Sachin");
//   const [count,setCount] = useState(0);
//   const [count2,setCount] = useState(0);
//
//   const changeName = (name) => {
//     setName("Rahul")
//   }
//
//
//   const changeCount = () => {
//     setCount(count+1)
//   }
//
//
//   return <div>
//       <h1>{name}</h1>
//     <button onClick={changeName}>change</button>
//     <hr/>
//     <h1>count:{count}</h1>
//     <button onClick={changeCount}>change Count</button>
//   </div>
// }
//
// export default App2;



import { useState } from "react";

function App2() {
  const [size, setSize] = useState(200); // Rasm o'lchami boshlang'ich 200px

  const increaseSize = () => {
    setSize(size + 20); // Rasmni kattalashtirish
  };

  const decreaseSize = () => {
    if (size > 50) setSize(size - 20); // Rasmni kichiklashtirish (50px dan kichik bo'lmasin)
  };

  return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img
            src="https://via.placeholder.com/300" // O'zingizning rasm URL'ni qo'yishingiz mumkin
            alt="Example"
            style={{
              width: $[size]px,
              height: ${size}px,
              border: "2px solid black",
            }}
        />
        <div style={{ marginTop: "20px" }}>
          <button onClick={increaseSize} style={{ margin: "10px", padding: "10px" }}>
            +
          </button>
          <button onClick={decreaseSize} style={{ margin: "10px", padding: "10px" }}>
            -
          </button>
        </div>
      </div>
  );
}

export default App2;
