
import { Button } from '@mui/material';
import React from 'react';

import Progress from './progress'


interface AppState {
  list: any[],
  index: number
}

interface AppProps {

}
const baseUrl = `https://progressBar`;


class App extends React.Component<AppProps, AppState>{
  state = {
    list: [],
    index: 1,
    dev: true
  };

  handleDestroy = (id) => {
    let t = this.state.list.filter(p => p.id !== id)
    this.setState({ list: t })
  }
  addChild = (dura) => {
    this.setState({ list: this.state.list.concat({ dur: dura, id: this.state.index }), index: this.state.index + 1 })

  }
  devchild = (e) => {
    this.addChild(5000)
    return e
  }
  handle = (data: any) => {
    if (data?.data?.action === "show") {
      this.addChild(data.data.duration)
    }
  }
  componentDidMount(): void {
    window.addEventListener('message', this.handle);
  }
  componentWillUnmount(): void {
    window.removeEventListener('message', this.handle)
  }
  render() {
    return (
      <>
        {this.state.dev && <Button variant='outlined' onClick={this.devchild} > Dev</Button>}
        {<div style={{ bottom: '10%', left: '33%', display: 'block', justifyContent: 'center', width: '34%', position: 'absolute' }} >
          {this.state.list.map((items) => {
            if (items) {
              return <Progress key={items.id} id={items.id} dura={items.dur} callback={this.handleDestroy}></Progress>
            }
          })}
        </div>}
      </>
    )
  }

}

export default App;
