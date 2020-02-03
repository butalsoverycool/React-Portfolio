import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Title = styled.h1`
    text-align: center;
`;

const Description = styled.div`
    max-width: 500px;
    margin: auto;
    color: grey;
    font-style: italic;
`;

const Link = styled.a`
    color: green;
`;

// user data/layout config
const usersNum = 5;
const usersSrc = 'https://randomuser.me/api/?results=' + usersNum;

const UserCard = styled.div`
    max-width: 500px;
    margin: auto;
    box-shadow: 0px 0px 10px #e8e8e8;
    padding: 10px;
    margin-bottom: 10px;
`;

class AjaxAxios extends Component {
    state = {
        isLoading: true,
        users: [],
        error: null
    }

    getUsers() {
        axios
            // get from url
            .get(usersSrc)
            // format response
            .then(response =>
                response.data.results.map(user => ({
                    name: `${user.name.first} ${user.name.last}`,
                    username: `${user.login.username}`,
                    email: `${user.email}`,
                    img: `${user.picture.thumbnail}`
                }))
            )
            // update state
            .then(users => {
                this.setState({
                    users,
                    isLoading: false
                });
            })
            // on error, catch it and update state
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    // run fetching on mount
    componentDidMount() {
        this.getUsers();
    }

    render() {
        const { isLoading, users, error } = this.state;

        return (
            <div className='AjaxContainer'>
                <Title>Ajax-Axios bitches</Title>
                <Description>
                    <p>This page is temp to demonstrate fetching of external API-data</p>
                    <p>Source is <Link href={usersSrc}>randomuser</Link></p>
                    <p>GET request by <Link href='https://github.com/axios/axios'>Axios</Link></p>
                </Description>

                {error ? <p>{error.message}</p> : null}

                {
                    !isLoading ? (
                        users.map(user => {
                            const { name, username, email, img } = user;

                            return (
                                <UserCard key={username}>
                                    <h2>{name}</h2>
                                    <img src={img} alt='user_img' />
                                    <p>username: {username}</p>
                                    <p>
                                        email:
                                        <Link href={`mailto:${email}?&subject=Fake%20email%20address&body=Throw%20this%20draft%20in%20trash%20:D`}>
                                            {email}
                                        </Link>
                                    </p>
                                </UserCard>
                            );
                        })
                        // if isLoading truthy
                    ) : (
                            <h3>Loading...</h3>
                        )
                }
            </div >
        );
    }
}

export default AjaxAxios;