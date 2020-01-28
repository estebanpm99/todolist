import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getTasks, deleteTask } from '../actions/taskActions';
import PropTypes from 'prop-types';

class TodoList extends Component{
    
    static propTypes = {
        getTasks: PropTypes.func.isRequired,
        task: PropTypes.object.isRequired,
        deleteTask: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getTasks();
    };

    componentDidUpdate(prevProps) {
        const { isAuthenticated } = this.props;
        if (isAuthenticated !== prevProps.isAuthenticated){
            this.props.getTasks();
        }
    }

    onDeleteClick = (id) => {
        this.props.deleteTask(id);
    };

    render(){
        const { isAuthenticated } = this.props;
        const { tasks } = this.props.task; //this.props.task.tasks
        return(
            <Container>
              <ListGroup>
              {isAuthenticated ?
                <TransitionGroup>
                    {tasks.map(({id,task}) => (
                        <CSSTransition key={id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Input 
                                type="checkbox"
                                onChange={this.onDeleteClick.bind(this, id)}
                                />                          
                                {task}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>  
                : null}
              </ListGroup>  
            </Container>
        );
    }
}    

const mapStateToProps = (state) => ({
    task: state.task,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps, {getTasks, deleteTask})(TodoList);