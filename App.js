import React from 'react';
import './App.css';
import { isEmptyStatement } from '@babel/types';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      arr: ["","","","","","","","",""],
      player_sign: "",
      computer_sign: "",
      boardIsFull: false,
      fullCells:0,
      userWon: false,
      compWon: false,
      numOfPlayers: 0,
      lastMove: [],
      minimum_cells: 0
    };
  }

  pickSign=(e)=>{
    this.setState({player_sign: e.target.id});
    if(e.target.id=="x")
      {
        this.setState({computer_sign: "o"});
      }
    else
      {
          this.setState({computer_sign: "x"});
      }
    
  }

  insertValue=async(e)=>{
    let temp=this.state.arr;
    temp[e.target.id]=this.state.player_sign;
    let moves=this.state.lastMove;
    moves.push(e.target.id);
    await this.setState({arr: temp, fullCells: this.state.fullCells+1, lastMove: moves});
    
    //now computer turn
    
    await this.computerTurn();
    await this.checkWin(e);
    //update number of steps
    let numOfSteps=9;
    for(var i=0; i<this.state.arr.length; i++)
      if(this.state.arr[i]!=="")
        numOfSteps++;
    if(this.state.minimum_cells>numOfSteps)
    {
      await this.setState({minimum_cells: numOfSteps});
    }
       
    if(this.state.userWon==true)
      {
        alert("Player Won!");
        
      }
       if(this.state.compWon==true)
      {
        alert("Computer Won!");
        
      }
     if(this.state.userWon==false && this.state.compWon==false && this.state.boardIsFull==true)
      {
        alert("EVEN - game over");
        
      }
  
  }
  
  checkWin=(e)=>{
    let temp3=this.state.arr;
    let sign1=this.state.player_sign;
    
    for(let i=0; i<3; i++)
    {
      if(sign1=="")
        return;
      if(temp3[i]==sign1 && temp3[i+3]==sign1 && temp3[i+6]==sign1)
        this.setState({userWon: true});
     
        if(temp3[3*i]==sign1 && temp3[3*i+1]==sign1 && temp3[3*i+2]==sign1)
        this.setState({userWon: true});
    }
    if(temp3[0]==sign1 && temp3[4]==sign1 && temp3[8]==sign1)
        this.setState({userWon: true});
    if(temp3[2]==sign1 && temp3[4]==sign1 && temp3[6]==sign1)
        this.setState({userWon: true});
    
    
     let sign2=this.state.computer_sign;
    for(let i=0; i<3; i++)
    {
      if(temp3[i]==sign2 && temp3[i+3]==sign2 && temp3[i+6]==sign2)
        this.setState({compWon: true});
     
        if(temp3[3*i]==sign2 && temp3[3*i+1]==sign2 && temp3[3*i+2]==sign2)
        this.setState({compWon: true});
    }
    if(temp3[0]==sign2 && temp3[4]==sign2 && temp3[8]==sign2)
        this.setState({compWon: true});
    if(temp3[2]==sign2 && temp3[4]==sign2 && temp3[6]==sign2)
        this.setState({compWon: true});
    
  }
  
  strategy=()=>{
    let myAr=this.state.arr;
    let p1=this.state.player_sign;
    for(let j=0; j<9; j++)
      {
        //lines
        if(j%3==0 &&j<7&& myAr[j]==p1 && myAr[j+1]==p1 && myAr[j+2]=="")
          return (j+2);
        if(j%3==1 &&j>0&& j<8&& myAr[j]==p1 && myAr[j+1]==p1 && myAr[j-1]=="")
          return (j-1);
        //columns
        if(j<3&& myAr[j]==p1 && myAr[j+3]==p1 && myAr[j+6]=="")
          return (j+6);
        if( j<3&& myAr[j+6]==p1 && myAr[j+3]==p1 && myAr[j]=="")
          return (j);
      }
    
    return Math.floor(Math.random()*9);
  }
  computerTurn=async()=>{
    let numb=this.strategy();
    this.boardFull();
    if(!this.state.boardIsFull && this.state.fullCells<8)
    {
        while(this.state.arr[numb]!="")
            numb=Math.floor((Math.random()*9));
        let temp2=this.state.arr;
        temp2[numb]=this.state.computer_sign;
        let themoves=this.state.lastMove;
        themoves.push(numb);
        await this.setState({arr: temp2,lastMove: themoves});
       
    }
    
 }  
  
  boardFull=()=>{
    let sum=0;
    for(let i=0; i<9; i++)
      if(this.state.arr[i]!=="")
        sum=sum+1;
    if(sum==9)
      this.setState({boardIsFull: true});
   
  }
  
  clearGame=()=>{
    this.setState({
                arr: ["","","","","","","","",""],
                boardIsFull: false,
                fullCells: 0,
                userWon: false,
                compWon: false,
                lastMove: []
        });
  }

  eraseLastMove=async()=>{
    let tempList=this.state.lastMove;
    if(tempList===undefined || tempList.length==0)
    {
      return;
    }
      const pos1=tempList.pop();
      const pos2=tempList.pop();
      let calcarr=this.state.arr;
      calcarr[pos1]="";
      calcarr[pos2]="";
      await this.setState({arr: calcarr, lastMove: tempList});
    //alert("erasion was done");
  }

  showRecord=()=>{
    alert("minimum number of full cells were: "+this.state.minimum_cells);
  }

  render(){

    return (
      <div className="App">
        <h1>
          <div>
          <img src="Xletter.png" alt="x" id="xo"/>
          <img src="Oletter.png" alt="o" id="xo"/>
          <img src="Xletter.png" alt="x" id="xo"/>
          <img src="Oletter.png" alt="o" id="xo"/>
          <img src="Xletter.png" alt="x" id="xo"/>
          <img src="Oletter.png" alt="o" id="xo"/>
          </div>
        TIC TAC TOE</h1>
        <h3> Player vs. Computer</h3>

         <div id="sign-panel">
              <h3>Choose Sign:</h3>
              <div id="radio-btns">
                  <input type="radio" name="xo" id="x" onClick={this.pickSign}/>X
                  <input type="radio" name="xo" id="o" onClick={this.pickSign}/>O<br/>
              </div>
        </div>
        <div id="big_board">
            <table id="table">
            <tr>
              <th onClick={this.insertValue} id="0">{this.state.arr[0]}</th>
              <th onClick={this.insertValue} id="1">{this.state.arr[1]}</th>
              <th onClick={this.insertValue} id="2">{this.state.arr[2]}</th>
            </tr>
            <tr>
              <th onClick={this.insertValue} id="3">{this.state.arr[3]}</th>
              <th onClick={this.insertValue} id="4">{this.state.arr[4]}</th>
              <th onClick={this.insertValue} id="5">{this.state.arr[5]}</th>
            </tr>
            <tr>
              <th onClick={this.insertValue} id="6">{this.state.arr[6]}</th>
              <th onClick={this.insertValue} id="7">{this.state.arr[7]}</th>
              <th onClick={this.insertValue} id="8">{this.state.arr[8]}</th>
            </tr>
            </table>
            <div id="buttons">
                <input type="button" onClick={this.clearGame} value="Clear/New Game" id="clear"/>
                <input type="button" onClick={this.eraseLastMove} value="Erase Last Move" id="eraseLastMove"/>
                <input type="button" onClick={this.showRecord} value="Show Record" id="showRecord"/>
                <input type="button" onClick={this.clearGame} value="Save Game" id="saveGame"/>
                <input type="button" onClick={this.clearGame} value="Load Game" id="loadGame"/>
            </div>
            
      </div>
        
         
      </div>
    );
  }
  
}

export default App;
