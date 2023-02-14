control.onEvent(EventBusSource.MES_DEVICE_INFO_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    basic.showIcon(IconNames.Giraffe)
    wuKong.mecanumStop()
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Pitchfork)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.A, function () {
    wuKong.mecanumRun(wuKong.RunList.Front, 49)
})
input.onButtonPressed(Button.B, function () {
    wuKong.mecanumRun(wuKong.RunList.rear, 49)
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    basic.showNumber(control.eventValue())
    basic.pause(500)
    basic.clearScreen()
    if (control.eventValue() == 9 || control.eventValue() == 10) {
        wuKong.mecanumRun(wuKong.RunList.Front, 49)
    } else if (control.eventValue() == 13) {
        wuKong.mecanumRun(wuKong.RunList.rear, 49)
    } else if (control.eventValue() == 11) {
        wuKong.mecanumRun(wuKong.RunList.left, 49)
    } else if (control.eventValue() == 15) {
        wuKong.mecanumRun(wuKong.RunList.right, 49)
    } else if (control.eventValue() == 1) {
        wuKong.mecanumSpin(wuKong.TurnList.Left, 50)
    } else if (control.eventValue() == 3) {
        wuKong.mecanumSpin(wuKong.TurnList.Right, 50)
    } else if (control.eventValue() == 5) {
        wuKong.mecanumDrift(wuKong.TurnList.Left)
        wuKong.mecanumDrift(wuKong.TurnList.Right)
    } else if (control.eventValue() == 7 || control.eventValue() == 8) {
        wuKong.mecanumStop()
    } else {
        basic.showNumber(control.eventValue())
        basic.clearScreen()
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    voice_id = serial.readLine()
    basic.showString(voice_id)
    if (voice_id == "3") {
        wuKong.mecanumRun(wuKong.RunList.Front, 49)
    } else if (voice_id == "4") {
        wuKong.mecanumRun(wuKong.RunList.rear, 49)
    } else if (voice_id == 6) {
        wuKong.mecanumRun(wuKong.RunList.left, 49)
    } else if (voice_id == 7) {
        wuKong.mecanumRun(wuKong.RunList.right, 49)
    } else if (voice_id == 6) {
        wuKong.mecanumSpin(wuKong.TurnList.Left, 50)
    } else if (voice_id == 7) {
        wuKong.mecanumSpin(wuKong.TurnList.Right, 50)
    } else if (voice_id == 8) {
        wuKong.mecanumDrift(wuKong.TurnList.Left)
        wuKong.mecanumDrift(wuKong.TurnList.Right)
    } else if (voice_id == 5) {
        wuKong.mecanumStop()
    } else {
        basic.showNumber(voice_id)
        basic.clearScreen()
    }
})
let obstacle_disc = 0
let voice_id = ""
wuKong.mecanumWheel(
wuKong.ServoList.S2,
wuKong.ServoList.S3,
wuKong.ServoList.S0,
wuKong.ServoList.S1
)
wuKong.mecanumStop()
serial.redirect(
SerialPin.P2,
SerialPin.P1,
BaudRate.BaudRate9600
)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    obstacle_disc = sonar.ping(
    DigitalPin.P14,
    DigitalPin.P15,
    PingUnit.Inches
    )
    basic.clearScreen()
    if (obstacle_disc < 20) {
        control.raiseEvent(
        EventBusSource.MES_DEVICE_INFO_ID,
        obstacle_disc
        )
    }
})
