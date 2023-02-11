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
let obstacle_disc = 0
wuKong.mecanumWheel(
wuKong.ServoList.S2,
wuKong.ServoList.S3,
wuKong.ServoList.S0,
wuKong.ServoList.S1
)
wuKong.mecanumRun(wuKong.RunList.stop, 49)
basic.forever(function () {
    obstacle_disc = sonar.ping(
    DigitalPin.P14,
    DigitalPin.P15,
    PingUnit.Inches
    )
    led.plotBarGraph(
    obstacle_disc,
    0
    )
})
