export default function getUserProfile() {
  return new Promise(resolve => {
    chrome.identity.getProfileUserInfo({ accountStatus: "ANY" }, info => {
      resolve(info)
    })
  })
}
