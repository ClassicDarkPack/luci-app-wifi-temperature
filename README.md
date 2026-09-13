# luci-app-wifi-temperature

LuCI app for displaying Google WiFi Gale/IPQ4019 ath10k radio temperatures in **Status → Overview**.

## Install

Build with the OpenWrt SDK or place this package in `package/` and run:

```sh
make package/luci-app-wifi-temperature/compile V=s
```

The helper reads `ath10k_hwmon` sensors from `/sys/class/hwmon` and reports temperatures in millidegrees Celsius.

## Notes

The mapping of `a000000.wifi` and `a800000.wifi` to 2.4 GHz/5 GHz should be verified on the target device.
