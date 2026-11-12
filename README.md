# luci-app-wifi-temperature

A small LuCI **Status → Overview** widget for ath10k/ath11k Wi-Fi hardware temperatures, primarily developed for Google WiFi Gale (IPQ4019).

Temperatures are read from `/sys/class/hwmon` and displayed in degrees Celsius. The helper returns JSON values in millidegrees Celsius. Missing sensors show **Not available**; no guessed readings are shown.

## Download / compatibility

GitHub Actions builds packages using the **official OpenWrt SDK**, and uploads the resulting files under **Actions → Build OpenWrt packages → Artifacts**.

| OpenWrt | Package | Package manager |
| --- | --- | --- |
| 23.05.6 | `.ipk` | `opkg` |
| 24.10.4 | `.ipk` | `opkg` |
| 25.12.6 | `.apk` | `apk` |

On a `v*` tag, the workflow also publishes packages under **Releases**. Packages are marked `all` (no compiled architecture-specific code); the SDK build targets `ipq40xx/generic` for the intended device family. Do **not** install an APK on an opkg-based system or an IPK on an apk-based system.

## Installation

Download the package matching your firmware, transfer it to `/tmp/`, then install:

OpenWrt 23.05 / 24.10:
```sh
opkg install /tmp/luci-app-wifi-temperature*.ipk
```

OpenWrt 25.12:
```sh
apk add --allow-untrusted /tmp/luci-app-wifi-temperature*.apk
```

Refresh LuCI and open **Status → Overview**. To diagnose a missing value:

```sh
/usr/libexec/luci-wifi-temperature
ls /sys/class/hwmon/hwmon*/name
```

## Build with an OpenWrt SDK

Install/update the LuCI feed first, put this repository at `package/luci-app-wifi-temperature` inside an OpenWrt SDK, and run:

```sh
./scripts/feeds update luci
./scripts/feeds install -p luci luci-base luci-mod-status
make defconfig
make package/luci-app-wifi-temperature/compile V=s
```

## Limitations

- Hardware must expose `ath10k_hwmon` or `ath11k_hwmon` and `temp1_input` through sysfs.
- The radio mapping of `a000000.wifi` to 2.4 GHz and `a800000.wifi` to 5 GHz is specific to the original target hardware and **must be verified** on other devices.
- **Highest Wi-Fi temperature** is the maximum of detected compatible radio sensors, **not CPU/SoC temperature**.
- The widget is read-only. Its rpcd ACL authorizes executing only the dedicated, fixed-argument temperature helper.

Licensed under MIT.
