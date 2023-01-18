const closeResetColorAlert = () => {
    const AlertElement = document.getElementById('reset-color-alert')
    AlertElement.className = 'warning-alert warning-alert_invisible'
}

const openResetColorAlert = () => {
    const AlertElement = document.getElementById('reset-color-alert')
    AlertElement.className = 'warning-alert warning-alert_visible'
}

const closeResetAllColorAlert = () => {
    const AlertElement = document.getElementById('reset-all-alert')
    AlertElement.className = 'warning-alert warning-alert_invisible'
}

const openResetAllColorAlert = () => {
    const AlertElement = document.getElementById('reset-all-alert')
    AlertElement.className = 'warning-alert warning-alert_visible'
}

const closeApplyColorAlert = () => {
    const AlertElement = document.getElementById('apply-color-alert')
    AlertElement.className = 'warning-alert warning-alert_invisible'
}

const openApplyColorAlert = () => {
    const AlertElement = document.getElementById('apply-color-alert')
    AlertElement.className = 'success-alert success-alert_visible'
}