import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPostAction } from '../actions/post_action'

class PostList extends Component {
    constructor(props) {
        super(props)
        console.log(props);
    }

    componentDidMount() {
        // 加载远程数据
        this.props.dispatch(loadPostAction)
    }

    render() {
        return (
            <div>
                <ul></ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps)(PostList)