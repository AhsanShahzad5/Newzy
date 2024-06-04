import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state =  {
    progress : 0
    }

    setProgress = (progress) =>{
      this.setState({
        progress : progress
      })
    }


  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress = {this.setProgress} key="general" pageSize={12} category={'general'} country={'in'} title={'NewZy-Top Headlines'} />} />
            <Route path="/sports" element={<News setProgress = {this.setProgress} key="sports" pageSize={12} category={'sports'} country={'in'} title={'NewZy-Sports'} />} />
            <Route path="/entertainment" element={<News setProgress = {this.setProgress} key="entertainment" pageSize={12} category={'entertainment'} country={'in'} title={'NewZy-Entertainment'} />} />
            <Route path="health" element={<News setProgress = {this.setProgress} pageSize={12} key="health" category={'health'} country={'in'} title={'NewZy-Healthy'} />} />
            <Route path="/science" element={<News setProgress = {this.setProgress} pageSize={12} key="scinece" category={'science'} country={'in'} title={'NewZy-Science'} />} />
            <Route path="business" element={<News setProgress = {this.setProgress} pageSize={12} key="business" category={'business'} country={'in'} title={'NewZy-Business'} />} />
            <Route path="technology" element={<News setProgress = {this.setProgress} pageSize={12} key="technology" category={'technology'} country={'in'} title={'NewZy-Tech'} />} />

          </Routes>
        </BrowserRouter>

      </div>
    )
  }
}


