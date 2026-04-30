import { $, split } from "./utils.js";

const config = window.config;
var current_flavor = config.libremesh.flavors.default;

export function libremeshPackagesChanges(packages) {
  let packages_list = [];

  packages.forEach((pkg) => {
    config.libremesh.packages_changes_list.forEach((pc) => {
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

export function libremeshInitFlavor() {
  let select = $("#flavor-select");

  select.onchange = function () {
    const option = select.options[select.selectedIndex];

    let lime_packages = split($("#lime-packages").value);
    if (lime_packages == "") {
      return;
    }

    // remove previous flavor
    let default_device_packages = lime_packages.filter(
      (v) => !current_flavor.includes(v)
    );
    current_flavor = config.libremesh.flavors[option.value];

    $("#lime-packages").value = default_device_packages
      .concat(current_flavor)
      .join(" ");
  };

  // trigger translation
  select.onchange();
}

export function libremeshInitBranches() {
  let select = $("#ref-select");

  config.libremesh.branches.forEach((i) => {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    select.appendChild(opt);
  });
}

export function getFeedBranch() {
  return $("#ref-select").value;
}
