import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Grid extends Component{
    constructor(){
        super();
        this.state = {
            items:this.randomItems(this.init()),
            win:false
        }
    }
    init(){
        let array = new Array(5);
        for(let i = 0;i < 5 ;i++)
        {
            array[i] = new Array(5);
            for(let j = 0;j < 5; j++)
                array[i][j] = false;
        }
        console.log(array);
        return(array);
    }
    randomItems(array){
        let rand = Math.floor(Math.random() * 10)+1;
        for(let i = 0;i <= rand;i++)
        {
            const r1 = Math.floor(Math.random() * 5);
            const r2 = Math.floor(Math.random() * 5);
            if (array[r1][r2] === false)
                array[r1][r2] = true;
            else
                i--;
        }
        return(array);
    }
    isWin(array){
        for(let arr of array)
            for(let val of arr)
                if(val == false)
                    return (false);
        return (true);
    }
    clickLighOut(event){
        let [key1,key2] = event.target.getAttribute('data-key').split(';');
        [key1,key2] = [parseInt(key1),parseInt(key2)];
        let newArray = this.state.items;
        if (newArray[key1][key2] != null)
        {
            newArray[key1][key2] = (newArray[key1][key2] === false) ? true : false;
            if (newArray[key1][key2 + 1] != null)
                newArray[key1][key2 + 1] = (newArray[key1][key2 + 1] === false) ? true : false;
            if (newArray[key1][key2 - 1] != null)
                newArray[key1][key2 - 1] = (newArray[key1][key2 - 1] === false) ? true : false;
            if (newArray[key1 + 1] != null)
                newArray[key1 + 1][key2] = (newArray[key1 + 1][key2] === false) ? true : false;
            if (newArray[key1 - 1] != null)
                newArray[key1 - 1][key2] = (newArray[key1 - 1][key2] === false) ? true : false;
        }
        this.setState({
            items:newArray,
            win:this.isWin(newArray)
        });
    }
    render(){
        return (
            <ul className='Grid'>
            {
                this.state.items.map((array,index1)=>(
                    array.map((value,index2) =>
                    {
                        let active = '';
                        if (value === true)
                            active = 'active';
                        const key = index1+';'+index2;
                        return (<li className={active} key={key} data-key={key} onClick={(event)=>{this.clickLighOut(event)}}></li>);
                    })))
            }
            </ul>)
    }
}
class Title extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <h1 className='Title'>
                <span>Light</span>
                <span>Out</span>
            </h1>
        );
    }
}
class App extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                <Title/>
                <Grid/>
            </div>
        );
    }
}
ReactDOM.render(<App/>,document.getElementById('root'));