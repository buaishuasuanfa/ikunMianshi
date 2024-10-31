import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {findAllMenusItemByPath} from "../../config/menu";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUMS from "@/access/accessEnums";
import {RootState} from "@/stores";
import loginUser from "@/stores/loginUserSlice";
import Forbidden from "@/app/forbidden";

/**
 * 权限校验拦截器
 * @param children
 * @constructor
 */
const AccessLayout: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({ children }) =>{
    const pathName = usePathname();
    const currentUser = useSelector((state:RootState) => state.loginUser)

    // 权限校验
    const menu = findAllMenusItemByPath(pathName);
    const needAccess = menu?.access || ACCESS_ENUMS.NOT_LOGIN;
    const canAccess = checkAccess(currentUser,needAccess)

    if (!canAccess){
        return <Forbidden/>
    }
    return(
        children
    )
};

export default AccessLayout
