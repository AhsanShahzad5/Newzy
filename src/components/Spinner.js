import React, { Component } from 'react'

export default class Spinner extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center my-3">

                <div class="spinner-border text-primary " role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}
