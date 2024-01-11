import React, { useState } from 'react'
import { StepContext } from "./stepsContext"

const StepsProvider = (props) => {
    const [currentStep, setCurrentStep] = useState(1)


    const formStepsFun = () => {
        setCurrentStep(currentStep + 1)
    }

    const formStepsBackFun = () => {
        setCurrentStep(currentStep - 1)
    }

    return (
        <StepContext.Provider value={{ currentStep, setCurrentStep, formStepsFun, formStepsBackFun }}>
            {props.children}
        </StepContext.Provider>
    )
}

export default StepsProvider