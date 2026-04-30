/* exported config */

var config = {
  // Show help text for images
  show_help: true,

  // Versions list (optional if provided by .versions.json)
  // versions: ["23.05.4", "19.07.10"],

  // Pre-selected version (optional if provided by .versions.json)
  // default_version: "23.05.4",

  // Number of versions to show for each openwrt's branch
  branch_versions_count: 2,

  // Image download URL (e.g. "https://downloads.openwrt.org")
  image_url: "https://downloads.openwrt.org",

  // Insert snapshot versions (optional)
  show_snapshots: true,

  // Info link URL (optional)
  info_url: "https://openwrt.org/start?do=search&id=toh&q={title} @toh",

  // Attended Sysupgrade Server support (optional)
  asu_url: "https://sysupgrade.libremesh.org",

  asu_servers: [
    "https://sysupgrade.libremesh.org",
    "https://sysupgrade.antennine.org",
    "https://sysupgrade-01.antennine.org",
  ],
  // asu_extra_packages: ["luci", "luci-app-attendedsysupgrade"],
  // Additional repositories for ASU build requests (optional)
  asu_repositories: {
    libremesh:
      "https://feed.libremesh.org/{feed_branch}/openwrt-{openwrt_branch}/x86_64/packages.adb",
    libremesh_arch_packages:
      "https://feed.libremesh.org/{feed_branch}/openwrt-{openwrt_branch}/{openwrt_arch}/packages.adb",
    profiles:
      "https://feed.libremesh.org/profiles/openwrt-{openwrt_branch}/x86_64/packages.adb",
  },
  asu_repositories_mode: "append", // "append" or "replace"
  asu_repository_keys: [
    "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEdFJZ2qVti49Ol8LJZYuxgOCLowBS\n8bI86a7zqhSbs5yon3JON7Yee7CQOgqwPOX5eMALGOu8iFGAqIRx5YjfYA==\n-----END PUBLIC KEY-----",
    "RWSnGzyChavSiyQ+vLk3x7F0NqcLa4kKyXCdriThMhO78ldHgxGljM/8",
  ],

  libremesh: {
    branches: ["master", "dev"],
    default_packages: ["-dnsmasq", "-odhcpd-ipv6only"],
    generic_save_space: ["-ppp", "-ppp-mod-pppoe"],
    flavors: {
      default: [
        "babeld-auto-gw-mode",
        "batctl-default",
        "check-date-http",
        "lime-app",
        "lime-debug",
        "lime-docs",
        "lime-docs-minimal",
        "lime-hwd-ground-routing",
        "lime-hwd-openwrt-wan",
        "lime-proto-anygw",
        "lime-proto-babeld",
        "lime-proto-batadv",
        "shared-state",
        "shared-state-babeld_hosts",
        "shared-state-bat_hosts",
        "shared-state-nodes_and_links",
      ],
      mini: [
        "babeld-auto-gw-mode",
        "lime-docs-minimal",
        "lime-hwd-openwrt-wan",
        "lime-proto-anygw",
        "lime-proto-babeld",
        "lime-proto-batadv",
        "shared-state",
        "shared-state-babeld_hosts",
      ],
      "babeld-only": [
        "babeld-auto-gw-mode",
        "lime-docs-minimal",
        "lime-hwd-openwrt-wan",
        "lime-proto-babeld",
        "shared-state",
        "shared-state-babeld_hosts",
      ],
    },
    packages_changes_list: [
      {
        source: "kmod-ath9k",
        action: "replace",
        packages: ["wifi-unstuck-wa"],
      },
      {
        source: "-kmod-ath9k",
        action: "replace",
        packages: ["-wifi-unstuck-wa"],
      },
      {
        source: "kmod-ath10k-ct-smallbuffers",
        action: "replace",
        packages: [
          "-kmod-ath10k",
          "-kmod-ath10k-ct",
          "-kmod-ath10k-ct-smallbuffers",
          "kmod-ath10k-smallbuffers",
        ],
      },
      {
        source: "kmod-ath10k-ct",
        action: "replace",
        packages: [
          "-kmod-ath10k-ct",
          "-kmod-ath10k-ct-smallbuffers",
          "kmod-ath10k",
        ],
      },
      {
        source: "-kmod-ath10k-ct",
        action: "replace",
        packages: ["-kmod-ath10k"],
      },
      {
        source: /^ath10k-firmware-qca(.*)-ct(.*)$/,
        action: "regexp",
        packages: [
          "-ath10k-firmware-qcaREPLACE-ctKEEP",
          "ath10k-firmware-qcaREPLACE",
        ],
      },
      {
        source: /^-ath10k-firmware-qca(.*)-ct(.*)$/,
        action: "regexp",
        packages: ["ath10k-firmware-qcaREPLACE"],
      },
    ],
  },
};
