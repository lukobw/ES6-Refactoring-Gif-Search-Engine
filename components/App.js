var GIPHY_API_URL = 'https://api.giphy.com',
GIPHY_PUB_KEY = 'dc6zaTOxFJmzC';


App = React.createClass ({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    getGif: function(searchingText) {
        return new Promise((resolve, reject) => {
            var url = GIPHY_API_URL +  '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data;
                var gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                resolve(gif);
                }
            };
            xhr.send();
        })
    },
    handleSearch: function(searchingText) {
        this.setState ({
            loading: true
        });
        this.getGif(searchingText).then((gif) => {
            this.setState ({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        })
    },
    render: function() {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };
        return (
            <div style={styles}>
                <h1>Gif Search Engine!</h1>
                <p>Find gif on <a href="http://giphy.com">giphy</a> Push enter to download another gifs.</p>
                <Search onSearch = {this.handleSearch}/>
                <Gif
                    loading = {this.state.loading}
                    url = {this.state.gif.url}
                    sourceUrl = {this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});