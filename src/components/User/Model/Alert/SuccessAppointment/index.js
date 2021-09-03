import React, { useEffect, useState } from 'react'
import './style.scss'
import { Icon } from 'react-icons-kit'
import { useHistory } from 'react-router-dom'
import { ic_check_circle } from 'react-icons-kit/md'

const Index = ({ hide }) => {
    const history = useHistory()
    const [currentCount, setCount] = useState(5)
    const timer = () => setCount(currentCount - 1)

    useEffect(() => {
        if (currentCount <= 0) return
        const id = setInterval(timer, 1000)
        return () => clearInterval(id)
    }, [currentCount])

    useEffect(() => {
        setTimeout(() => {
            history.push('/patient/appointments')
        }, 5000)
    })

    return (
        <div className="alert-modal-backdrop">
            <div className="flex-center flex-column">
                <div className="card border-0 shadow">
                    <div className="card-body text-center px-4 py-5">
                        <Icon className="icon" icon={ic_check_circle} size={60} />
                        <h3 className="my-2">Successfully</h3>
                        <p className="mb-0">Your appointment has been submitted.</p>
                        <p className="mb-0">Wait {currentCount}s to redirect your profile.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;