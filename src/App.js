import './App.css';
import React from "react";
import axios from "axios";
import logo from './XmemeLogo.png';

class ShowTheList extends React.Component 
{
	state = {
		imgs: []
	}

  componentDidMount() {
    axios.get(`https://xmemebackendshounak.herokuapp.com/v1/memes`)
      .then(res => {
        const images = res.data;
		images.sort((a, b) => a.PostDate < b.PostDate ? 1:-1);
		this.setState({ imgs: images });
		//console.log(this.state.imgs);
      })
  }
	render() {
		var arrayofdivs = [];
		for (let i = 0; i < Math.min(100,this.state.imgs.length); i++) {
			const divgallery =
				React.createElement('div', {className: 'gallery'},
				[
					React.createElement('a', {href : this.state.imgs[i].src, target: "blank"},	
						React.createElement('img', {src : this.state.imgs[i].src}, null)),
					React.createElement('div', { className: 'cap' }, "'"+this.state.imgs[i].Caption+"'"),
					React.createElement('div', { className: 'name' }, this.state.imgs[i].Name)
				]
				);

			arrayofdivs[i]= divgallery;
		}
		return arrayofdivs;
	}
}

class App extends React.Component 
{
	constructor(props) {
		super(props);
		this.state = {
			Name: 'Your Name',
			Caption: 'Your Caption',
			url: 'Your image url',
			click: '0'
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	  }
	
	  handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value
		});
	  }
	
	  handleSubmit(event) {
		event.preventDefault();
		if(this.state.Name != 'Your Name' && this.state.Caption != 'Your Caption' && this.state.url != 'Your image url')
		{
			axios.post(`https://xmemebackendshounak.herokuapp.com/v1/memes`, { 
			Name: this.state.Name,
			Caption: this.state.Caption,
			src: this.state.url 
			})
			.then(res => {
				window.location.reload();
			})
			}
		}

	render() {
		return (
			<div className= "App">
				<div className="header">
					<div className= "header-left">
						<img className= "Mainimage" src= {logo} alt="Xmeme"/>
					</div>
				
					<div className="header-right">
						<form onSubmit={this.handleSubmit}>
							<input
							type='text'
							name='Name'
							placeholder= {this.state.Name}
							onChange={this.handleInputChange}
							/>
							
							<input
							type='text'
							name='Caption'
							placeholder= {this.state.Caption}
							onChange={this.handleInputChange}
							/>

							<input
							type='text'
							name='url'
							placeholder= {this.state.url}
							onChange={this.handleInputChange}
							/>

							<input 
							type="submit" 
							value="Insert"
							onClick={this.handleClick} 
							/>

						</form>
					</div>
				</div>
				<div className= "SubHeader">
					Please Upload your image to a service like <a href= "https://postimages.org/" target="_blank">postimages.org</a> and share the link.
					Copyrighted images and images hosted on other website may not be shown without proper permission.
				</div>
				<div className= "responsive">
					<ShowTheList/>
				</div>
				<div className= "Footer">Created with a smile by Shounak</div>
			</div>
		);
	}
}

export default App;
