import React, { Component } from "react";

class WriteForm extends Component {
    state={
        "article-title-input":"",
        "article-content-input":"",
        preview:false
    }
    mode = "create";

    componentDidMount(){
        if(this.props.edit) {
            const newState = { 
                ...this.props.oldState, 
                "article-title-input":this.props.oldState.title,
                "article-content-input":this.props.oldState.content
            }
            this.setState(newState);
            this.mode="edit";
        }
    }
    handleChange = e => {
        this.setState(
          {[e.target.id] : e.target.value}
        );
      }
      onClickConfirm = () => {
          const edited = {
              title : this.state["article-title-input"],
              content: this.state["article-content-input"]
          }
          this.props.onClickConfirm(edited);
      }
      onClickBack = () => {
        if(this.mode === "edit"){
            if (this.state["article-content-input"] !== this.state.content ||
              this.state["article-title-input"] !== this.state.title)
                  {
                      let confirmLoss = window.confirm("Are you sure? The change will be lost.");
                      if (!confirmLoss) return;
                  }
        }
        this.props.onClickBack();
      }
    render(){
        const writeStyle = this.state.preview ? {visibility: "hidden"} : {visibility: "visible"};
        const previewStyle = this.state.preview ? {visibility:"visible"} : {visibility: "hidden"}; 
        const confirmBtn = (this.state["article-title-input"] === "" || this.state["article-content-input"] === "")?
        (<button disabled={true} id={`confirm-${this.mode}-article-button`}>Confirm</button>):
        (<button id={`confirm-${this.mode}-article-button`} onClick={this.onClickConfirm} >Confirm</button>);
        return(<div>
            <div style={writeStyle}> title : <input 
                id="article-title-input" 
                value={this.state["article-title-input"]}
                onChange={this.handleChange}
                ></input></div>
            <div style={writeStyle}>content : <input 
                id="article-content-input" 
                value={this.state["article-content-input"]}
                onChange={this.handleChange}
                ></input></div>
            <button id={`back-${this.mode}-article-button`} 
                onClick={this.onClickBack}>back</button>
            {confirmBtn}
            <div>
            <button id="preview-tab-button" 
                onClick={() => {this.setState({preview:true})}}> PREVIEW </button>
            <button id="write-tab-button" 
                onClick={() => {this.setState({preview:false})}}> WRITE </button>
        </div>
        <div style={previewStyle}>
            <h2 id='article-title'>{this.state["article-title-input"]}</h2>
                <h3 id='article-author'>{this.props.author}</h3>
                <h4 id='article-content'>{this.state["article-content-input"]}</h4>
        </div>
        </div>)
    }
}

export default WriteForm;