import React from 'react'
import './style.scss'
import { Icon } from 'react-icons-kit'
import { ic_close } from 'react-icons-kit/md'
import {Images} from '../../../../../utils/Images'

const Index = ({ message, hide }) => {
    return (
        <div className="alert-modal-backdrop">
            <div className="flex-center flex-column">
                <div className="card border-0 shadow">
                    <div className="card-header border-0 text-right bg-white p-4">
                        <button
                            type="button"
                            className="btn rounded-circle shadow-none"
                            onClick={hide}
                        >
                            <Icon icon={ic_close} size={22} />
                        </button>
                    </div>
                    <div className="card-body text-center px-4 pt-0 pb-5">
                        <img src={Images.Unlock} className="img-fluid" alt="..." />
                        <h6 className="mb-0">{message}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;