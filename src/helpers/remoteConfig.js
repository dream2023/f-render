const saveKey = "remote-config";

// 获取remoteConfig
export function getRemoteConfig() {
  if (localStorage.getItem(saveKey)) {
    return JSON.parse(localStorage.getItem(saveKey) || "{}");
  } else {
    return null;
  }
}

// 设置remoteConfig
export function setRemoteConfig(data) {
  localStorage.setItem(saveKey, JSON.stringify(data));
}

// 移除远程
export function removeRemoteConfig() {
  localStorage.removeItem(saveKey);
}
