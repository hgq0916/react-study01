(function (React) {

	const todos = [
		{id:1,completed:false,content:"hello",checked:false},
		{id:2,completed:true,content:"hello2",checked:false},
		{id:3,completed:false,content:"hello3",checked:false}
	];


	window.App = class App extends React.Component {

		constructor(){
			super();
			this.state={
				todos,
				selectAllState:false
			};
		}

		render(){
			return(
				<div>
					<section className="todoapp">
						<header className="header">
							<h1>todos</h1>
							<input className="new-todo" onKeyDown={this.handleOnKeyDown.bind(this)} placeholder="What needs to be done?" autoFocus/>
						</header>
						{/*<!-- This section should be hidden by default and shown when there are todos -->*/}
						<section className="main">
							<input id="toggle-all" className="toggle-all" type="checkbox"/>
							<label htmlFor="toggle-all">Mark all as complete</label>
							<ul className="todo-list">
								{/*<!-- These are here just to show the structure of the list items -->*/}
								{/*<!-- List items should get the className `editing` when editing and `completed` when marked as completed -->*/}
								{/**	<li className="completed">
									<div className="view">
										<input className="toggle" type="checkbox" defaultChecked/>
										<label>Taste JavaScript</label>
										<button className="destroy"></button>
									</div>
									<input className="edit" defaultValue="Create a TodoMVC template"/>
								</li>
								<li>
									<div className="view">
										<input className="toggle" type="checkbox"/>
										<label>Buy a unicorn</label>
										<button className="destroy"></button>
									</div>
									<input className="edit" defaultValue="Rule the web"/>
								</li> */}
								{this.getTodosHtml()}
							</ul>
						</section>
						{/*<!-- This footer should hidden by default and shown when there are todos -->*/}
						<footer className="footer">
							{/*<!-- This should be `0 items left` by default -->*/}
							<span className="todo-count"><strong>{this.state.todos.length}</strong> item left</span>
							{/*<!-- Remove this if you don't implement routing -->*/}
							<ul className="filters">
								<li>
									<a className="selected" href="#/" onClick={this.handeSelectAll.bind(this)}>All</a>
								</li>
								<li>
									<a href="#/active" onClick={this.handleActiveEvent.bind(this)}>Active</a>
								</li>
								<li>
									<a href="#/completed" onClick={this.handleCompletedEvent.bind(this)}>Completed</a>
								</li>
							</ul>
							{/*<!-- Hidden if no completed items are left ↓ -->*/}
							<button className="clear-completed" onClick={this.handleClearCompletedEvent.bind(this)}>Clear completed</button>
						</footer>
						</section>
						<footer className="info">
							<p>Double-click to edit a todo</p>
							{/*<!-- Remove the below line ↓ -->*/}
							<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
							{/*<!-- Change this out with your name and url ↓ -->*/}
							<p>Created by <a href="http://todomvc.com">you</a></p>
							<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
						</footer>
				</div>
			);
			
		}

		handleClearCompletedEvent(e){
			let todos = this.state.todos.filter((item)=>{
				return !item.completed;
			});
			this.setState({
				todos:todos
			});
		}

		handleActiveEvent(e){
			this.state.todos.forEach((item)=>{
				if(item.checked){
					if(item.completed){
						item.completed = false;
						item.checked = false;
					}
				}
			});
			
			this.setState({
				todos:this.state.todos
			});
		}

		handleCompletedEvent(e){
			//获取所有选中的选项
			this.state.todos.forEach((item)=>{
				if(item.checked){
					item.completed = true;
					item.checked = false;
				}
			});
			
			this.setState({
				todos:this.state.todos
			});
		}

		getTodosHtml(){
			return (
				this.state.todos.map(item=>{
					return (
						<li key={item.id} className={item.completed?'completed':''}>
							<div className="view">
								<input className="toggle" type="checkbox" onChange={this.handleChangeEvent.bind(this,item.id)} checked={item.checked}/>
								<label>{item.content}</label>
								<button className="destroy" onClick={this.handleOnClick.bind(this,item.id)}></button>
							</div>
							<input className="edit" defaultValue="Create a TodoMVC template"/>
						</li>
					);
				})
				
			);
		}

		handleChangeEvent(id,e){
			this.state.todos.forEach((item)=>{
				if(item.id === id){
					item.checked = !item.checked;
					return false; 
				}
			});
			
			this.setState({
				todos:this.state.todos
			});
		}

		handleOnKeyDown(e){
			const {target,keyCode} = e;
			if(keyCode === 13){
				//添加待办事项
				let content = target.value.trim();
				if(content == '') return;
				let lastId = 1;
				if(this.state.todos != null && this.state.todos.length>0){
					lastId = this.state.todos[this.state.todos.length-1].id;
				}
				
				this.state.todos.push({id:lastId+1,completed:false,content:content,checked:false});
				this.setState({
					todos:this.state.todos
				});
			}
		}

		handleOnClick(id,e){
			//删除元素
			let todos = this.state.todos;
			let index = todos.findIndex((item)=>{return item.id === id});
			todos.splice(index,1);
			this.setState({
				todos:todos
			});
		}

		handeSelectAll(e){
			let state = this.state.selectAllState;
			state = !state;
			//todo 设置所有复选框的状态
			if(this.state.todos != null && this.state.todos.length>0){
				this.state.todos.forEach((item)=>{
					item.checked = state;
				});
			}

			this.setState({
				selectAllState:state,
				todos:this.state.todos
			});

		}

	}

})(React);
