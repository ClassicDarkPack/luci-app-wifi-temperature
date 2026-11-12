include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-wifi-temperature
PKG_VERSION:=1.1.0
PKG_RELEASE:=1
PKG_LICENSE:=MIT
PKG_MAINTAINER:=ClassicDarkPack
PKGARCH:=all

LUCI_TITLE:=Wi-Fi radio temperature on LuCI Overview
LUCI_DEPENDS:=+luci-base +luci-mod-status
LUCI_PKGARCH:=all
LUCI_URL:=https://github.com/ClassicDarkPack/luci-app-wifi-temperature

# luci.mk includes package.mk and installs htdocs/ and root/.
include $(TOPDIR)/feeds/luci/luci.mk
