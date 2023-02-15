control.onEvent(EventBusSource.MES_DEVICE_INFO_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (in_motion) {
        wuKong.mecanumSpin(wuKong.TurnList.Left, 80)
        basic.pause(200)
        wuKong.mecanumRun(wuKong.RunList.Front, 49)
    }
})
input.onButtonPressed(Button.A, function () {
    wuKong.mecanumRun(wuKong.RunList.Front, 49)
    in_motion = 1
})
radio.onReceivedString(function (receivedString) {
    voice_id = receivedString
    if (voice_id == "5#") {
        wuKong.mecanumStop()
        in_motion = 0
    } else if (voice_id == "3#") {
        wuKong.mecanumRun(wuKong.RunList.Front, 49)
        in_motion = 1
    } else if (voice_id == "4#") {
        wuKong.mecanumRun(wuKong.RunList.rear, 49)
        in_motion = 1
    } else if (voice_id == "6#") {
        wuKong.mecanumSpin(wuKong.TurnList.Left, 50)
        in_motion = 1
    } else if (voice_id == "7#") {
        wuKong.mecanumSpin(wuKong.TurnList.Right, 50)
        in_motion = 1
    }
})
input.onButtonPressed(Button.B, function () {
    wuKong.mecanumStop()
    in_motion = 0
})
let obstacle_disc = 0
let voice_id = ""
let in_motion = 0
radio.setGroup(8)
wuKong.mecanumWheel(
wuKong.ServoList.S2,
wuKong.ServoList.S3,
wuKong.ServoList.S0,
wuKong.ServoList.S1
)
wuKong.mecanumStop()
in_motion = 0
wuKong.setLightMode(wuKong.LightMode.OFF)
let strip = neopixel.create(DigitalPin.P12, 4, NeoPixelMode.RGB)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    obstacle_disc = sonar.ping(
    DigitalPin.P14,
    DigitalPin.P15,
    PingUnit.Centimeters
    )
    if (obstacle_disc < 25) {
        control.raiseEvent(
        EventBusSource.MES_DEVICE_INFO_ID,
        EventBusValue.MICROBIT_EVT_ANY
        )
    }
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        wuKong.lightIntensity(100)
        strip.showRainbow(1, 360)
    } else {
        wuKong.lightIntensity(0)
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
    }
})
