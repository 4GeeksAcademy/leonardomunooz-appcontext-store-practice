import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const initialTask = {
    label: "",
    is_done: false
}

const URLBASE = "https://playground.4geeks.com/todo"

//create your first component
const Todos = () => {
    const {store,actions} = useContext(Context)

    const [task, setTask] = useState(initialTask)
    const [todos, setTodos] = useState([])

    const handleChange = ({ target }) => {
        setTask({
            ...task,
            [target.name]: target.value
        })
    }
    const addTask = async (event) => {
        try {
            if (event.key === "Enter") {
                if (task.label.trim() !== "") {
                    let response = await actions.addTask(task)                    
                    if(response){
                        setTask(initialTask)
                        alert('Tarea guardada con exito')
                    }else{
                        alert('error al guardar la tares')
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    const deleteTask = (id) => {
        actions.deleteTask(id)
        .then(()=> {
            alert('Se borro la tarea')
        })

    }

    const createUser = async () => {
        // try {
        //     let response = await fetch(`${URLBASE}/users/deimian`, {
        //         method: "POST"

        //     })
        //     console.log(response)
        // } catch (error) {
        //     console.log(error)
        // }
    }

    async function deleteAll() {
       let reesponseTask = await actions.deleteAll()
       if(reesponseTask) {
        console.log('Se ha eliminado satisfactoriamente');
        
       }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-7">
                    <h1 className="my-3">Todo list</h1>
                    <form
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Ingresa la tarea"
                            name="label"
                            value={task.label}
                            onChange={handleChange}
                            onKeyDown={addTask}

                        />
                    </form>
                    {
                        store.todos.map((item) => {
                            return (
                                <div key={item.id}
                                    className="d-flex justify-content-between"
                                >
                                    <div>
                                        {item.label}
                                    </div>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteTask(item.id)}
                                    >x</button>
                                </div>
                            )
                        })
                    }
                    <button
                        onClick={() => { deleteAll() }}
                    >Eliminar todo</button>
                </div>
            </div>
        </div>
    );
};

export default Todos;