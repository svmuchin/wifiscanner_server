import React from 'react';

import './style.css'

const HIGH_SIGNAL = -30
const LOW_SIGNAL = -90
const SIGNAL_DELTA = Math.abs(HIGH_SIGNAL - LOW_SIGNAL)
const HIGH_HUE = 127
const LOW_HUE = 0
const HUE_DELTA = Math.abs(HIGH_HUE - LOW_HUE)

export const SignalField = ({ record, source }) => {
    const signal = record[source]
    const clampedValue = Math.max(Math.min(signal, HIGH_SIGNAL), LOW_SIGNAL)
    const normalizedValue = clampedValue - LOW_SIGNAL
    const relativeSignal = normalizedValue / SIGNAL_DELTA
    const hue = LOW_HUE + HUE_DELTA * relativeSignal

    const width = `${relativeSignal * 100}%`
    const backgroundColor = `hsl(${hue}, 72%, 36%)`
    console.log(backgroundColor)

    return (
        <div className="signal-field">
            <div className="signal-bar" style={{ width, backgroundColor }} />
        </div>
    )
}
