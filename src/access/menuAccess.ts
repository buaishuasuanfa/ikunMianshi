import {avatarMenus, menus} from "../../config/menu";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUMS from "@/access/accessEnums";

/**
 * 获取有权限可访问的菜单
 * @param currentUser
 * @param menuItems
 */
export const getAccessibleMenus = (currentUser:API.LoginUserVO,menuItems = menus) =>{
    return menuItems.filter((menu)=>{
        // 对菜单的access与当前user的access进行比较
        if (!checkAccess(currentUser,menu.access)){
            return false
        }
        if (menu.children){
            getAccessibleMenus(currentUser,menu.children)
        }
        return true
    })
}

