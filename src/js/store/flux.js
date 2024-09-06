const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			todos:[],
			urlBaseTodo : "https://playground.4geeks.com/todo"
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getAllTask : async () => {	
			
				try {
					let responde = await fetch(`${getStore().urlBaseTodo}/users/leonardoo`)
					let data = await responde.json()
					// console.log(data);
					
					if (responde.status == 404) {
						getActions().createUser()
						getActions().getAllTask()
					} else {
						setStore({
							todos : data.todos
						})		
					}
				} catch (error) {
					console.log(`error  : ${error}`)
				}
			},
			addTask : async (task) => {
				const store = getStore()
				const { urlBaseTodo } = store
				try {
					const responde = await fetch(`${getStore().urlBaseTodo}/todos/leonardoo`, { // hace el fetch a la api
						method: "POST", // Se le espeficica el tipo de Metodo 
						headers: { // se le pasan cabeceras que la api pide
							"Content-Type": "application/json"
						},
						body: JSON.stringify(task) // se agrega la estructura de la tarea que se quiere mandar 
					})
	
					if (responde.ok) {
						getActions().getAllTask()
						return true
					} else {
						
						return false
					}
				} catch (error) {
					console.log(error);
					
				}
				
			},
			deleteTask: async (id) => {

				let response  = await  fetch(`${getStore().urlBaseTodo}/todos/${id}`, {
					method: "DELETE"
				})
					.then((responde) => getActions().getAllTask())
					.catch((error) => console.log(error))
			},
			deleteAll : async () => {
				try {
					let responde = await fetch(`${getStore().urlBaseTodo}/users/leonardoo`, {
						method: "DELETE"
					})
					if (responde.status == 204) {
						getActions().getAllTask()	
						return true
					}else {
						return false
					}
		
				} catch (error) {
					console.log(error)
				}
			},
			createUser : async () => {
				try {
					let response = await fetch(`${getStore().urlBaseTodo}/users/leonardoo`, {
						method: "POST"
	
					})
					console.log(response)
				} catch (error) {
					console.log(error)
				}
			}

		}
	};
};

export default getState;
