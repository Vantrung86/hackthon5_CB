import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./style.css"
export default function TodoList() {
    const [todos,setTodos] = useState([]);
    const [obj,setObj] = useState({});
    const [check,setCheck] = useState(false);
    const getTodos = async ()=>{
        try {
            let res = await axios.get("http://localhost:8000/api/todo");
            setTodos(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        getTodos()
    },[check]);

    //lấy input
    const handleChange = (e) => {
        setObj({...obj,[e.target.name]:e.target.value})
    }

    //thêm cv
    const handleAdd=async()=>{
        try {
            let res =  await axios.post("http://localhost:8000/api/todo", obj)
            alert(res.data.messange)
            setCheck(!check)
        } catch (error) {
            alert(error.response.data.messange);
        }
        setObj({name:""})
    }
    //xoá cv
    const handleDelete=async(id)=>{
        if (confirm("Bạn có chắc chắn muốn xoá ?")) {
            try {
                let res = await axios.delete(`http://localhost:8000/api/todo/${id}`)
                alert(res.data.messange)
                setCheck(!check)
            } catch (error) {
                console.log(error);
            }    
        }
    }
  
    //update status
    const handleComplete=async(item)=>{
        try {
            let res =  await axios.put(`http://localhost:8000/api/todo/${item.id}`, item)
            alert(res.data.messange)
            setCheck(!check)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='container'>
    <h1>Todo App</h1>
    <div className='form-group'>
      <input type="text" placeholder='Add your new todo' name="name" value={obj.name} onChange={handleChange}/>
      <button onClick={handleAdd}>+</button>
    </div>
    <ul>
      {todos.map((item)=>(
            <li key={item.id}>
                  <p>
                    <span style={{textDecoration: item.status == +1 ? "line-through" : ""}}>{item.name}</span>
                      
                      <span style={{marginLeft:20, visibility:`${item.status == +1 ? "visible" : "hidden"}`}}>Đã hoàn thành</span>
                  </p>
                  
                  <i className="fa-solid fa-pen-to-square" onClick={()=>handleComplete(item)}></i>                   
                  <i className="fa-solid fa-trash" onClick={()=>handleDelete(item.id)}></i>
            </li>
      ))}
    </ul>
</div>
  )
}
