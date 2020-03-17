type Methods = "GET" | "POST" | "PUT";

interface RemoteConfig {
  getMethod: Methods;
  getUrl: string;
  updateMethod: Methods;
  updateUrl: string;
}

const saveKey = "remote-config";

// 获取remoteConfig
export function getRemoteConfig(): RemoteConfig | null {
  if (localStorage.getItem(saveKey)) {
    return JSON.parse(localStorage.getItem(saveKey) || "{}");
  } else {
    return null;
  }
}

// 设置remoteConfig
export function setRemoteConfig(data: RemoteConfig): void {
  localStorage.setItem(saveKey, JSON.stringify(data));
}

// 移除远程
export function removeRemoteConfig() {
  localStorage.removeItem(saveKey);
}
