import ACCESS_ENUMS from "@/access/accessEnums";

/**
 * 权限校验
 */
const checkAccess = (
  currentUser: API.LoginUserVO,
  needAccess = ACCESS_ENUMS.NOT_LOGIN,
) => {
  // 获取当前用户是否具有权限，若没有login,则表示未登录
  const currentUserAccess = currentUser?.userRole || ACCESS_ENUMS.NOT_LOGIN;

  // 当前页面访问不需要任何权限
  if (needAccess === currentUserAccess) {
    return true;
  }

  // 当前页面需要用户权限
  if (needAccess === ACCESS_ENUMS.USER) {
    // 如果当前未登录
    if (currentUserAccess === ACCESS_ENUMS.NOT_LOGIN) return false;
  }

  // 当前页面需要管理员权限
  if (needAccess === ACCESS_ENUMS.ADMIN) {
    if (currentUserAccess !== ACCESS_ENUMS.ADMIN) return false;
  }

  return true;
};

export default checkAccess;