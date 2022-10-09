
import React from 'react';

import Progress from './progress'


interface AppState{
 list:any[],
 index:number
}

interface AppProps{

}
const baseUrl = `https://progressBar`;


class App extends React.Component<AppProps,AppState>{
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      index:1
  };
    this.handle=this.handle.bind(this)
    this.addChild=this.addChild.bind(this)
    this.handleDestroy=this.handleDestroy.bind(this)
  }

  handleDestroy(id){
    let t=this.state.list.filter(p=>p.id!==id)
    this.setState({list:t})
  }
  addChild(dura){
    this.setState({list:this.state.list.concat({dur:dura,id:this.state.index}),index:this.state.index+1})
  }

  handle(data:any){
    if(data?.data?.action==="show"){
      this.addChild(data.data.duration)
    }
  }
  componentDidMount(): void {
    window.addEventListener('message', this.handle);
  }
  componentWillUnmount(): void {
    window.removeEventListener('message',this.handle)
  }
  render(){
      return (
        <React.Fragment>
             {<div style={{bottom:'10%',left:'33%',display:'block',justifyContent:'center',width:'34%',position:'absolute'}} >          
          {this.state.list.map((items)=>{
            if(items){
              return <Progress key={items.id} id={items.id} dura={items.dur} callback={this.handleDestroy}></Progress>
            }
          })}
        </div>}
      </React.Fragment>
      )
  }

}

export default App;
