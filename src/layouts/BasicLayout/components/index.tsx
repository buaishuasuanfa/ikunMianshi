import {Input} from "antd";
import {useRouter} from "next/navigation";

interface Props {
    key?: string;
}

/**
 * 通用布局
 * @param key
 * @constructor
 */
const SearchInput = ({ key }: Props) => {
    const router = useRouter();
    return (
        <div
            className='search-input'
            key="SearchOutlined"
            aria-hidden
            style={{
                display: "flex",
                alignItems: "center",
                marginInlineEnd: 24,
            }}
        >
            <Input.Search
                allowClear={true}
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                }}
                placeholder="搜索题目"
                onSearch={(value: string) => {
                    router.replace(`/questions?query=${value}`);
                }}
            />
        </div>
    );
};
export default SearchInput;