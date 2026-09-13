include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-wifi-temperature
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

PKG_LICENSE:=MIT
PKG_MAINTAINER:=ClassicDarkPack

include $(INCLUDE_DIR)/package.mk

LUCI_TITLE:=LuCI Wi-Fi radio temperature monitor
LUCI_DEPENDS:=+luci-base +luci-mod-status
LUCI_PKGARCH:=all

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt build system
