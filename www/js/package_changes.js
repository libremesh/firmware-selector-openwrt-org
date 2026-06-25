
const packages_changes_list_main = [
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
]

const packages_changes_list_ath9k = [
    {
        source: "kmod-ath9k",
        action: "replace",
        packages: ["wifi-unstuck-wa"],
    },
    {
        source: "-kmod-ath9k",
        action: "replace",
        packages: ["-wifi-unstuck-wa"],
    }
]

export function getPackagesChanges(version) {
    let packages_changes_list = packages_changes_list_main
    
    // kmod-ath9k: wifi-unstuck-wa from openwrt-19.07 to the version 24.10.5
    const ath9kRe = /^(24\.10\.[0-5]|23\.05\.\d|)$/;

    if (ath9kRe.test(version)) {
        packages_changes_list = packages_changes_list_ath9k.concat(packages_changes_list)
    }

    return packages_changes_list
}

export function libremeshPackagesChanges(version, packages) {
  let packages_list = [];
  let packages_changes_list = getPackagesChanges(version)

  packages.forEach((pkg) => {
    packages_changes_list.forEach((pc) => {
      if (pc.action == "replace") {
        if (pkg == pc.source) {
          pc.packages.forEach((change) => {
            if (!packages_list.includes(change)) {
              packages_list.push(change);
            }
          });
        }
      }
      if (pc.action == "regexp") {
        let matches = pkg.match(pc.source);
        if (matches?.length) {
          pc.packages.forEach((replacement) => {
            let change = replacement
              .replace("REPLACE", matches[1])
              .replace("KEEP", matches[2]);
            if (!packages_list.includes(change)) {
              packages_list.push(change);
            }
          });
        }
      }
    });
  });

  return packages_list;
}