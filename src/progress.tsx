
import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface AppState{
progress:number,
isToggleOn:string,
duration:number
}

interface AppProps{
    dura:number,
    id:number,
    callback:any
}

class Progress extends React.Component<AppProps,AppState>{
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: 'visible',
      progress: 0,
      duration:props.dura
  };
    this.launch=this.launch.bind(this)
  }

  launch(duration){
    const interval=duration/20
    setTimeout(() => {
      const timer = setInterval(()=>{

        if(this.state.progress===100){
          setTimeout(() => {

            clearInterval(timer)
            this.setState({progress:0,isToggleOn:'hidden'})
            this.props.callback(this.props.id)
          }, 250);
  
        }
        else{
          this.setState({progress:this.state.progress+5})
        }
        },interval)
    }, 150);
  }

  componentDidMount():void{
      console.log('this.state.duration', this.state.duration)
      this.launch(this.state.duration)
  }


  render(){
      return (
        <React.Fragment>
          <Box sx={{visibility:this.state.isToggleOn,width:'100%',marginTop:'4px'}}> 
        <div  style={{position:'relative',backgroundColor:"#30373f",borderRadius:'10px',borderLeftWidth:'1px',borderRightWidth:'1px',outline:'currentcolor non 0px',margin:'auto',padding:'18px'}}>
        <Box sx={{width:'100%'}}>
        <LinearProgress sx={{height:'16px'}} variant="determinate" value={this.state.progress} />        
      </Box>
      </div>
      </Box>
      </React.Fragment>
      
      )
  }

}

export default Progress;
