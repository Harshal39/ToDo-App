"use client";
import React from "react";
import Header from "@/components/Header";
import TODOHero from "@/components/TODOHero";
import TODOList from "@/components/TODOList";
import Form from "@/components/Form";

function Home(){
  //useState hook to create a state of our data
  const[todos,setTodos] = React.useState([]);

  //Retrieves  data from localStorage when component mounts
  React.useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if(storedTodos){
      setTodos(JSON.parse(storedTodos));
    }
  },[])

  //FIlter all todo values which are completed and then find its length.
  const todos_completed = todos.filter((todo) => todo.is_completed == true).length; 

  //Find the length of total todos
  const total_todos = todos.length;
  return (
    <div className="wrapper">
      <Header />
      <TODOHero todos_completed={todos_completed} total_todos={total_todos}/> {/*Props initial value is set.*/}
      <Form todos={todos} setTodos={setTodos}/> {/* Now data will be added by user from input form */}
      <TODOList todos={todos} setTodos={setTodos} /> { /*Passing as a props attribute*/ }
    </div>
  );
}

export default Home;