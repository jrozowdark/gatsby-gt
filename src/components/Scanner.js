import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import { navigate } from 'gatsby';
class Scanner extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      FaceMode: 'enviroment',
      showViewFinder: true
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
    if (data != undefined){
      console.log(data)
      localStorage.setItem('redem', data);
      navigate('redemption');
    }


  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }
    var divStyle = {
      paddingTop: '10%',
      textAlign: 'center',
      background: 'black',
    }
    return(
      <div style={divStyle}>
        <QrReader
          delay={this.state.delay}
          facingMode='environment'
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}
export default Scanner
