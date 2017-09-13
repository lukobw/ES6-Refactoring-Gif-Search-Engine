Search = React.createClass ({
    getInitialState() {
        return {
            searchingText: ''
        };
    },
    handleChange: function(event) {
        var searchingText = event.target.value;
        this.setState ({
            searchingText: searchingText
        });
        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    },
    handleKeyUp: event => {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    },
    render: function() {
        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };
        return <input
                type = 'text'
                onKeyUp = {this.handleKeyUp}
                onChange = {this.handleChange}
                placeholder = "Search for..."
                style = {styles}
                value = {this.state.seatchTerm}
                />
    },
});