class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: props.list,
            postListNow: []
        }
    }
    switchTab(id) {
        let _list = this.state.postList.filter(item => item.id === id);
        this.setState({
            postListNow: _list
        })
    }
    componentDidMount() {
        let _list = this.state.postList;
        this.setState({
            postListNow: _list
        })
    }
    render() {
        return (
            <div>
                <a href="javascript:;" onClick={() => {
                    this.switchTab(1);
                }}>第一章</a>
                <a href="javascript:;" onClick={() => {
                    this.switchTab(2);
                }}>第二章</a>
                <a href="javascript:;" onClick={() => {
                    this.switchTab(3);
                }}>第三章</a>
                <ul>
                    {this.state.postListNow.map(item => <li key={item.id}>{item.title}</li>)}
                </ul>
            </div>
        )
    }
}
export default  PostList;