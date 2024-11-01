import ACCESS_ENUMS from "@/access/accessEnums";

// 默认用户
export const DEFAULT_USER: API.LoginUserVO = {
    userName: "未登录",
    userProfile: "暂无简介",
    userAvatar: "/assets/notLoginUser.png",
    userRole: ACCESS_ENUMS.NOT_LOGIN,
};